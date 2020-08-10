import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';
import{AboutComponent} from './admin/about/about.component'
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';

const routes: Routes = [  
  {path:"", redirectTo: "login", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignUpComponent, 
    canDeactivate:[CanDeactivateGuardService]},
  {path:"about", component: AboutComponent}, 
  {path:"admin", loadChildren: ()=> import('./admin/admin.module').then(
    m=>m.AdminModule
  )}, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash :true,preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
