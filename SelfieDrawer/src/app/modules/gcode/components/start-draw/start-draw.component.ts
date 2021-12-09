import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-draw',
  templateUrl: './start-draw.component.html',
  styleUrls: ['./start-draw.component.scss'],
})
export class StartDrawComponent implements OnInit {
  constructor() {}

  @Output() clicked = new EventEmitter<number>();

  ngOnInit(): void {}

  startDraw() {
    this.clicked.emit();
  }
}
