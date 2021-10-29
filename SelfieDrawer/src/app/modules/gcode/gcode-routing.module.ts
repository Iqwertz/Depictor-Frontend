import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GcodeComponent } from './gcode.component';

const routes: Routes = [{ path: '', component: GcodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GcodeRoutingModule { }
