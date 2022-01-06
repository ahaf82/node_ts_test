import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-test-server',
	templateUrl: './test-server.component.pug',
	styleUrls: ['./test-server.component.scss']
})
export class TestServerComponent implements OnInit {

	result: any;
	newTodo: string = "";
	updateTodoObject = { id: "", description: "" }
	showUpdateInputField: boolean = false;

	constructor(
		private http: HttpClient,
		private router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit() {
		if (window.sessionStorage.getItem('token') == undefined) this.router.navigateByUrl("/");
		this.showToDos();
	}

	showToDos() {
		this.http.get('http://localhost:8080/api/todo').subscribe(result => this.result = result);
	}

	addTodo(): any {
		if (this.newTodo == "") return this.toastr.error("Ohne Eingabe geht hier nix");
		this.http.post('http://localhost:8080/api/todo', { description: this.newTodo }).subscribe(response => {
			this.newTodo = "";
			this.showToDos();
		})
	}

	showUpdateInput(todo: { id: string, description: string }) {
		this.showUpdateInputField = true;
		this.updateTodoObject = todo;
	}

	updateTodo(todo: { id: string, description: string }) {
		this.showUpdateInputField = false;
		this.http.put(`http://localhost:8080/api/todo/${todo.id}`, todo).subscribe(response => {
			this.showToDos();
		})
	}

	deleteTodo(todo: { id: string }) {
		this.http.delete(`http://localhost:8080/api/todo/${todo.id}`).subscribe(response => {
			this.showToDos();
		})
	}

	logout() {
		window.sessionStorage.clear();
		this.router.navigateByUrl("/");
	}

	fireEvent() {
		this.http.post("", {}).subscribe((result: any) => console.log("got result", result))
	}

} 
