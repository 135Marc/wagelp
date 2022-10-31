import { Form,FloatingLabel, Button,Row,Col } from "react-bootstrap"
import Flex from "@react-css/flex"
import axios, { CancelTokenSource } from "axios"
import {useState,useMemo} from "react"
import TaxTable from "../Visualizer/TaxTable"
import Income from "../Income/Income"
import { TableType,YearsType } from "../../interfaces/interfaces"
import { translateRegion,monthShortToLong,dependents_arr} from "../../utils/utils"
import { getPromise,getYears } from "../../utils/requests"
import "./Home.css"
import { useQuery } from "react-query"

export function Home() : JSX.Element {

    const response_years = useQuery(["years"],getYears).data?.data;
    const response_regimes = useQuery(["regimes"],getPromise).data?.data;

    const [tableType,setTableType] = useState(1);
    const [tableID,setTableID] = useState(1);
    const [dependents,setDependents] = useState(0);
    const [salary,setSalary] = useState(0);
    const [salaryType,setSalaryType] = useState<string>("");

    const [openTable,setOpenTable] = useState<boolean>(false);
    const [openCalc,setOpenCalc] = useState<boolean>(false);

    const cancelToken:CancelTokenSource = useMemo(() => axios.CancelToken.source(),[]);

    function handleIncome () {
        const aa = document.getElementById("income-form") as HTMLInputElement;
        const monthly = document.getElementById("inline-checkbox-1") as HTMLInputElement;
        const yearly = document.getElementById("inline-checkbox-2") as HTMLInputElement;
        let gross:number = Number.parseFloat(aa.value);
        setSalary(gross);
        setOpenCalc(!openCalc);
        if (monthly.checked) setSalaryType("monthly");
        if (yearly.checked) setSalaryType("yearly");
    }

    return (
        <>
        <h2> Bem-vindo!  </h2>
        <h4> Por favor, indique-nos os seguintes dados: </h4>

            <Row>
                <Col lg={4}>
                    <FloatingLabel label="Situação Fiscal">
                        <Form.Select aria-label="Select Table Type">       
                            {response_regimes?.map((t:TableType) => 
                                <option key={t.Number} value={t.Number} onClick={() => setTableType(t.Number)}> {t.Description} </option>
                            )}
                        </Form.Select>
                    </FloatingLabel>
                </Col>

                <Col lg={4}>
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

            <Flex flexDirection="column">

                <Button onClick={() => setOpenTable(!openTable)} style={{marginTop:"1rem"}}>
                        {openTable ? "Esconder Tabela" : "Mostrar Tabela"}
                    </Button>
                
                { openTable && (
                    <TaxTable tableID={tableID} tableType={tableType} cancelToken={cancelToken}/>)
                } 

                <h3> Cálculos de Remuneração Base </h3>

                <Row>
                    <Col lg={2}>
                        <FloatingLabel label="Número de Dependentes">
                            <Form.Select aria-label="Select Table Type">
                                {dependents_arr().map((n:number) =>
                                    <option onClick={() => setDependents(n)}> {n} </option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col lg={1} style={{marginLeft:"1rem"}}>
                        <div key={`inline-checkbox`} className="mb-3">
                            <Form.Check label="Salário Mensal" name="group1" type="checkbox" id="inline-checkbox-1"/>
                            <Form.Check label="Salário Anual" name="group1" type="checkbox" id="inline-checkbox-2"/>
                        </div>
                    </Col>
                    
                    <Col lg={4}>
                        <Form.Control id="income-form" size="lg" type="text" placeholder="Rendimento Bruto (€)" />
                    </Col>
                </Row>

                <Button onClick={() => handleIncome()}>
                    {openCalc ? "Esconder Cálculo" : "Calcular Salário"}
                </Button>

                { openCalc && (
                    <Income tableID={tableID} tableType={tableType} cancelToken={cancelToken} income={salary} dependents={dependents} type={salaryType}/>
                )}
               
               </Flex>
          
        </>
    )
}