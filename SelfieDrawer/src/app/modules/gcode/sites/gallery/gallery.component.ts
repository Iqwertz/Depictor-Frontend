import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { BackendConnectService } from '../../../../services/backend-connect.service';

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
    private backendConnectService: BackendConnectService
  ) {}

  ngOnInit(): void {
    this.backendConnectService.getGallery().subscribe((res: any) => {
      this.gallery = res.data;
      console.log(this.gallery);
    });
  }

  close() {
    this.router.navigate(['']);
  }
}
