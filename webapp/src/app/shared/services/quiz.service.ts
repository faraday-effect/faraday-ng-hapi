import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// MOCK
const QUIZ = {
  id: 1,
  title: 'Faraday Quiz -- yer gonna luv it!',
  description: 'Multiple Choice Quiz',
  questions: [
    {
      id: 1,
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
      id: 2,
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
