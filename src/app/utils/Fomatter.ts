import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})

export class Formatter {

  constructor(public datepipe: DatePipe) { }

  public getDataSource(employees) {
    let data = [];

    for (let i = 0; i < employees.length; i++) {

      const age = this.CalculateAge(employees[i].birthDay)

      data.push({
        id: employees[i].id,
        name: employees[i].firstName + " "+employees[i].lastName,
        genre: employees[i].genre == "M" ? "Masculino" : "Feminino",
        birthDay: employees[i].birthDay,
        age,
        email: employees[i].email,
        skills: employees[i].skills,
        active: employees[i].active
      });
    }

    return data;
  }

  public CalculateAge(birthDay) {
    const arrayDate = birthDay.split('/');

    const date = arrayDate[1] + "/" + arrayDate[0] + "/" + arrayDate[2];

    const dobDate = new Date(date);
    if (dobDate != undefined) {
      var todayDate = new Date();
      var ageyear = todayDate.getFullYear() - dobDate.getFullYear();
      var agemonth = todayDate.getMonth() - dobDate.getMonth();

      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }

      } if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }

      return ageyear
    }
}
