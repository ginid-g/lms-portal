import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { UiService } from '@services/ui/ui.service';

import { SubjectService } from '@services/subject/subject.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string | undefined = undefined;

  subjects: any[] = [];

  constructor(
    private subjectService: SubjectService,
    private modalRef: BsModalRef,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
  }

  getAllSubjects() {
    this.uiService.showLoading();
    this.subjectService.getAll().subscribe(
      (res: any) => {
        this.subjects = res.data;
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

  save() {}
}
