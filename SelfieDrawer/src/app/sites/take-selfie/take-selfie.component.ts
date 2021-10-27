import { Component, OnInit } from '@angular/core';
import { CameraServiceService } from '../../services/camera-service.service';

@Component({
  templateUrl: './take-selfie.component.html',
  styleUrls: ['./take-selfie.component.scss'],
})
export class TakeSelfieComponent implements OnInit {
  constructor(public cameraService: CameraServiceService) {}

  ngOnInit(): void {}
}
