from fileinput import close
from types import NoneType
from xmlrpc.client import boolean
import pandas as pd
from tax_table import TaxTable
import math

class ExcelParser():
    def __init__(self):
        pass

    def parse_single_file(self,path : str) -> dict :
        data_frame = pd.read_excel(path,na_values=str);
        row_num,table_number = int(0),int(0);
        res_dict,val_arr,dpts  = dict(),dict(),dict();
        close_flag = bool(False);
        dpts_arr = []
        for index,row in data_frame.iterrows():
            if (math.isnan(float(row[1]))):
                    if (close_flag):
                        table_number+=1;
                        table_temp = TaxTable(val_arr,dpts);
                        table_temp.GenerateEchelons();
                        res_dict.update({table_number:table_temp});
                        val_arr.clear();
                        dpts.clear();
                        close_flag = False;
            else:
                close_flag = True;
                row_num+=1;
                val_arr.update({row_num:row[1]});
                dpts_arr = [row[2],row[3],row[4],row[5],row[6],row[7]];
                dpts.update({row_num:dpts_arr});

        table_number+=1;
        table_temp = TaxTable(val_arr,dpts);
        table_temp.GenerateEchelons();
        res_dict.update({table_number:table_temp});
        val_arr.clear();
        dpts.clear();    
        return res_dict;
       