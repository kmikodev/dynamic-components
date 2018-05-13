import { ComponentsModule } from './components/components.module';
import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNavbarComponent } from './mat-navbar/mat-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MatNavbarComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    SharedModule,
    BrowserAnimationsModule,
    ViewsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
