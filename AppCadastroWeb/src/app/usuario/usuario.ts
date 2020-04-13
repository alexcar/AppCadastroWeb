import { Sexo } from './sexo';

export interface Usuario {
    usuarioId: number;
    nome: string;
    dataNascimento: string;
    email: string;
    senha: string;
    ativo: boolean;
    sexoId: number;
    sexo: Sexo;
}
