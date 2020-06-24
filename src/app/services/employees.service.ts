import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EmployeeCreateDto } from '../dto/EmployeeCreateDto';
import { EmployeeUpdateDto } from '../dto/EmployeeUpdateDto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  employeeUrl: string = 'http://localhost:5000/api/employees/';
  urlChangeStatus: string = '/changestatus/';

  constructor(private http:HttpClient) { }

  async getAllEmployees() {
    return await this.http.get(this.employeeUrl).toPromise();
  }

  async getEmployeeById(idEmployee:number) {
    return await this.http.get(`${this.employeeUrl}${idEmployee}`).toPromise();
  }

  async createEmployee(employee: EmployeeCreateDto) {
    return await this.http.post<EmployeeCreateDto>(
      this.employeeUrl, employee, httpOptions
      ).toPromise();
  }

  async updateEmployee(idEmployee: number, employee: EmployeeUpdateDto) {
    return await this.http.put<EmployeeUpdateDto>(
      `${this.employeeUrl}${idEmployee}`, employee, httpOptions
    ).toPromise();
  }

  async changeStatus(idEmployee: number, active:boolean) {
    return await this.http.put(
      `${this.employeeUrl}${idEmployee}${this.urlChangeStatus}${active}`, httpOptions
    ).toPromise();
  }
}
