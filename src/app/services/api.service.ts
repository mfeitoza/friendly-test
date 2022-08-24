import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, startWith } from 'rxjs/operators';
import { WorkdOrderDto, WorkOrder } from '../models/work-order';

interface Response<T> {
  exec_time: number;
  response: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    data: T;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWorkOrders() {
    return this.http.get<Response<WorkdOrderDto[]>>('assets/data.json').pipe(
      map(({ response: { data } }) => ({
        data: data.map((order) => new WorkOrder(order)),
        isLoading: false,
      })),
      startWith({
        data: [],
        isLoading: true,
      })
    );
  }
}
