import {Table} from "react-bootstrap"
import axios from "axios"
import {useState,useEffect} from "react"
import { IncomeProps,TaxTableData,TaxTableType,BracketData,BracketType } from "../../interfaces/interfaces"
 
export function Income(props:IncomeProps):JSX.Element {

    const [doublePercentageData,setDoublePercentageData] = useState<BracketType[]>([]);
    const [percentageData,setPercentageData] = useState<BracketType[]>([]);
    const [money,setMoney] = useState(props.type==="monthly" ? props.income : props.income / 14);

    let yearGross:number = 0;
    let yearIRS:number = 0;
    let yearSS:number=0;
    let yearLiquid:number=0;

    function getYearlyTotals() {
        percentageData.filter((bracket) => bracket.Dependents == props.dependents).map((pd) => {
            yearGross+=money*10;
            yearIRS+= (money*pd.Value*10);   
            yearSS+= (money*0.11)*10;
            yearLiquid+=(money - (money * (pd.Value + 0.11)))*10;
        })

        doublePercentageData.filter((bracket) => bracket.Dependents == props.dependents).map((pd) => {
            yearGross+=money * 4;
            yearIRS+= (money * 2 * pd.Value) * 2;   
            yearSS+= (money * 2 * 0.11)*2;
            yearLiquid+=(money * 2 - (money * 2 * (pd.Value + 0.11))) *2;
        })
    }

    useEffect(() => {

        async function getTaxPercentages(bid:number,normal:boolean){
            axios.post<BracketData>('http://localhost:8080/percentages/' + bid,
            {cancelToken:props.cancelToken.token})
            .then(({data}) => { 

                normal ? setPercentageData(percentageData => percentageData.concat(data.data)) 
                : setDoublePercentageData(doublePercentageData => doublePercentageData.concat(data.data));
                 
            })
            .catch((e:Error) => {
                if (axios.isCancel(e)) return;
            })
        }

        async function getIncome(value:number,normal:boolean) {
            axios.post<TaxTableData>('http://localhost:8080/income/' + money + '/' + props.tableID + '/' + props.tableType + '/' + props.dependents,
            {cancelToken:props.cancelToken.token})
            .then(({data}) => {
                let tables:TaxTableType[] = data.data;
                tables.forEach((tt) => getTaxPercentages(tt.Bracket_ID,normal));    
            })
            .catch((e:Error) => {
                if (axios.isCancel(e)) return;
            })
        }

        getIncome(money,true);
        getIncome(money *2,false);


    },[]) 



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

                    {percentageData.filter((bracket) => bracket.Dependents == props.dependents).map((pd) => 
                        <tr key={pd.ID}>
                            <th> {money} </th>
                            <th>{money * pd.Value} </th>
                            <th> {money * 0.11} </th>
                            <th> {money - (money * (pd.Value + 0.11))}</th>
                        </tr>

                    )}

                    {doublePercentageData.filter((bracket) => bracket.Dependents == props.dependents).map((pd) => 
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