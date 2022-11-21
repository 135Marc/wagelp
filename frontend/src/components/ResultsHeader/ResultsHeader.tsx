
interface Props {
    headers: string[]
}

function ResultsHeader({headers}:Props) : JSX.Element {
    return (
        <>
        <thead className="thead-dark">
            <tr>
                {headers.map( (h) => <th> {h} </th> )}
            </tr>
        </thead>
        </>
    )
}

export default ResultsHeader