import { Component } from '@angular/core';

@Component({
  selector: 'app-reload-dialog',
  standalone: true,
  imports: [],
  templateUrl: './reload-dialog.component.html',
  styleUrl: './reload-dialog.component.scss',
})
export class ReloadDialogComponent {
  public reloadPage() {
    document.location.reload();
  }
}
