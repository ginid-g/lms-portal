import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';

@NgModule({
  declarations: [ClassesComponent, ClassesFormComponent],
  imports: [CommonModule, ClassesRoutingModule, FormsModule],
})
export class ClassesModule {}
