# Documentação Técnica do Projeto PCD

A presente documentação técnica detalha a arquitetura, as tecnologias e a implementação do Projeto PCD, uma aplicação *full-stack* desenvolvida para promover a inclusão de Pessoas com Deficiência (PCD) no mercado de trabalho. O objetivo é fornecer um guia completo para desenvolvedores, mantenedores e auditores do sistema, seguindo um padrão de clareza e detalhe similar às documentações de *frameworks* modernos como Next.js e NestJS.

## 1. Visão Geral do Projeto

O Projeto PCD é uma plataforma de **match** que conecta Pessoas com Deficiência (Candidatos) a Empresas que oferecem vagas compatíveis. O diferencial do sistema reside na sua capacidade de realizar um *match* inteligente, considerando não apenas o tipo de deficiência, mas também os subtipos, as barreiras encontradas pelo candidato e as acessibilidades oferecidas pela vaga.

### Tecnologias Utilizadas

O projeto adota uma arquitetura de microsserviços monolítica (monorepo lógico) com separação clara entre *frontend* e *backend*.

| Componente | Tecnologia Principal | Framework/Biblioteca | Linguagem |
| --- | --- | --- | --- |
| **Frontend** | React | Vite, React Router DOM, Tailwind CSS | TypeScript |
| **Backend** | Node.js | Express, CORS | TypeScript |
| **Banco de Dados** | PostgreSQL | Prisma ORM | - |

### Arquitetura Geral

A aplicação segue o padrão **Cliente-Servidor (Client-Server)**, onde o *Frontend* (Cliente) é uma *Single Page Application* (SPA) que se comunica com o *Backend* (Servidor) através de uma API RESTful.

- **Frontend:** Responsável pela interface do usuário, gerenciamento de estado e consumo da API.

- **Backend:** Responsável pela lógica de negócios, autenticação, persistência de dados (via Prisma) e a lógica central de *match*.

### Público-Alvo e Contexto de Uso

O sistema atende a dois perfis principais de usuários:

1. **Candidatos (PCD):** Podem se cadastrar, informar seus subtipos de deficiência e as barreiras que enfrentam, e visualizar vagas compatíveis.

1. **Empresas:** Podem se cadastrar, publicar vagas e detalhar as acessibilidades oferecidas, além de visualizar candidatos compatíveis com suas vagas.

## 2. Estrutura do Projeto

O projeto está organizado em um diretório raiz contendo as pastas `backend` e `frontend`, além de arquivos de configuração globais.

### Mapa de Diretórios

```bash
/home/ubuntu/project_pcd/Projeto PCD - cópia
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   ├── server.ts
│   │   └── services
│   └── ...
├── frontend
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── lib
│   │   ├── main.tsx
│   │   ├── pages
│   │   ├── types
│   │   └── ...
│   └── ...
└── ...
```

### Detalhamento da Estrutura

| Diretório | Componente | Descrição |
| --- | --- | --- |
| `backend/src/controllers` | Backend | Contém a lógica de processamento das requisições HTTP. |
| `backend/src/repositories` | Backend | Camada de abstração para acesso ao banco de dados (interage com o Prisma Client). |
| `backend/src/routes` | Backend | Define as rotas da API e as associa aos *controllers*. |
| `backend/src/services` | Backend | Contém a lógica de negócios complexa, como a regra de *match*. |
| `backend/prisma` | Backend | Arquivos de configuração do Prisma (schema, migrations e seed). |
| `frontend/src/pages` | Frontend | Componentes React que representam as páginas da aplicação. |
| `frontend/src/components` | Frontend | Componentes React reutilizáveis (ex: formulários, listas, *layout*). |
| `frontend/src/context` | Frontend | Contextos React para gerenciamento de estado global (ex: `ThemeContext`). |

## 3. Instalação e Execução

Para rodar o projeto localmente, é necessário ter o ambiente de desenvolvimento configurado.

### Pré-requisitos

- **Node.js:** Versão 18+ (Recomendado).

- **npm:** Gerenciador de pacotes do Node.js.

- **PostgreSQL:** Servidor de banco de dados rodando e acessível.

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL com o nome `pcd-es` (ou o nome que preferir).

1. Crie um arquivo `.env` na pasta `backend` e configure a variável de ambiente `DATABASE_URL`.

**Conteúdo do arquivo ****`backend/.env`****:**

```
DATABASE_URL="postgresql://postgres:hugo3008@localhost:5432/pcd-es"
```

> **Nota:** A senha e o usuário (`postgres:hugo3008`) são exemplos e devem ser substituídos pelas credenciais do seu ambiente local.

### Comandos de Execução

Execute os comandos a seguir a partir do diretório raiz (`Projeto PCD - cópia`).

