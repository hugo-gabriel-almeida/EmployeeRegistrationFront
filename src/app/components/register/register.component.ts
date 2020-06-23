import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterComponent } from './../dialog/dialog-register/dialog-register.component'

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRegisterComponent, {
      height: '80%',
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

