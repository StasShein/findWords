import { Directive, HostListener } from '@angular/core';
import { StateService } from '../services/state.service';

@Directive({
  selector: '[chooseWords]',
  standalone: true,
})
export class ChooseWordEventDirective {
  constructor(public state: StateService) {}

  @HostListener('mousedown', ['$event'])
  onStartHandle(event: any) {
    if((event.target as HTMLElement).classList.contains('block-inner')){
      event.target.classList.add('active');
      this.state.state.addedLetters.push(event.target.innerText);
      this.state.state.activeBlock.push(event.target);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMoveHandler(event: any) {
    if (this.state.state.activeBlock.length > 0) {
      const blocks = document.querySelectorAll('.block-inner');
      blocks.forEach((block) => {
        if (block == event.target) {
          if (!block.classList.contains('active')) {
            this.state.state.addedLetters.push(event.target.innerText);
          }
          event.target.classList.add('active');
          if (!this.state.state.activeBlock.includes(event.target)) {
            this.state.state.activeBlock.push(event.target);
          }
        }
      });
    }
    //on move prev block
    if (
      event.target ===
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

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onEndHander() {
    const blocks = document.querySelectorAll('.block-inner');
    this.state.state.findWord = this.state.state.addedLetters.join('');
    this.state.state.activeBlock = [];

    if (
      this.state.state.words.indexOf(this.state.state.findWord) !== -1 &&
      !this.state.state.findedWords.includes(
        this.state.state.words.indexOf(this.state.state.findWord)
      )
    ) {
      this.state.state.findedWords.push(
        this.state.state.words.indexOf(this.state.state.findWord)
      );
    }
    this.state.state.addedLetters = [];
    blocks.forEach((block) => {
      block.classList.remove('active');
    });
    this.state.updateState(this.state.state);
    if (this.state.state.findedWords.length >= this.state.state.words.length) {
      window.scrollTo(0, 0);
      this.state.state.completeLevel = true;
      this.state.updateState(this.state.state);
    }
  }
}
