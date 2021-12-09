import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

@Component({
  selector: 'app-select-lines-slider',
  templateUrl: './select-lines-slider.component.html',
  styleUrls: ['./select-lines-slider.component.scss'],
})
export class SelectLinesSliderComponent implements OnInit {
  constructor(public gcodeViewerService: GcodeViewerService) {}

  notRenderdLines = 0;

  @Output() sliderUpdate = new EventEmitter<number>();

  ngOnInit(): void {}

  sliderChanged() {
    this.sliderUpdate.emit(this.notRenderdLines);
    //this.gcodeViewerService.gcodeFileChanged = true;
  }
}
