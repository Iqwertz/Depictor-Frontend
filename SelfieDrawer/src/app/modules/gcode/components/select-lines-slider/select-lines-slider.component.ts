import { Component, OnInit } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

@Component({
  selector: 'app-select-lines-slider',
  templateUrl: './select-lines-slider.component.html',
  styleUrls: ['./select-lines-slider.component.scss'],
})
export class SelectLinesSliderComponent implements OnInit {
  constructor(public gcodeViewerService: GcodeViewerService) {}

  ngOnInit(): void {}

  sliderChanged() {
    this.gcodeViewerService.$renderGcode.next();
    //this.gcodeViewerService.gcodeFileChanged = true;
  }
}
