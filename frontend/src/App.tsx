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
import VagaCandidatosPage from "./pages/empresa/VagaCandidatosPage";
import EmpresaPerfilPage from "./pages/empresa/EmpresaPerfilPage";

// Páginas do candidato
import CandidatoPage from "./pages/candidato/CandidatoPage";
import CandidatoPerfilPage from "./pages/candidato/CandidatoPerfilPage";
import CandidatoDeficienciaPage from "./pages/candidato/CandidatoDeficienciasPage";
import CandidatoVagasPage from "./pages/candidato/CandidatoVagasPage";
import CandidatoVagaDetalhePage from "./pages/candidato/CandidatoVagaDetalhePage"; // 1. Importe a nova página
import CandidatoSucessoPage from "./pages/candidato/CandidatoSucessoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... (suas rotas principais) ... */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro" element={<Navigate to="/register" replace />} />
        <Route path="/sobre" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Sobre Nós</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/como-funciona" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Como Funciona</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/para-candidatos" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Para Candidatos</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/para-empresas" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Para Empresas</h1><p className="text-gray-600">Página em construção</p></div></div>} />
        <Route path="/contato" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Contato</h1><p className="text-gray-600">Página em construção</p></div></div>} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="tipos" element={<TiposPage />} />
          <Route path="subtipos" element={<SubtiposPage />} />
          <Route path="barreiras" element={<BarreirasPage />} />
          <Route path="acessibilidades" element={<AcessibilidadesPage />} />
        </Route>

        <Route path="/empresa/:id" element={<EmpresaPage />}>
          <Route index element={<EmpresaPerfilPage />} />
          <Route path="perfil" element={<EmpresaPerfilPage />} />
          <Route path="vagas" element={<VagaPage />} />
          <Route path="vagas/:vagaId" element={<VagaDetalhePage />} />
          <Route path="vagas/:vagaId/candidatos" element={<VagaCandidatosPage />} />
        </Route>

        {/* Rotas do Candidato (Atualizadas) */}
        <Route path="/candidato/:id" element={<CandidatoPage />}>
          <Route index element={<CandidatoPerfilPage />} />
          <Route path="perfil" element={<CandidatoPerfilPage />} />
          <Route path="deficiencia" element={<CandidatoDeficienciaPage />} />
          <Route path="vagas" element={<CandidatoVagasPage />} />
          <Route path="vagas/:vagaId" element={<CandidatoVagaDetalhePage />} />
          <Route path="vagas/:vagaId/sucesso" element={<CandidatoSucessoPage />} />
        </Route>

        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Página não encontrada</p>
              <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">Voltar para Home</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}