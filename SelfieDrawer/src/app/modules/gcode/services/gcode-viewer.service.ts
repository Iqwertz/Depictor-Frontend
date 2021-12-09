import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GcodeViewerService {
  maxLines: number = 0;
  gcodeFile: string = '';

  $renderGcode: Subject<void> = new Subject<void>();

  constructor() {}

  setGcodeFile(file: string) {
    this.gcodeFile = file;
    this.maxLines = this.gcodeFile.split(/\r?\n/).length;
    this.$renderGcode.next();
  }
}
