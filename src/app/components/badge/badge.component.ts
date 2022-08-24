import { Component, OnInit, Input } from '@angular/core';

export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent implements OnInit {
  @Input() color: Color = 'secondary';

  constructor() {}

  ngOnInit(): void {}
}
