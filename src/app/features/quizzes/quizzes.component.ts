import { Component, OnInit } from '@angular/core';

import { QuizService } from '@services/quiz/quiz.service';

import { UiService } from '@services/ui/ui.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(private quizService: QuizService, private uiService: UiService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.uiService.showLoading();
    this.quizService.getAll().subscribe(
      (result: any) => {
        this.uiService.hideLoading();
        this.quizzes = result.data;
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }

  showClassModal(id: string | null = null) {}

  deleteClass(id: string) {
    this.uiService
      .confirm('Are you sure you want to permanently remove this quiz?')
      .then(() => {
        this.quizService.remove(id).subscribe(
          () => {
            this.uiService.success('Quiz removed successfully');
            this.getAll();
          },
          (err: any) => {
            this.uiService.error(err.error.error);
          }
        );
      });
  }
}
