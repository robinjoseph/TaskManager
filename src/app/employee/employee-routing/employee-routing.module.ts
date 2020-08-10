import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { MastersComponent } from 'src/app/admin/components/masters/masters.component';
import { TasksComponent } from '../components/tasks/tasks.component';


const routes: Routes = [  
    {path:"employee", canActivate:[CanActivateGuardService], 
    data: {expectedRole:"Employee"},children:[
    {path:"tasks", component:TasksComponent},
    {path:"masters", component:MastersComponent}
  ]}  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
