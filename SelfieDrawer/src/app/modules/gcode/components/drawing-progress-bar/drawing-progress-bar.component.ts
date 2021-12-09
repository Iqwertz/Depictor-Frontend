import { Component, OnInit, Input } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

@Component({
  selector: 'app-drawing-progress-bar',
  templateUrl: './drawing-progress-bar.component.html',
  styleUrls: ['./drawing-progress-bar.component.scss'],
})
export class DrawingProgressBarComponent implements OnInit {
  constructor(public gcodeViewerService: GcodeViewerService) {}

  ngOnInit(): void {}

  @Input('progress') progress: number = 0;

  calcProgressInPercent(prog: number, max: number): number {
    return Math.round((prog * 100) / max);
  }
}
