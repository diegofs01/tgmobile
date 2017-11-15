import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8080/api/tipoOcorrencia/';

/*
  Generated class for the TipoOcorrenciaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TipoOcorrenciaServiceProvider {

  public tiposOcorrencias: any;

  constructor(public http: Http) { 
  }

  listar() {
    return new Promise(resolve => {
      this.http.get(apiUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.tiposOcorrencias = data;
        resolve(this.tiposOcorrencias);
      });
    });
  }

}
