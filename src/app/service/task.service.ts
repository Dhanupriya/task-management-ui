import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  addTasksURL: string = 'http://localhost:8080/taskManagement/addTask';
  viewTasksURL: string = 'http://localhost:8080/taskManagement/viewTasks';
  completeTasksURL: string = 'http://localhost:8080/taskManagement/completeTask/';

  constructor(private http: HttpClient) {
  }

  addTask(taskDescription: any, taskDate: any): Observable<any> {
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.addTasksURL, JSON.stringify({
      taskDescription: taskDescription,
      taskDate: taskDate
    }), {'headers': headers});
  }

  viewTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.viewTasksURL);
  }

  completeTask(id: bigint) {
    return this.http.delete<any>(this.completeTasksURL + id);
  }
}
