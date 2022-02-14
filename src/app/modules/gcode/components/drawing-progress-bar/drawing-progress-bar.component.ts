import { Component, OnInit, Input } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { environment } from '../../../../../environments/environment';

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

  calcRemainingTime(prog: number, max: number): string {
    let seconds = (max - prog) * environment.avgTimePerLine;
    let min: number = Math.floor((seconds / 60) % 60);
    let hours: number = Math.floor(seconds / 60 / 60);

    let res: string = '';

    if (hours > 0) {
      res += hours + 'h ';
    }
    res += min + 'min';

    return res;
  }
}
