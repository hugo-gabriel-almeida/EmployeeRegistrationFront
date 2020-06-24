import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  employeeUrl: string = 'http://localhost:5000/api/employees';

  constructor(private http:HttpClient) { }

  async getAllEmployees() {
    return await this.http.get(this.employeeUrl).toPromise();
  }
}
