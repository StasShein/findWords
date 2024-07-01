import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { LEVELS } from '../../const/levels.const';
import { CompletePageComponent } from '../complete-page/complete-page.component';
import { StateService } from '../../services/state.service';
import { ChooseWordEventDirective } from '../../directives/choose-word-event.directive';
import { ChooseWordEventMobileDirective } from '../../directives/choose-word-event-mobile.directive';
import { StateData } from '../../interfaces/data.interface';
import { ReloadDialogComponent } from '../reload-dialog/reload-dialog.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    CompletePageComponent,
    ChooseWordEventDirective,
    ChooseWordEventMobileDirective,
    ReloadDialogComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, DoCheck {
  public session!: string;

  public nonActualSession: boolean = false;

  public data!: StateData;

  constructor(public state: StateService) {}

  ngDoCheck(): void {
    this.data = this.state.getState();
  }

  ngOnInit(): void {
    this.data = this.state.getState();

    window.onbeforeunload = () => {
      localStorage.setItem('level', JSON.stringify(this.state.state));
    };

    this.session = (Math.random() * 10000000).toFixed(0);
    localStorage.setItem('sessionID', JSON.stringify(this.session));

    setInterval(() => {
      if (JSON.parse(localStorage.getItem('sessionID')!) !== this.session) {
        this.nonActualSession = true;
      }
    }, 10000);
  }

  public nextLevel() {
    this.data.findedWords = [];
    this.data.levelNumber++;
    this.data.level >= 4 ? (this.data.level = 0) : this.data.level++;

    this.data.words = LEVELS[this.data.level].words.sort(
      (a: string, b: string) => {
        return a.length - b.length;
      }
    );

    const allLetters = this.data.words.join('').split('');
    this.data.wordArr = allLetters.filter((item: string, pos: number) => {
      return allLetters.indexOf(item) == pos;
    });

    this.data.wordArr.forEach((word: string) => {
      let numWord;
      this.data.words.forEach((item) => {
        numWord = item.split('').filter((item: string) => item === word);
        if (numWord.length > 1) {
          this.data.wordArr.push(word);
        }
      });
    });

    this.data.completeLevel = false;
    this.data.activeBlock = [];
    this.state.updateState(this.data);
  }

  public calcDeg(index: number, deg?: boolean) {
    return deg
      ? `transform: rotate(${
          360 - (360 / this.data.wordArr.length) * index
        }deg)`
      : `transform: rotate(${(360 / this.data.wordArr.length) * index}deg)`;
  }

  public calcHeight() {
    return `max-height: ${(window.innerHeight - 344)}px`
  }

  public calcWordBlock() {
    const calc = (380 - 10 * this.data.words.length) / this.data.words.length;
    const maxCalc =
      (380 - 10 * (this.data.words.length / 2)) / (this.data.words.length / 2);
    let mobileCalc;

    this.data.words.forEach((item) => {
      mobileCalc = (window.innerWidth - 10 * item.length) / item.length;
    });

    if (window.innerWidth <= 390) {
      return `width: ${mobileCalc}px; height: ${mobileCalc}px;`;
    } else {
      return `width: ${calc <= 30 ? maxCalc : calc}px; height: ${
        calc < 30 ? maxCalc : calc
      }px;`;
    }
  }
}
