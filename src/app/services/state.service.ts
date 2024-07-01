import { Injectable } from '@angular/core';
import { LEVELS } from '../const/levels.const';
import { StateData } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public state: StateData = {
    level: 0,
    levelNumber: 0,
    words: [],
    wordArr: [],
    addedLetters: [],
    findedWords: [],
    completeLevel: false,
    activeBlock: [],
    findWord: '',
  };
  constructor() {}

  public getState() {
    if (localStorage.getItem('level') === null) {
      this.state.level = 0;
      this.state.levelNumber = 1;
      this.state.words = LEVELS[this.state.level].words.sort(
        (a: string, b: string) => {
          return a.length - b.length;
        }
      );
      this.getWordArr();

      return this.state;
    } else {
      const levelData = JSON.parse(localStorage.getItem('level')!);
      this.state.level = levelData.level;
      this.state.levelNumber = levelData.levelNumber;
      this.state.findedWords = levelData.findedWords
        ? levelData.findedWords
        : [];
      this.state.completeLevel = levelData.completeLevel;
      this.state.words = LEVELS[this.state.level].words.sort(
        (a: string, b: string) => {
          return a.length - b.length;
        }
      );
      this.getWordArr();

      return this.state;
    }
  }

  getWordArr() {
    const allLetters = this.state.words.join('').split('');
    this.state.wordArr = allLetters.filter((item: string, pos: number) => {
      return allLetters.indexOf(item) == pos;
    });

    this.state.wordArr.forEach((word: string) => {
      let numWord;
      let repeatLetter = 0;
      this.state.words.forEach((item: string) => {
        numWord = item.split('').filter((item: string) => item === word);
        if (numWord.length > 1 && repeatLetter < numWord.length) {
          repeatLetter = numWord.length;
          this.state.wordArr.push(word);
        }
      });
    });
  }

  updateState(data: StateData) {
    this.state = data;
    localStorage.setItem('level', JSON.stringify(this.state));
  }
}
