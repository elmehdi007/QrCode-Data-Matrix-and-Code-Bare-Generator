import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { GeneratorComponent } from './generator/generator.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelModule } from '@progress/kendo-angular-label';
import { MaskedTextBoxModule, NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { SidebareComponent } from './component/sidebare/sidebare.component';
import { HomeComponent } from './component/home/home.component';
import { ScanComponent } from './scan/scan.component';
import { TitleService } from './Services/title.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'generator' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BarcodeGeneratorAllModule, QRCodeGeneratorAllModule ,DataMatrixGeneratorAllModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    ButtonsModule,
    BrowserAnimationsModule,
    LabelModule,
    ReactiveFormsModule,
    MaskedTextBoxModule,
    NumericTextBoxModule,
    ZXingScannerModule
  ],
  declarations: [
    AppComponent,
    GeneratorComponent,
    SidebareComponent,
    HomeComponent,
    ScanComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ TitleService ],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
