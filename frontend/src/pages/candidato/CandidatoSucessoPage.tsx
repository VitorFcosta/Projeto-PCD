import { useNavigate, useParams } from "react-router-dom";

import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import TituloSecao from "../../components/ui/TituloSecao";
import Botao from "../../components/ui/Botao";
import { IconCheck, IconVoltar } from "../../components/icons";

export default function CandidatoVagaSucessoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10">
      <ContainerPagina className="max-w-xl">
        <Cartao className="space-y-6 text-center py-10">

          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 flex items-center justify-center">
              <IconCheck size={36} className="text-emerald-400" />
            </div>
          </div>

          <TituloSecao
            titulo="Candidatura enviada!"
            subtitulo="A empresa agora pode visualizar seu perfil e entrar em contato."
            className="text-center"
          />

          <p className="text-gray-300 text-sm leading-relaxed">
            Você pode acompanhar novas vagas compatíveis com seu perfil na
            lista de oportunidades.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <Botao
              onClick={() => navigate(`/candidato/${id}/vagas`)}
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
            >
              <IconVoltar size={16} />
              Voltar para vagas
            </Botao>

           <Botao
              onClick={() => navigate(`/candidato/${id}`)}
              className="w-full sm:w-auto flex items-center gap-2 justify-center bg-gray-700 hover:bg-gray-600"
            >
              Perfil do candidato
            </Botao>

          </div>

        </Cartao>
      </ContainerPagina>
    </div>
  );
}
