import { Form,FloatingLabel, Button,Row,Col } from "react-bootstrap"
import Flex from "@react-css/flex"
import axios, { CancelTokenSource } from "axios"
import {useState,useMemo} from "react"
import TaxTable from "../Visualizer/TaxTable"
import { TableType,YearsType } from "../../interfaces/interfaces"
import { translateRegion,monthShortToLong} from "../../utils/utils"
import { getPromise,getYears } from "../../utils/requests"
import "./Home.css"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state"
import { State } from "../../state/reducers"
import { useSelector } from "react-redux"


export function Home() : JSX.Element {

    const response_years = useQuery(["years"],getYears).data?.data;
    const response_regimes = useQuery(["regimes"],getPromise).data?.data;

    const [tableType,setTableType] = useState(1);
    const [tableID,setTableID] = useState(1);

    const [openTable,setOpenTable] = useState<boolean>(false);

    const cancelToken:CancelTokenSource = useMemo(() => axios.CancelToken.source(),[]);

    const dispatch = useDispatch();

    const {addID,changeID,addType,changeType} = bindActionCreators(actionCreators,dispatch);

    const state = useSelector((state:State) => state.tableRed);

    return (
        <>
            <h2> Bem-vindo!  </h2>
            <h4> Por favor, indique-nos os seguintes dados: </h4>
            <h3> REDUX STATE {state} </h3>
            <Row>
                <Col lg={2}>
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
                                <option key={y.ID} onClick={() => {
                                    setTableID(y.ID);
                                    addID(y.ID); 
                                }}> 
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
                
                { openTable && 
                    (<TaxTable tableID={tableID} tableType={tableType} cancelToken={cancelToken}/>)
                } 

            </Flex>
        </>
    )
}