import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiUrl = 'https://localhost:44301/Todoitem';

  constructor(
    private http: HttpClient
    ) { }
  
    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
      }
    
      getTodoById(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiUrl}/${id}`);
      }
    
      createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
      }
    
      updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
      }
    
      markComplete(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/complete`, {});
      }
    
      deleteTodo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
}
