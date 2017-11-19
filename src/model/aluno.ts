export class Aluno {
    constructor (
        private ra: String,
        private nome: String,
        private cpf: String,
        private rg: String,
        private endereco: String,
        private numero: Number,
        private complemento: String,
        private bairro: String,
        private cidade: String,
        private estado: String,
        private cep: String,
        private numeroTelefone: String,
        private numeroCelular: String,
        private idCurso: Number
    ){}
}