import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface QuizType {
  _id?: string;
  classId: string;
  subjectId: string;
  title: string;
  questions: {
    a: string;
    b: string;
    c: string;
    d: string;
    correctOption: 'a' | 'b' | 'c' | 'd';
    question: string;
    _id?: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.api_url + '/quizzes');
  }

  getById(id: string) {
    return this.http.get(environment.api_url + '/quizzes/' + id);
  }

  remove(id: string) {
    return this.http.delete(environment.api_url + '/quizzes/' + id);
  }

  create(data: QuizType) {
    return this.http.post(environment.api_url + '/quizzes', data);
  }

  edit(data: QuizType) {
    return this.http.put(environment.api_url + '/quizzes', data);
  }
}
