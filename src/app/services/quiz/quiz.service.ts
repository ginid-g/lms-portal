import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.api_url + '/quizzes');
  }

  remove(id: string) {
    return this.http.delete(environment.api_url + '/quizzes/' + id);
  }
}
