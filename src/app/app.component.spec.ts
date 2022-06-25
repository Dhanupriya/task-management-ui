import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TaskService} from './service/task.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let dummyTasks = [
    {
      "id": 13,
      "taskDescription": "learn react",
      "taskDate": "2022-10-28"
    }
  ];
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockTaskService = {
    viewTasks() {
      return of(dummyTasks);
    },
    addTask() {
      return of(1);
    },
    completeTask() {
      return of(1);
    },
  };

  beforeEach(async () => {
    spyOn(mockTaskService, 'addTask').and.callThrough();
    spyOn(mockTaskService, 'viewTasks').and.callThrough();
    spyOn(mockTaskService, 'completeTask').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: TaskService, useValue: mockTaskService}, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.taskList = [
      {
        "id": 13,
        "taskDescription": "learn react",
        "taskDate": "2022-10-28",
        "checked": false
      },
      {
        "id": 35,
        "taskDescription": "learn angular",
        "taskDate": "2022-10-05",
        "checked": true
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing AppComponent :: addTask', () => {
    component.addTaskForm.value.taskDescription = "task-1";
    component.addTaskForm.value.taskDate = "2022-05-05";
    component.addTask();
    expect(component.taskList.length).toEqual(1);
    expect(mockTaskService.viewTasks).toHaveBeenCalled();
  });

  it('Testing AppComponent :: completeTask', () => {
    component.completeTask();
    expect(mockTaskService.viewTasks).toHaveBeenCalled();
    expect(component.showAddTaskForm).toBeFalsy();
  });

  it('Testing AppComponent :: viewTasks', () => {
    component.viewTasks();
    expect(mockTaskService.viewTasks).toHaveBeenCalled();
    expect(component.showAddTaskForm).toBeFalsy();
  });

});
