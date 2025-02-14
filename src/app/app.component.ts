import { Component } from '@angular/core';
import { TodoItemService } from './todoitem.service';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  updatedTitle: string = '';

 constructor(
  private todoService: TodoItemService
  ) { }
 
  ngOnInit() {
      this.loadTodos();
    }
  
    loadTodos() {
      this.todoService.getTodos().subscribe(
        (response: any) => {
          if (response.result === 1) {
            this.todos = response.data;
          } else {
            alert('Error fetching todos: ' + response.error);
          }
        },
        error => {
          alert('Error: ' + error.message);
        }
      );
    }    
  
    createTodo(title: string){
      var newTodo = new Todo();
      newTodo.title = title;
      this.todoService.createTodo(newTodo).subscribe((response: any) => {
        if (response.result === 1){
          this.loadTodos();
          alert('To-do item is created successfully!');
        }
        else {
          alert('Error creating todo: ' + response.error);
        }
      },
      error => {
        alert('Error: ' + error.message);
      });
      
    }
  
    markComplete(id: number) {
      this.todoService.markComplete(id).subscribe((response: any) => {
        if (response.result === 1){
          this.loadTodos();
          alert('To-do item is completed!');
        }
        else {
          alert('Error marking todo completed: ' + response.error);
        }
      },
      error => {
        alert('Error: ' + error.message);
      });
    }
  
    deleteTodo(id: number) {
      this.todoService.deleteTodo(id).subscribe((response: any) => {
        if (response.result === 1){
          this.loadTodos();
          alert('To-do item is deleted successfully!');
        }
        else {
          alert('Error delete todo: ' + response.error);
        }
      },
      error => {
        alert('Error: ' + error.message);
      });
    }

    startEditing(todo: Todo) {
      this.editingTodo = { ...todo };
      this.updatedTitle = todo.title;
    }
  
    cancelEditing() {
      this.editingTodo = null;
      this.updatedTitle = '';
    }
  
    saveTodo() {
      if (this.editingTodo) {
        this.editingTodo.title = this.updatedTitle;
        this.todoService.updateTodo(this.editingTodo).subscribe((response: any) => {
          if (response.result === 1){
            this.cancelEditing();
            this.loadTodos();
            alert('To-do item is updated successfully!');
          }
          else {
            alert('Error update todo: ' + response.error);
          }
        },
        error => {
          alert('Error: ' + error.message);
        });
      }
    }
}
