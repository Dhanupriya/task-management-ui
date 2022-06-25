import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  serviceURL: string = 'http://localhost:8080/taskManagement';
  headers = {'content-type': 'application/json'}

  constructor(private http: HttpClient) {
  }

  addTask(taskDescription: any, taskDate: any): Observable<any> {
    return this.http.post(`${this.serviceURL}/addTask`, JSON.stringify({
      taskDescription: taskDescription,
      taskDate: taskDate
    }), {'headers': this.headers});
  }

  viewTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.serviceURL}/viewTasks`);
  }

  completeTask(idList: number[]) {
    return this.http.post<any>(`${this.serviceURL}/completeTask`, idList, {'headers': this.headers});
  }
}
