import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import quizQuestions from './questions/quizQuestions';
import Quiz from './components/Quiz';
import update from 'react-addons-update';

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
  this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
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

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
   const counter = this.state.counter + 1;
   const questionId = this.state.questionId + 1;
   this.setState({
     counter: counter,
     questionId: questionId,
     question: quizQuestions[counter].question,
     answerOptions: quizQuestions[counter].answers,
     answer: ''
   });
 }

  handleAnswerSelected(event) {
   this.setUserAnswer(event.currentTarget.value);
   if (this.state.questionId < quizQuestions.length) {
       setTimeout(() => this.setNextQuestion(), 300);
     } else {
       // do nothing for now
     }
 }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The 'Should you pick Jack?' Quiz</h2>
        </div>
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
        />
      </div>
    );
  }
}

export default App;
