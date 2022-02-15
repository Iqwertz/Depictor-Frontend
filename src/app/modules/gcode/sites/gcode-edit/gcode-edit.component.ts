import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { SiteStateService } from '../../../../services/site-state.service';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetAutoRouting } from '../../../../store/app.action';
import { Router } from '@angular/router';
import { CanvasGcodeRendererComponent } from '../../components/canvas-gcode-renderer/canvas-gcode-renderer.component';
@Component({
  templateUrl: './gcode-edit.component.html',
  styleUrls: ['./gcode-edit.component.scss'],
})
export class GcodeEditComponent implements OnInit, AfterViewInit {
  constructor(
    public gcodeViewerService: GcodeViewerService,
    private backendConnectService: BackendConnectService,
    private siteStateService: SiteStateService,
    private store: Store,
    private router: Router
  ) {}

  @ViewChild(CanvasGcodeRendererComponent) renderer:
    | CanvasGcodeRendererComponent
    | undefined;

  notRenderdLines: number = 0;
  estimatedSeconds: number = 0;

  ngOnInit(): void {
    screen.orientation.lock('portrait');

    this.gcodeViewerService.$renderGcode.subscribe(() => {
      this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
        notRenderdLines: 0,
      });
      this.estimatedSeconds =
        this.gcodeViewerService.maxLines * environment.avgTimePerLine;

      console.log(this.estimatedSeconds);
    });
  }

  ngAfterViewInit() {
    this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
      notRenderdLines: 0,
    });
    this.estimatedSeconds =
      this.gcodeViewerService.maxLines * environment.avgTimePerLine;
  }

  sliderUpdated(nRL: number) {
    this.renderer?.renderGcode(this.gcodeViewerService.gcodeFile, {
      notRenderdLines: nRL,
    });

    this.estimatedSeconds =
      (this.gcodeViewerService.maxLines - nRL) * environment.avgTimePerLine;
    this.notRenderdLines = nRL;
  }

  startDraw() {
    this.store.dispatch(new SetAutoRouting(true));

    let serverGcode: string = this.gcodeViewerService.gcodeFile;
    let gcodeArray: string[] = serverGcode.split('\n');

    gcodeArray = this.replacePenDownCommand(gcodeArray);

    let strippedGcode: string = gcodeArray
      .slice(0, this.notRenderdLines * -1)
      .join('\n');

    strippedGcode = this.applyOffset(
      strippedGcode,
      environment.gcodeRendererDefault.drawingOffset
    );

    strippedGcode += environment.endGcode;
    this.backendConnectService.postGcode(strippedGcode);
    this.router.navigate(['gcode', 'drawing']);
  }

  replacePenDownCommand(gcode: string[]): string[] {
    for (let i = 0; i < gcode.length; i++) {
      if (gcode[i].includes('M03')) {
        gcode[i] = environment.penDownCommand;
      }
    }
    return gcode;
  }

  applyOffset(gcode: string, offset: number[]): string {
    let gcodeArray: string[] = gcode.split('\n');

    for (let i = 0; i < gcodeArray.length; i++) {
      let command = gcodeArray[i];
      if (command.startsWith('G1')) {
        let parameter = this.getG1Parameter(command);
        parameter[0] += offset[0];
        parameter[1] += offset[1];
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
