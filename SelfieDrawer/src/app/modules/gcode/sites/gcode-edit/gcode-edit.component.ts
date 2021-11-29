import { Component, OnInit } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { SiteStateService } from '../../../../services/site-state.service';

@Component({
  templateUrl: './gcode-edit.component.html',
  styleUrls: ['./gcode-edit.component.scss'],
})
export class GcodeEditComponent implements OnInit {
  constructor(
    private gcodeViewerService: GcodeViewerService,
    private siteStateService: SiteStateService
  ) {}

  ngOnInit(): void {
    screen.orientation.lock('portrait');

    this.gcodeViewerService.isDrawing = false;
    this.gcodeViewerService.notRenderdLines = 0;
  }
}
