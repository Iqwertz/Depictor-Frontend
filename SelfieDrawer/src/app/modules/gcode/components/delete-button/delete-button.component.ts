import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent implements OnInit {
  constructor(
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService,
    private router: Router
  ) {}

  showConf: boolean = false;

  ngOnInit(): void {}

  del() {
    this.backendConnectService.delete(this.gcodeViewerService.gcodeId);
    this.showConf = false;
    this.router.navigate(['gcode', 'gallery']);
  }

  cancle() {
    this.showConf = false;
  }
}
