import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent {
  userId: string | undefined;
  user = new User();
  birthDate!: Date;
  loading = false;  // Progress-bar set false by default

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore, private router: Router) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    this.loading = true;  // Progress-bar set true while sending form

    const aCollection = collection(this.firestore, 'users');  // creates a collection name "users"
    addDoc(aCollection, this.user.toJSON()).then((ref) => {
      this.userId = ref.id;  // Returns ID number from collection
      this.router.navigateByUrl('/users/' + this.userId);

      this.loading = false;  // Progress-bar set false after sending form

      console.log('The User ID is:', this.userId);
      console.log('User added successfully!');

      this.dialogRef.close();

    }).catch((error) => {
      console.error('Fehler beim Hinzufügen des Benutzers:', error);
    });
  }
}
