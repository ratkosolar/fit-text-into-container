import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FitTextComponent } from './fit-text/fit-text.component';
import { FitTextDirective } from './fit-text/fit-text.directive';

@NgModule({
  declarations: [
    AppComponent,
    FitTextComponent,
    FitTextDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
