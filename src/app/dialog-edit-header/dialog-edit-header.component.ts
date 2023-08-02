import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-header',
  templateUrl: './dialog-edit-header.component.html',
  styleUrls: ['./dialog-edit-header.component.scss']
})
export class DialogEditHeaderComponent {
  user = new User();
  birthDate!: Date;
  loading = false;  // Progress-bar set false by default

  constructor(public dialogRef: MatDialogRef<DialogEditHeaderComponent>){}

  saveChanges(){

  }

}
