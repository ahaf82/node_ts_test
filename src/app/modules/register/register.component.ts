import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.http.post('http://localhost:8080/api/register', { email: this.email, password: this.password }).subscribe(
      (response: any) => {
        if (!!response.email) this.toastr.success("Nutzer erfolgreich registriert");
      },
      error => this.toastr.error("Email-Adresse bereits vergeben"))
  }

  backToLogin() {
    this.router.navigateByUrl("/");
  }

}
