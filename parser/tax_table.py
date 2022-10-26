from typing import cast
from echelons import TaxEchelon;

class TaxTable():
    def __init__(self,values:dict,percentages:dict):
        self.__values = dict(values);
        self.__percentages = dict(percentages);
        self.__echelons = dict();

    def __str__(self) -> str:
        res_str = str();
        for ech in self.__echelons.values():
            res_str += str(ech);
        return res_str;

    def GetEchelons(self) -> dict():
        return self.__echelons;

    def CreateTaxBrackets(self) -> dict:
        """
            Generates Tax Brackets in a Dictionary Format.
            
            Loops through the brackets' upper limits and 
            establishes boundaries between brackets according 
            to the values established by the Government.
            
            Each bracket is an interval whose lower bound will be the previous bracket's upper limit plus one 
            and the upper bound will be the maximum value for said bracket.
            
            Parameters:
                    None needed.
            
            Returns:
                    Dictionary in which the keys correspond to the Bracket Number.
                    
                    Corresponding values in each key will be stored as an array with 2 elements.
                    
                    The first element corresponds to the Tax Bracket's lower bound, the second corresponds to the upper bound.
            
        """
        val_arr = dict();
        prev_val = float();
        for (index,val) in self.__values.items():
            if (index==1):
                val_arr.update({index:[0,val]});
            else:
                val_arr.update({index:[prev_val,val]});
            prev_val = val + 0.01;
        return val_arr;     
    
    def GenerateEchelons(self):
        brackets = self.CreateTaxBrackets();
        for (key,val) in brackets.items():
            lower_val,upper_val = val[0],val[1];
            prctgs = self.__percentages.get(key);
            t = TaxEchelon(upper_val,lower_val,prctgs);
            self.__echelons.update({key:t});
    
    def GetEchelonByValue(self,val:int) -> int: 
        for (key,value) in self.__echelons.items():
            echelon = cast(TaxEchelon,value);
            floor,ceiling = echelon.GetLowerValue(),echelon.GetLowerValue();
            if (val>=floor and val<=ceiling): 
                return key;
        return -1;
