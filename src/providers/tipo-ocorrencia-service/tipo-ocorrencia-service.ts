import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { apiUrl } from '../apiUrl';

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
      this.http.get(apiUrl.urlTipoOcorrencia)
      .map(res => res.json())
      .subscribe(data => {
        this.tiposOcorrencias = data;
        resolve(this.tiposOcorrencias);
      });
    });
  }

}
