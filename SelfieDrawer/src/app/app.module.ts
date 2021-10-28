import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';
import { GcodeComponent } from './sites/gcode/gcode.component';
import { CameraWindowComponent } from './components/camera-window/camera-window.component';
import { WebcamModule } from 'ngx-webcam';
import { CameraTriggerComponent } from './components/camera-trigger/camera-trigger.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpenCameraButtonComponent } from './components/open-camera-button/open-camera-button.component';
import { FlashComponent } from './components/flash/flash.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeSelfieComponent,
    GcodeComponent,
    CameraWindowComponent,
    CameraTriggerComponent,
    OpenCameraButtonComponent,
    FlashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
