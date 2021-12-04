import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingComponent } from './sites/drawing/drawing.component';
import { GcodeEditComponent } from './sites/gcode-edit/gcode-edit.component';
import { GcodeComponent } from './gcode.component';

const routes: Routes = [
  {
    path: '',
    component: GcodeComponent,
    children: [
      {
        path: 'editGcode',
        component: GcodeEditComponent,
      },
      {
        path: 'drawing',
        component: DrawingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GcodeRoutingModule {}
