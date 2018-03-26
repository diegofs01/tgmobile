import { TipoOcorrenciaServiceProvider } from '../../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dialogs } from '@ionic-native/dialogs';

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
  templateUrl: 'ocorrencia-manipular.html'
})
export class OcorrenciaManipularPage {

  public titulo: String;
  public editar: boolean;
  public semPlaca: boolean;
  public ocorrencia: Ocorrencia;
  public tiposOcorrencias: any;
  public tipoOcorrenciaID: Number;
  public veiculoCadastrado: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ocorrenciaService: OcorrenciaServiceProvider,
    public tipoOcorrenciaService: TipoOcorrenciaServiceProvider,
    private dialogs: Dialogs) {

    if(navParams.get('tipo') === 'editar') {
      this.ocorrencia = navParams.get('ocorrencia');
      this.titulo = 'Editar Ocorrencia';
      this.editar = true;
      this.semPlaca = false;
      this.tipoOcorrenciaID = this.ocorrencia.tipoOcorrencia.id;
    } else if(navParams.get('tipo') === 'novo') {
      this.ocorrencia = new Ocorrencia(0, '', null, null, '', null, false);
      this.titulo = 'Nova Ocorrencia';
      this.editar = false;
      this.semPlaca = false;
      this.tipoOcorrenciaID = 0;
    }

    if(this.ocorrencia.veiculoCadastrado) {
      this.veiculoCadastrado = 'Sim';
    } else {
      this.veiculoCadastrado = 'Não';
    }

    tipoOcorrenciaService.listar()
    .then(data => {
      this.tiposOcorrencias = data;
    });
  }

  salvarOcorrencia() {
    if(this.validarCampos()) {
      this.ocorrencia.tipoOcorrencia = this.tiposOcorrencias.find(to => to.id === this.tipoOcorrenciaID);
      this.ocorrenciaService.salvarOcorrencia(this.ocorrencia)
      .then(() => {
        this.voltar();
      });
    }    
  }

  adicionarOcorrencia() {
    if(this.validarCampos()) {
      this.ocorrencia.placaVeiculo = this.ocorrencia.placaVeiculo.toUpperCase();
      this.ocorrencia.tipoOcorrencia = this.tiposOcorrencias.find(to => to.id === this.tipoOcorrenciaID);

      this.ocorrenciaService.verificarVeiculo(this.ocorrencia.placaVeiculo)
      .then(data => {
        if(data === 0) {
          this.dialogs.confirm('Veículo não-cadastrado, deseja salva-lo mesmo assim?', 'Erro', ['Sim','Não'])
          .then((teste) => {
            if(teste === 1) {
              console.log('Sim');
              this.ocorrenciaService.adicionarOcorrencia(this.ocorrencia)
              .then(() => {
                this.voltar();
              });
            }
          });
        }
      }); 
    }
  }

  deletarOcorrencia() {
    this.ocorrenciaService.deletarOcorrencia(this.ocorrencia.numero);
    this.voltar();
  }

  voltar() {
    this.navCtrl.pop();
  }

  validarCampos() {
    if(this.ocorrencia.placaVeiculo === '') {
      return false;
    }
    if(this.ocorrencia.placaVeiculo.length !== 8) {
      return false;
    }
    if(this.ocorrencia.data === null) {
      return false;
    }
    if(this.ocorrencia.hora === null) {
      return false;
    }
    if(this.tipoOcorrenciaID === 0) {
      return false;
    }
    if(this.ocorrencia.descricao === '') {
      return false;
    }
    return true;
  }
}
