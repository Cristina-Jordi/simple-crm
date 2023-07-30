import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, query, onSnapshot, orderBy } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToUserData();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  subscribeToUserData() {
    const q = query(collection(this.firestore, 'users'), orderBy('lastName'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.allUsers = querySnapshot.docs.map(doc => doc.data() as User);  // Diese Zeile füllt das Array User
    }, (error) => {
      console.error('Error at updating the user document:', error);
    });
  }
}
