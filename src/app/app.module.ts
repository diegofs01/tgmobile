import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Dialogs } from '@ionic-native/dialogs';

import { Ionic2MaskDirective } from 'ionic2-mask-directive';

import { VeiculoServiceProvider } from '../providers/veiculo-service/veiculo-service';
import { AlunoServiceProvider } from '../providers/aluno-service/aluno-service';
import { OcorrenciaServiceProvider } from '../providers/ocorrencia-service/ocorrencia-service';
import { TipoOcorrenciaServiceProvider } from '../providers/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { CursoServiceProvider } from '../providers/curso-service/curso-service';

import { VeiculoConsultaPage } from '../pages/veiculo-consulta/veiculo-consulta';

import { OcorrenciaManipularPage } from '../pages/ocorrencia-manipular/ocorrencia-manipular';
import { OcorrenciaListaPage } from '../pages/ocorrencia-lista/ocorrencia-lista';

import { ConsultaOcorrenciaPage } from '../pages/consulta-ocorrencia/consulta-ocorrencia';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    Ionic2MaskDirective,

    VeiculoConsultaPage,

    OcorrenciaListaPage,
    OcorrenciaManipularPage,

    ConsultaOcorrenciaPage
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

    OcorrenciaListaPage,
    OcorrenciaManipularPage,

    ConsultaOcorrenciaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VeiculoServiceProvider,
    AlunoServiceProvider,
    OcorrenciaServiceProvider,
    TipoOcorrenciaServiceProvider,
    CursoServiceProvider
  ]
})
export class AppModule {}
