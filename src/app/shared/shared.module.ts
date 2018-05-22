import { MocksService } from './services/mocks.service';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
  ],
  exports: [
    MaterialModule
  ],
  declarations: [

  ],
  providers: [
    LoginService,
    LocationService,
    MocksService
  ]
})
export class SharedModule { }
