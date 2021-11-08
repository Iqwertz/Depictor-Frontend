import { Injectable } from '@angular/core';
import { CameraServiceService } from './camera-service.service';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { SetServerGcode, SetIp } from '../store/app.action';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { AppState } from '../store/app.state';
import { ActivatedRoute } from '@angular/router';

export type AppStates =
  | 'idle'
  | 'removingBg'
  | 'processingImage'
  | 'rawGcodeReady'
  | 'drawing'
  | 'error';

@Injectable({
  providedIn: 'root',
})
export class BackendConnectService {
  @Select(AppState.ip)
  ip$: any;
  ip: string = '';

  constructor(
    private cameraService: CameraServiceService,
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.ip$.subscribe((ip: string) => {
      this.ip = ip;
    });

    this.route.queryParams.subscribe((params) => {
      if (params.ip) {
        this.store.dispatch(new SetIp(params.ip));
        localStorage.setItem('ip', params.ip);
      } else {
        let localIp = localStorage.getItem('ip');
        if (localIp) {
          this.store.dispatch(new SetIp(localIp));
        } else {
          console.log('Error: No Ip provided');
        }
      }
    });
  }

  postSelfie() {
    if (this.cameraService.webcamImage) {
      let img = this.cameraService.webcamImage.imageAsBase64;
      this.loadingService.isLoading = true;
      this.http
        .post('http://' + this.ip + '/newPicture', { img: img })
        .subscribe((res) => {
          console.log(res);
          if (!res.hasOwnProperty('err')) {
            this.checkProgress();
          } else {
            this.loadingService.isLoading = false;
            console.log('error sending image');
          }
        });
    } else {
      console.error('No image saved!');
    }
  }

  checkProgress() {
    this.http
      .post('http://' + this.ip + '/checkProgress', {})
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
        } else if (res.err) {
        }
      });
  }

  postGcode(gcode: string) {
    this.http
      .post('http://' + this.ip + '/postGcode', { gcode: gcode })
      .subscribe((res: any) => {
        console.log(res);
        this.loadingService.serverResponseToLoadingText(res.appState);
      });
  }

  cancle() {
    this.http
      .post('http://' + this.ip + '/cancle', {})
      .subscribe((res: any) => {
        //optional Error handling
      });
  }
}
