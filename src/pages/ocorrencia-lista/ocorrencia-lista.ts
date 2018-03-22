import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ocorrencia } from '../../model/ocorrencia';
import { OcorrenciaManipularPage } from '../ocorrencia-manipular/ocorrencia-manipular';
import { OcorrenciaServiceProvider } from '../../providers/ocorrencia-service/ocorrencia-service';
import { TipoOcorrenciaServiceProvider } from '../../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';

/**
 * Generated class for the OcorrenciaListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencia-lista',
  templateUrl: 'ocorrencia-lista.html',
})
export class OcorrenciaListaPage {

  public ocorrencias: any;
  public tipoOcorrencaias: any;

  public idTipoOcorrencia: Number;

  public qtdOcorrencia: Number;

  public periodoInicio: Date;
  public periodoFinal: Date;
  public filtrar: boolean;

  public pages = [
    { component: OcorrenciaManipularPage }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ocorrenciaService: OcorrenciaServiceProvider,
    public tipoOcorrenciaService: TipoOcorrenciaServiceProvider) {    

    this.listar();

    this.tipoOcorrenciaService.listar()
    .then(data => {
      this.tipoOcorrencaias = data;
    });

    this.periodoInicio = null;
    this.periodoFinal = null;
    this.idTipoOcorrencia = null;
  }

  listar() {
    this.ocorrenciaService.listar()
    .then(data => {
      this.ocorrencias = data;
      this.qtdOcorrencia = this.ocorrencias.length;
    });
  }

  manipularOcorrencia(ocorrencia: Ocorrencia) {
    this.navCtrl.push(this.pages[0].component, {
      'tipo': 'editar',
      'ocorrencia': ocorrencia
    });
  }

  novaOcorrencia() {
    this.navCtrl.push(this.pages[0].component, {
      'tipo': 'novo',
    });
  }

  voltar() {
    this.navCtrl.pop();
  }

  filtrarOcorrencias() {
    if(this.idTipoOcorrencia !== null && this.periodoInicio === null && this.periodoFinal === null) {
      this.filtroPorTipoOcorrencia();
    }

    if(this.idTipoOcorrencia === null && this.periodoInicio !== null && this.periodoFinal !== null) {
      this.filtroPorPeriodo();
    }

    if(this.idTipoOcorrencia !== null && this.periodoInicio !== null && this.periodoFinal !== null) {
      this.filtroPorPeriodoETipo();
    }
  }

  resetarFiltro() {
    this.listar();
    this.idTipoOcorrencia = null;
    this.periodoInicio = null;
    this.periodoFinal = null;
  }

  filtroPorPeriodo() {
    if(this.periodoInicio <= this.periodoFinal) {
      let tempList = [];

      this.ocorrencias.forEach(oco => {
        if(oco.data >= this.periodoInicio && oco.data <= this.periodoFinal) {
          tempList.push(oco);
        }
      });
      this.ocorrencias = tempList;
      this.qtdOcorrencia = this.ocorrencias.length;
    } 
  }

  filtroPorTipoOcorrencia() {
    let tempList = [];

    this.ocorrencias.forEach(oco => {
      if(oco.tipoOcorrencia.id === this.idTipoOcorrencia) {
        tempList.push(oco);
      }
    });
    this.ocorrencias = tempList;
    this.qtdOcorrencia = this.ocorrencias.length;
  }

  filtroPorPeriodoETipo() {
    if(this.periodoInicio <= this.periodoFinal) {
      let tempList = [];

      this.ocorrencias.forEach(oco => {
        if(oco.data >= this.periodoInicio && oco.data <= this.periodoFinal && oco.tipoOcorrencia.id === this.idTipoOcorrencia) {
          tempList.push(oco);
        }
      });
      this.ocorrencias = tempList;
      this.qtdOcorrencia = this.ocorrencias.length;
    }
  }
}
