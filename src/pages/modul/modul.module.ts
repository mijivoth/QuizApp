import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulPage } from './modul';

@NgModule({
  declarations: [
    ModulPage,
  ],
  imports: [
    IonicPageModule.forChild(ModulPage),
  ],
})
export class ModulPageModule {}
