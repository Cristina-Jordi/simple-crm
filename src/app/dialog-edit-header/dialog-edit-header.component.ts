import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { setDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-header',
  templateUrl: './dialog-edit-header.component.html',
  styleUrls: ['./dialog-edit-header.component.scss']
})
export class DialogEditHeaderComponent {
  user!: User;
  birthDate!: Date;
  loading = false;  // Progress-bar set false by default

  constructor(public dialogRef: MatDialogRef<DialogEditHeaderComponent>, private firestore: Firestore) { }

  saveChanges() {
    this.loading = true; // Zeigen Sie die Fortschrittsanzeige an

    try {
      // Aktualisieren Sie die Daten in der Firebase-Datenbank
      const userDocRef = doc(this.firestore, 'users', this.user.userID!);
      setDoc(userDocRef, {
        ...this.user,
        birthDate: this.birthDate.getTime(),
      });

      this.loading = false; // Verstecken Sie die Fortschrittsanzeige
      this.dialogRef.close(); // Schließen Sie den Dialog nach erfolgreicher Aktualisierung
    } catch (error) {
      console.error('Error by saving data to database:', error);
      this.loading = false; // Verstecken Sie die Fortschrittsanzeige, falls ein Fehler auftritt
    }
  }

}
