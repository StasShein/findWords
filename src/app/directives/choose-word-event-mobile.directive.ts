import { Directive, HostListener } from '@angular/core';
import { StateService } from '../services/state.service';

@Directive({
  selector: '[chooseWordsMobile]',
  standalone: true,
})
export class ChooseWordEventMobileDirective {
  constructor(private state: StateService) {}

  @HostListener('touchstart', ['$event'])
  @HostListener('touchmove', ['$event'])
  onMoveHandle(event: any) {
    const blocks = document.querySelectorAll('.block-inner');
    blocks.forEach((block) => {
      if (
        block ==
        document.elementFromPoint(
          event.touches[0].clientX,
          event.touches[0].clientY
        )
      ) {
        if (!block.classList.contains('active')) {
          this.state.state.addedLetters.push((block as HTMLElement).innerText);
        }
        block.classList.add('active');
        if (!this.state.state.activeBlock.includes(block)) {
          this.state.state.activeBlock.push(block);
        }
      }
    });

    if (
      document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      ) ===
      this.state.state.activeBlock[this.state.state.activeBlock.length - 2]
    ) {
      (
        this.state.state.activeBlock[
          this.state.state.activeBlock.length - 1
        ] as HTMLElement
      ).classList.remove('active');

      this.state.state.activeBlock.pop();
      this.state.state.addedLetters.pop();
    }
  }
}
