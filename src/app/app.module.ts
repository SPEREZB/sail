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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';    
import { firebase } from '../config/index'; 
import { PerfiladminComponent } from './components/perfiles/perfiladmin/perfiladmin.component';
import { PerfilestudianteComponent } from './components/perfiles/perfilestudiante/perfilestudiante.component';
import { PerfilprofesorComponent } from './components/perfiles/perfilprofesor/perfilprofesor.component';
import { SupportLanguageComponent } from './components/support-language/support-language.component';
import { SafeHtmlPipe } from './components/support-language/safe-html.pipe';
import { AdminTeacherListComponent } from './components/admin/admin-teacher-list/admin-teacher-list.component';
import { AdminStudentListComponent } from './components/admin/admin-student-list/admin-student-list.component';
import { AdminCourseComponent } from './components/admin/admin-course/admin-course.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { ReviewNotesComponent } from './components/review-notes/review-notes.component';
import { DoHomeworkComponent } from './components/do-homework/do-homework.component';
 
@NgModule({
  declarations: [
    AppComponent,
    ChallengesComponent,
    CourseMenuComponent,
    ProfileComponent,
    HomeComponent,
    PerfiladminComponent,
    SafeHtmlPipe,
    CustomAlertComponent, 
    PerfilestudianteComponent,
    SupportLanguageComponent,
    PerfilprofesorComponent,
    AdminTeacherListComponent,
    AdminStudentListComponent,
    AdminCourseComponent,
    ActivitiesComponent,
    AddHomeworkComponent,
    ReviewNotesComponent,
    DoHomeworkComponent 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,  
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
