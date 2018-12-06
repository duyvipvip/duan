import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request =  req.clone({
        headers: req.headers.set('x-access-token', localStorage.getItem('token') || '')
      });
    console.log(request, 'request');
    return next.handle(request).pipe( catchError(this.handleError))
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status == 401){
        localStorage.clear();
        this.router.navigate(['/login']);
        return of(null);
      }
     
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

}
