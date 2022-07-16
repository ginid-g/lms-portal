import { Component, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubjectService, SubjectType } from '@services/subject/subject.service';

import { UiService } from '@services/ui/ui.service';

import { SubjectsFormComponent } from './subjects-form/subjects-form.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  subjects: SubjectType[] = [];

  constructor(
    private subjectService: SubjectService,
    private modalService: BsModalService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getAllsubjects();
  }

  getAllsubjects() {
    this.uiService.showLoading();
    this.subjectService.getAll().subscribe(
      (result: any) => {
        this.uiService.hideLoading();
        this.subjects = result.data;
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }

  showClassModal(
    id: string | null = null,
    name: string | null = null,
    classId: string | null = null
  ) {
    const modal: BsModalRef = this.modalService.show(SubjectsFormComponent);
    modal.content.id = id;
    modal.content.name = name;
    modal.content.classId = classId;

    modal.content.onClose.subscribe((res: boolean) => {
      if (res) {
        this.getAllsubjects();
      }
    });
  }

  deleteClass(id: string) {
    this.uiService
      .confirm('Are you sure you want to permanently remove this subject?')
      .then(() => {
        this.subjectService.remove(id).subscribe(
          () => {
            this.uiService.success('Subject removed successfully');
            this.getAllsubjects();
          },
          (err) => {
            this.uiService.error(err.error.error);
          }
        );
      });
  }
}
