import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { VeiculoServiceProvider } from '../providers/veiculo-service/veiculo-service';
import { AlunoServiceProvider } from '../providers/aluno-service/aluno-service';
import { OcorrenciaServiceProvider } from '../providers/ocorrencia-service/ocorrencia-service';
import { TipoOcorrenciaServiceProvider } from '../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';

import { VeiculoConsultaPage } from '../pages/veiculo-consulta/veiculo-consulta';

import { OcorrenciaPage } from '../pages/ocorrencia/ocorrencia';
import { OcorrenciaManipularPage } from '../pages/ocorrencia-manipular/ocorrencia-manipular';
import { OcorrenciaListaPage } from '../pages/ocorrencia-lista/ocorrencia-lista';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    VeiculoConsultaPage,

    OcorrenciaPage,
    OcorrenciaListaPage,
    OcorrenciaManipularPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
    VeiculoConsultaPage,

    OcorrenciaPage,
    OcorrenciaListaPage,
    OcorrenciaManipularPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VeiculoServiceProvider,
    AlunoServiceProvider,
    OcorrenciaServiceProvider,
    TipoOcorrenciaServiceProvider
  ]
})
export class AppModule {}
