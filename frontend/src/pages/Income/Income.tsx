import { Table } from "react-bootstrap"
import { IncomeProps,BracketType } from "../../interfaces/interfaces"
import { getIncome} from "../../utils/requests"
import ResultsBody from "../../components/ResultsBody/ResultsBody";
import ResultsHeader from "../../components/ResultsHeader/ResultsHeader";
import { calculateYearlyTotals, setMoney } from "../../utils/utils";
import { useQuery } from "react-query";

function Income(props:IncomeProps):JSX.Element {
    
    // CONSTANTS OR VARIABLES
    const money = setMoney(props.isYearly,props.payment,props.income); // Get Monthly Income, If Salary is Yearly
    
    const hasDouble = (props.payment === "14m" || props.payment === "duod-50");
    const hasOneAndHalf = (props.payment === "duod-50" || props.payment ==="duod-5050");

    let yearGross:number, yearIRS:number, yearSS:number, yearLiquid:number;
    yearGross=yearIRS=yearSS=yearLiquid=0;

    const prctSingle = useQuery(["percentage",money,props.tableID,props.tableType,props.dependents,props.cancelToken], 
    () => getIncome(money,props.tableID,props.tableType,props.dependents,props.cancelToken));

    const prctOneAndHalf = useQuery(["percentageOneFive",money*1.5,props.tableID,props.tableType,props.dependents,props.cancelToken], 
    () => getIncome(money*1.5,props.tableID,props.tableType,props.dependents,props.cancelToken),
    {enabled: hasOneAndHalf});
    
    const prctDouble = useQuery(["percentage2",money*2,props.tableID,props.tableType,props.dependents,props.cancelToken], 
    () => getIncome(money*2,props.tableID,props.tableType,props.dependents,props.cancelToken),
    {enabled: hasDouble});


    //  FULL REWORK MAY BE POSSIBLE!
    function getYearlyTotals() {
       let values = calculateYearlyTotals(money,prctSingle.data?.data.filter((pd) => pd.Dependents === props.dependents),
       prctDouble.data?.data.filter((pd) => pd.Dependents === props.dependents));

       yearGross = values.gross;
       yearIRS = values.IRS;
       yearSS = values.SS;
       yearLiquid = values.liquid;
    }

    return (
        <>
            <h3> Valores Brutos </h3>
            <Table striped bordered hover responsive="sm">
                <caption>
                (*) Valor Referente a um mês de Subsídio de Férias/Natal, assumindo 1 ano ou mais de contrato.
                </caption>

                <ResultsHeader headers={["Bruto Mensal","Desconto","Segurança Social","Após Impostos"]} />
                    
                <tbody>
                    <ResultsBody percentageData={prctSingle.data?.data.filter((bt:BracketType) => bt.Dependents === props.dependents)} 
                                 money={money}/>
                    <ResultsBody percentageData={prctDouble.data?.data.filter((bt:BracketType) => bt.Dependents === props.dependents)} 
                                 money={money*2}  />
                </tbody>
            </Table>

{/*
            {getYearlyTotals()}
            
            <Table striped bordered hover responsive="sm">
                <caption>
                Valor Totais Anuais (14 Meses de Salário).
                </caption>

                <ResultsHeader headers={["Bruto Anual","Desconto IRS","Segurança Social","Após Impostos"]} />

                <tbody>
                    <tr>
                        <th> {yearGross} </th>
                        <th> {yearIRS} </th>
                        <th> {yearSS} </th>
                        <th> {yearLiquid} </th>
                    </tr>
                </tbody>
            </Table>
    */}
        </>
    )
}

export default Income