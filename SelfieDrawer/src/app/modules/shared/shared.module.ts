import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [NavbarComponent, LoadingComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, LoadingComponent],
})
export class SharedModule {}
