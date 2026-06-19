import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface BeerDetailsData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-beer-details-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './beer-details-dialog.component.html',
})
export class BeerDetailsDialogComponent {
  data = inject<BeerDetailsData>(MAT_DIALOG_DATA);
}
