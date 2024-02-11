import { SupportLanguageComponent } from './components/support-language/support-language.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { CourseMenuComponent } from './components/course-menu/course-menu.component'; 
import { AppComponent } from './app.component';
import { GuardGuard } from './services/guard/guard.guard';  
import { PerfiladminComponent } from './components/perfiles/perfiladmin/perfiladmin.component';
import { PerfilestudianteComponent } from './components/perfiles/perfilestudiante/perfilestudiante.component';
import { PerfilprofesorComponent } from './components/perfiles/perfilprofesor/perfilprofesor.component';
import { AdminTeacherListComponent } from './components/admin/admin-teacher-list/admin-teacher-list.component';
import { AdminStudentListComponent } from './components/admin/admin-student-list/admin-student-list.component';
import { AdminCourseComponent } from './components/admin/admin-course/admin-course.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { AddHomeworkComponent } from './components/add-homework/add-homework.component';
import { DoHomeworkComponent } from './components/do-homework/do-homework.component';

const routes: Routes = [ 
  {path:"", redirectTo:"login",pathMatch:"full"},  
  {path:"login",component:AppComponent}, 
  {path:"home",component:HomeComponent  },
  {path:"profile",component:ProfileComponent},  
  {path:"cursos",component:CourseMenuComponent},  
  {path:"retos",component:ChallengesComponent},  
  {path:"idiomas",component:SupportLanguageComponent}, 
  {path:"admin",component:PerfiladminComponent}, 
  {path:"profesores",component:AdminTeacherListComponent},  
  {path:"estudiantes",component:AdminStudentListComponent},  
  {path:"cursosagg",component:AdminCourseComponent},  
  {path:"salir",redirectTo:"login",pathMatch:"full"},  

  {path:"estudiante",component:PerfilestudianteComponent, canActivate: [GuardGuard]},  
  {path:"estudiante/profile",component:ProfileComponent},  
  {path:"estudiante/cursos",component:CourseMenuComponent},  
  {path:"estudiante/cursos/realizar_deber",component:DoHomeworkComponent},  
  {path:"estudiante/retos",component:ChallengesComponent},  
  {path:"estudiante/idiomas",component:SupportLanguageComponent}, 

  {path:"admin",component:PerfiladminComponent, canActivate: [GuardGuard]}, 
  {path:"admin/profile",component:ProfileComponent},  
  {path:"admin/profesores",component:AdminTeacherListComponent},  
  {path:"admin/estudiantes",component:AdminStudentListComponent}, 
  {path:"admin/cursosagg",component:AdminCourseComponent}, 


  {path:"profesor",component:PerfilprofesorComponent, canActivate: [GuardGuard]}, 
  {path:"profesor/cursos",component:CourseMenuComponent}, 
  {path:"profesor/profile",component:ProfileComponent},  
  {path:"profesor/cursos/actividades",component:ActivitiesComponent},  
  {path:"profesor/cursos/añadir",component:AddHomeworkComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
