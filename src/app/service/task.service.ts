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
  headers = {'content-type': 'application/json'}

  constructor(private http: HttpClient) {
  }

  addTask(taskDescription: any, taskDate: any): Observable<any> {
    return this.http.post(this.addTasksURL, JSON.stringify({
      taskDescription: taskDescription,
      taskDate: taskDate
    }), {'headers': this.headers});
  }

  viewTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.viewTasksURL);
  }

  completeTask(idList: bigint[]) {
    return this.http.post<any>(this.completeTasksURL , idList, {'headers': this.headers});
  }
}
