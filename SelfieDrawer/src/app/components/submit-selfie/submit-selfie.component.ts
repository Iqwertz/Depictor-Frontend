import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../../services/backend-connect.service';

@Component({
  selector: 'app-submit-selfie',
  templateUrl: './submit-selfie.component.html',
  styleUrls: ['./submit-selfie.component.scss'],
})
export class SubmitSelfieComponent implements OnInit {
  constructor(private connectService: BackendConnectService) {}

  ngOnInit(): void {}

  submit(): void {
    this.connectService.postSelfie();
  }
}
