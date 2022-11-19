import {Table} from "react-bootstrap"
import {useState,useEffect} from "react"
import { IncomeProps,BracketType } from "../../interfaces/interfaces"
import { getIncome, getTaxPercentages} from "../../utils/requests"

export function Income(props:IncomeProps):JSX.Element {

    function setMoney(): number {
        let payment = (props.type === "monthly") ? props.income : (props.income / 14);
        return payment;
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
        <Table striped bordered hover responsive="sm">
            <caption>
             (*) Valor Referente a um mês de Subsídio de Férias/Natal, assumindo 1 ano ou mais de contrato.
            </caption>
            <thead className="thead-dark">
                <tr>
                    <th> Valor Bruto Mensal </th>
                    <th> Desconto IRS</th>
                    <th> Segurança Social </th>
                    <th> Total Mensal </th>
                </tr>
            </thead>

            <tbody>

                    {percentageData.filter((bracket) => bracket.Dependents === props.dependents).map((pd) => 
                        <tr key={pd.ID}>
                            <th> {money} </th>
                            <th>{money * pd.Value} </th>
                            <th> {money * 0.11} </th>
                            <th> {money - (money * (pd.Value + 0.11))}</th>
                        </tr>

                    )}

                    {doublePercentageData.filter((bracket) => bracket.Dependents === props.dependents).map((pd) => 
                        <tr key={pd.ID}>
                            <th> {money * 2}(*)</th>
                            <th> {money * 2 * pd.Value}(*) </th>
                            <th> {money * 2 * 0.11}(*) </th>
                            <th> {money * 2 - (money * 2 * (pd.Value + 0.11))}(*)</th>
                        </tr>
                    )}
            
            </tbody>
           
        </Table>

        {getYearlyTotals()}
        
        <Table striped bordered hover responsive="sm">
            <caption>
             Valor Totais Anuais (14 Meses de Salário).
            </caption>
            <thead className="thead-dark">
                <tr>
                    <th> Total Bruto</th>
                    <th> Desconto IRS</th>
                    <th> Segurança Social </th>
                    <th> Total Líquido </th>
                </tr>
            </thead>

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