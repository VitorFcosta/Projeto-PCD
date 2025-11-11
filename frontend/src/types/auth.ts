export interface AuthResult {
  id: number;
  nome: string;
  email: string;
  userType: "candidato" | "empresa";
}
