import { useState,useMemo } from "react"
import axios, { CancelTokenSource } from "axios"
import { useDispatch } from "react-redux"
import { changeIncome } from "../../state/reducers/PaymentReducer"
import { Form,Row,Col,Button} from "react-bootstrap"
import Income from "../Income/Income"
import { SelectPaymentType} from "../SelectPaymentType/SelectPaymentType"
import { TaxSituation } from "../TaxSituation/TaxSituation"
import { TaxContext } from "../TaxContext/TaxContext"
import { AditionalIncome } from "../AditionalIncome/AditionalIncome"
import { Dependents } from "../Dependents/Dependents"
import "./Calculator.css"

export function Calculator() : JSX.Element {

    const cancelToken:CancelTokenSource = useMemo(() => axios.CancelToken.source(),[]);
    
    const [openCalc,setOpenCalc] = useState<boolean>(false);
    const [isYearly,setIsYearly] = useState<boolean>(false);

    const dispatch = useDispatch();

    function handleSalary() {
        setOpenCalc(!openCalc);
        let income = document.getElementById("income-form") as HTMLInputElement;
        dispatch(changeIncome(Number.parseFloat(income.value)));
    }

    return (
        <>
            <Row>
                <TaxSituation />
                <TaxContext />
            </Row>

            <Row style={{marginTop:"1rem"}}>
                <Dependents />
            
                <Col lg={3}>
                    <Form.Control id="income-form" size="lg" type="text" placeholder="Rendimento Bruto (€)" />
                </Col>

                <Col lg={3}>
                    <Form.Check type="checkbox" inline id="first-check" label="Mensal" checked={!isYearly} onChange={() => setIsYearly(false)}/>
                    <Form.Check type="checkbox" inline id="second-check" label="Anual" checked={isYearly} onChange={() => setIsYearly(true)}/>
                </Col>
            </Row>

            {isYearly && <SelectPaymentType /> }

            <AditionalIncome isYearly={isYearly} />

            <Button className="calculate-btn" onClick={handleSalary} size="lg">
                {openCalc ? "Esconder Cálculo" : "Calcular Salário"}
            </Button>

            { openCalc && ( <Income cancelToken={cancelToken} isYearly={isYearly} /> )}
        </>
    )
}
