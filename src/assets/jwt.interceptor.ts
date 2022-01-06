import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// import { AuthenticationService } from '../assets/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		// private authenticationService: AuthenticationService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let val = window.sessionStorage.getItem('token');
		let headers = request.headers;
		if (val != undefined && val != null) {
			headers = headers.append('x-auth-token', val);
			request = request.clone({
				headers: headers
			});
		}
		return next.handle(request);
	}
}