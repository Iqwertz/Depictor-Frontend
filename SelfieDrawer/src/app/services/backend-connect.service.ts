import { Injectable } from '@angular/core';
import { CameraServiceService } from './camera-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetServerGcode } from '../store/app.action';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  postSelfie() {
    if (this.cameraService.webcamImage) {
      let img = this.cameraService.webcamImage.imageAsBase64;
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
        if (res.appState == 'rawGcodeReady') {
          this.store.dispatch(new SetServerGcode(res.rawGcode));
          this.router.navigate(['gcode']);
        } else if (res.appState != 'idle' || res.appState != 'Drawing') {
          setTimeout(() => {
            this.checkProgress();
          }, 1000);
        }
      });
  }
}
