import { Form,FloatingLabel,Row,Col} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { changePaymentType } from "../../state/reducers/PaymentReducer";

export function SelectPaymentType() : JSX.Element {
    const dispatch = useDispatch();
    return (
        <>
            <Row style={{marginTop:"1rem"}}>
                <Col lg={6}>
                    <FloatingLabel label="Modalidade de Pagamento">
                        <Form.Select aria-label="Select Table Type">
                            <option onClick={() => dispatch(changePaymentType("14m"))}> 14 Meses </option>
                            <option onClick={() => dispatch(changePaymentType("duod-full"))}> Duodécimos - Sem Subsídios </option>
                            <option onClick={() => dispatch(changePaymentType("duod-50"))}> Duodécimos - 50% Subsídio de Natal</option>
                            <option onClick={() => dispatch(changePaymentType("duod-50"))}> Duodécimos - 50% Subsídio de Férias</option>
                            <option onClick={() => dispatch(changePaymentType("duod-5050"))}> Duodécimos - 50% Ambos os Subsídios </option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
        </>
    )
}