import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppState } from '../../store/app.state';

@Component({
  templateUrl: './connecting.component.html',
  styleUrls: ['./connecting.component.scss'],
})
export class ConnectingComponent implements OnInit {
  constructor(private store: Store) {}

  @Select(AppState.ip)
  ip$: any;
  ip: string = '';

  ngOnInit(): void {
    this.ip$.subscribe((ip: string) => {
      this.ip = ip;
    });
  }
}
