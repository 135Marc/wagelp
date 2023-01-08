import { BracketType, ResultsBodyProps } from "../../interfaces/interfaces"

function ResultsBody({percentageData,money,separator,aid}:ResultsBodyProps) : JSX.Element {

    return(
        <>
            {percentageData?.map((pd:BracketType) => 
                <tr key={pd.ID}>
                    <th> {money}{separator} </th>
                    <th>{money * pd.Value}{separator} </th>
                    <th> {money * 0.11}{separator} </th>
                    <th> {money - (money * (pd.Value + 0.11))}{separator}</th>
                </tr>
            )}
        </>
    )
}

export default ResultsBody