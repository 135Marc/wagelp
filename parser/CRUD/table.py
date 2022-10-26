from CRUD.base_crud import BaseCrud;
from tax_table import TaxTable;
from echelons import TaxEchelon;
from typing import cast;

class TaxTableCRUD(BaseCrud):
    def __init__(self,db_file):
        super(TaxTableCRUD,self).__init__(db_file);
        self.__bracket_id = int(1);
        self.__percentage_id = int(1);
        
    def insert_tax_table(self,table:TaxTable,table_id:int,region_id:int,number:int):
        table_insert_sql = "INSERT INTO TAXTABLE VALUES(?,?,?)";
        table_insert_params = (table_id,region_id,number);
        self.__last_id = super(TaxTableCRUD,self).create_record(table_insert_sql,table_insert_params) + 1;
        echelons = table.GetEchelons();
        for (key,value) in echelons.items():
            val = cast(TaxEchelon,value);
            floor = val.GetLowerValue();
            ceiling = val.GetUpperValue();
            bracket_insert_sql = "INSERT INTO BRACKET VALUES(?,?,?,?)";
            bracket_insert_params = [self.__bracket_id,self.__last_id-1,floor,ceiling];
            self.__bracket_id = super(TaxTableCRUD,self).create_record(bracket_insert_sql,bracket_insert_params) +1;
            prctgs_array = val.GetPercentages();
            for prctg in range(0,6):
                percentage_insert_sql = "INSERT INTO PERCENTAGE VALUES(?,?,?,?)";
                percentage_insert_params = [self.__percentage_id,self.__bracket_id-1,prctg,prctgs_array[prctg]];
                self.__percentage_id = super(TaxTableCRUD,self).create_record(percentage_insert_sql,percentage_insert_params) + 1;
