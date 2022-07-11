import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';

@NgModule({
  declarations: [ClassesComponent, ClassesFormComponent],
  imports: [CommonModule, ClassesRoutingModule],
})
export class ClassesModule {}
