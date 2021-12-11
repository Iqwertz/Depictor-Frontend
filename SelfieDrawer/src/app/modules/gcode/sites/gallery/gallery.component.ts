import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

export interface GcodeEntry {
  gcode: string;
  name: string;
}

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  faTimes = faTimes;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  close() {
    this.router.navigate(['']);
  }
}
