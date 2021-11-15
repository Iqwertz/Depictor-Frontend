import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CameraServiceService } from '../../services/camera-service.service';
import { SiteStateService } from '../../services/site-state.service';

@Component({
  templateUrl: './take-selfie.component.html',
  styleUrls: ['./take-selfie.component.scss'],
})
export class TakeSelfieComponent implements OnInit {
  constructor(public cameraService: CameraServiceService) {}

  enableCameraAPI: boolean = environment.useCameraAPI;

  ngOnInit(): void {}
}
