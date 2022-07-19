import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'classes',
        loadChildren: () =>
          import('./classes/classes.module').then((m) => m.ClassesModule),
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('./subjects/subjects.module').then((m) => m.SubjectsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
