import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// MOCK
const QUIZ = {
  uuid: '110ec58a-a0f2-4ac4-8393-c866d8135196',
  title: 'Faraday Quiz -- yer gonna luv it!',
  description: 'Multiple Choice Quiz',
  questions: [
    {
      uuid: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
      question: 'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Curabitur aliquam interdum ' +
      'sodales.',
      answers: [
        {
          id: 1,
          answer: 'Zinc'
        },
        {
          id: 2,
          answer: 'Copper'
        },
        {
          id: 3,
          answer: 'Selenium'
        },
        {
          id: 4,
          answer: 'Titanium'
        }
      ]
    },
    {
      uuid: '110ec58a-a0f2-4ac4-8393-c8663fb3b8d2',
      question: 'Aenean elementum orci nec arcu dapibus ' +
      'pharetra. Donec ultrices tincidunt odio, in tristique ' +
      'dui tempor vel.',
      answers: [
        {
          id: 1,
          answer: 'Zinc'
        },
        {
          id: 2,
          answer: 'Copper'
        },
        {
          id: 3,
          answer: 'Selenium'
        },
        {
          id: 4,
          answer: 'Titanium'
        }
      ]
    }
  ]
};


@Injectable()
export class QuizService {

  constructor() {
    console.log(QUIZ);
  }

  getMockQuiz() {
    return Promise.resolve(QUIZ);
  }

}
