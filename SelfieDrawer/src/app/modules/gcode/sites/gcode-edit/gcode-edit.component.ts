import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { SiteStateService } from '../../../../services/site-state.service';
import { GcodeRendererComponent } from '../../components/gcode-renderer/gcode-renderer.component';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetAutoRouting } from '../../../../store/app.action';
@Component({
  templateUrl: './gcode-edit.component.html',
  styleUrls: ['./gcode-edit.component.scss'],
})
export class GcodeEditComponent implements OnInit, AfterViewInit {
  constructor(
    public gcodeViewerService: GcodeViewerService,
    private backendConnectService: BackendConnectService,
    private siteStateService: SiteStateService,
    private store: Store
  ) {}

  @ViewChild(GcodeRendererComponent) renderer:
    | GcodeRendererComponent
    | undefined;

  notRenderdLines: number = 0;

  ngOnInit(): void {
    screen.orientation.lock('portrait');

    this.gcodeViewerService.$renderGcode.subscribe(() => {
      this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
        notRenderdLines: 0,
      });
    });
  }

  ngAfterViewInit() {
    this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
      notRenderdLines: 0,
    });
  }

  sliderUpdated(nRL: number) {
    this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
      notRenderdLines: nRL,
    });

    this.notRenderdLines = nRL;
  }

  startDraw() {
    this.store.dispatch(new SetAutoRouting(true));

    let serverGcode: string = this.gcodeViewerService.gcodeFile;
    let gcodeArray: string[] = serverGcode.split('\n');

    console.log(this.notRenderdLines);
    let strippedGcode: string = gcodeArray
      .slice(0, this.notRenderdLines * -1)
      .join('\n');

    strippedGcode = this.applyOffset(strippedGcode);

    strippedGcode += environment.endGcode;
    this.backendConnectService.postGcode(strippedGcode);
  }

  applyOffset(gcode: string): string {
    let gcodeArray: string[] = gcode.split('\n');

    for (let i = 0; i < gcodeArray.length; i++) {
      let command = gcodeArray[i];
      if (command.startsWith('G1')) {
        let parameter = this.getG1Parameter(command);
        parameter[0] += environment.drawingOffset[0];
        parameter[1] += environment.drawingOffset[1];
        gcodeArray[i] = 'G1 X' + parameter[0] + 'Y ' + parameter[1];
      }
    }

    return gcodeArray.join('\n');
  }

  getG1Parameter(command: string): number[] {
    let x: number = parseFloat(
      command
        .substring(command.indexOf('X') + 1, command.lastIndexOf('Y'))
        .trim()
    );
    let y: number = parseFloat(
      command.substring(command.indexOf('Y') + 1, command.length).trim()
    );
    return [x, y];
  }
}
