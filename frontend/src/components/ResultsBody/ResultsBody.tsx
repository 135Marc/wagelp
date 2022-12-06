import { ResultsBodyProps } from "../../interfaces/interfaces"

function ResultsBody({percentageData,money,dependents,aid}:ResultsBodyProps) : JSX.Element {

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