import {Component, OnInit} from '@angular/core';
import {TaskService} from '../service/task.service';
import {FormBuilder} from '@angular/forms';
import {Task} from '../models/task';

@Component({
  selector: 'app-tasker',
  templateUrl: './tasker.component.html',
  styleUrls: ['./tasker.component.scss']
})
export class TaskerComponent implements OnInit {
  taskList: Task[] = [];
  showAddTaskForm: boolean = false;
  addTaskForm = this.fb.group({
    taskDescription: '',
    taskDate: '',
    taskCB: false
  });

  constructor(private taskService: TaskService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.viewTasks();
  }

  addTask(): void {
    this.taskService.addTask(this.addTaskForm.value.taskDescription, this.addTaskForm.value.taskDate)
      .subscribe(() => this.viewTasks());
    this.addTaskForm.reset();
  }

  completeTask(): void {
    let ids : bigint[] = this.taskList
        .filter(t => t.checked)
        .map(t => t.id);
    this.taskService.completeTask(ids)
        .subscribe(() => {
              this.viewTasks();
              if(this.showAddTaskForm) {
                this.showAddTaskForm = !this.showAddTaskForm
              }
        });
  }

  viewTasks(): void {
    this.taskService.viewTasks()
      .subscribe(taskList => (this.taskList = taskList.reverse()));
  }

  enableAddTaskForm(): void {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

}
