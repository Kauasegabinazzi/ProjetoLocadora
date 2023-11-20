import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <div class="error-dialog-content">
      <h1>Erro!</h1>
      <p>{{ errorMessage }}</p>
      <button mat-button color="blueviolet" (click)="closeDialog()">OK</button>
    </div>
  `,
  styles: [`
    .error-dialog-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .error-dialog-content h1 {
      color: blueviolet;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .error-dialog-content p {
      color: blueviolet;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .error-dialog-content button {
      margin-top: 10px;
    }
  `]
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public errorMessage: string,
    public dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
