// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GridModule } from "@progress/kendo-angular-grid";

import { AppComponent } from "./app.component";
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      GridModule,
      DialogsModule,
      ButtonsModule,
      FormsModule,
      DateInputsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

