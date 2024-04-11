import { BarraFerramentas ,FerramentasDetalhe} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layout/LayoutBase";

export const Dashboard = () => {
    return (
        <LayoutBasePage titulo='Tarefas' barraDeFerramenta = { (
            <FerramentasDetalhe/>
        ) }>
            testando
        </LayoutBasePage>
    );
}