import { Component, OnInit } from '@angular/core';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { Select } from '@ngxs/store';
import { AppState } from '../../../../store/app.state';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-draw',
  templateUrl: './start-draw.component.html',
  styleUrls: ['./start-draw.component.scss'],
})
export class StartDrawComponent implements OnInit {
  constructor(
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService
  ) {}

  ngOnInit(): void {}

  startDraw() {
    let serverGcode: string = this.gcodeViewerService.gcodeFile;

    //console.log(serverGcode);
    let gcodeArray: string[] = serverGcode.split('\n');

    console.log(this.gcodeViewerService.notRenderdLines);
    let strippedGcode: string = gcodeArray
      .slice(0, this.gcodeViewerService.notRenderdLines * -1)
      .join('\n');

    strippedGcode += environment.endGcode;
    this.backendConnectService.postGcode(strippedGcode);
  }
}
