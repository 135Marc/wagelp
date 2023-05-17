import ResultsHeader from "../ResultsHeader/ResultsHeader"
import { Table } from "react-bootstrap"
import { calculateYearSS,calculateYearGross,calculateYearlyIRS,calculateYearlyLiquid } from "../../utils/utils";
import { YearlyIncomeProps } from "../../interfaces/interfaces";

export function YearlyIncome(props:YearlyIncomeProps) : JSX.Element {

    const {money,payment,percentage,percentageOneHalf,percentageDouble} = props;
    
    let yearPay = calculateYearGross(money,payment);
    let yearSS = calculateYearSS(money,payment);
    let yearIRS = calculateYearlyIRS(money,payment,percentage,percentageDouble,percentageOneHalf);
    let yearLiquid = calculateYearlyLiquid(money,payment,percentage,percentageDouble,percentageOneHalf);

    return (
        <>
            <Table striped bordered hover responsive="sm">
                <caption> Valor Totais Anuais (14 Meses de Salário). </caption>

                <ResultsHeader headers={["Bruto Anual","Desconto IRS","Segurança Social","Após Impostos"]} />

                <tbody>
                    <tr>
                        <th> {yearPay} </th>
                        <th> {yearIRS} </th>
                        <th> {yearSS} </th>
                        <th> {yearLiquid} </th>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
