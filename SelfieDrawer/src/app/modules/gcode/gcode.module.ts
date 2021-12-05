import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GcodeRoutingModule } from './gcode-routing.module';
import { GcodeComponent } from './gcode.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { GcodeViewerComponent } from './components/gcode-viewer/gcode-viewer.component';
import { StartDrawComponent } from './components/start-draw/start-draw.component';
import { GcodeEditComponent } from './sites/gcode-edit/gcode-edit.component';
import { DrawingProgressBarComponent } from './components/drawing-progress-bar/drawing-progress-bar.component';
import { DrawingComponent } from './sites/drawing/drawing.component';
import { CancleButtonComponent } from './components/cancle-button/cancle-button.component';
import { SelectLinesSliderComponent } from './components/select-lines-slider/select-lines-slider.component';

@NgModule({
  declarations: [
    GcodeComponent,
    GcodeViewerComponent,
    StartDrawComponent,
    GcodeEditComponent,
    DrawingComponent,
    DrawingProgressBarComponent,
    CancleButtonComponent,
    SelectLinesSliderComponent,
  ],
  imports: [CommonModule, GcodeRoutingModule, MatSliderModule, FormsModule],
})
export class GcodeModule {}
