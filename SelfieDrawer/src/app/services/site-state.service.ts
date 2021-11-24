import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../store/app.state';
import { SetIp, SetServerGcode } from '../store/app.action';
import { BackendConnectService } from './backend-connect.service';
import { LoadingService } from './loading.service';
import { HttpErrorResponse } from '@angular/common/http';

export type AppStates =
  | 'idle'
  | 'removingBg'
  | 'processingImage'
  | 'rawGcodeReady'
  | 'drawing'
  | 'error';

export interface StateResponse {
  state: AppStates;
  data?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  @Select(AppState.ip)
  ip$: any;

  lastAppState: AppStates = 'idle';
  serverOnline: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private backendConnectService: BackendConnectService,
    private loadingService: LoadingService,
    private router: Router
  ) {
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

    this.checkServerState();

    setInterval(() => {
      this.checkServerState();
    }, environment.appStateCheckInterval);
  }

  checkServerState() {
    this.backendConnectService.checkProgress().subscribe(
      (res: StateResponse) => {
        console.log(res);
        this.serverOnline = true;

        if (res.state == 'idle') {
          //this.loadingService.isLoading = false;
          this.router.navigate(['']);
        } else if (
          res.state == 'processingImage' ||
          res.state == 'removingBg'
        ) {
          this.loadingService.isLoading = true;
          this.loadingService.serverResponseToLoadingText(res.state);
        } else if (res.state == 'rawGcodeReady') {
          if (this.lastAppState != 'rawGcodeReady') {
            this.getGcode();
          }
        } else if (res.state == 'drawing') {
          if (this.lastAppState != 'drawing') {
            this.getGcode();
          }
        } else if (res.state == 'error') {
          console.error('Something went wrong on the server!');
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.serverOnline = false;
          console.log('Server Offline!');
          this.router.navigate(['connecting']);
        }
      }
    );
  }

  getGcode() {
    this.backendConnectService.getGcode().subscribe(
      (res: any) => {
        if (res.data) {
          this.store.dispatch(new SetServerGcode(res.data));
          this.loadingService.isLoading = false;
          if (res.state == 'drawing') {
            this.router.navigate(['gcode', 'drawing']);
          } else {
            this.router.navigate(['gcode']);
          }
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.serverOnline = false;
          console.log('Server Offline!');
          this.router.navigate(['connecting']);
        }
      }
    );
  }
}