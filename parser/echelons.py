class TaxEchelon():

    def __init__(self,upval:float,lowval:float,prctgs):
        self.__upper_value = float(upval);
        self.__lower_value = float(lowval);
        self.__percentages = prctgs;
    
    def __str__(self) -> str:
        return f"Values: [{self.__lower_value},{self.__upper_value}]\n Percentages: {self.__percentages}\n";
    
    def GetPercentages(self):  
        return self.__percentages;
    
    def GetUpperValue(self) -> float :
        return self.__upper_value;
    
    def GetLowerValue(self) -> float:
        return self.__lower_value;
    
    def GetValuefloaterval(self) -> float:
        return self.__upper_value - self.__lower_value;
    