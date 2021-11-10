import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { CameraServiceService } from '../../../../services/camera-service.service';
import { BackendConnectService } from '../../../../services/backend-connect.service';

@Component({
  selector: 'app-cancle-button',
  templateUrl: './cancle-button.component.html',
  styleUrls: ['./cancle-button.component.scss'],
})
export class CancleButtonComponent implements OnInit {
  constructor(
    private gcodeViewerService: GcodeViewerService,
    private router: Router,
    private cameraService: CameraServiceService,
    private backendConnectService: BackendConnectService
  ) {}

  ngOnInit(): void {}

  cancle() {
    this.gcodeViewerService.gcodeFile = '';
    this.gcodeViewerService.maxLines = 0;
    this.cameraService.webcamImage = null;
    this.backendConnectService.cancle();
    this.router.navigate(['']);
  }
}
