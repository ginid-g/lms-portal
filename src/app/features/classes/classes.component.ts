import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { ClassService, ClassType } from '@services/class/class.service';

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
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classService.getAll().subscribe(
      (result: any) => {
        this.classes = result.data;
      },
      (err) => {}
    );
  }

  showClassModal() {
    this.modalService.show(ClassesFormComponent);
  }
}
