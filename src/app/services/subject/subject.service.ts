import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface SubjectType {
  _id: string;
  name: string;
  classId: string;
  class?: {
    _id: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  create(name: string, classId: string) {
    return this.http.post(environment.api_url + '/subjects', {
      name: name,
      classId: classId,
    });
  }

  edit(id: string, name: string, classId: string) {
    return this.http.put(environment.api_url + '/subjects', {
      id: id,
      name: name,
      classId: classId,
    });
  }

  getAll() {
    return this.http.get(environment.api_url + '/subjects');
  }

  get(id: string) {
    return this.http.get(environment.api_url + '/subjects/' + id);
  }

  remove(id: string) {
    return this.http.delete(environment.api_url + '/subjects/' + id);
  }
}
