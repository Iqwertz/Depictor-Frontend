import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeSelfieComponent } from './sites/take-selfie/take-selfie.component';
import { GcodeComponent } from './sites/gcode/gcode.component';

const routes: Routes = [
 {
   path: '',
   component: TakeSelfieComponent
 } ,
 {
   path: 'gcode',
   component: GcodeComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
