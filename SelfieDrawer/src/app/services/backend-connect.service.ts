import { Injectable } from '@angular/core';
import { CameraServiceService } from './camera-service.service';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { StateResponse } from './site-state.service';

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
    private loadingService: LoadingService
  ) {
    this.ip$.subscribe((ip: string) => {
      this.ip = ip;
    });
  }

  postSelfie() {
    if (this.cameraService.base64Image) {
      let img = this.cameraService.base64Image.split('base64,')[1];
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

  checkProgress(): Observable<StateResponse> {
    return this.http.post<StateResponse>(
      'http://' + this.ip + '/checkProgress',
      {}
    );
  }

  checkDrawingProgress(): Observable<any> {
    return this.http.post<StateResponse>(
      'http://' + this.ip + '/getDrawingProgress',
      {}
    );
  }

  getGcode(): Observable<StateResponse> {
    return this.http.post<StateResponse>('http://' + this.ip + '/getGcode', {});
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

  getGallery(): Observable<any> {
    return this.http.post('http://' + this.ip + '/getGcodeGallery', {});
  }
}
