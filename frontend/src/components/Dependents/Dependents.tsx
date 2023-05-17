import { Col,FloatingLabel,Form } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { dependents_arr } from "../../utils/utils";
import { changeDependents } from "../../state/reducers/TableReducer";

export function Dependents() : JSX.Element {
    const dispatch = useDispatch();
    return (
        <>
            <Col lg={3}>
                <FloatingLabel label="Número de Dependentes">
                    <Form.Select aria-label="Select Table Type">
                        {dependents_arr().map((n:number) =>
                            <option key ={n} onClick={() => dispatch(changeDependents(n))}> {n} </option>
                        )}
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </>
    )
}