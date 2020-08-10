import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor
{
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var currentUser = {jwtToken : ""};
    if(sessionStorage.currentUser !=null)
    {
      currentUser = JSON.parse(sessionStorage.currentUser);
    }
    req = req.clone({
      setHeaders :{
        Authorization: `Bearer ${currentUser.jwtToken}`
      }
    });
    return next.handle(req);
  }
}
