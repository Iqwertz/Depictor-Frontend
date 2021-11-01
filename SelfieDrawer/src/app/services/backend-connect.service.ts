import { Injectable } from '@angular/core';
import { CameraServiceService } from './camera-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetServerGcode } from '../store/app.action';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

export type AppStates =
  | 'idle'
  | 'removingBg'
  | 'processingImage'
  | 'rawGcodeReady'
  | 'Drawing';

@Injectable({
  providedIn: 'root',
})
export class BackendConnectService {
  constructor(
    private cameraService: CameraServiceService,
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  postSelfie() {
    if (this.cameraService.webcamImage) {
      let img = this.cameraService.webcamImage.imageAsBase64;
      this.loadingService.isLoading = true;
      this.http
        .post('http://' + environment.ip + '/newPicture', { img: img })
        .subscribe((res) => {
          console.log(res);
          if (!res.hasOwnProperty('err')) {
            this.checkProgress();
          }
        });
    } else {
      console.error('No image saved!');
    }
  }

  checkProgress() {
    this.http
      .post('http://' + environment.ip + '/checkProgress', {})
      .subscribe((res: any) => {
        console.log(res);
        this.loadingService.serverResponseToLoadingText(res.appState);
        if (res.appState == 'rawGcodeReady') {
          this.store.dispatch(new SetServerGcode(res.rawGcode));
          this.loadingService.isLoading = false;
          this.router.navigate(['gcode']);
        } else if (res.appState != 'idle' || res.appState != 'Drawing') {
          setTimeout(() => {
            this.checkProgress();
          }, 1000);
        }
      });
  }
}
