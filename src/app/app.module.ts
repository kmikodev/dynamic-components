import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as core from '@angular/core';
import * as common from '@angular/common';
import * as compiler from '@angular/compiler';
import * as forms from '@angular/forms';
import * as material from '@angular/material';
import * as checkbox from '@angular/material/checkbox';
import * as platformBrowser from '@angular/platform-browser';
import * as platformBrowserDynamic from '@angular/platform-browser-dynamic';
import * as Rx from 'rxjs';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    SharedModule,
    BrowserAnimationsModule,
    ViewsModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    self['ng']['core'] = core;
    self['ng']['common'] = common;
    self['ng']['compiler'] = compiler;
    self['ng']['forms'] = forms;
    self['ng']['material'] = material;
    self['ng']['material']['checkbox'] = checkbox;
    self['ng']['platformBrowser'] = platformBrowser;
    self['ng']['platformBrowserDynamic'] = platformBrowserDynamic;
    self['Rx'] = Rx;
  }
 }
