import { Col,FloatingLabel,Form } from "react-bootstrap"
import { YearsType } from "../../interfaces/interfaces"
import { translateRegion,monthShortToLong } from "../../utils/utils"
import { changeID } from "../../state/reducers/TableReducer"
import { useDispatch } from "react-redux"
import { useQuery } from "react-query"
import { getYears } from "../../utils/requests"

export function TaxContext() : JSX.Element {
    const dispatch = useDispatch();
    const response_years = useQuery(["years"],getYears,{staleTime:300}).data?.data;
    
    return (
        <>
            <Col lg={3}>
                <FloatingLabel label="Região, Ano e Período Temporal">
                    <Form.Select aria-label="Select Table Type">
                        {response_years?.map((y:YearsType) =>
                            <option key={y.ID} onClick={() => dispatch(changeID(y.ID)) }>
                                [{translateRegion(y.Region)}] {y.Year}  De {monthShortToLong(y.From)} A {monthShortToLong(y.To)} 
                            </option>
                        )}
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </>
    )
}