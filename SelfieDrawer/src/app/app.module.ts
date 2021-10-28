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
import { SelfieDisplayComponent } from './components/selfie-display/selfie-display.component';
import { RetakeSelfieButtonComponent } from './components/retake-selfie-button/retake-selfie-button.component';
import { SubmitSelfieComponent } from './components/submit-selfie/submit-selfie.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeSelfieComponent,
    GcodeComponent,
    CameraWindowComponent,
    CameraTriggerComponent,
    OpenCameraButtonComponent,
    FlashComponent,
    SelfieDisplayComponent,
    RetakeSelfieButtonComponent,
    SubmitSelfieComponent,
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
