import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaListaPage } from './ocorrencia-lista';

@NgModule({
  declarations: [
    OcorrenciaListaPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaListaPage),
  ],
})
export class OcorrenciaListaPageModule {}
