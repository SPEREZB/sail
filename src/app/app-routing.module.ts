import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { CourseMenuComponent } from './components/course-menu/course-menu.component'; 
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"", redirectTo:"login",pathMatch:"full"}, 
  {path:"login",component:AppComponent}, 
  {path:"home",component:HomeComponent},
  {path:"profile",component:ProfileComponent},  
  {path:"cursos",component:CourseMenuComponent},  
  {path:"retos",component:ChallengesComponent},  
  {path:"salir",redirectTo:"login",pathMatch:"full"},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
