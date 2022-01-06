import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../assets/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		// private authenticationService: AuthenticationService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(catchError(err => {
				if (err.status === 401) {
					// if (this.router.url.indexOf('login') == -1 && this.router.url.indexOf('reg') != -1)
					// this.authenticationService.logout();
					console.log("error 401")
				}
				return throwError('Error');
			}))
	}
}