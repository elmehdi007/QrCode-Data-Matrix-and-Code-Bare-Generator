import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HomeComponent } from './component/home/home.component';
import { ScanComponent } from './scan/scan.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
    children: [
      { path: '', redirectTo: 'generator', pathMatch: 'full' },
      {
        path: 'generator',
        component: GeneratorComponent,
        data: {
          title: 'QrCode, Data Matrix and  Code Bare Generator',
        }
      },
      {
        path: 'scan',
        component: ScanComponent,
        data: {
          title: 'QrCode Scan',
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
