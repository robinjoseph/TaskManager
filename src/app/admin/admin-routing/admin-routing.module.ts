import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ProjectDetailsComponent } from '../components/project-details/project-details.component';
import { MastersComponent } from '../components/masters/masters.component';

const routes: Routes = [  
  {path: "",canActivate:[CanActivateGuardService],
    data: {expectedRole:"Admin"}, children:[
    {path:"dashboard", component: DashboardComponent},
    {path:"projects", component: ProjectsComponent},
    {path:"masters", component: MastersComponent},
    {path:"projects/view/:projectid", component:ProjectDetailsComponent}
  ]},
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
