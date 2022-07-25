import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { UiService } from '@services/ui/ui.service';

import { SubjectService, SubjectType } from '@services/subject/subject.service';

import { ClassService, ClassType } from '@services/class/class.service';

import { QuizService, QuizType } from '@services/quiz/quiz.service';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string | null = null;

  subjects: SubjectType[] = [];
  classes: ClassType[] = [];

  data: QuizType | any = {};

  constructor(
    private subjectService: SubjectService,
    private quizService: QuizService,
    private classService: ClassService,
    private modalRef: BsModalRef,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getOptions();

    if (this.id) {
      this.uiService.showLoading();
      this.quizService.getById(this.id).subscribe(
        (res: any) => {
          this.uiService.hideLoading();
          this.data = res.data;
        },
        (err) => {
          this.uiService.hideLoading();
          this.uiService.error(err.error.error);
        }
      );
    }
  }

  getOptions() {
    this.uiService.showLoading();

    forkJoin({
      subjects: this.subjectService.getAll(),
      classes: this.classService.getAll(),
    }).subscribe(
      (res: any) => {
        this.subjects = res.subjects.data;
        this.classes = res.classes.data;
        this.uiService.hideLoading();
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }

  close(success: boolean = false) {
    this.onClose.emit(success);
    this.modalRef.hide();
  }

  removeQuestion(index: number) {
    this.data.questions.splice(index, 1);
  }

  addQuestion() {
    if (this.data.questions && this.data.questions.length) {
      this.data.questions.push({});
    } else {
      this.data.questions = [{}];
    }
  }

  save() {
    const apiCall = this.data._id
      ? this.quizService.edit(this.data)
      : this.quizService.create(this.data);

    this.uiService.showLoading();
    apiCall.subscribe(
      () => {
        this.uiService.hideLoading();
        this.uiService.success('Quiz Saved Successfully');
        this.close(true);
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }
}
