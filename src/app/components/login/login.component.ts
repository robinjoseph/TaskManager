import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginViewModel } from 'src/app/models/login-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginViewModel : LoginViewModel = new LoginViewModel();
  loginError: string = "";

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  onLoginClick(event)
  {
    debugger;
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) =>{
        this.router.navigate(["/admin","dashboard"]);
      },
      (error) =>{
        console.log(error);
        this.loginError = "Invalid Username or Password";
      }
    )
  }

}
