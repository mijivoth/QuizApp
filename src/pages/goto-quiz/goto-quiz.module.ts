import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GotoQuizPage } from './goto-quiz';

@NgModule({
  declarations: [
    GotoQuizPage,
  ],
  imports: [
    IonicPageModule.forChild(GotoQuizPage),
  ],
})
export class GotoQuizPageModule {}
