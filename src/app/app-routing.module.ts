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

const routes: Routes = [ 
  {path:"", redirectTo:"login",pathMatch:"full"},  
  {path:"login",component:AppComponent}, 
  {path:"dashboard",component:PerfilestudianteComponent, canActivate: [GuardGuard]}, 
  {path:"home",component:HomeComponent  },
  {path:"dashboard/profile",component:ProfileComponent},  
  {path:"dashboard/cursos",component:CourseMenuComponent},  
  {path:"dashboard/retos",component:ChallengesComponent},  
  {path:"dashboard/idiomas",component:SupportLanguageComponent}, 


  {path:"profile",component:ProfileComponent},  
  {path:"cursos",component:CourseMenuComponent},  
  {path:"retos",component:ChallengesComponent},  
  {path:"idiomas",component:SupportLanguageComponent}, 
  {path:"admin",component:PerfiladminComponent}, 
  {path:"salir",redirectTo:"login",pathMatch:"full"},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
