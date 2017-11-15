import { Aluno } from '../../model/aluno';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8080/api/aluno/';

/*
  Generated class for the AlunoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlunoServiceProvider {
  public aluno: Aluno;

  constructor(public http: Http) {
  }

  buscar(ra: String) {
    return new Promise(resolve => {
      this.http.get(apiUrl + ra)
        .map(res => res.json())
        .subscribe(aluno => {
          this.aluno = aluno;
          resolve(this.aluno);
        })
    });
  }

}
