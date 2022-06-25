import {TestBed} from '@angular/core/testing';
import {TaskService} from './task.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TaskService', () => {
  let taskService: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    taskService = TestBed.inject(TaskService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('TaskService should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('Testing TaskService :: viewTasks', () => {
    const dummyTasks = [
      {
        "id": 13,
        "taskDescription": "learn react",
        "taskDate": "2022-10-28"
      },
      {
        "id": 24,
        "taskDescription": "learn angular",
        "taskDate": "2023-05-30"
      },
      {
        "id": 10,
        "taskDescription": "learn oracle",
        "taskDate": "2022-01-28"
      },
      {
        "id": 15,
        "taskDescription": "profit",
        "taskDate": "2023-04-30"
      }
    ];

    taskService.viewTasks().subscribe(tasks => {
      expect(tasks.length).toBe(4);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${taskService.serviceURL}/viewTasks`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyTasks);
  });

  it('Testing TaskService :: addTask', () => {
    taskService.addTask("testing :: learn", "2022-01-01").subscribe(id => {
      expect(id).toEqual(1);
    });

    const req = httpMock.expectOne(`${taskService.serviceURL}/addTask`);
    expect(req.request.method).toBe("POST");
    req.flush(1);
  });

  it('Testing TaskService :: completeTask', () => {
    taskService.completeTask([1, 2, 3]).subscribe(() => {
    });

    const req = httpMock.expectOne(`${taskService.serviceURL}/completeTask`);
    expect(req.request.method).toBe("POST");
    req.flush(1);
  });
});
