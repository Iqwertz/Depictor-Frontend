import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Select } from '@ngxs/store';
import { AppState } from '../../../../store/app.state';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

@Component({
  selector: 'app-gcode-viewer',
  templateUrl: './gcode-viewer.component.html',
  styleUrls: ['./gcode-viewer.component.scss'],
})
export class GcodeViewerComponent implements OnInit {
  canvas: any;
  strokeColor = '#2E2E2E';

  @Select(AppState.serverGcode)
  serverGcode$: any;

  constructor(private gcodeViewerService: GcodeViewerService) {}

  ngOnInit(): void {
    this.serverGcode$.subscribe((serverGcode: string) => {
      this.gcodeViewerService.gcodeFile = serverGcode;
      this.gcodeViewerService.maxLines =
        this.gcodeViewerService.gcodeFile.split(/\r?\n/).length;
      this.gcodeViewerService.gcodeFileChanged = true;
    });

    const sketch = (s: any) => {
      s.setup = () => {
        let width = s.windowWidth / 2;
        if (width < 700) {
          width = s.windowWidth - 20;
        }

        let canvas2 = s.createCanvas(width, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
        s.strokeWeight(3);

        s.rect(0, 0, s.width, s.height, 15);
        s.fill(0);
      };

      s.draw = () => {
        if (this.gcodeViewerService.gcodeFileChanged) {
          renderGcode(
            this.gcodeViewerService.gcodeFile,
            this.gcodeViewerService.gcodeScale,
            this.strokeColor,
            this.gcodeViewerService.notRenderdLines
          );
          this.gcodeViewerService.gcodeFileChanged = false;
        }
      };

      function renderGcode(
        gcode: string,
        scale: number,
        c: any,
        notRenderdLines: number
      ) {
        s.strokeWeight(3);
        s.fill(255);
        s.rect(0, 0, s.width, s.height, 15);

        s.stroke(c);
        s.strokeWeight(1);

        let commands: string[] = gcode.split(/\r?\n/);

        let isPenDown: boolean = false;

        let lastCommandParameter: number[] = [0, 0];
        let renderedLines = commands.length - notRenderdLines;
        if (renderedLines <= 0) {
          renderedLines = 0;
        }

        for (let i = 0; i < renderedLines; i++) {
          let command: string = commands[i];

          if (command.startsWith('G1')) {
            let parameter: number[] = getG1Parameter(command);
            if (isPenDown) {
              s.line(
                lastCommandParameter[1] * scale,
                lastCommandParameter[0] * scale,
                parameter[1] * scale,
                parameter[0] * scale
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
