import { GcodeViewerService } from '../modules/gcode/services/gcode-viewer.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../store/app.state';
import { SetIp } from '../store/app.action';
import { BackendConnectService } from './backend-connect.service';
import { LoadingService } from './loading.service';
import { HttpErrorResponse } from '@angular/common/http';

export type AppStates =
  | 'idle'
  | 'removingBg'
  | 'processingImage'
  | 'rawGcodeReady'
  | 'error';

export interface StateResponse {
  state: AppStates;
  isDrawing: boolean;
  data?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SiteStateService {
  @Select(AppState.ip)
  ip$: any;

  @Select(AppState.autoRouting)
  autoRouting$: any;
  autoRouting: boolean = true;

  lastAppState: AppStates = 'idle';
  serverOnline: boolean = true;

  appState: StateResponse = {
    isDrawing: false,
    state: 'idle',
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private backendConnectService: BackendConnectService,
    private loadingService: LoadingService,
    private router: Router,
    private gcodeViewerService: GcodeViewerService
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

    this.autoRouting$.subscribe((autoRouting: boolean) => {
      this.autoRouting = autoRouting;
    });

    this.checkServerState();

    setInterval(() => {
      this.checkServerState();
    }, environment.appStateCheckInterval);
  }

  checkServerState() {
    this.backendConnectService.checkProgress().subscribe(
      (res: StateResponse) => {
        this.appState = res;

        if (!this.autoRouting) {
          return;
        }
        console.log(res);
        this.serverOnline = true;

        if (res.state == 'idle') {
          //this.loadingService.isLoading = false;
          this.router.navigate(['start']);
        } else if (
          res.state == 'processingImage' ||
          res.state == 'removingBg'
        ) {
          this.loadingService.isLoading = true;
          this.loadingService.serverResponseToLoadingText(res.state);
          this.router.navigate(['start']);
        } else if (res.state == 'rawGcodeReady') {
          if (this.router.url == '/start') {
            this.getGeneratedGcode();
          }
          if (this.lastAppState != 'rawGcodeReady') {
            this.getGeneratedGcode();
          } else if (this.gcodeViewerService.gcodeFile.length <= 5) {
            this.getGeneratedGcode();
          }
        } else if (res.state == 'error') {
          console.error('Something went wrong on the server!');
        }

        this.lastAppState = res.state;
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.serverOnline = false;
          console.log('Server Offline!');
          this.router.navigate(['']);
        }
      }
    );
  }

  getGeneratedGcode() {
    this.backendConnectService.getGeneratedGcode().subscribe(
      (res: StateResponse) => {
        if (res.data) {
          //        console.log(res.data);
          this.gcodeViewerService.setGcodeFile(res.data, true);
          this.loadingService.isLoading = false;
          this.router.navigate(['gcode', 'editGcode']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.serverOnline = false;
          console.log('Server Offline!');
          this.router.navigate(['']);
        }
      }
    );
  }

  getDrawenGcode() {
    this.backendConnectService.getDrawenGcode().subscribe(
      (res: StateResponse) => {
        if (res.data) {
          //        console.log(res.data);
          this.gcodeViewerService.setGcodeFile(res.data, false);
          this.loadingService.isLoading = false;
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.serverOnline = false;
          console.log('Server Offline!');
          this.router.navigate(['']);
        }
      }
    );
  }
}
