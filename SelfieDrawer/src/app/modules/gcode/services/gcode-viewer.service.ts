import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GcodeViewerService {
  maxLines: number = 0;
  notRenderdLines: number = 0;
  gcodeFile: string = '';
  gcodeFileChanged: boolean = false;
  gcodeScale: number = 2.7;

  constructor() {}
}
