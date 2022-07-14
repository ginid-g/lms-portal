import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ClassService } from '@services/class/class.service';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { UiService } from '@services/ui/ui.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss'],
})
export class ClassesFormComponent implements OnInit {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string | undefined = undefined;
  @Input() className: string = '';

  constructor(
    private classService: ClassService,
    private modalRef: BsModalRef,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  close(success: boolean = false) {
    this.onClose.emit(success);
    this.modalRef.hide();
  }

  save() {
    let apiCall;

    if (!this.id) {
      apiCall = this.classService.create(this.className);
    } else {
      apiCall = this.classService.edit(this.id, this.className);
    }

    this.uiService.showLoading();
    apiCall.subscribe(
      (res: any) => {
        this.uiService.success('Class saved successfully');
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
