import { TipoOcorrenciaServiceProvider } from '../../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { TipoOcorrencia } from '../../model/tipoOcorrencia';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OcorrenciaServiceProvider } from '../../providers/ocorrencia-service/ocorrencia-service';
import { Ocorrencia } from '../../model/ocorrencia';

/**
 * Generated class for the OcorrenciaManipularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencia-manipular',
  templateUrl: 'ocorrencia-manipular.html',
})
export class OcorrenciaManipularPage {

  public titulo: String;
  public editar: boolean;
  public semPlaca: boolean;
  public ocorrencia: Ocorrencia;
  public tiposOcorrencias: any;
  public tipoOcorrenciaID: Number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ocorrenciaService: OcorrenciaServiceProvider,
    public tipoOcorrenciaService: TipoOcorrenciaServiceProvider) {

    if(navParams.get('tipo') === 'editar') {
      this.ocorrencia = navParams.get('ocorrencia');
      this.titulo = 'Editar Ocorrencia';
      this.editar = true;
      this.semPlaca = false;
      this.tipoOcorrenciaID = this.ocorrencia.tipoOcorrencia.id;
    } else if(navParams.get('tipo') === 'novo') {
      this.ocorrencia = new Ocorrencia(0, navParams.get('placa'), null, null, '', null);
      this.titulo = 'Nova Ocorrencia';
      this.editar = false;
      this.semPlaca = false;
      this.tipoOcorrenciaID = 0;
    } else if(navParams.get('tipo') === 'novoSemPlaca') {
      this.ocorrencia = new Ocorrencia(0, '', null, null, '', null);
      this.titulo = 'Nova Ocorrencia (Sem Placa)';
      this.editar = false;
      this.semPlaca = true;
      this.tipoOcorrenciaID = 0;
    }

    tipoOcorrenciaService.listar()
    .then(data => {
      this.tiposOcorrencias = data;
    });
  }

  salvarOcorrencia() {
    this.ocorrencia.tipoOcorrencia = this.tiposOcorrencias.find(to => to.id === this.tipoOcorrenciaID);
    this.ocorrenciaService.salvarOcorrencia(this.ocorrencia)
    .then(() => {
      this.voltar();
    });
  }

  adicionarOcorrencia() {
    this.ocorrencia.tipoOcorrencia = this.tiposOcorrencias.find(to => to.id === this.tipoOcorrenciaID);
    this.ocorrenciaService.adicionarOcorrencia(this.ocorrencia)
    .then(() => {
      this.voltar();
    });
  }

  deletarOcorrencia() {
    this.ocorrenciaService.deletarOcorrencia(this.ocorrencia.numero);
    this.voltar();
  }

  voltar() {
    this.navCtrl.pop();
  }

}
