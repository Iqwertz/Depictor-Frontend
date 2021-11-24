import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GcodeComponent } from './gcode.component';
import { DrawingComponent } from './sites/drawing/drawing.component';

const routes: Routes = [
  { path: '', component: GcodeComponent },
  {
    path: 'drawing',
    component: DrawingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GcodeRoutingModule {}
