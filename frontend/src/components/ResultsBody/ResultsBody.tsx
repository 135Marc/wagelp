import { BracketType } from "../../interfaces/interfaces"

interface Props {
    percentageData : BracketType[],
    money:number,
    dependents:number
}

function ResultsBody({percentageData,money,dependents}:Props) : JSX.Element {
    return(
        <>
            {percentageData.filter((bracket) => bracket.Dependents === dependents).map((pd) => 
                <tr key={pd.ID}>
                    <th> {money} </th>
                    <th>{money * pd.Value} </th>
                    <th> {money * 0.11} </th>
                    <th> {money - (money * (pd.Value + 0.11))}</th>
                </tr>
            )}
        </>
    )
}

export default ResultsBody