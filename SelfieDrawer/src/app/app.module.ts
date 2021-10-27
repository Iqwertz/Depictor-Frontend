import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';
import { GcodeComponent } from './sites/gcode/gcode.component';
import { CameraWindowComponent } from './components/camera-window/camera-window.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    TakeSelfieComponent,
    GcodeComponent,
    CameraWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
