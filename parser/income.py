from echelons import TaxEchelon

class Income():

    def __init__(self,bracket: TaxEchelon,wage: float,dependents: int):
        self.__taxbracket = TaxEchelon(bracket);
        self.__wage = float(wage);
        self.__dependents = int(dependents);
        self.__percentage = self.__taxbracket.GetPercentages()[self.__dependents];

    def GetWage(self) -> float:
        return self.__wage;
    
    def GetDependents(self) -> int:
        return self.__dependents;

    def GetNetAfterTax(self) -> float :
        total_percentage = (float(self.__percentage) / 100) + float(0.11);
        tax_discount = self.__wage * total_percentage;
        return self.__wage - tax_discount;
    
    def GetMonthlyDiscount(self) -> float:
        total_percentage = (float(self.__percentage) / 100) + float(0.11);
        return self.__wage * total_percentage;
        