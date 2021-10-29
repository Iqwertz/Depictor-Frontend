import { Component, OnInit, ɵRender3NgModuleRef } from '@angular/core';
import * as p5 from 'p5';
import { Select } from '@ngxs/store';
import { AppState } from '../../../../store/app.state';

@Component({
  selector: 'app-gcode-viewer',
  templateUrl: './gcode-viewer.component.html',
  styleUrls: ['./gcode-viewer.component.scss'],
})
export class GcodeViewerComponent implements OnInit {
  canvas: any;
  sw: number = 2;
  strokeColor = 0;

  gcodeFile: string = '';
  gcodeFileChanged: boolean = false;

  @Select(AppState.serverGcode)
  serverGcode$: any;

  constructor() {}

  ngOnInit(): void {
    this.serverGcode$.subscribe((serverGcode: string) => {
      this.gcodeFile = serverGcode;
      this.gcodeFileChanged = true;
    });

    const sketch = (s: any) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth / 2, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
        s.strokeWeight(this.sw + 1);

        s.rect(0, 0, s.width, s.height, 15);
        s.fill(0);
      };

      s.draw = () => {
        if (this.gcodeFileChanged) {
          renderGcode(this.gcodeFile);
          this.gcodeFileChanged = false;
        }
      };

      function renderGcode(gcode: string) {
        s.strokeWeight(1);

        let commands: string[] = gcode.split(/\r?\n/);
        let isPenDown: boolean = false;

        let lastCommandParameter: number[] = [0, 0];
        for (let command of commands) {
          if (command.startsWith('G1')) {
            let parameter: number[] = getG1Parameter(command);
            if (isPenDown) {
              s.line(
                lastCommandParameter[1],
                lastCommandParameter[0],
                parameter[1],
                parameter[0]
              );
            }
            lastCommandParameter = parameter;
          } else if (command.startsWith('M05')) {
            isPenDown = false;
          } else if (command.startsWith('M03')) {
            isPenDown = true;
          }
        }
      }

      function getG1Parameter(command: string): number[] {
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
    };

    this.canvas = new p5(sketch);
  }
}
