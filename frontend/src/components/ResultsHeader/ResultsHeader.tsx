import { ResultsHeaderProps } from "../../interfaces/interfaces"

function ResultsHeader({headers}:ResultsHeaderProps) : JSX.Element {
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