import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Páginas administrativas
import TiposPage from "./pages/TiposPage";
import SubtiposPage from "./pages/SubtiposPage";
import BarreirasPage from "./pages/BarreirasPage";
import AcessibilidadesPage from "./pages/AcessibilidadesPage";

// Páginas da empresa
import EmpresaPage from "./pages/empresa/EmpresaPage";
import VagaPage from "./pages/empresa/VagaPage";
import VagaDetalhePage from "./pages/empresa/VagaDetalhePage";

// Páginas do candidato
import CandidatoPage from "./pages/candidato/CandidatoPage";
import CandidatoVagasPage from "./pages/candidato/CandidatoVagasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Rotas de autenticação */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro" element={<Navigate to="/register" replace />} />

        {/* Páginas institucionais (placeholder por enquanto) */}
        <Route path="/sobre" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Sobre Nós</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/como-funciona" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Como Funciona</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/para-candidatos" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Para Candidatos</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/para-empresas" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Para Empresas</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/contato" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Contato</h1><p className="text-gray-600">Página em construção</p></div></div>} />

        {/* Área admin com layout e rotas filhas */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="tipos" element={<TiposPage />} />
          <Route path="subtipos" element={<SubtiposPage />} />
          <Route path="barreiras" element={<BarreirasPage />} />
          <Route path="acessibilidades" element={<AcessibilidadesPage />} />
        </Route>

        {/* Área da empresa com layout e rotas filhas */}
        <Route path="/empresa/:id" element={<EmpresaPage />}>
          <Route path="vagas" element={<VagaPage />} />
          <Route path="vagas/:vagaId" element={<VagaDetalhePage />} />
        </Route>

        {/* Área do candidato */}
        <Route path="/candidato/:id" element={<CandidatoPage />} />
        <Route path="/candidato/:id/vagas" element={<CandidatoVagasPage />} />

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Página não encontrada</p>
              <a href="/" className="btn btn-primary">Voltar para Home</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
