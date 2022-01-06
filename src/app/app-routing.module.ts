import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { TestServerComponent } from './modules/test-server/test-server.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "reg", component: RegisterComponent },
  { path: "test-server", component: TestServerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
