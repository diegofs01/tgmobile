import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Ocorrencia } from '../../model/ocorrencia';
import { OcorrenciaManipularPage } from '../ocorrencia-manipular/ocorrencia-manipular';
import { OcorrenciaServiceProvider } from '../../providers/ocorrencia-service/ocorrencia-service';

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
  public placa: String;

  public pages = [
    { component: OcorrenciaManipularPage }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ocorrenciaService: OcorrenciaServiceProvider) {
    this.placa = navParams.get('param1');
    this.listarByPlaca(this.placa);
  }

  listarByPlaca(placa: String) {
    this.ocorrenciaService.listarByPlaca(placa)
    .then(data => {
      this.ocorrencias = data;
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
      'placa': this.placa
    });
  }

  voltar() {
    this.navCtrl.pop();
  }

}
