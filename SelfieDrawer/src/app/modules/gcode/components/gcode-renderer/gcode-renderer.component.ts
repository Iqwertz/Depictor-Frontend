import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as p5 from 'p5';
import { GcodeViewerService } from '../../services/gcode-viewer.service';
import { Subject } from 'rxjs';

export interface GcodeRendererConfigInput {
  strokeColor?: string;
  strokeColorPassive?: string;
  strokeWidth?: number;
  notRenderdLines?: number;
  gcodeScale?: number;
  drawing?: boolean;
}

export interface GcodeRendererConfig {
  strokeColor: string;
  strokeColorPassive: string;
  strokeWidth: number;
  notRenderdLines: number;
  gcodeScale: number;
  drawing: boolean;
}

@Component({
  selector: 'app-gcode-renderer',
  templateUrl: './gcode-renderer.component.html',
  styleUrls: ['./gcode-renderer.component.scss'],
})
export class GcodeRendererComponent implements AfterViewInit {
  canvas: p5 | null = null;
  strokeColor = '#2E2E2E';
  drawingStrokeColor = '#9e9e9e';
  offset: number[] = [0, 0];
  lastDrawingCommand: string = '';

  $renderGcode: Subject<void> = new Subject<void>();
  $updateDrawingGcode: Subject<void> = new Subject<void>();

  sketch: any;

  @Input('gcode') gcodeFile: string = '';

  @Input('config') rendererConfigInput: GcodeRendererConfigInput = {};

  progress: number = 0;

  rendererConfig: GcodeRendererConfig = {
    drawing: false,
    gcodeScale: 0,
    notRenderdLines: 0,
    strokeColor: '',
    strokeColorPassive: '',
    strokeWidth: 0,
  };

  constructor(private gcodeViewerService: GcodeViewerService) {}

  containerId: string = new Date().getTime().toString();

  renderGcode(file: string, config: GcodeRendererConfigInput) {
    this.gcodeFile = file;
    this.rendererConfig = {
      gcodeScale: config.gcodeScale || 4.5,
      notRenderdLines: config.notRenderdLines || 0,
      strokeColor: config.strokeColor || '#2E2E2E',
      strokeColorPassive: config.strokeColorPassive || '#9e9e9e',
      strokeWidth: config.strokeWidth || 1,
      drawing: config.drawing || false,
    };

    this.$renderGcode.next();
  }

  updateDrawingGcode(prog: number) {
    this.progress = prog;
    this.$updateDrawingGcode.next();
  }

  ngAfterViewInit(): void {
    this.sketch = (s: any) => {
      let that = this;
      let bounds;
      let lastDrawingPosition = 0;
      s.setup = () => {
        let width = s.windowWidth / 2;
        if (width < 700) {
          width = s.windowWidth - 20;
        }
        let canvas2 = s.createCanvas(width, s.windowHeight - 200);
        canvas2.parent(this.containerId);
        s.strokeWeight(3);

        s.rect(0, 0, s.width, s.height, 15);
        s.fill(0);

        this.$renderGcode.subscribe(() => {
          renderGcode();
        });

        this.$updateDrawingGcode.subscribe(() => {
          updateDrawingGcode();
        });
      };

      s.draw = () => {};

      function updateDrawingGcode() {
        if (that.progress > lastDrawingPosition) {
          let commands: string[] = that.gcodeFile.split(/\r?\n/);
          let snippet = commands.slice(lastDrawingPosition, that.progress);
          if (snippet[snippet.length - 1].startsWith('G')) {
            drawGcode(
              snippet.join('\n'),
              that.rendererConfig.gcodeScale,
              that.rendererConfig.strokeColor,
              that.rendererConfig.notRenderdLines,
              that.offset,
              false,
              true,
              that.lastDrawingCommand
            );

            that.lastDrawingCommand = snippet[snippet.length - 1];
            lastDrawingPosition = that.progress;
          }
        }
      }

      function test() {
        console.log('skadajkdopsakdpo');
      }
      function renderGcode() {
        //   scales the gcode to fit window and centers it
        bounds = getBiggestValue(that.gcodeFile);

        that.offset = [0, 0];

        if (s.width / s.height < bounds[0] / bounds[1]) {
          //can be optimized when called only once per new gcode file (not at any change)
          that.rendererConfig.gcodeScale = s.width / bounds[0];
          that.offset[1] =
            (s.height - bounds[1] * that.rendererConfig.gcodeScale) / 2;
        } else {
          that.rendererConfig.gcodeScale = s.height / bounds[1];
          that.offset[0] =
            (s.width - bounds[0] * that.rendererConfig.gcodeScale) / 2;
        }

        let color: string = that.rendererConfig.strokeColor;
        if (that.rendererConfig.drawing) {
          color = that.rendererConfig.strokeColorPassive;
        }

        console.log(color);

        //renders gcode
        drawGcode(
          that.gcodeFile,
          that.rendererConfig.gcodeScale,
          color,
          that.rendererConfig.notRenderdLines,
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

    this.canvas = new p5(this.sketch);
  }
}
