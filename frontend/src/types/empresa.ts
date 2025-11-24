export interface Empresa {
  id: number;
  nome: string;
  email: string;
  cnpj?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmpresaUpdateDTO {
  nome: string;
  email: string;
  cnpj?: string;
}