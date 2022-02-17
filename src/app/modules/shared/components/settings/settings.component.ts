import { environment } from './../../../../../environments/environment';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { faPowerOff, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  BackendConnectService,
  BackendVersion,
} from '../../../../services/backend-connect.service';
import { AppState } from '../../../../store/app.state';
import { Select, Store } from '@ngxs/store';
import { SetIp } from '../../../../store/app.action';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @Select(AppState.ip)
  ip$: any;
  ip: string = '';
  @Output() close = new EventEmitter<null>();

  @ViewChild('dialog', { static: false })
  confirmDialog: ConfirmDialogComponent | undefined;

  faPowerOff = faPowerOff;
  faTimes = faTimes;

  bgRemoveApiKey = '';

  environment = environment;

  backendVersion: BackendVersion = {
    tag: 'NAN',
    production: false,
  };

  updatesAvailable: boolean = false;
  availableUpdateVersion: string = '';

  constructor(
    private backendConnectService: BackendConnectService,
    private store: Store,
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.ip$.subscribe((ip: string) => {
      this.ip = ip;
    });

    this.backendConnectService.getBackendVersion().subscribe((v) => {
      this.backendVersion = v;
      this.checkForUpdates();
    });
  }

  shutdown() {
    this.backendConnectService.shutdown();
    this.router.navigate(['']);
  }

  setBgRemoveApiKey() {
    this.backendConnectService.setBGRemoveAPIKey(this.bgRemoveApiKey);
    this.bgRemoveApiKey = '';
  }

  setNewIp() {
    this.store.dispatch(new SetIp(this.ip));
    localStorage.setItem('ip', this.ip);
    this.router.navigate(['']);
  }

  home() {
    this.backendConnectService.home();
  }

  penUp() {
    this.backendConnectService.executeGcode('$X;\nM03S500;');
  }

  penDown() {
    this.backendConnectService.executeGcode('$X;\nM05;');
  }

  checkForUpdates() {
    this.http
      .get('https://api.github.com/repos/iqwertz/depictor/tags')
      .subscribe((res: any) => {
        if (res[0].name != environment.version) {
          this.updatesAvailable = true;
          this.availableUpdateVersion = res[0].name;
        }
      });

    this.http
      .get('https://api.github.com/repos/iqwertz/Depictor-Backend/tags')
      .subscribe((res: any) => {
        if (
          res[0].name != this.backendVersion.tag &&
          this.backendVersion.production
        ) {
          this.updatesAvailable = true;
          this.availableUpdateVersion = res[0].name;
        }
      });
  }

  update() {
    this.backendConnectService.update();
    this.loadingService.isLoading = true;
    this.loadingService.loadingText = 'updating System! Don`t turn off system';
    setTimeout(() => {
      window.location.reload();
    }, 60000);
  }
}
