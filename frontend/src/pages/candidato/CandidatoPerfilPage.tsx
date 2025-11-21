import type { FormEvent } from "react";
import { useParams } from "react-router-dom";

import { useCandidatoPerfil } from "../../hooks/candidato/useCandidatoPerfil";

import ContainerPagina from "../../components/ui/ContainerPagina";
import Cartao from "../../components/ui/Cartao";
import CampoTexto from "../../components/ui/CampoTexto";
import Botao from "../../components/ui/Botao";
import Alerta from "../../components/ui/Alerta";
import Carregando from "../../components/ui/Carregando";
import TituloSecao from "../../components/ui/TituloSecao";

import { IconCheck } from "../../components/icons";

export default function CandidatoPerfilPage() {
  const { id } = useParams();
  const candidatoId = id ? Number(id) : NaN;

  const {
    loading,
    salvando,
    erro,
    sucesso,
    form,
    setForm,
    handleSalvar,
  } = useCandidatoPerfil(candidatoId);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSalvar();
  }

  if (Number.isNaN(candidatoId)) {
    return (
      <ContainerPagina className="py-16">
        <Cartao className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Candidato inválido
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            O identificador do candidato não foi informado corretamente.
          </p>
        </Cartao>
      </ContainerPagina>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <Carregando tamanho={28} />
          <p className="text-gray-700 dark:text-gray-200 font-semibold">
            Carregando perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ContainerPagina className="py-6">
      <Cartao className="space-y-6">
        <header>
          <TituloSecao
            titulo="Informações pessoais"
            subtitulo="Atualize os dados básicos do seu perfil. Eles serão vistos pelas empresas durante o processo de seleção."
          />
        </header>

        {sucesso && (
          <Alerta tipo="sucesso">
            {sucesso}
          </Alerta>
        )}

        {erro && (
          <Alerta tipo="erro">
            {erro}
          </Alerta>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Linha 1 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              rotulo="Nome completo"
              value={form.nome}
              onChange={(e) => setForm.setNome(e.target.value)}
            />

            <CampoTexto
              rotulo="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm.setEmail(e.target.value)}
            />
          </div>

          {/* Linha 2 */}
          <div className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              rotulo="Telefone"
              value={form.telefone}
              onChange={(e) => setForm.setTelefone(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Escolaridade
              </label>
              <select
                value={form.escolaridade}
                onChange={(e) => setForm.setEscolaridade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm
                  border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option>Ensino Fundamental</option>
                <option>Ensino Médio</option>
                <option>Curso Técnico</option>
                <option>Ensino Superior</option>
                <option>Pós-graduação</option>
              </select>
            </div>
          </div>

          {/* salvar */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Botao type="submit" disabled={salvando}>
              {salvando ? (
                <>
                  <Carregando tamanho={18} />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <IconCheck size={18} />
                  <span>Salvar alterações</span>
                </>
              )}
            </Botao>
          </div>
        </form>
      </Cartao>
    </ContainerPagina>
  );
}
