import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [CommonModule, FeaturesRoutingModule, ModalModule.forRoot()],
})
export class FeaturesModule {}