```bash
# 1. Instalar dependências do Backend
cd backend
npm install

# 2. Instalar dependências do Frontend
cd ../frontend
npm install

# 3. Rodar as Migrações do Banco de Dados (a partir do diretório backend)
cd ../backend
npx prisma migrate dev --name init

# 4. Popular o Banco de Dados com dados iniciais (opcional)
npm run seed

# 5. Iniciar o Servidor Backend (em um terminal)
npm run dev

# 6. Iniciar o Servidor Frontend (em outro terminal, a partir do diretório frontend)
cd ../frontend
npm run dev
```

O *backend* será iniciado na porta `3000` (padrão do Express) e o *frontend* na porta `5173` (padrão do Vite).

## 4. Configuração

A configuração principal do *backend* é feita através de variáveis de ambiente no arquivo `.env`.

### Variáveis de Ambiente

| Variável | Descrição | Exemplo de Valor |
| --- | --- | --- |
| `DATABASE_URL` | String de conexão com o banco de dados PostgreSQL. | `postgresql://user:pass@host:port/db_name` |
| `PORT` | Porta em que o servidor Express será executado. | `3000` (Padrão) |

### Configuração de Rotas (Backend)

Todas as rotas são centralizadas no arquivo `backend/src/server.ts` e agrupadas por prefixo:

```typescript
// backend/src/server.ts (Recorte)
// ...
app.use("/auth", authRoutes);
app.use("/tipos", tiposRoutes);
app.use("/subtipos", subtiposRoutes);
app.use("/vinculos", vinculosRoutes)
app.use("/barreiras", barreirasRoutes);
app.use("/acessibilidades", acessibilidadesRoutes);

app.use("/empresas", empresasRoutes);
app.use("/vagas", vagasRoutes);

app.use("/candidatos", candidatoRoutes);

// nova rota de match
app.use("/match", matchRoutes);
// ...
```

## 5. Funcionalidades do Sistema

O sistema é construído em torno de três pilares: **Autenticação**, **Cadastro de Entidades** e **Match Inteligente**.

### 5.1. Autenticação e Registro

**Descrição Funcional:** Permite que Candidatos e Empresas se registrem e façam login na plataforma.

**Fluxo Resumido:** O usuário acessa a página de registro (`/register`), escolhe o perfil (Candidato ou Empresa), preenche os dados e é autenticado.

**Recorte de Código (Backend - Rota de Registro de Candidato):**

```typescript
// backend/src/routes/auth.routes.ts (Recorte)
// ...
// Rotas de Candidato
router.post("/candidato/registro", AuthController.registroCandidato);
router.post("/candidato/login", AuthController.loginCandidato);

// Rotas de Empresa
router.post("/empresa/registro", AuthController.registroEmpresa);
router.post("/empresa/login", AuthController.loginEmpresa);
// ...
```

### 5.2. Cadastro de Deficiências e Barreiras (Candidato)

**Descrição Funcional:** O Candidato informa os subtipos de deficiência que possui e as barreiras que enfrenta em seu dia a dia, permitindo um *match* mais preciso.

**Fluxo Resumido:** Após o login, o Candidato navega para a página de Deficiências (`/candidato/:id/deficiencia`) e utiliza formulários para vincular subtipos e barreiras.

**Recorte de Código (Frontend - Componente de Vínculo de Subtipos):**

O componente `CandidatoSubtiposForm.tsx` gerencia a vinculação de subtipos de deficiência ao perfil do candidato.

```typescript
// frontend/src/components/candidato/CandidatoSubtiposForm.tsx (Exemplo)
// ...
const handleVincular = async (subtipoId: number) => {
  try {
    // Chamada à API para vincular o subtipo
    await api.post(`/candidatos/${candidatoId}/subtipos`, { subtipoId });
    // ...
  } catch (error) {
    // ...
  }
};
// ...
```

### 5.3. Publicação de Vagas e Acessibilidades (Empresa)

**Descrição Funcional:** A Empresa publica vagas, especificando os subtipos de deficiência aceitos e as acessibilidades que o ambiente de trabalho oferece.

**Fluxo Resumido:** A Empresa acessa a página de Vagas (`/empresa/:id/vagas`), cria uma nova vaga e, em seguida, vincula os subtipos e acessibilidades através de formulários dedicados.

**Recorte de Código (Backend - Rota de Vínculo de Acessibilidades à Vaga):**

```typescript
// backend/src/routes/vagas.routes.ts (Recorte)
// ...
r.post("/", VagasController.criar);

// N:N
r.post("/:id/subtipos", VagasController.vincularSubtipos);
r.post("/:id/acessibilidades", VagasController.vincularAcessibilidades);
// ...
```

### 5.4. Lógica de Match

**Descrição Funcional:** O sistema calcula a compatibilidade entre Candidatos e Vagas.

