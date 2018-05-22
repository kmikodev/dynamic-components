
import { ExternalModuleComponent } from './external-module/external-module.component';
import { HomeComponent } from './home/home.component';
import { GuardGuard } from './../core/guard.guard';
import { MatNavbarComponent } from './components/mat-navbar/mat-navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * Route of the administration module, contains the routes to the operations of the backoffice
 */
export const routes: Routes = [
  {
    path: 'admin',
    component: MatNavbarComponent,
    canActivate: [GuardGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      { path: 'remote', component: ExternalModuleComponent, canActivate: [GuardGuard] }

    ]
  }
];

/**
 * AdminRoutingModule module, contains the routes to the operations of the backoffice
 *
 * @export
 * @class AdminRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
