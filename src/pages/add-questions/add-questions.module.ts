import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddQuestionsPage } from './add-questions';

@NgModule({
  declarations: [
    AddQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddQuestionsPage),
  ],
})
export class AddQuestionsPageModule {}
