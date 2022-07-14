import { Injectable } from '@angular/core';

import { SnotifyPosition, SnotifyService } from 'ng-snotify';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  config = {
    position: SnotifyPosition.rightTop,
  };

  constructor(
    private snotifyService: SnotifyService,
    private spinner: NgxSpinnerService
  ) {}

  success(message: string, title: string = 'Success') {
    this.snotifyService.success(message, title, this.config);
  }

  error(message: string, title: string = 'Failed') {
    this.snotifyService.error(message, title, this.config);
  }

  confirm(message: string) {
    return new Promise((resolve, reject) => {
      this.snotifyService.confirm(message, 'Confirm', {
        position: SnotifyPosition.centerTop,
        buttons: [
          {
            text: 'Yes',
            action: () => {
              this.snotifyService.remove();
              resolve(true);
            },
            bold: false,
          },
          {
            text: 'No',
            action: () => {
              this.snotifyService.remove();
              return;
            },
          },
        ],
      });
    });
  }

  showLoading() {
    this.spinner.show();
  }

  hideLoading() {
    this.spinner.hide();
  }
}
