import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-complete-page',
  standalone: true,
  imports: [],
  templateUrl: './complete-page.component.html',
  styleUrl: './complete-page.component.scss',
})
export class CompletePageComponent {
  @Input() levelNumber!: number;
  @Output() onNextLevel = new EventEmitter<void>();

  public nextLevel(): void {
    this.onNextLevel.emit();
  }
}
