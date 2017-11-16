import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Aluno } from '../../model/aluno';
import { Veiculo } from '../../model/veiculo';
import { Curso } from '../../model/curso';
import { AlunoServiceProvider } from '../../providers/aluno-service/aluno-service';
import { VeiculoServiceProvider } from '../../providers/veiculo-service/veiculo-service';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';

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
  public curso: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public veiculoService: VeiculoServiceProvider,
    public alunoService: AlunoServiceProvider,
    public cursoService: CursoServiceProvider) {

      this.veiculo = new Veiculo('','','', 0, 0,'','','');
      this.aluno = new Aluno('','','','','',0,'','','','','','','');
      this.curso = new Curso(0,'');
  }

  consultarVeiculo() {
    if(this.placa !== undefined && this.placa !== '') {
      this.veiculoService.buscar(this.placa)
      .then(data => {
        this.veiculo = data;

        this.alunoService.buscar(this.veiculo.raAluno)
        .then(data => {
          this.aluno = data;

          this.cursoService.buscar(this.aluno.idCurso)
          .then(data => {
            this.curso = data;
          });
          
        });
        
      });
    }
  }

  voltar() {
    this.navCtrl.pop();
  }
}
