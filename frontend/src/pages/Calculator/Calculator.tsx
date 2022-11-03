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
    
    // Base Wages
    const [tableType,setTableType] = useState<number>(1);
    const [tableID,setTableID] = useState<number>(1);
    const [dependents,setDependents] = useState<number>(0);
    const [salary,setSalary] = useState<number>(0);
    const [openCalc,setOpenCalc] = useState<boolean>(false);
    // Aditional Pay
    const [salaryType,setSalaryType] = useState<string>("");
    const [foodAid,setFoodAid] = useState<boolean>(false);
    const [hasBonus,setHasBonus] = useState<boolean>(false);
    const [foodAidValue,setFoodAidValue] = useState<number>(0);
    const [bonusAmount,setBonusAmount] = useState<number>(0);
    // foodAid && tableID > 37 => (amountMoney <= 4.77 is taxFree otherwise add to IRS) 
    //                         => (amountCard <= 7.67 is Tax Free otherwise add to IRS)

    function handleIncome() : void {
        const income = document.getElementById("income-form") as HTMLInputElement;
        const monthly = document.getElementById("inline-checkbox-1") as HTMLInputElement;
        const yearly = document.getElementById("inline-checkbox-2") as HTMLInputElement;
        let gross:number = Number.parseFloat(income.value);
        setSalary(gross);
        setOpenCalc(!openCalc);
        if (monthly.checked) setSalaryType("monthly");
        if (yearly.checked) setSalaryType("yearly");
        if (foodAid || hasBonus) handleExtras();
    }

    function handleExtras() : void {
        const foodInput = document.getElementById("") as HTMLInputElement;
        const bonusInput = document.getElementById("") as HTMLInputElement;
        if (foodAid) {
            let foodValue:number = Number.parseFloat(foodInput.value);
            setFoodAidValue(foodValue);
        }
        if (hasBonus) {
            let bonusValue:number = Number.parseFloat(bonusInput.value);
            setBonusAmount(bonusValue);
        }

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
                        onClick={ () => setFoodAid(!foodAid)}/>    
                </Col>

                <Col lg={3}>
                    <Form.Control id="food-help" size="lg" type="text" placeholder="Subsídio de Alimentação" disabled={!foodAid} />
                </Col>

                <Col lg={2}>
                    <FloatingLabel label="Tipo de Pagamento">
                        <Form.Select aria-label="Tipo de Pagamento" disabled={!foodAid}>
                            <option> Numerário </option>
                            <option> Cartão de Refeição</option>
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

            <Button onClick={() => handleIncome()}>
                    {openCalc ? "Esconder Cálculos" : "Mostrar Cálculos"}
            </Button>

            { openCalc && (
                <Income tableID={tableID} tableType={tableType} cancelToken={cancelToken} income={salary} dependents={dependents} type={salaryType} foodValue={foodAidValue}/>
            )}
        </>
    )
}