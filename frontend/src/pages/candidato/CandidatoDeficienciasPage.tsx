import { useParams } from "react-router-dom";
import { useCandidatoDeficiencias } from "../../hooks/candidato/useCandidatoDeficiencias";

// UI
import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import Botao from "../../components/ui/Botao";
import Alerta from "../../components/ui/Alerta";
import Carregando from "../../components/ui/Carregando";
import TituloSecao from "../../components/ui/TituloSecao";

// Icons
import {
  IconEditar,
  IconSalvar,
  IconAlerta,
} from "../../components/icons";

// Components
import CandidatoDeficienciasResumo from "../../components/candidato/CandidatoDeficienciasResumo";
import CandidatoDeficienciasTiposAcordeao from "../../components/candidato/CandidatoDeficienciasTiposAcordeao";

export default function CandidatoDeficienciasPage() {
  const { id } = useParams<{ id: string }>();
  const candidatoId = id ? Number(id) : NaN;

  const {
    loading,
    salvando,
    mensagem,
    tiposComSubtipos,
    subtiposSelecionados,
    barreirasDisponiveis,
    barreirasSelecionadas,
    tipoAberto,
    dadosSalvos,
    toggleTipo,
    toggleSubtipo,
    toggleBarreira,
    salvar,
  } = useCandidatoDeficiencias(candidatoId);

  if (Number.isNaN(candidatoId)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Cartao className="max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-3">
            <IconAlerta size={40} className="text-rose-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Candidato inválido
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            O identificador informado é inválido.
          </p>
        </Cartao>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Carregando tamanho={32} />
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
            Carregando informações...
          </p>
        </div>
      </div>
    );
  }

  const tipoAlerta = mensagem?.tipo === "erro" ? "erro" : "sucesso";

  return (
    <div className="min-h-screen py-8">
      <ContainerPagina className="space-y-8">

        {/* Cabeçalho */}
        <header className="space-y-2">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Minhas deficiências e necessidades
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Essas informações ajudam as empresas a adaptar o ambiente de trabalho.
          </p>
        </header>

        {/* Alerta global */}
        {mensagem && (
          <Alerta tipo={tipoAlerta}>{mensagem.texto}</Alerta>
        )}

        {/* Resumo do perfil */}
        <CandidatoDeficienciasResumo dadosSalvos={dadosSalvos} />

        {/* Editor */}
        <Cartao className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700
              dark:bg-emerald-900/40 dark:text-emerald-100 flex items-center justify-center">
              <IconEditar size={20} />
            </div>

            <TituloSecao
              titulo="Editar deficiências"
              subtitulo="Marque os subtipos e barreiras que você enfrenta no dia a dia."
              className="mb-0"
            />
          </div>

          <CandidatoDeficienciasTiposAcordeao
            tipos={tiposComSubtipos}
            tipoAberto={tipoAberto}
            subtiposSelecionados={subtiposSelecionados}
            barreirasDisponiveis={barreirasDisponiveis}
            barreirasSelecionadas={barreirasSelecionadas}
            toggleTipo={toggleTipo}
            toggleSubtipo={toggleSubtipo}
            toggleBarreira={toggleBarreira}
          />
        </Cartao>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Botao onClick={salvar} disabled={salvando} className="px-8 py-3">
            {salvando ? (
              <>
                <Carregando tamanho={18} />
                Salvando...
              </>
            ) : (
              <>
                <IconSalvar size={18} />
                Salvar alterações
              </>
            )}
          </Botao>
        </div>

      </ContainerPagina>
    </div>
  );
}
