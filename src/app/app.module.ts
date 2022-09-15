import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FinalComponent } from './final/final.component';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './diagram/diagram.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicNewUiComponent } from './basic-new-ui/basic-new-ui.component';


import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DashboardNewUiComponent } from './dashboard-new-ui/dashboard-new-ui.component';
import { FinalNewUiComponent } from './final-new-ui/final-new-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FinalComponent, 
    DiagramComponent, BasicNewUiComponent, DashboardNewUiComponent, FinalNewUiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,

    DragDropModule,
    
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    
    MatDialogModule,


    MatGridListModule , MatButtonModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
