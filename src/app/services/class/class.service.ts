import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface ClassType {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}

  create(name: string) {
    return this.http.post(environment.api_url + '/classes', { name: name });
  }

  edit(id: string, name: string) {
    return this.http.put(environment.api_url + '/classes', {
      id: id,
      name: name,
    });
  }

  getAll() {
    return this.http.get(environment.api_url + '/classes/all');
  }

  get(id: string) {
    return this.http.get(environment.api_url + '/classes/' + id);
  }

  remove(id: string) {
    return this.http.delete(environment.api_url + '/classes/' + id);
  }
}
