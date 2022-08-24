import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, combineLatest } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

import { Color } from './components/badge/badge.component';
import {
  Priority,
  Status,
  WorkdOrderDto,
  WorkOrder,
} from './models/work-order';
import { ApiService } from './services/api.service';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

function filterByDescription(order: WorkOrder, term: string) {
  return order.description.toLowerCase().includes(term.toLowerCase());
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  workOrders$: Observable<{ data: WorkOrder[]; isLoading: boolean }>;
  filteredOrders$: Observable<WorkOrder[]>;
  searchTerm = new FormControl('');

  constructor(private api: ApiService) {
    this.workOrders$ = this.api.getWorkOrders();
    this.filteredOrders$ = combineLatest([
      this.workOrders$,
      this.searchTerm.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([{ data }, term]) => {
        return data.filter((order) => filterByDescription(order, term));
      })
    );
  }

  getPriorityColor(priority: Priority) {
    return {
      Low: 'success',
      Normal: 'primary',
      High: 'danger',
    }[priority] as Color;
  }

  getStatusColor(status: Status) {
    return {
      New: 'warning',
      Confirmed: 'primary',
      Canceled: 'danger',
      Completed: 'success',
    }[status] as Color;
  }
}
