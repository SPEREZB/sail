import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { CourseMenuComponent } from './components/course-menu/course-menu.component';
import { CommonModule } from '@angular/common';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component'; 
import { AlertService } from './services/alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    CourseMenuComponent,
    ProfileComponent,
    HomeComponent,
    CustomAlertComponent 
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatGridListModule, 
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
