import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import {JwtHelperService} from '@auth0/angular-jwt'
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModel } from '../models/sign-up-view-model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient : HttpClient;
  constructor(private httpBackend : HttpBackend, private jwtHelperService: JwtHelperService) { }

  currentUserName: string = null;

  public Login(loginViewModel : LoginViewModel): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("api/users/authenticate", loginViewModel,{responseType : "json"})
    .pipe(map(user =>{
      if(user)
      {        
        this.currentUserName = user.username;
        sessionStorage.currentUser = JSON.stringify(user);
      }
    }));
  }
  public Logout()
  {
    this.currentUserName=null;
    sessionStorage.removeItem("currentUser");
  }

  public isAuthenticated(): boolean
  {
    var token = sessionStorage.getItem("currentUser")? 
      JSON.parse(sessionStorage.getItem("currentUser")).jwtToken: null;
      if(this.jwtHelperService.isTokenExpired())
      {
        return false;
      }
      else
      {
        return true;
      }
  }
  public Register(signUpViewModel: SignUpViewModel): Observable<any>
  {
    debugger;
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("api/users/register", signUpViewModel,{responseType : "json"});
  }
}
