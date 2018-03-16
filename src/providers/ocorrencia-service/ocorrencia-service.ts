import { Ocorrencia } from '../../model/ocorrencia';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { apiUrl } from '../apiUrl';

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
      this.http.get(apiUrl.urlOcorrencia)
      .map(res => res.json())
      .subscribe(data => {
        this.ocorrencias = data;
        resolve(this.ocorrencias);
      });
    });
  }

  listarByPlaca(placa: String) {
    return new Promise(resolve => {
      this.http.get(apiUrl.urlOcorrencia + '/placa/' + placa)
      .map(res => res.json())
      .subscribe(data => {
        this.ocorrencias = data;
        resolve(this.ocorrencias);
      });
    });
  }

  salvarOcorrencia(ocorrencia: Ocorrencia) {
    return new Promise(resolve => {

      //console.log("ocorrencia.data: " + ocorrencia.data);
      let tempData = new Date(ocorrencia.data);
      //console.log("tempData: " + tempData);
      tempData.setHours(tempData.getHours() + 12);
      //console.log("tempData2: " + tempData);
      //console.log("tempData.toLocaleString(): " + tempData.toISOString());
      ocorrencia.data = tempData;

      this.http.put(apiUrl.urlOcorrencia + ocorrencia.numero, ocorrencia)
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

      this.http.post(apiUrl.urlOcorrencia, ocorrencia)
      .subscribe((result:any) => {
        resolve(result.json());
      });
    });
  }

  deletarOcorrencia(numero: Number) {
    return new Promise(resolve => {
      this.http.delete(apiUrl.urlOcorrencia + numero)
      .subscribe((ok) => {
        console.log(ok);
      });
    });
  }
}
