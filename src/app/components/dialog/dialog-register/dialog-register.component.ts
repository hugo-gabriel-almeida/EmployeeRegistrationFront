import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateValidator } from 'src/app/utils/DateValidator';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeCreateDto } from 'src/app/dto/EmployeeCreateDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css'],
})
export class DialogRegisterComponent implements OnInit {
  idEmployee = new FormControl('', [Validators.required],);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  skills = new FormControl('', [Validators.required]);
  birthDay = new FormControl('', [Validators.required, DateValidator.ptDate]);

  title: string = 'Editção de funcionário';
  value = 'Clear me';

  showIdEmployee:number = 0;

  options: string[] = ['CSharp', 'Java', 'Angular', 'SQL', 'ASP'];
  filteredOptions: Observable<string[]>;

  constructor(private _employeeService: EmployeesService, @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit(): void {
    this.filteredOptions = this.birthDay.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    if (this.data) {
      this.idEmployee.setValue(this.data.id);
      this.idEmployee.disable({ onlySelf: true})
      this.showIdEmployee = this.data.id;
      this.firstName.setValue(this.data.firstName);
      this.lastName.setValue(this.data.lastName);
      this.birthDay.setValue(this.data.birthDay);
      this.email.setValue(this.data.email);
      this.skills.setValue(this.data.skills);
      this.genre.setValue(this.data.genre)
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Email invalido' : '';
  }

  getErrorMessageBirthDay() {
    if (this.birthDay.hasError('required')) {
      return 'You must enter a value';
    }

    return this.birthDay.hasError('email') ? 'Data de nascimento invalida invalido' : '';
  }

  saveEmployee() {

    const employee: EmployeeCreateDto = {
      firstName:this.firstName.value,
      lastName: this.lastName.value,
      birthDay:this.birthDay.value,
      email:this.email.value,
      genre:this.genre.value,
      skills:this.skills.value
    }

    if (this.idEmployee.value) {
      this._employeeService.updateEmployee(this.idEmployee.value, employee);
    } else {
      this._employeeService.createEmployee(employee);
    }
  }

  validateForm() {
    const result = (
      !this.firstName.valid ||
      !this.lastName.valid ||
      !this.birthDay.valid ||
      !this.email.valid ||
      !this.genre.valid ||
      !this.skills);

      return result;
  }

  getValue() {
    console.log(this.genre);
  }
}
