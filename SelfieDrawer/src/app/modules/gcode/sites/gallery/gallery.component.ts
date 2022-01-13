import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BackendConnectService } from '../../../../services/backend-connect.service';
import { Store } from '@ngxs/store';
import { SetAutoRouting } from '../../../../store/app.action';
import { GcodeViewerService } from '../../services/gcode-viewer.service';

export interface GcodeEntry {
  image: string;
  name: string;
}

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  faTimes = faTimes;

  gallery: GcodeEntry[] = [];

  constructor(
    private router: Router,
    private store: Store,
    private backendConnectService: BackendConnectService,
    private gcodeViewerService: GcodeViewerService
  ) {}

  ngOnInit(): void {
    this.backendConnectService.getGallery().subscribe((res: any) => {
      this.gallery = res.data;
      console.log(this.gallery);
    });

    this.store.dispatch(new SetAutoRouting(false));
  }

  close() {
    this.store.dispatch(new SetAutoRouting(true));
    this.router.navigate(['']);
  }

  loadGcodeById(id: string) {
    this.backendConnectService.getGcodeById(id).subscribe((data: any) => {
      if (data.err) {
        //error
        console.log(data.err);
      } else {
        this.gcodeViewerService.setGcodeFile(data.data, false);
        this.router.navigate(['gcode', 'editGcode']);
      }
    });
  }
}
