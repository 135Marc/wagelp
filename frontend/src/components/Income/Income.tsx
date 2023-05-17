import { Table } from "react-bootstrap"
import { IncomeProps,BracketType } from "../../interfaces/interfaces"
import { getIncome} from "../../utils/requests"
import ResultsBody from "../ResultsBody/ResultsBody";
import ResultsHeader from "../ResultsHeader/ResultsHeader";
import { setMoney } from "../../utils/utils";
import { useQuery } from "react-query";
import { YearlyIncome } from "../YearlyIncome/YearlyIncome";
import { useSelector } from "react-redux";
import { StoreState } from "../../state/store";

function Income({isYearly,cancelToken}:IncomeProps):JSX.Element {

    const {ID,Type,Dependents} = useSelector((state:StoreState) => state.table);
    const {Income,PaymentType} = useSelector((state:StoreState) => state.payment);
    
    // CONSTANTS OR VARIABLES
    const money = setMoney(isYearly,PaymentType,Income); // Get Monthly Income, If Salary is Yearly
    const hasDouble = isYearly ? (PaymentType === "14m" || PaymentType === "duod-50") : false;
    const hasOneAndHalf = isYearly ? (PaymentType === "duod-50" || PaymentType ==="duod-5050") : false;

    const prctSingle = useQuery(["percentage",Income,ID,Type,Dependents,cancelToken], 
    () => getIncome(money,ID,Type,Dependents,cancelToken));

    const prctOneAndHalf = useQuery(["percentageOneFive",Income*1.5,ID,Type,Dependents,cancelToken], 
    () => getIncome(money*1.5,ID,Type,Dependents,cancelToken), {enabled: hasOneAndHalf});
    
    const prctDouble = useQuery(["percentage2",Income*2,ID,Type,Dependents,cancelToken], 
    () => getIncome(money*2,ID,Type,Dependents,cancelToken), {enabled: hasDouble});

    let percentage = prctSingle.data?.data.filter((pd) => pd.Dependents === Dependents).at(0)?.Value;
    let percentageOneHalf = (isYearly) ? prctOneAndHalf.data?.data.filter((pd) => pd.Dependents === Dependents).at(0)?.Value : 1;
    let percentageDouble = (isYearly)  ? prctDouble.data?.data.filter((pd) => pd.Dependents === Dependents).at(0)?.Value : 1;

    return (
        <>
            <h3> Valores Brutos </h3>

            <Table striped bordered hover responsive="sm">
                <caption>
                
                {hasDouble && ("(*) Valor Referente a um mês de Subsídio de Férias/Natal, assumindo 1 ano ou mais de contrato.")}
                
                <br/>
                
                {hasOneAndHalf && (
                    "(+) Valor Referente a um salário mais 50% do Subsídio de Férias/Natal, aplicável ao regime de duodécimos.")}

                </caption>

                <ResultsHeader headers={["Bruto Mensal","Desconto","Segurança Social","Após Impostos"]} />
                    
                <tbody>
                    <ResultsBody percentageData={prctSingle.data?.data.filter((bt:BracketType) => bt.Dependents === Dependents)} 
                                 money={money}/>
                    {hasDouble ? <ResultsBody percentageData={prctDouble.data?.data.filter((bt:BracketType) => bt.Dependents === Dependents)} 
                                 money={money*2} separator="(*)" />
                                : null }
                    {hasOneAndHalf ? <ResultsBody percentageData={prctOneAndHalf.data?.data.filter((bt:BracketType) => bt.Dependents === Dependents)} 
                                 money={money*1.5} separator="(+)"/>
                                : null}            
                </tbody>
            </Table>

            { isYearly && <YearlyIncome money={money} payment={PaymentType} percentage={percentage} percentageDouble={percentageDouble}
            percentageOneHalf={percentageOneHalf}/>}
        </>
    )
}

export default Income