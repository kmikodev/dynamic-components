import { RemoteModuleComponent } from './views/remote-module/remote-module.component';
import { ExternalModuleComponent } from './views/external-module/external-module.component';
import { HomeComponent } from './views/home/home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'external', component: ExternalModuleComponent },
  { path: 'remote', component: RemoteModuleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
