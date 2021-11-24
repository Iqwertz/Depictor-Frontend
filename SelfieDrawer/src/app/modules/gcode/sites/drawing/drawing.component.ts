import { Component, OnInit } from '@angular/core';
import { SiteStateService } from '../../../../services/site-state.service';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

@Component({
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss'],
})
export class DrawingComponent implements OnInit {
  constructor(
    private siteState: SiteStateService,
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService
  ) {}

  ngOnInit(): void {
    this.gcodeViewerService.isDrawing = true;
    this.gcodeViewerService.notRenderdLines = 0;
    this.updateDrawingProgress();
  }

  updateDrawingProgress() {
    this.backendConnectService.checkDrawingProgress().subscribe((res: any) => {
      if (res.data) {
        this.gcodeViewerService.drawingProgress = res.data;
        this.gcodeViewerService.$updateDrawingGcode.next();
      }
    });

    setTimeout(() => {
      this.updateDrawingProgress();
    }, 400);
  }
}
