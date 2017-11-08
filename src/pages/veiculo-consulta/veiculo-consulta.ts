import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Aluno } from '../../model/aluno';
import { Veiculo } from '../../model/veiculo';
import { AlunoServiceProvider } from '../../providers/aluno-service/aluno-service';
import { VeiculoServiceProvider } from '../../providers/veiculo-service/veiculo-service';

/**
 * Generated class for the VeiculoConsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-veiculo-consulta',
  templateUrl: 'veiculo-consulta.html',
})
export class VeiculoConsultaPage {

  public placa: String;
  public veiculo: any;
  public aluno: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public veiculoService: VeiculoServiceProvider,
    public alunoService: AlunoServiceProvider) {

      this.veiculo = new Veiculo('','','', 0, 0,'','','');
      this.aluno = new Aluno('','','','','',0,'','','','','','','');
  }

  consultarVeiculo() {
    if(this.placa !== undefined && this.placa !== '') {
      this.veiculoService.buscar(this.placa)
      .then(data => {
        this.veiculo = data;

        this.alunoService.buscar(this.veiculo.raAluno)
        .then(data => {
          this.aluno = data;
        });
        
      });
    }
  }

  voltar() {
    this.navCtrl.pop();
  }
}
