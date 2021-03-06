import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';

@NgModule({
  declarations: [QuizzesComponent, QuizFormComponent],
  imports: [CommonModule, QuizzesRoutingModule, FormsModule],
})
export class QuizzesModule {}
