import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OcorrenciaPage } from '../ocorrencia/ocorrencia';
import { VeiculoConsultaPage } from '../veiculo-consulta/veiculo-consulta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pages = [
    { component: VeiculoConsultaPage },
    { component: OcorrenciaPage },
  ];

  constructor(public navCtrl: NavController) {

  }

  consultarVeiculo() {
    this.navCtrl.push(this.pages[0].component);
  }

  ocorrencias() {
    this.navCtrl.push(this.pages[1].component);
  }

}
