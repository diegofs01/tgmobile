
import { Veiculo } from '../../model/veiculo';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { apiUrl } from '../apiUrl';

/*
  Generated class for the VeiculoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VeiculoServiceProvider {
  public veiculo: any;
  public veiculos: any;

  constructor(public http: Http) {
  }

  buscar(placa: String) {
    return new Promise(resolve => {
      this.http.get(apiUrl.urlVeiculo + placa)
      .map(res => res.json())
      .subscribe(data => {
        this.veiculo = data;
        resolve(this.veiculo);
      });
    });
  }

  listar() {
    return new Promise(resolve => {
      this.http.get(apiUrl.urlVeiculo)
      .map(res => res.json())
      .subscribe(data => {
        this.veiculos = data;
        resolve(this.veiculos);
      });
    });
  }

}
