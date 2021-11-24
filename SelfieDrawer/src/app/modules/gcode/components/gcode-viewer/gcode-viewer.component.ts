import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Select } from '@ngxs/store';
import { AppState } from '../../../../store/app.state';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { BackendConnectService } from '../../../../services/backend-connect.service';

@Component({
  selector: 'app-gcode-viewer',
  templateUrl: './gcode-viewer.component.html',
  styleUrls: ['./gcode-viewer.component.scss'],
})
export class GcodeViewerComponent implements OnInit {
  canvas: any;
  strokeColor = '#2E2E2E';
  drawingStrokeColor = '#9e9e9e';
  offset: number[] = [0, 0];
  lastDrawingCommand: string = '';

  @Select(AppState.serverGcode)
  serverGcode$: any;

  constructor(private gcodeViewerService: GcodeViewerService) {}

  ngOnInit(): void {
    this.serverGcode$.subscribe((serverGcode: string) => {
      this.gcodeViewerService.gcodeFile = serverGcode;
      this.gcodeViewerService.maxLines =
        this.gcodeViewerService.gcodeFile.split(/\r?\n/).length;
      // this.gcodeViewerService.gcodeFileChanged = true;
      this.gcodeViewerService.$renderGcode.next();
    });

    const sketch = (s: any) => {
      let that = this;
      let bounds;
      let lastDrawingPosition = 0;

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

        this.gcodeViewerService.$renderGcode.subscribe(() => {
          renderGcode();
        });

        this.gcodeViewerService.$updateDrawingGcode.subscribe(() => {
          updateDrawingGcode();
        });
      };

      s.draw = () => {};

      function updateDrawingGcode() {
        if (that.gcodeViewerService.drawingProgress > lastDrawingPosition) {
          let commands: string[] =
            that.gcodeViewerService.gcodeFile.split(/\r?\n/);
          let snippet = commands.slice(
            lastDrawingPosition,
            that.gcodeViewerService.drawingProgress
          );

          console.log(
            lastDrawingPosition,
            that.gcodeViewerService.drawingProgress
          );
          if (snippet[snippet.length - 1].startsWith('G')) {
            drawGcode(
              snippet.join('\n'),
              that.gcodeViewerService.gcodeScale,
              that.strokeColor,
              that.gcodeViewerService.notRenderdLines,
              that.offset,
              false,
              true,
              that.lastDrawingCommand
            );

            that.lastDrawingCommand = snippet[snippet.length - 1];
            lastDrawingPosition = that.gcodeViewerService.drawingProgress;
          }
        }
      }

      function renderGcode() {
        //   scales the gcode to fit window and centers it
        bounds = getBiggestValue(that.gcodeViewerService.gcodeFile);

        that.offset = [0, 0];

        if (s.width / s.height < bounds[0] / bounds[1]) {
          //can be optimized when called only once per new gcode file (not at any change)
          that.gcodeViewerService.gcodeScale = s.width / bounds[0];
          that.offset[1] =
            (s.height - bounds[1] * that.gcodeViewerService.gcodeScale) / 2;
        } else {
          that.gcodeViewerService.gcodeScale = s.height / bounds[1];
          that.offset[0] =
            (s.width - bounds[0] * that.gcodeViewerService.gcodeScale) / 2;
        }

        let color: string = that.strokeColor;
        if (that.gcodeViewerService.isDrawing) {
          color = that.drawingStrokeColor;
        }

        //renders gcode
        drawGcode(
          that.gcodeViewerService.gcodeFile,
          that.gcodeViewerService.gcodeScale,
          color,
          that.gcodeViewerService.notRenderdLines,
          that.offset,
          true,
          false,
          null
        );
      }

      function getBiggestValue(gcode: string): number[] {
        //determins the farthest cordinates
        let commands: string[] = gcode.split(/\r?\n/);
        let biggest: number[] = [0, 0];
        for (let cmd of commands) {
          let cords: number[] = getG1Parameter(cmd);
          if (cords[0] > biggest[0]) {
            biggest[0] = cords[0];
          }
          if (cords[1] > biggest[1]) {
            biggest[1] = cords[1];
          }
        }

        return biggest;
      }

      function drawGcode(
        gcode: string,
        scale: number,
        c: any,
        notRenderdLines: number,
        offset: number[],
        clear: boolean,
        ignorePen: boolean,
        startCommand: string | null
      ) {
        if (clear) {
          s.strokeWeight(3);
          s.fill(255);
          s.rect(0, 0, s.width, s.height, 15);
        }

        s.stroke(c);
        s.strokeWeight(1);

        let commands: string[] = gcode.split(/\r?\n/);

        let isPenDown: boolean = false;

        let lastCommandParameter: number[] = [0, 0];

        if (startCommand) {
          lastCommandParameter = getG1Parameter(startCommand);
        }

        let renderedLines = commands.length - notRenderdLines;
        if (renderedLines <= 0) {
          renderedLines = 0;
        }

        for (let i = 0; i < renderedLines; i++) {
          let command: string = commands[i];

          if (command.startsWith('G1')) {
            let parameter: number[] = getG1Parameter(command);
            if (isPenDown || ignorePen) {
              s.line(
                lastCommandParameter[0] * scale + offset[0],
                lastCommandParameter[1] * scale + offset[1],
                parameter[0] * scale + offset[0],
                parameter[1] * scale + offset[1]
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
