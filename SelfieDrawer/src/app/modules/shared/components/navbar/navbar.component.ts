import { Component, OnInit } from '@angular/core';

export interface NavBarEntry {
  name: string;
  active: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navBarEntrys: NavBarEntry[] = [
    {
      name: 'Create',
      active: false,
    },
    {
      name: 'Gallery',
      active: false,
    },
    {
      name: 'Drawing',
      active: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('load');
  }
}
