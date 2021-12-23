import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SiteStateService } from '../../../../services/site-state.service';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { GcodeRendererComponent } from '../../components/gcode-renderer/gcode-renderer.component';

@Component({
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss'],
})
export class DrawingComponent implements OnInit, AfterViewInit {
  constructor(
    private siteState: SiteStateService,
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService
  ) {}

  @ViewChild(GcodeRendererComponent) renderer:
    | GcodeRendererComponent
    | undefined;

  drawingProgress: number = 0;

  ngOnInit(): void {
    this.gcodeViewerService.$renderGcode.subscribe(() => {
      this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
        notRenderdLines: 0,
        drawing: true,
      });
    });

    this.updateDrawingProgress();
  }

  ngAfterViewInit(): void {
    this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
      notRenderdLines: 0,
      drawing: true,
    });
  }

  updateDrawingProgress() {
    this.backendConnectService.checkDrawingProgress().subscribe((res: any) => {
      if (res.data) {
        this.renderer?.updateDrawingGcode(res.data);
        this.drawingProgress = res.data;
      }
    });

    setTimeout(() => {
      this.updateDrawingProgress();
    }, 400);
  }
}
