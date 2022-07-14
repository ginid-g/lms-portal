import { Component, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ClassService, ClassType } from '@services/class/class.service';

import { UiService } from '@services/ui/ui.service';

import { ClassesFormComponent } from './classes-form/classes-form.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: ClassType[] = [];

  constructor(
    private classService: ClassService,
    private modalService: BsModalService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses() {
    this.uiService.showLoading();
    this.classService.getAll().subscribe(
      (result: any) => {
        this.uiService.hideLoading();
        this.classes = result.data;
      },
      (err) => {
        this.uiService.hideLoading();
        this.uiService.error(err.error.error);
      }
    );
  }

  showClassModal(id: string | null = null, className: string | null = null) {
    const modal: BsModalRef = this.modalService.show(ClassesFormComponent);
    modal.content.className = className;
    modal.content.id = id;

    modal.content.onClose.subscribe((res: boolean) => {
      if (res) {
        this.getAllClasses();
      }
    });
  }

  deleteClass(id: string) {
    this.uiService
      .confirm('Are you sure you want to permanently remove this class?')
      .then(() => {
        this.classService.remove(id).subscribe(
          () => {
            this.uiService.success('Class removed successfully');
            this.getAllClasses();
          },
          (err) => {
            this.uiService.error(err.error.error);
          }
        );
      });
  }
}
