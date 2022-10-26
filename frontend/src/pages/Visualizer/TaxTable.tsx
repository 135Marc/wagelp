import {Table} from "react-bootstrap"
import axios, { CancelTokenSource } from "axios"
import {useState,useEffect} from "react"
import {TTProps,TaxTableData,TaxTableType,BracketData,BracketType} from "../../interfaces/interfaces"

function TaxTable(props:TTProps) : JSX.Element {

    const [taxData,setTaxData] = useState<TaxTableType[]>([]);
    const [percentageData,setPercentageData] = useState<BracketType[]>([]);

    useEffect(() => {

        async function getTable() {
            axios.post<TaxTableData>('http://localhost:8080/table/' + props.tableID + '/' + props.tableType,
                {cancelToken:props.cancelToken.token})
                .then(({data}) => { 
                    
                    setTaxData(data.data);

                    data.data.forEach((tt) => {
                        
                        getTaxPercentages(tt.Bracket_ID)
                        
                    });

                })
                .catch((e:Error) => {  
                    if (axios.isCancel(e)) return;
                })
        }

        async function getTaxPercentages(bid:number){
            axios.post<BracketData>('http://localhost:8080/percentages/' + bid,
            {cancelToken:props.cancelToken.token})
            .then(({data}) => { 
                setPercentageData(percentageData => percentageData.concat(data.data));
            })
            .catch((e:Error) => {
                if (axios.isCancel(e)) return;
            })
        }

        getTable();

        return () => props.cancelToken.cancel();

    },[props.tableID,props.tableType])

    return (
        
        <Table striped bordered hover responsive="sm">
            
                
                <thead>
                    <tr>
                        <th>Minimo</th>
                        <th>Maximo</th>
                            <th> 0 </th>
                            <th> 1 </th>
                            <th> 2</th> 
                            <th> 3</th>
                            <th> 4 </th>
                            <th> 5+ </th>
    
                    </tr>
                </thead>

             
            <tbody>
                
                {taxData.map((ttt:TaxTableType) =>
                   <tr>
                    <td>{ttt.Minimum.toFixed(2)}</td>
                    <td>{ttt.Maximum.toFixed(2)}</td>
                    {percentageData.filter((bt) => bt.Bracket_ID == ttt.Bracket_ID).map((percentage) => 
                    
                        <td> {(percentage.Value * 100).toFixed(2)} (%) </td>
                    )}

                    </tr>
                )}
                
                
            </tbody>
        </Table>

    )

}

export default TaxTable
