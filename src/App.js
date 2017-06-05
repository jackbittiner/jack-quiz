import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import quizQuestions from './api/quizQuestions';

class App extends Component {

  constructor(props) {
  super(props);

  this.state = {
   counter: 0,
   questionId: 1,
   question: '',
   answerOptions: [],
   answer: '',
   answersCount: {
     yes: 0,
     definitely: 0,
     withoutDoubt: 0
   },
   result: ''
  };
}

componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jack Quiz</h2>
        </div>
        <Question content="Blah blah blah?" />
      </div>
    );
  }
}

export default App;
