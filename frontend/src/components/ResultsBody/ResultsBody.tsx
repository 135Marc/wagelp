import { BracketType, ResultsBodyProps } from "../../interfaces/interfaces"

function ResultsBody({percentageData,money,aid}:ResultsBodyProps) : JSX.Element {

    return(
        <>
            {percentageData?.map((pd:BracketType) => 
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