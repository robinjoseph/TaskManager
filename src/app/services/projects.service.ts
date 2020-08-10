import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';



@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient : HttpClient) 
  { 
  }

  getAllProjects(): Observable<Project[]>
  {
    // debugger;
    // var currentUser = {jwtToken : ""};
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization","Bearer ");
    // if(sessionStorage.currentUser !=null)
    // {
    //   currentUser = JSON.parse(sessionStorage.currentUser);
    //   headers = headers.set("Authorization",`Bearer ${currentUser.jwtToken}`);
    // }
    return this.httpClient.get<Project[]>("api/projects");
  }

  insertProject(newProject : Project): Observable<Project>
  { 
    return this.httpClient.post<Project>("api/projects", 
    newProject);
  }

  updateProject(existingProject : Project): Observable<Project>
  { 
    return this.httpClient.put<Project>("api/projects", 
    existingProject);
  }

  deleteProject(projectID : number): Observable<string>
  { 
    debugger;
    return this.httpClient.delete<string>("api/projects?ProjectID="+ projectID);
  }
  SearchProjects(searchBy : string, searchText: string): Observable<Project[]>
  { 
    debugger;
    return this.httpClient.get<Project[]>("api/projects/search/"+searchBy+"/"+searchText);
  }
}
