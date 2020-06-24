import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterComponent } from './../dialog/dialog-register/dialog-register.component';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input('idEmployee') idEmployee: number;
  constructor(public dialog: MatDialog, private _employeeService: EmployeesService,) { }


  ngOnInit(): void {
  }

  async openDialog() {
    const employee = await this._employeeService.getEmployeeById(this.idEmployee);
    console.log(employee)
    const dialogRef = this.dialog.open(DialogRegisterComponent, {
      height: '80%',
      width: '60%',
      data: employee
    });
  }

}
