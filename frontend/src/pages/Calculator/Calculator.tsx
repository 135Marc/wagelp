import { Form,FloatingLabel,Row,Col,Button, DropdownButton, Dropdown } from "react-bootstrap"
import { useState,useMemo } from "react"
import { useQuery } from "react-query"
import { getPromise,getYears } from "../../utils/requests"
import { TableType,YearsType } from "../../interfaces/interfaces"
import { translateRegion,monthShortToLong,dependents_arr } from "../../utils/utils"
import Income from "../Income/Income"
import axios, { CancelTokenSource } from "axios"

import { State } from "../../state/reducers"
import { useSelector } from "react-redux"
import { AditionalIncome } from "../../components/AditionalIncome/AditionalIncome"

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
    const [isYearly,setIsYearly] = useState<boolean>(false);
    const [paymentType,setPaymentType] = useState<string>("");

    const state = useSelector((state:State) => state.tableRed);

    function handleSalary() {
        setOpenCalc(!openCalc);
        let income = document.getElementById("income-form") as HTMLInputElement;
        setSalary(Number.parseFloat(income.value));
    }

    return (
        <>
            <h3> Contexto Fiscal e Remuneratório </h3>
            <h3> TABLE ID - REACT REDUX {state} </h3>
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
                            <option onClick={() => setPaymentType("14m")}> 14 Meses </option>
                            <option onClick={() => setPaymentType("duod-full")}> Duodécimos - Sem Subsídios </option>
                            <option onClick={() => setPaymentType("duod-50")}> Duodécimos - 50% Subsídio de Natal</option>
                            <option onClick={() => setPaymentType("duod-50")}> Duodécimos - 50% Subsídio de Férias</option>
                            <option onClick={() => setPaymentType("duod-5050")}> Duodécimos - 50% Ambos os Subsídios </option>
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
                        <Dropdown.Item onClick={() => setIsYearly(false)}> Mensal </Dropdown.Item>
                        <Dropdown.Item onClick={() => setIsYearly(true)}> Anual </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>

            <AditionalIncome />

            <Button onClick={handleSalary}>
                {openCalc ? "Esconder Cálculos" : "Mostrar Cálculos"}
            </Button>

            { openCalc && (
                <Income tableID={tableID} tableType={tableType} cancelToken={cancelToken} 
                    income={salary} dependents={dependents} isYearly={isYearly} />
            )}
        </>
    )
}