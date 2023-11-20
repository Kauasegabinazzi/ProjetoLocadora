import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './errordialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage,
    });
  }
}
