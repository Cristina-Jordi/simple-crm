import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    this.subscribeToUserData();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  subscribeToUserData() {
    const q = query(collection(this.firestore, 'users'), orderBy('lastName'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map(doc => doc.data() as User);
    }, (error) => {
      console.error('Error at updating the user document:', error);
    });
  }
}
