import { Component, OnInit } from '@angular/core';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-button',
  templateUrl: './gallery-button.component.html',
  styleUrls: ['./gallery-button.component.scss'],
})
export class GalleryButtonComponent implements OnInit {
  constructor(private router: Router) {}

  faImages = faImages;

  ngOnInit(): void {}

  click() {
    this.router.navigate(['gcode', 'gallery']);
  }
}
