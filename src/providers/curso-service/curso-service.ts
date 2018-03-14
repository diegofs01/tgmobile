import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Curso } from '../../model/curso';
import { apiUrl } from '../apiUrl';

/*
  Generated class for the CursoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CursoServiceProvider {
  public curso: Curso;

  constructor(public http: Http) {
  }

  buscar(id: number) {
    return new Promise(resolve => {
      this.http.get(apiUrl.urlCurso + id)
        .map(res => res.json())
        .subscribe(curso => {
          this.curso = curso;
          resolve(this.curso);
        })
    });
  }

}
