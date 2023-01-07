import { Table } from "react-bootstrap"
import {useState,useEffect} from "react"
import { IncomeProps,BracketType } from "../../interfaces/interfaces"
import { getIncome, getTaxPercentages } from "../../utils/requests"
import ResultsBody from "../../components/ResultsBody/ResultsBody";
import ResultsHeader from "../../components/ResultsHeader/ResultsHeader";
import { setMoney } from "../../utils/utils";
import { useQuery } from "react-query";

function Income(props:IncomeProps):JSX.Element {
    
    // CONSTANTS OR VARIABLES
    const money = setMoney(props.isYearly,props.payment,props.income);
    let yearGross:number, yearIRS:number, yearSS:number, yearLiquid:number;
    yearGross=yearIRS=yearSS=yearLiquid=0;

    // REACT STATE VARIABLES
    /*
    const prct = useQuery(["percentage",money,props.tableID,props.tableType,props.dependents,props.cancelToken], () =>
    getIncome(money,props.tableID,props.tableType,props.dependents,props.cancelToken));
    console.log(prct.data);
    */
    const [doublePercentageData,setDoublePercentageData] = useState<BracketType[]>([]);
    const [percentageData,setPercentageData] = useState<BracketType[]>([]);    

    //  FULL REWORK MAY BE POSSIBLE!
    function getYearlyTotals() {
        percentageData.filter((bracket) => bracket.Dependents === props.dependents).forEach((pd) => {
            yearGross+=money*10;
            yearIRS+= (money*pd.Value*10);   
            yearSS+= (money*0.11)*10;
            yearLiquid+=(money - (money * (pd.Value + 0.11)))*10;
        })
 
        doublePercentageData.filter((bracket) => bracket.Dependents === props.dependents).forEach((pd) => {
            yearGross+=money * 4;
            yearIRS+= (money * 2 * pd.Value) * 2;   
            yearSS+= (money * 2 * 0.11)*2;
            yearLiquid+=(money * 2 - (money * 2 * (pd.Value + 0.11))) *2;
        })
    }

    useEffect(() => {

        // RE-WORK: Com base no tipo de pagamento, ajustar a DoublePercentageData (duodécimos ou 14m)
        // Duodécimos completos -> todos os meses recebemos o mesmo
        // FULL-REWORK DISTO PODE SER POSSÍVEL!
        
        async function setIncomeState(double:boolean) {
            let amount:number = (double) ? money *2 : money;
            getIncome(amount,props.tableID,props.tableType,props.dependents,props.cancelToken)
            .then(({data}) => data.forEach(d => getTaxPercentages(d.Bracket_ID,props.cancelToken)
                                                .then(({data}) => (double) 
                                                ? setDoublePercentageData(data) 
                                                : setPercentageData(data))
                    )
                )
        }

        setIncomeState(false);
        setIncomeState(true);
    },[props.income,props.dependents,props.isYearly,props.tableID,props.tableType]); 

    return (
        <>
            <h3> Valores Brutos </h3>
            <Table striped bordered hover responsive="sm">
                <caption>
                (*) Valor Referente a um mês de Subsídio de Férias/Natal, assumindo 1 ano ou mais de contrato.
                </caption>

                <ResultsHeader headers={["Bruto Mensal","Desconto",
                    "Segurança Social","Após Impostos"]} />
                    
                <tbody>
                    <ResultsBody percentageData={percentageData.filter((bt:BracketType) => bt.Dependents === props.dependents)} money={money}/>
                    <ResultsBody percentageData={doublePercentageData.filter((bt:BracketType) => bt.Dependents === props.dependents)} money={money*2}  />
                </tbody>
            </Table>

            {getYearlyTotals()}
            
            <Table striped bordered hover responsive="sm">
                <caption>
                Valor Totais Anuais (14 Meses de Salário).
                </caption>

                <ResultsHeader headers={["Bruto Anual","Desconto IRS",
                    "Segurança Social","Após Impostos"]} />

                <tbody>
                    <tr>
                        <th> {yearGross} </th>
                        <th> {yearIRS} </th>
                        <th> {yearSS} </th>
                        <th> {yearLiquid} </th>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Income