- **Candidato:** Vê vagas que aceitam seus subtipos de deficiência e que oferecem acessibilidades que mitigam suas barreiras.

- **Empresa:** Vê candidatos que se encaixam nos subtipos aceitos pela vaga.

**Recorte de Código (Backend - Rota de Match para Candidato):**

```typescript
// backend/src/routes/match.routes.ts (Recorte)
// ...
// Rota para o CANDIDATO ver vagas
matchRoutes.get("/:candidatoId", MatchController.listarVagasCompativeis);

// Rota para a EMPRESA ver candidatos de uma vaga
matchRoutes.get("/vaga/:vagaId", MatchController.listarCandidatosCompativeis);
```

## 6. Endpoints da API

A API RESTful é a interface de comunicação entre o *frontend* e o *backend*. O prefixo base para todas as rotas é `/`.

| Módulo | Método | URL | Descrição |
| --- | --- | --- | --- |
| **Autenticação** | `POST` | `/auth/candidato/registro` | Registra um novo Candidato. |
|  | `POST` | `/auth/candidato/login` | Autentica um Candidato. |
|  | `POST` | `/auth/empresa/registro` | Registra uma nova Empresa. |
|  | `POST` | `/auth/empresa/login` | Autentica uma Empresa. |
| **Candidatos** | `GET` | `/candidatos` | Lista todos os Candidatos. |
|  | `GET` | `/candidatos/:id` | Busca Candidato por ID. |
|  | `PUT` | `/candidatos/:id` | Atualiza dados do Candidato. |
|  | `POST` | `/candidatos/:id/subtipos` | Vincula Subtipo de Deficiência ao Candidato. |
|  | `POST` | `/candidatos/:id/subtipos/:subtipoId/barreiras` | Vincula Barreira a um Subtipo do Candidato. |
| **Empresas** | `GET` | `/empresas` | Lista todas as Empresas. |
|  | `GET` | `/empresas/:id` | Detalha Empresa por ID. |
|  | `POST` | `/empresas` | Cria nova Empresa. |
|  | `PUT` | `/empresas/:id` | Atualiza dados da Empresa. |
| **Vagas** | `GET` | `/vagas/empresa/:id` | Lista Vagas de uma Empresa. |
|  | `GET` | `/vagas/:id` | Detalha Vaga por ID. |
|  | `POST` | `/vagas` | Cria nova Vaga. |
|  | `POST` | `/vagas/:id/subtipos` | Vincula Subtipos aceitos à Vaga. |
|  | `POST` | `/vagas/:id/acessibilidades` | Vincula Acessibilidades oferecidas à Vaga. |
| **Match** | `GET` | `/match/:candidatoId` | Lista Vagas compatíveis para o Candidato. |
|  | `GET` | `/match/vaga/:vagaId` | Lista Candidatos compatíveis para a Vaga. |
| **Dados Base** | `GET` | `/tipos/com-subtipos` | Lista Tipos de Deficiência com seus Subtipos. |
|  | `GET` | `/barreiras` | Lista todas as Barreiras. |
|  | `GET` | `/acessibilidades` | Lista todas as Acessibilidades. |
| **Vínculos** | `POST` | `/vinculos/subtipos/:id/barreiras` | Vincula Barreira a um Subtipo de Deficiência (Admin). |
|  | `POST` | `/vinculos/barreiras/:id/acessibilidades` | Vincula Acessibilidade a uma Barreira (Admin). |

### Exemplo de Requisição (Criação de Candidato)

**Endpoint:** `POST /candidatos`

**Corpo da Requisição (JSON):**

```json
{
  "nome": "Maria da Silva",
  "email": "maria@exemplo.com",
  "senha": "senhaSegura123",
  "telefone": "11987654321",
  "escolaridade": "Superior Completo"
}
```

## 7. Principais Componentes Frontend

O *frontend* é estruturado em páginas e componentes reutilizáveis, utilizando **React Router DOM** para o roteamento.

### Roteamento Principal (`frontend/src/App.tsx`)

O arquivo `App.tsx` define a estrutura de rotas, incluindo rotas aninhadas para os painéis de Empresa e Candidato.

```typescript
// frontend/src/App.tsx (Recorte)
// ...
<Route path="/empresa/:id" element={<EmpresaPage />}>
  <Route index element={<EmpresaPerfilPage />} />
  <Route path="vagas" element={<VagaPage />} />
  <Route path="vagas/:vagaId" element={<VagaDetalhePage />} />
  {/* ... */}
</Route>

<Route path="/candidato/:id" element={<CandidatoPage />}>
  <Route index element={<CandidatoPerfilPage />} />
  <Route path="deficiencia" element={<CandidatoDeficienciaPage />} />
  <Route path="vagas" element={<CandidatoVagasPage />} />
  {/* ... */}
</Route>
// ...
```

