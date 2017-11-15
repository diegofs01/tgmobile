import { Ocorrencia } from '../../model/ocorrencia';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8080/api/ocorrencia/';

/*
  Generated class for the OcorrenciaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OcorrenciaServiceProvider {

  public ocorrencias: any;

  constructor(public http: Http) {
  }

  listar() {
    return new Promise(resolve => {
      this.http.get(apiUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.ocorrencias = data;
        resolve(this.ocorrencias);
      });
    });
  }

  listarByPlaca(placa: String) {
    return new Promise(resolve => {
      this.http.get(apiUrl + placa)
      .map(res => res.json())
      .subscribe(data => {
        this.ocorrencias = data;
        resolve(this.ocorrencias);
      });
    });
  }

  salvarOcorrencia(ocorrencia: Ocorrencia) {
    return new Promise(resolve => {

      let tempData = new Date(ocorrencia.data);
      tempData.setHours(tempData.getHours() + 12);
      ocorrencia.data = tempData;
      
      this.http.put(apiUrl + ocorrencia.placaVeiculo, ocorrencia)
      .subscribe((result: any) => {
        resolve(result.json());
      });
    });
  }

  adicionarOcorrencia(ocorrencia: Ocorrencia) {
    return new Promise(resolve => {
      
      let tempData = new Date(ocorrencia.data);
      tempData.setHours(tempData.getHours() + 12);
      ocorrencia.data = tempData;

      this.http.post(apiUrl, ocorrencia)
      .subscribe((result:any) => {
        resolve(result.json());
      });
    });
  }

  deletarOcorrencia(ocorrencia: Ocorrencia) {
    return new Promise(resolve => {
      console.log(apiUrl + ocorrencia.placaVeiculo + '?data=' + ocorrencia.data + '&hora=' + ocorrencia.hora);
      this.http.delete(apiUrl + ocorrencia.placaVeiculo + '?data=' + ocorrencia.data + '&hora=' + ocorrencia.hora)
      .subscribe((ok) => {
        console.log(ok);
      });
    });
  }
}
