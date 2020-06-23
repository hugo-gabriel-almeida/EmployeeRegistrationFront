import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateValidator } from 'src/app/utils/DateValidator';


@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css'],
})
export class DialogRegisterComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  skills = new FormControl('', [Validators.required]);
  birthDay = new FormControl('', [Validators.required, DateValidator.ptDate]);

  title: string = 'Cadastro de funcionário';
  value = 'Clear me';

  options: string[] = ['Csharp', 'Java', 'Angular', 'SQL', 'ASP'];
  filteredOptions: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredOptions = this.birthDay.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Email invalido' : '';
  }

  getErrorMessageBirthDay() {
    if (this.birthDay.hasError('required')) {
      return 'You must enter a value';
    }

    return this.birthDay.hasError('email') ? 'Data de nascimento invalida invalido' : '';
  }
}
