import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AcessibilidadeProvider } from "./context/AcessibilidadeContext";
import PrivateRoute from "./components/PrivateRoute";
import AcessibilidadeWidget from "./components/AcessibilidadeWidget";

// --- PÁGINAS PÚBLICAS ---
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";


// --- PÁGINAS ADMIN (Apenas as originais) ---
import AdminPage from "./pages/AdminPage";
import TiposPage from "./pages/TiposPage";
import SubtiposPage from "./pages/SubtiposPage";
import BarreirasPage from "./pages/BarreirasPage";
import AcessibilidadesPage from "./pages/AcessibilidadesPage";

// --- PÁGINAS EMPRESA ---
import EmpresaPage from "./pages/empresa/EmpresaPage";
import EmpresaPerfilPage from "./pages/empresa/EmpresaPerfilPage";
import VagasPage from "./pages/empresa/VagaPage";
import VagaDetalhePage from "./pages/empresa/VagaDetalhePage";
import VagaCandidatosPage from "./pages/empresa/VagaCandidatosPage";

// --- PÁGINAS CANDIDATO ---
import CandidatoPage from "./pages/candidato/CandidatoPage";
import CandidatoPerfilPage from "./pages/candidato/CandidatoPerfilPage";
import CandidatoDeficienciasPage from "./pages/candidato/CandidatoDeficienciasPage";
import CandidatoVagasPage from "./pages/candidato/CandidatoVagasPage";
import CandidatoVagaDetalhePage from "./pages/candidato/CandidatoVagaDetalhePage";
import CandidatoSucessoPage from "./pages/candidato/CandidatoSucessoPage";

export default function App() {
  return (
    <AcessibilidadeProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            
            <Routes>
              
              {/* === ÁREA PÚBLICA === */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />

              {/* === ÁREA ADMIN (Protegida) === */}
              <Route element={<PrivateRoute allowedTypes={['admin']} />}>
                <Route path="/admin" element={<AdminPage />}>
                  <Route index element={<Navigate to="tipos" replace />} />
                  
                  <Route path="tipos" element={<TiposPage />} />
                  <Route path="subtipos" element={<SubtiposPage />} />
                  <Route path="barreiras" element={<BarreirasPage />} />
                  <Route path="acessibilidades" element={<AcessibilidadesPage />} />
                </Route>
              </Route>

              {/* === ÁREA EMPRESA (Protegida) === */}
              <Route element={<PrivateRoute allowedTypes={['empresa']} />}>
                <Route path="/empresa/:id" element={<EmpresaPage />}>
                  <Route index element={<Navigate to="vagas" replace />} />
                  <Route path="perfil" element={<EmpresaPerfilPage />} />
                  <Route path="vagas" element={<VagasPage />} />
                  <Route path="vagas/:vagaId" element={<VagaDetalhePage />} />
                  <Route path="vagas/:vagaId/candidatos" element={<VagaCandidatosPage />} />
                </Route>
              </Route>

              {/* === ÁREA CANDIDATO (Protegida) === */}
              <Route element={<PrivateRoute allowedTypes={['candidato']} />}>
                <Route path="/candidato/:id" element={<CandidatoPage />}>
                  <Route index element={<Navigate to="vagas" replace />} />
                  <Route path="vagas" element={<CandidatoVagasPage />} />
                  <Route path="vagas/:vagaId" element={<CandidatoVagaDetalhePage />} />
                  <Route path="vagas/:vagaId/sucesso" element={<CandidatoSucessoPage />} />
                  <Route path="deficiencia" element={<CandidatoDeficienciasPage />} />
                  <Route path="perfil" element={<CandidatoPerfilPage />} />
                </Route>
              </Route>


              
            </Routes>

            <AcessibilidadeWidget />
            
          </div>
        </AuthProvider>
      </BrowserRouter>
    </AcessibilidadeProvider>
  );
}