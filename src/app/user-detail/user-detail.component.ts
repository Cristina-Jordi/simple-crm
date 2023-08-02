import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditHeaderComponent } from '../dialog-edit-header/dialog-edit-header.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']

})
export class UserDetailComponent implements OnInit {
  userId: any;
  users: User[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('Got ID', this.userId);
      this.getUser();
    })
  }

  getUser() {
    const userRef = doc(this.firestore, 'users', this.userId);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if(docSnapshot.exists()){
        const user = docSnapshot.data() as User;
        console.log('Selected User:', user);
        this.users.push(user);
      }else{
        console.log('User not found');
      }
    }, (error) => {
      console.error('Error at updating the user document:', error);
    });
  }

  editHeaderDetail() {
    this.dialog.open(DialogEditHeaderComponent);
  }

  editAddressDetail(){
    this.dialog.open(DialogEditAddressComponent);
  }
}
