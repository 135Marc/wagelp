
interface Props {
    headers: string[]
}

function ResultsHeader({headers}:Props) : JSX.Element {
    return (
        <>
            <tr>
                {headers.map( (h) => <th> {h} </th> )}
            </tr>
        </>
    )
}

export default ResultsHeader