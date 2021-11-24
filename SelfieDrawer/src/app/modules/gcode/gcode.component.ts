import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { SetServerGcode } from 'src/app/store/app.action';
import { BackendConnectService } from '../../services/backend-connect.service';
import { GcodeViewerService } from './services/gcode-viewer.service';

@Component({
  selector: 'app-gcode',
  templateUrl: './gcode.component.html',
  styleUrls: ['./gcode.component.scss'],
})
export class GcodeComponent implements OnInit {
  constructor(private gcodeViewerService: GcodeViewerService) {}

  ngOnInit(): void {
    screen.orientation.lock('portrait');

    this.gcodeViewerService.isDrawing = false;
    this.gcodeViewerService.notRenderdLines = 0;
  }
}
