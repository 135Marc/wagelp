import "./Home.css"
import { Calculator } from "../../components/Calculator/Calculator"

export function Home() : JSX.Element {

    return (
        <>
            <h3> Seja bem-vindo ao Wagelp!  </h3>
            <p> 
                Este simulador permite-lhe calcular o seu salário líquido de forma fácil e precisa.
                Diga adeus aos cálculos manuais e às procuras repetidas nos ficheiros Excel do Portal das Finanças! 
            </p>

            <p>
                Seja para explorar oportunidades de emprego, negociar um aumento salarial ou obter clareza financeira,
                a simulação do vencimento líquido é uma boa ferramenta de análise para tomar decisões informadas com confiança.
            </p>

            <p> 
                Experimente o Wagelp agora e veja o quão simples é simular o seu salário líquido! 
            </p>
            
            <h4> Dados de Contexto Fiscal e Vencimento Bruto: </h4>

            <Calculator />
        </>
    )
}