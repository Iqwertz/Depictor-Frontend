import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GcodeRoutingModule } from './gcode-routing.module';
import { GcodeComponent } from './gcode.component';
import { GcodeViewerComponent } from './components/gcode-viewer/gcode-viewer.component';


@NgModule({
  declarations: [
    GcodeComponent,
    GcodeViewerComponent
  ],
  imports: [
    CommonModule,
    GcodeRoutingModule
  ]
})
export class GcodeModule { }
