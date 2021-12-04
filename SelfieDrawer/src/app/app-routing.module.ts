import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';
import { ConnectingComponent } from './sites/connecting/connecting.component';
import { GcodeEditComponent } from './sites/gcode-edit/gcode-edit.component';
import { DrawingComponent } from './sites/drawing/drawing.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectingComponent,
  },
  {
    path: 'start',
    component: TakeSelfieComponent,
  },
  {
    path: 'editGcode',
    component: GcodeEditComponent,
  },
  {
    path: 'drawing',
    component: DrawingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
