import sqlite3
from sqlite3 import Error,Connection

class BaseCrud(object):
    def __init__(self,db_path):
        self.__db_file = db_path;
        self.__conn = Connection(db_path);

    def create_connection(self) -> Connection:
        """
        CREATE SQLITE CONNECTION TO DATABASE!!
        """
        try:
            self.__conn = sqlite3.connect(self.__db_file)
            print("CONNNECTION TO DATABASE ESTABLISHED!\n");
        except Error as e:
            print(e)
    
    def close_connection(self) -> None :
        self.__conn.close();
    
    def create_record(self,sql,params) -> int:
        cur = self.__conn.cursor();
        cur.execute(sql,params);
        self.__conn.commit();
        return cur.lastrowid;
    
    def read_record(self,sql,params) -> list:
        curs = self.__conn.cursor();
        curs.execute(sql,params);
        return curs.fetchall();
    
    def update_record(self,sql,params) -> None:
        cur = self.__conn.cursor();
        cur.execute(sql,params);
        self.__conn.commit();
    
    delete_record = update_record
