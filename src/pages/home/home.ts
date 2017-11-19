import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OcorrenciaPage } from '../ocorrencia/ocorrencia';
import { VeiculoConsultaPage } from '../veiculo-consulta/veiculo-consulta';
import { ConsultaOcorrenciaPage } from '../consulta-ocorrencia/consulta-ocorrencia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pages = [
    { component: VeiculoConsultaPage },
    { component: OcorrenciaPage },
    { component: ConsultaOcorrenciaPage }
  ];

  constructor(public navCtrl: NavController) {

  }

  consultarVeiculo() {
    this.navCtrl.push(this.pages[0].component);
  }

  ocorrencias() {
    this.navCtrl.push(this.pages[1].component);
  }

  consultaOcorrencia() {
    this.navCtrl.push(this.pages[2].component);
  }

}
