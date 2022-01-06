import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.pug',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	email: string = "";
	password: string = "";

	constructor(
		private http: HttpClient,
		private router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
	}

	login() {
		this.http.post('http://localhost:8080/api/login', { email: this.email, password: this.password }).subscribe(
			(response: any) => {
				window.sessionStorage.setItem('token', response.token)
				if (!!response.token) this.router.navigateByUrl('/test-server');
			},
			error => {
				this.toastr.success('Keine gültigen Anmeldedaten');
				console.log("hier der Fehler", error)
			}
		)
	}

	navigateToRegister() {
		this.router.navigateByUrl("/reg");
	}
}
