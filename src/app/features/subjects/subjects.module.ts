import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectsFormComponent } from './subjects-form/subjects-form.component';

@NgModule({
  declarations: [SubjectsComponent, SubjectsFormComponent],
  imports: [CommonModule, SubjectsRoutingModule, FormsModule],
})
export class SubjectsModule {}
