import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppState } from '../../store/app.state';
import { BackendConnectService } from '../../services/backend-connect.service';

@Component({
  templateUrl: './connecting.component.html',
  styleUrls: ['./connecting.component.scss'],
})
export class ConnectingComponent implements OnInit {
  constructor(
    private store: Store,
    private BackendConnectService: BackendConnectService
  ) {}

  @Select(AppState.ip)
  ip$: any;
  ip: string = '';

  ngOnInit(): void {
    this.ip$.subscribe((ip: string) => {
      this.ip = ip;
    });
  }
}
