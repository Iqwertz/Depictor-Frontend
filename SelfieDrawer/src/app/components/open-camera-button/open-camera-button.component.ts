import { Component, OnInit } from '@angular/core';
import { CameraServiceService } from '../../services/camera-service.service';

@Component({
  selector: 'app-open-camera-button',
  templateUrl: './open-camera-button.component.html',
  styleUrls: ['./open-camera-button.component.scss'],
})
export class OpenCameraButtonComponent implements OnInit {
  constructor(public cameraService: CameraServiceService) {}

  ngOnInit(): void {}

  open() {
    this.cameraService.toggleCameraWindow();
  }
}
