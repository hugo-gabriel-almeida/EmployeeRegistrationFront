import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeDataTableItem } from './../../interfaces/EmployeeDataTableItem';
import { EmployeesService } from 'src/app/services/employees.service';
import { Formatter } from './../../utils/Fomatter';

@Component({
  selector: 'app-employee-data-table',
  templateUrl: './employee-data-table.component.html',
  styleUrls: ['./employee-data-table.component.css']
})

export class EmployeeDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EmployeeDataTableItem>;

  dataSource
  employeesDataSource: EmployeeDataTableItem[];
  regExpr: any
  displayedColumns = [
    'id', 'name', 'birthDay', 'genre', 'age', 'email', 'skills','edit', 'active'
  ];

  constructor(
    private _employeeService:EmployeesService,
    private _formatter: Formatter
    ){}

  async ngOnInit() {

  }

  async ngAfterViewInit() {
    let employees = await this._employeeService.getAllEmployees();
    const data = this._formatter.getDataSource(employees);
    this.employeesDataSource = data;

    this.dataSource = new MatTableDataSource(this.employeesDataSource)

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  regExprFilter() {
    return (data: any) => {
      try {
        return this.regExpr.test(data.name)
      } catch (e) {
        return false
      }
    }
  }

  applyFilter(filterValue: string){
    this.regExpr = new RegExp(filterValue);
    this.dataSource.filter = filterValue;
  }
}
