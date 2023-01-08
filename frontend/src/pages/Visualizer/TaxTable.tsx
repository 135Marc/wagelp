import {Table} from "react-bootstrap"
import axios from "axios"
import {useState,useEffect} from "react"
import {TaxTableProps,TaxTableType,BracketType} from "../../interfaces/interfaces"
import {dependents_arr} from "../../utils/utils"
import { getTable,getTaxPercentages } from "../../utils/requests"
import { useQuery } from "react-query"

function TaxTable(props:TaxTableProps) : JSX.Element {

    const [taxData,setTaxData] = useState<TaxTableType[]>([]);
    const [percentageData,setPercentageData] = useState<BracketType[]>([]);

    useEffect(() => {

        getTable(props.tableID,props.tableType,props.cancelToken).then((data) => { 
                    
            setTaxData(data.data);

            data.data.forEach((tt) => {
                
                getTaxPercentages(tt.Bracket_ID,props.cancelToken)
                .then((data) => setPercentageData(percentageData => percentageData.concat(data.data)))
                .catch((e:Error) => {
                    if (axios.isCancel(e)) return;
                })
                
            });

        })
        .catch((e:Error) => {  
            if (axios.isCancel(e)) return;
        })

        return () => props.cancelToken.cancel();

    },[props.tableID,props.tableType,props.cancelToken])

    return (
        
        <Table striped bordered hover responsive="sm">          
            <thead>
                <tr>
                    <th>Minimo</th>
                    <th>Maximo</th>
                    {dependents_arr().map((n:number) =>
                        <th> {n} </th>
                    )}
                </tr>
            </thead>
             
            <tbody>
                
                {taxData.map((ttt:TaxTableType) =>
                   <tr>
                    <td>{ttt.Minimum.toFixed(2)}</td>
                    <td>{ttt.Maximum.toFixed(2)}</td>
                    
                    {percentageData.filter((bt) => bt.Bracket_ID === ttt.Bracket_ID).map((percentage) => 
                        <td> {(percentage.Value * 100).toFixed(2)} (%) </td>
                    )}

                    </tr>
                )}
                       
            </tbody>
        </Table>
    )
}

export default TaxTable