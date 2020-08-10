import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  routeParamsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService) 
    { 
      this.project = new Project();
    }

  ngOnInit()
  {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      (params) =>{
        let projId = params["projectid"];

       /*  this.projectsService.get */
      }
    );
  }

  ngOnDestroy()
  {
    this.routeParamsSubscription.unsubscribe();
  }

}
