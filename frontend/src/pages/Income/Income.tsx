import { Table } from "react-bootstrap"
import {useState,useEffect} from "react"
import { IncomeProps,BracketType } from "../../interfaces/interfaces"
import { getIncome, getTaxPercentages } from "../../utils/requests"
import ResultsBody from "../../components/ResultsBody/ResultsBody";
import ResultsHeader from "../../components/ResultsHeader/ResultsHeader";

function Income(props:IncomeProps):JSX.Element {

    function setMoney(): number {
        let payment:number = 0;
        switch(String(props.payment)) {
            case "14m" :
                payment = props.income / 14;
                break;
            case "duod-full":
                payment = props.income / 12;
                break;
            case "duod-50":
                payment = props.income / 13.5;
                break;
            case "duod-5050":
                payment = props.income / 13;
                break;
            default: 
                break;
        }       
        return (props.isYearly) ? payment : props.income;
    }
    
    // CONSTANTS OR VARIABLES
    const money = setMoney();
    let yearGross:number, yearIRS:number, yearSS:number, yearLiquid:number;
    yearGross=yearIRS=yearSS=yearLiquid=0;

    // REACT STATE VARIABLES
    const [doublePercentageData,setDoublePercentageData] = useState<BracketType[]>([]);
    const [percentageData,setPercentageData] = useState<BracketType[]>([]);    

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

        async function setIncomeState(double:boolean) {
            let amount:number = (double) ? money *2 : money;
            getIncome(amount,props.tableID,props.tableType,props.dependents,props.cancelToken)
            .then((data) => data.data.forEach(d => 
                    getTaxPercentages(d.Bracket_ID,props.cancelToken)
                    .then((data) => (double) ? setDoublePercentageData(data.data) 
                                             : setPercentageData(data.data))
                    )
                )
        }

        setIncomeState(false);
        setIncomeState(true);
    }) 

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
                    <ResultsBody percentageData={percentageData} money={money} dependents={props.dependents} />
                    <ResultsBody percentageData={doublePercentageData} money={money*2} dependents={props.dependents} />
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