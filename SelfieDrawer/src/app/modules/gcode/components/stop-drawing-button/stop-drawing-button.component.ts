import { Router } from '@angular/router';
import { GcodeViewerService } from './../../services/gcode-viewer.service';
import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../../../../services/backend-connect.service';

@Component({
  selector: 'app-stop-drawing-button',
  templateUrl: './stop-drawing-button.component.html',
  styleUrls: ['./stop-drawing-button.component.scss'],
})
export class StopDrawingButtonComponent implements OnInit {
  constructor(
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService,
    private router: Router
  ) {}

  showConf: boolean = false;

  ngOnInit(): void {}

  stop() {
    this.backendConnectService.stop();
    this.showConf = false;
    this.router.navigate(['start']);
  }

  cancle() {
    this.showConf = false;
  }
}
