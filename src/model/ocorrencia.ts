import { TipoOcorrencia } from './tipoOcorrencia';

export class Ocorrencia {

    constructor (
        public placaVeiculo: String,
        public data: Date,
        public hora: Date,
        public descricao: String,
        public tipoOcorrencia: TipoOcorrencia
    ) {}
}