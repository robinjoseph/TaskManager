import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ClientLocation } from 'src/app/models/client-location';
import { ClientLcationsService } from 'src/app/services/client-lcations.service';
import { NgForm } from '@angular/forms';
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  clientLocations: ClientLocation[] = [];
  showLoading:boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;
  searchBy: string="projectName";
  searchText: string="";
  active: boolean;
  clientLocationID: number;
  status: string;

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;

  @ViewChild("newForm") newForm: NgForm;

  constructor(private projectsService : ProjectsService, private clientLocationsService: ClientLcationsService) { }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects=response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );
    debugger;
    this.clientLocationsService.getClientLocations().subscribe(      
      (response: ClientLocation[])=> {
        debugger;
        this.clientLocations = response;
      }
    );    
  }

  onSaveClick()
  {   
    this.projectsService.insertProject(this.newProject).subscribe((response)=>{
      var project : Project = new Project();
      project.projectID = response.projectID;
      project.projectName = response.projectName;
      project.dateOfStart = response.dateOfStart;
      project.teamSize = response.teamSize;
      project.clientLocation = response.clientLocation;
      project.active = response.active;
      project.clientLocationID = response.clientLocationID;
      project.status = response.status;
      this.projects.push(project);

      //Clear values
      this.newProject.projectID = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
      this.active = false;
      this.clientLocationID = null;
      this.status = null;
    },(error)=>{
      console.log(error);
    });
  }

  onEditClick(event, index: number)
  {   
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-");
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.active = this.projects[index].active;
    this.editProject.clientLocation = this.projects[index].clientLocation;
    this.editProject.clientLocationID = this.projects[index].clientLocationID;
    this.editProject.status = this.projects[index].status;
    this.editIndex = index;
    debugger;
  }

  onUpdateClick()
  {
    debugger;
    this.projectsService.updateProject(this.editProject).subscribe((response)=>{
      var project : Project = new Project();
      project.projectID = response.projectID;
      project.projectName = response.projectName;
      project.dateOfStart = response.dateOfStart;
      project.teamSize = response.teamSize;
      this.projects[this.editIndex]= project;

      //Clear values
      this.newProject.projectID = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
    },(error)=>{
      console.log(error);
    });
  }
  onDeleteClick(event, index: number)
  {
    this.deleteIndex=index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;

  }

  onDeleteConfirmClick()
  {
    debugger;
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe((response)=>{
      this.projects.splice(this.deleteIndex,1);
      //Clear values
      this.deleteProject.projectID = null;
      this.deleteProject.projectName = null;
      this.deleteProject.dateOfStart = null;
      this.deleteProject.teamSize = null;
    },(error)=>{
      console.log(error);
    });
  }

  onSearchClick(){
    this.projectsService.SearchProjects(this.searchBy, this.searchText).subscribe(
      (response: Project[]) => {
        this.projects=response;
      },
      (error)=>
      {
        console.log(error);
      }
    );
  }

  onNewClick(event)
  {
    this.newForm.resetForm();
  }

  isAllChecked: boolean = false;

  @ViewChildren("prj") projectsList: QueryList<ProjectComponent>;

  isAllCheckedChange(event)
  {
    let projects = this.projectsList.toArray();
    for(let i=0; i<projects.length; i++)
    {
      projects[i].isAllCheckChange(this.isAllChecked);
    }
  }

  calculateNoOfPages()
  {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(
      this.projects, this.searchBy, this.searchText);
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages= [];
    for(let i= 0; i< noOfPages; i++)
    {     
      this.pages.push({pageIndex: i});      
    }
    this.currentPageIndex =0;
  }

  onSearchTextKeyUp(event)
  {
    this.calculateNoOfPages();
  }
  onPageIndexClicked(pageIndex: number)
  {
    this.currentPageIndex = pageIndex;
  }

}
