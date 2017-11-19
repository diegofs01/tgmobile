import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Ocorrencia } from '../../model/ocorrencia';
import { Curso } from '../../model/curso';
import { Aluno } from '../../model/aluno';
import { Veiculo } from '../../model/veiculo';

import { OcorrenciaManipularPage } from '../ocorrencia-manipular/ocorrencia-manipular';

import { OcorrenciaServiceProvider } from '../../providers/ocorrencia-service/ocorrencia-service';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';
import { AlunoServiceProvider } from '../../providers/aluno-service/aluno-service';
import { VeiculoServiceProvider } from '../../providers/veiculo-service/veiculo-service';
import { TipoOcorrenciaServiceProvider } from '../../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';

/**
 * Generated class for the ConsultaOcorrenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consulta-ocorrencia',
  templateUrl: 'consulta-ocorrencia.html',
})
export class ConsultaOcorrenciaPage {

  public pages = [
    { component: OcorrenciaManipularPage }
  ];

  public tipoConsulta: String;

  public placa: String;
  public idTipo: Number;
  public ra: String;

  public periodoInicio: Date;
  public periodoFinal: Date;

  public filtradoTipo: boolean;

  public veiculo: any;
  public aluno: any;
  public curso: any;
  public tiposOcorrencias: any;
  public ocorrencias: any;

  constructor(
    public navCtrl: NavController,
    public veiculoService: VeiculoServiceProvider,
    public alunoService: AlunoServiceProvider,
    public cursoService: CursoServiceProvider,
    public ocorrenciaService: OcorrenciaServiceProvider,
    public tipoOcorrenciaService: TipoOcorrenciaServiceProvider) {

      this.veiculo = new Veiculo('','','', 0, 0,'','','');
      this.aluno = new Aluno('','','','','',0,'','','','','','','', 0);
      this.curso = new Curso(0,'');
      this.placa = '';
      this.idTipo = 0;
      this.ra = '';
      this.ocorrencias = [];
      this.filtradoTipo = false;
  }

  ionViewDidLoad() {
    this.tipoConsulta = '';
    this.tipoOcorrenciaService.listar().then(data => {
      this.tiposOcorrencias = data; 
      this.tiposOcorrencias.unshift({id: 0, nome: 'Nenhum'})
    });
  }

  manipularOcorrencia(ocorrencia: Ocorrencia) {
    this.navCtrl.push(this.pages[0].component, {
      'tipo': 'editar',
      'ocorrencia': ocorrencia
    });
  }

  consultarVeiculo() {
    this.ocorrencias = [];
    if(this.placa !== undefined && this.placa !== '') {
      this.ocorrenciaService.listarByPlaca(this.placa).then(data => {
        this.ocorrencias = data;
      });
    }
  }

  filtrarOcorrenciasByTipo(id: Number) {
    if(id > 0) {
      this.ocorrencias = [];
      let tempList = [];
      this.ocorrenciaService.listar().then(data => {
        this.ocorrencias = data;
        this.ocorrencias.forEach(oco => {
          if(oco.tipoOcorrencia.id === id) {
            tempList.push(oco);
          }
          this.filtradoTipo = true;
        });
        this.ocorrencias = tempList;
      });
    } else {
      this.filtradoTipo = false;
      this.ocorrencias = [];
    }
  }

  filtrarOcorrenciasByRA() {
    this.ocorrencias = [];
    if(this.ra !== undefined && this.ra !== '') {
      let tempVeiculos = [];
      this.veiculoService.listar().then(data => {
        let tempData: any;
        tempData = data;
        tempData.forEach(td => {
          if(td.raAluno === this.ra) {
            tempVeiculos.push(td);
          }
        });
        tempVeiculos.forEach(vei => {
          this.ocorrenciaService.listarByPlaca(vei.placa).then(data => {
            this.ocorrencias = this.ocorrencias.concat(data);
          });
        });
      });
    }
  }

  filtrarOcorrenciasByPeriodo() {
    if(this.periodoInicio <= this.periodoFinal) {
      this.ocorrencias = [];
      let tempList: any;

      this.ocorrenciaService.listar().then(data => {
        tempList = data;
        tempList.forEach(oco => {
          if(oco.data >= this.periodoInicio && oco.data <= this.periodoFinal) {
            this.ocorrencias.push(oco);
          }
        });
      });
    }
  }
}