### Componente de Layout (`DashboardLayout.tsx`)

O componente `DashboardLayout.tsx` é o contêiner principal para as páginas autenticadas, garantindo a consistência visual com *Header*, *Footer* e navegação lateral.

### Comunicação com o Backend

A comunicação é realizada através de chamadas HTTP (presumivelmente usando `fetch` ou uma biblioteca como `axios`, embora não explicitamente visível nos recortes, o padrão é evidente).

**Exemplo de Página (Listagem de Vagas para Candidato):**

A página `CandidatoVagasPage.tsx` é responsável por chamar o endpoint de *match* para listar as vagas compatíveis.

```typescript
// frontend/src/pages/candidato/CandidatoVagasPage.tsx (Exemplo de Fluxo)
// ...
useEffect(() => {
  const fetchVagas = async () => {
    // Presumindo que 'api' é uma instância configurada para o backend
    const response = await api.get(`/match/${candidatoId}`); 
    setVagas(response.data);
  };
  fetchVagas();
}, [candidatoId]);
// ...
```

## 8. Banco de Dados

O banco de dados é modelado utilizando **Prisma ORM** e o provedor **PostgreSQL**. O *schema* reflete a complexidade das relações necessárias para o *match* inteligente.

### Schema Principal (`backend/prisma/schema.prisma`)

O modelo de dados utiliza várias tabelas de junção explícitas (N:N) para gerenciar as relações complexas entre Deficiências, Barreiras, Acessibilidades, Candidatos e Vagas.

**Recorte de Código (Modelo Candidato e Relações):**

```
// backend/prisma/schema.prisma (Recorte)
// ...
model Candidato {
  id        Int                 @id @default(autoincrement())
  nome      String              
  email     String              @unique
  senha     String
  telefone  String?
  escolaridade String

  // Relações
  subtipos  CandidatoSubtipo[]

  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([nome])
}

// N:N Candidato <-> Subtipo
model CandidatoSubtipo {
  candidatoId Int
  subtipoId   Int
  candidato   Candidato           @relation(fields: [candidatoId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  subtipo     SubtipoDeficiencia  @relation(fields: [subtipoId], references: [id], onDelete: Cascade, onUpdate: Cascade)

  barreiras   CandidatoSubtipoBarreira[]  // relação contextual (por subtipo)

  @@id([candidatoId, subtipoId])
  @@index([subtipoId])
}
// ...
```

### Relações Chave

| Entidade | Relação | Entidade | Tipo de Relação |
| --- | --- | --- | --- |
| `TipoDeficiencia` | -> | `SubtipoDeficiencia` | 1:N |
| `Candidato` | -> | `SubtipoDeficiencia` | N:N (via `CandidatoSubtipo`) |
| `Vaga` | -> | `SubtipoDeficiencia` | N:N (via `VagaSubtipo`) |
| `Barreira` | -> | `Acessibilidade` | N:N (via `BarreiraAcessibilidade`) |
| `CandidatoSubtipo` | -> | `Barreira` | N:N Contextual (via `CandidatoSubtipoBarreira`) |

## 9. Boas Práticas e Convenções

O projeto segue convenções de desenvolvimento modernas para garantir manutenibilidade e escalabilidade.

### Padrões de Código

- **TypeScript:** Uso rigoroso de tipagem para aumentar a robustez do código.

- **Estrutura de Pastas:** O *backend* segue o padrão **MVC (Model-View-Controller)** adaptado para API (Controller/Service/Repository). O *frontend* segue o padrão de **Componentes/Páginas/Contextos** do React.

- **Nomenclatura:** Uso de *camelCase* para variáveis e funções, *PascalCase* para componentes React e classes TypeScript.

### Guidelines de Acessibilidade e Performance

- **Tailwind CSS:** A estilização é feita com classes utilitárias, facilitando a aplicação de padrões de design responsivo.

- **Vite:** Utilizado para o *bundling* do *frontend*, garantindo tempos de *build* e *hot-reload* rápidos, essenciais para a produtividade e performance da aplicação.

## 10. Referências e Créditos

Este projeto foi desenvolvido como parte de um esforço acadêmico e/ou de inovação social.

| Item | Detalhe |
| --- | --- |
| **Versão Atual do Sistema** | 1.0.0 (Baseado nas dependências `package.json`) |
| **Data da Última Atualização** | 13 de Novembro de 2025 |
| **Tecnologias Base** | React 19, Node.js/Express, Prisma 6, PostgreSQL |
| **Desenvolvedores** | [A ser preenchido pelo usuário] |
| **Instituição** | [A ser preenchido pelo usuário] |
| **Contexto** | Projeto de Inclusão e Tecnologia para PCD |

---

