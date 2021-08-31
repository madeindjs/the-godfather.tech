import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../board.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;

  constructor() {}

  ngOnInit(): void {}
}
