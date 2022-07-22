import { Component, OnInit } from '@angular/core';

import { QuizFormComponent } from './quiz-form/quiz-form.component';

import { QuizService } from '@services/quiz/quiz.service';

import { UiService } from '@services/ui/ui.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(
    private quizService: QuizService,
    private uiService: UiService,
    private modalService: BsModalService
  ) {}

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

  showQuizModal(id: string | null = null) {
    const modal: BsModalRef = this.modalService.show(QuizFormComponent, {
      class: 'modal-xl',
      keyboard: false,
      backdrop: 'static',
    });
    modal.content.id = id;

    modal.content.onClose.subscribe((res: boolean) => {
      if (res) {
        this.getAll();
      }
    });
  }

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
