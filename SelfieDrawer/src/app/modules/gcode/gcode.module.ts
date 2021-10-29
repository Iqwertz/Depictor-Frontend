import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GcodeRoutingModule } from './gcode-routing.module';
import { GcodeComponent } from './gcode.component';
import { GcodeViewerComponent } from './components/gcode-viewer/gcode-viewer.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { StartDrawComponent } from './components/start-draw/start-draw.component';
import { CancleButtonComponent } from './components/cancle-button/cancle-button.component';
import { SelectLinesSliderComponent } from './components/select-lines-slider/select-lines-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    GcodeComponent,
    GcodeViewerComponent,
    StartDrawComponent,
    CancleButtonComponent,
    SelectLinesSliderComponent,
  ],
  imports: [
    CommonModule,
    GcodeRoutingModule,
    MatSliderModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class GcodeModule {}
