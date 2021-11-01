import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';
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
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './store/app.state';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeSelfieComponent,
    CameraWindowComponent,
    CameraTriggerComponent,
    OpenCameraButtonComponent,
    FlashComponent,
    SelfieDisplayComponent,
    RetakeSelfieButtonComponent,
    SubmitSelfieComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
