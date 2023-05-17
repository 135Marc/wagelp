import { Col,FloatingLabel,Form } from "react-bootstrap"
import { TableType } from "../../interfaces/interfaces"
import { useDispatch } from "react-redux"
import { changeType } from "../../state/reducers/TableReducer"
import { useQuery } from "react-query"
import { getPromise } from "../../utils/requests"

export function TaxSituation() : JSX.Element {
    const dispatch = useDispatch();
    const response_regimes = useQuery(["regimes"],getPromise,{staleTime:300}).data?.data;

    return (
        <>
            <Col lg={3}>
                <FloatingLabel label="Situação Fiscal">
                    <Form.Select aria-label="Select Table Type">       
                        {response_regimes?.map((t:TableType) => 
                            <option key={t.Number} value={t.Number} onClick={() => dispatch(changeType(t.Number)) }> {t.Description} </option>
                        )}
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </>
    )
}