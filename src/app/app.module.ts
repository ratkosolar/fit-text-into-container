import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FitTextComponent } from './fit-text/fit-text.component';
import { FitTextService } from './fit-text/fit-text.service';

@NgModule({
  declarations: [
    AppComponent,
    FitTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FitTextService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
