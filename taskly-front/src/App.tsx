import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProjetoLayout from "./components/ProjetoLayout";
import Home from "./view/Home";
import Quadro from "./view/Quadro";
import Categorias from "./view/Categorias";
import StatusView from "./view/Status";
import TarefaDetalhe from "./view/TarefaDetalhe";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:projetoId" element={<ProjetoLayout />}>
          <Route index element={<Quadro />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="status" element={<StatusView />} />
          <Route path="tarefa/:id" element={<TarefaDetalhe />} />
        </Route>
      </Route>
    </Routes>
  );
}