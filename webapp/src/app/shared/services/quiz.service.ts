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
          answer: 'Zinc',
          correct: false,
          feedback: 'You have not chosen wisely...think pennies....',
          chosen: false
        },
        {
          answer: 'Copper',
          correct: true,
          feedback: 'Yes, young grasshopper, you are learning.',
          chosen: false
        },
        {
          answer: 'Selenium',
          correct: false,
          feedback: 'Think more pennies and less non-metalic....',
          chosen: false
        },
        {
          answer: 'Titanium',
          correct: false,
          feedback: 'Strong, but not penny-ish enough....',
          chosen: false
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
          answer: 'Zinc',
          correct: false,
          feedback: 'Not so zincish in this case....',
          chosen: false
        },
        {
          answer: 'Copper',
          correct: false,
          feedback: 'Remember, when in doubt, go with (c).',
          chosen: false
        },
        {
          answer: 'Selenium',
          correct: true,
          feedback: 'Indeed :)',
          chosen: false
        },
        {
          answer: 'Titanium',
          correct: false,
          feedback: 'Uh...not quite.',
          chosen: false
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
