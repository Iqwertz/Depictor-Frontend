import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';

const routes: Routes = [
  {
    path: '',
    component: TakeSelfieComponent,
  },
  {
    path: 'gcode',
    loadChildren: () =>
      import('./modules/gcode/gcode.module').then((m) => m.GcodeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
