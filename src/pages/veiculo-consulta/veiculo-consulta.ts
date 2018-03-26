import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

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
    public cursoService: CursoServiceProvider,
    private dialogs: Dialogs) {

      this.veiculo = {} as Veiculo;
      this.aluno = {} as Aluno;
      this.curso = {} as Curso;
  }

  consultarVeiculo() {
    if(this.placa !== undefined && this.placa !== '' && this.placa.length === 8) {
      this.placa = this.placa.toUpperCase();

      this.veiculoService.buscar(this.placa)
      .then(data => {
        this.veiculo = data;

        if(this.veiculo.placa !== null) {
          this.alunoService.buscar(this.veiculo.raAluno)
          .then(data => {

            this.aluno = data;
            this.cursoService.buscar(this.aluno.idCurso)
            .then(data => {
              this.curso = data;
            });
            
          }); 
        } else {
          this.dialogs.alert('Veículo não cadastrado', 'Erro');
          this.aluno = {} as Aluno;
          this.curso = {} as Curso;
        }
      });
    }
  }

  voltar() {
    this.navCtrl.pop();
  }
}
