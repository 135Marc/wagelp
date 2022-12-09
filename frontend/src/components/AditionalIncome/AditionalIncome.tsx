import { Form,FloatingLabel,Row,Col} from "react-bootstrap"
import { months_number } from "../../utils/utils"
import { useState } from "react"

export function AditionalIncome() : JSX.Element {

    const [hasFoodAid,setHasFoodAid] = useState<boolean>(false);
    const [hasBonus,setHasBonus] = useState<boolean>(false);
    const [foodAidValue,setFoodAidValue] = useState<number>(0);
    const [foodAidType,setFoodAidType] = useState<string>("");
    const [bonusAmount,setBonusAmount] = useState<number>(0);

    return (
        <>
        <h3> Componentes Adicionais </h3>

            <Row>
                <Col lg={2} style={{marginLeft:"1rem"}}>
                    <Form.Check label="Subsídio de Alimentação" name="group1" type="checkbox" id="inline-checkbox-3"
                        onClick={ () => setHasFoodAid(!hasFoodAid) }/>    
                </Col>

                <Col lg={3}>
                    <Form.Control id="food-help" size="lg" type="text" placeholder="Subsídio de Alimentação" disabled={!hasFoodAid} />
                </Col>

                <Col lg={2}>
                    <FloatingLabel label="Tipo de Pagamento">
                        <Form.Select aria-label="Tipo de Pagamento" disabled={!hasFoodAid}>
                            <option onClick={() => setFoodAidType("numerario")}> Numerário </option>
                            <option onClick={() => setFoodAidType("cartao")}> Cartão de Refeição</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col lg={2} style={{marginLeft:"1rem",marginTop:"1rem"}}>
                    <Form.Check label="Bónus/Ajudas de Custo" name="group1" type="checkbox" id="inline-checkbox-3"
                        onClick={() => setHasBonus(!hasBonus)}/>        
                </Col>

                <Col lg={3} style={{marginTop:"1rem"}}>
                    <Form.Control id="liquid-adder" size="lg" type="text" placeholder="Valor (€)" disabled={!hasBonus}/>
                </Col>

                <Col lg={2} style={{marginTop:"1rem"}}>
                    <FloatingLabel label="Durante quantos meses?">
                        <Form.Select aria-label="How Many Months" disabled={!hasBonus}>
                            {months_number().map((n:number) =>
                                <option> {n} </option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
        </>
    )
}