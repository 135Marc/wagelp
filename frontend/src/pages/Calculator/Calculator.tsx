import { Form,FloatingLabel,Row,Col,Button, DropdownButton, Dropdown } from "react-bootstrap"
import { months_number } from "../../utils/utils"
import { useState,useMemo } from "react"
import { useQuery } from "react-query"
import { getPromise,getYears } from "../../utils/requests"
import { TableType,YearsType } from "../../interfaces/interfaces"
import { translateRegion,monthShortToLong,dependents_arr } from "../../utils/utils"
import Income from "../Income/Income"
import axios, { CancelTokenSource } from "axios"

export function Calculator() : JSX.Element {

    const cancelToken:CancelTokenSource = useMemo(() => axios.CancelToken.source(),[]);
    const response_years = useQuery(["years"],getYears,{staleTime:300}).data?.data;
    const response_regimes = useQuery(["regimes"],getPromise,{staleTime:300}).data?.data;
    
    // Tax Situation
    const [tableType,setTableType] = useState<number>(1);
    const [tableID,setTableID] = useState<number>(1);
    const [dependents,setDependents] = useState<number>(0);
    const [openCalc,setOpenCalc] = useState<boolean>(false);

    // Payment Specific
    const [salary,setSalary] = useState<number>(0);
    const [salaryType,setSalaryType] = useState<string>("");

    // Aditional Payment Components
    const [hasFoodAid,setHasFoodAid] = useState<boolean>(false);
    const [hasBonus,setHasBonus] = useState<boolean>(false);
    const [foodAidValue,setFoodAidValue] = useState<number>(0);
    const [foodAidType,setFoodAidType] = useState<string>("");
    const [bonusAmount,setBonusAmount] = useState<number>(0);

    function handleSalary() {
      //  let calc_help = calculateExtras(tableID,foodAidValue,foodAidType,salary);
        setOpenCalc(!openCalc);
        let income = document.getElementById("income-form") as HTMLInputElement;
        let aid = document.getElementById("food-help") as HTMLInputElement;
        let bonus = document.getElementById("liquid-adder") as HTMLInputElement;
        if (hasFoodAid) setFoodAidValue(Number.parseFloat(aid.value));
        if (hasBonus) setBonusAmount(Number.parseFloat(bonus.value));
        setSalary(Number.parseFloat(income.value));
    }

    return (
        <>
            <h3> Contexto Fiscal e Remuneratório </h3>
            <Row>
                <Col lg={3}>
                    <FloatingLabel label="Situação Fiscal">
                        <Form.Select aria-label="Select Table Type">       
                            {response_regimes?.map((t:TableType) => 
                                <option key={t.Number} value={t.Number} onClick={() => setTableType(t.Number)}> {t.Description} </option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col lg={3}>
                    <FloatingLabel label="Região, Ano e Período Temporal">
                        <Form.Select aria-label="Select Table Type">
                            {response_years?.map((y:YearsType) =>
                                <option key={y.ID} onClick={() => setTableID(y.ID) }> 
                                    [{translateRegion(y.Region)}] {y.Year}  De {monthShortToLong(y.From)} A {monthShortToLong(y.To)} 
                                </option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row style={{marginTop:"1rem"}}>
                <Col lg={3}>
                    <FloatingLabel label="Número de Dependentes">
                        <Form.Select aria-label="Select Table Type">
                            {dependents_arr().map((n:number) =>
                                <option onClick={() => setDependents(n)}> {n} </option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>

            {/* TO-DO: Add React-Redux to eliminate some of the previous complexity*/}
            
                <Col lg={3}>
                    <FloatingLabel label="Modalidade de Pagamento">
                        <Form.Select aria-label="Select Table Type">
                            <option> 14 Meses </option>
                            <option> Duodécimos - Sem Subsídios </option>
                            <option> Duodécimos - 50% Subsídio de Natal</option>
                            <option> Duodécimos - 50% Subsídio de Férias</option>
                            <option> Duodécimos - 50% Ambos os Subsídios </option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col lg={3} style={{marginTop:"1rem"}}>
                    <Form.Control id="income-form" size="lg" type="text" placeholder="Rendimento Bruto (€)" />
                </Col>

                <Col lg={2}>
                    <DropdownButton title="Cálculo" >
                        <Dropdown.Item onClick={() => setSalaryType("monthly")}> Mensal </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSalaryType("yearly")}> Anual </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>

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

            <Button onClick={handleSalary}>
                {openCalc ? "Esconder Cálculos" : "Mostrar Cálculos"}
            </Button>

            { openCalc && (
                <Income tableID={tableID} tableType={tableType} cancelToken={cancelToken} 
                    income={salary} dependents={dependents} type={salaryType} 
                    foodValue={foodAidValue} foodType={foodAidType}/>
            )}
        </>
    )
}