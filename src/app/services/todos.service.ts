import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  IResponse } from '../models/responses';
import {  ITodo } from '../models/i-todo';
import { AppConstants } from '../common/constants';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private httpClient: HttpClient) { }

  GetTodos(): Observable<ITodo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${AppConstants.API_URL}`;

    return this.httpClient.get<ITodo[]>(url);
  }

}
