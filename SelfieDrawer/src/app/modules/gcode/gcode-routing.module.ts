import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GcodeComponent } from './gcode.component';
import { DrawingComponent } from './sites/drawing/drawing.component';
import { GcodeEditComponent } from './sites/gcode-edit/gcode-edit.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GcodeRoutingModule {}
