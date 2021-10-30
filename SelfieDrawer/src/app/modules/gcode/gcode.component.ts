import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, Select } from '@ngxs/store';
import { SetServerGcode } from 'src/app/store/app.action';
import { BackendConnectService } from '../../services/backend-connect.service';

@Component({
  selector: 'app-gcode',
  templateUrl: './gcode.component.html',
  styleUrls: ['./gcode.component.scss'],
})
export class GcodeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store,
    private backendConnectService: BackendConnectService
  ) {}

  ngOnInit(): void {
    screen.orientation.lock('portrait');

    this.backendConnectService.checkProgress();
    /*     this.http
      .get('assets/gcode_ich-removebg-previewnop3d.nc', {
        responseType: 'text' as 'text',
      })
      .subscribe((data: string) => {
        this.store.dispatch(new SetServerGcode(data));
      }); */
  }
}
