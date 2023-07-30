import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { setDoc, doc } from 'firebase/firestore';

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
    console.log('Aktueller Benutzer:', this.user);

    this.loading = true;  // Progress-bar set true while sending form

    const aCollection = collection(this.firestore, 'users');  // Creates a collection named "users"
    addDoc(aCollection, this.user.toJSON()).then((ref) => {
      this.userId = ref.id;  // Returns ID number from collection

      this.user.userID = this.userId;  // Adds the userID to the users-Array

      setDoc(doc(aCollection, this.userId), { ...this.user, userID: this.userId }).then(() => {  // Updates the db with the userID
        this.loading = false;  // Progress-bar set false after sending form

        console.log('The user ID is:', this.userId);
        console.log('New user has been added to db successfully!');

        this.dialogRef.close();
      }).catch((error) => {
        console.error('Error by adding a new user to the db:', error);
      });
    });
  }
}