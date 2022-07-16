import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ClassService, ClassType } from '@services/class/class.service';

import { SubjectService } from '@services/subject/subject.service';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { UiService } from '@services/ui/ui.service';

@Component({
  selector: 'app-subjects-form',
  templateUrl: './subjects-form.component.html',
  styleUrls: ['./subjects-form.component.scss'],
})
export class SubjectsFormComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string | undefined = undefined;
  @Input() name: string = '';
  @Input() classId: string = '';

  classes: ClassType[] = [];

  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private modalRef: BsModalRef,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses() {
    this.uiService.showLoading();
    this.classService.getAll().subscribe(
      (res: any) => {
        this.classes = res.data;
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

  save() {
    let apiCall;

    if (!this.id) {
      apiCall = this.subjectService.create(this.name, this.classId);
    } else {
      apiCall = this.subjectService.edit(this.id, this.name, this.classId);
    }

    this.uiService.showLoading();
    apiCall.subscribe(
      (res: any) => {
        this.uiService.success('Subject saved successfully');
        this.uiService.hideLoading();
        this.close(true);
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }
}
