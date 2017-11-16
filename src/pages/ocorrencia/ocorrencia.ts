import { OcorrenciaManipularPage } from '../ocorrencia-manipular/ocorrencia-manipular';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OcorrenciaListaPage } from '../ocorrencia-lista/ocorrencia-lista';
import { VeiculoServiceProvider } from '../../providers/veiculo-service/veiculo-service';

/**
 * Generated class for the OcorrenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencia',
  templateUrl: 'ocorrencia.html',
})
export class OcorrenciaPage {

  public veiculos: any;
  public placaBusca: String;

  public pages = [
    { component: OcorrenciaListaPage },
    { component: OcorrenciaManipularPage }
  ];


  constructor(public navCtrl: NavController, public veiculoService: VeiculoServiceProvider) {
    this.listarVeiculos();
  }

  listarVeiculos() {
    this.veiculoService.listar()
    .then(data => {
      this.veiculos = data;
    })
  }

  listaOcorrenciaByPlaca(placa: String) {
    this.navCtrl.push(this.pages[0].component, {
      param1: placa
    });
  }

  filtrarVeiculo() {    
    this.veiculos = this.veiculos.filter(veiculo => {
      return veiculo.placa === this.placaBusca;
    });
  }

  resetarFiltro() {
    this.listarVeiculos();
    this.placaBusca = '';
  }

  novaOcorrencia() {
    this.navCtrl.push(this.pages[1].component, {
      'tipo': 'novoSemPlaca',
    });
  }

  voltar() {
    this.navCtrl.pop();
  }
}
