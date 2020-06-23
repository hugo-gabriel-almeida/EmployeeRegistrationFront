import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeDataTableItem } from './../../interfaces/EmployeeDataTableItem';

const employees: EmployeeDataTableItem[] = [
  { id: 1, name: 'Hydrogen', sexo: 'masculino', birthDay: '18/06/1992', age: 18, email: 'email@email.com', skills:'Csharp, ASP' },
  { id: 2, name: 'Helium', sexo: 'masculino', birthDay: '12/06/1992', age: 18, email: 'email@email.com', skills: 'Java, ASP'} ,
  { id: 3, name: 'Lithium', sexo: 'masculino', birthDay: '13/06/1992', age: 18, email: 'email@email.com', skills: 'Csharp, ASP'},
  { id: 4, name: 'Beryllium', sexo: 'masculino', birthDay: '18/06/1992', age: 18, email: 'email@email.com', skills: 'Java, ASP, SQL'},
  { id: 5, name: 'Boron', sexo: 'masculino', birthDay: '20/06/1992', age: 18, email: 'email@email.com' ,skills: 'Java, ASP, SQL' },
  { id: 6, name: 'Carbon', sexo: 'masculino', birthDay: '18/06/1992', age: 20, email: 'email@email.com', skills: 'Java, ASP, SQL'},
  { id: 7, name: 'Nitrogen', sexo: 'feminino', birthDay: '18/06/1992', age: 18, email: 'email@email.com', skills: 'Java, ASP, SQL'},
];

@Component({
  selector: 'app-employee-data-table',
  templateUrl: './employee-data-table.component.html',
  styleUrls: ['./employee-data-table.component.css']
})

export class EmployeeDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EmployeeDataTableItem>;
  dataSource = new MatTableDataSource(employees)

  displayedColumns = ['id', 'name', 'birthDay', 'genre', 'age', 'email', 'skills','edit', 'active'];

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  regExpr: any
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
