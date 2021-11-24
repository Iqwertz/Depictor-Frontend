import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GcodeViewerService {
  maxLines: number = 0;
  notRenderdLines: number = 0;
  gcodeFile: string = '';
  gcodeFileChanged: boolean = false;
  gcodeScale: number = 4.5;
  drawingProgress: number = 0;
  isDrawing: boolean = false;

  $renderGcode: Subject<void> = new Subject<void>();

  $updateDrawingGcode: Subject<void> = new Subject<void>();

  constructor() {}
}
