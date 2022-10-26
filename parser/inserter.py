from excel_parser import ExcelParser
from CRUD.table import TaxTableCRUD
from CRUD.base_crud import BaseCrud
import os

def walk_irs_folder(folder_path:str,db_path:str):
    contents = os.scandir(folder_path);
    bcrud = BaseCrud(db_path);
    bcrud.create_connection();
    tcrud = TaxTableCRUD(db_path);
    id = int(1);
    for entry in contents:
        if (entry.is_dir()):
            year = int(entry.name);            
            print("ENTERED FOLDER " + str(year));
            sub_path = folder_path + "/" + entry.name;
            folder = os.scandir(sub_path);

            for exc in folder:
                region_name = exc.name.partition(".")[0];
                if (year != 2022):
                    excel_path = sub_path + "/" + exc.name;
                    insert_full_region(bcrud,id,region_name,year);
                    populate_database(tcrud,excel_path,id);
                    id += 1;
                else:
                    part = exc.name.partition("-");
                    tax_start:str = part[0];
                    tax_end:str = part[2];
                    excels = os.scandir(sub_path + "/" + exc.name);
                    for fs in excels:
                        region_name = fs.name.partition(".")[0];
                        excel_path = sub_path + "/" + exc.name + "/" + fs.name;
                        insert_periodic_region(bcrud,id,region_name,year,tax_start,tax_end);
                        populate_database(tcrud,excel_path,id);
                        id += 1;         
                
            
    bcrud.close_connection();
    print("PARSE SUCESSFULL!!");            


def insert_full_region(bcrud:BaseCrud,region_id:int,name:str,year:int):
   return bcrud.create_record("INSERT INTO REGION VALUES(?,?,?,?,?)",[region_id,name,year,"JAN","DEC"]);

def insert_periodic_region(bcrud:BaseCrud,region_id:int,name:str,year:int,frm:str,to:str):
    return bcrud.create_record("INSERT INTO REGION VALUES(?,?,?,?,?)",[region_id,name,year,frm,to]);

def populate_database(tcrud:TaxTableCRUD,file_path:str,region_id:int) -> None :
    temp_table_id = int(1);
    tables = ExcelParser().parse_single_file(file_path);
    for (key,value) in tables.items():
        table_number = int(key);
        table_id = ((region_id -1) * 6) + temp_table_id; 
        tcrud.insert_tax_table(value,table_id,region_id,table_number); """ region_id=3"""
        temp_table_id+=1;

def add_temporary_table(bcrud:BaseCrud,tcrud:TaxTableCRUD):
    insert_periodic_region(bcrud,1,"aa",2022,"JAN","MAR");
    populate_database(tcrud,"",1);

def test_parser(file_path:str) -> None :
    excl_parser = ExcelParser();
    result = excl_parser.parse_single_file(file_path);
    for (key,value) in result.items():
        print(value);

def test_folders(folder_path:str) -> None:
    contents = os.scandir(folder_path);
    for entry in contents:
        if (entry.is_dir()):
            year = int(entry.name);
            sub_path = folder_path + "/" + entry.name;
            folder = os.scandir(sub_path);
            if (year != 2022):
                print("ENTERED FOLDER " + str(year));
                for exc in folder:
                    print(exc.name);
            else:
                for f in folder:
                    if (f.is_dir()):
                        part = f.name.partition("-");
                        print("From: " + part[0] + " To: " + part[2]);
                        excels = os.scandir(sub_path + "/" + entry.name + "/"  + f.name);
                        for fs in excels:
                            print(fs.name);

if __name__ == "__main__":
    walk_irs_folder("./IRS",'../database/tax_db');
