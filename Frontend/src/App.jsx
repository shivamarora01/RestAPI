import React, { useState, useEffect } from 'react';

const App = () => {
 

  // Move the questions array declaration above its usage
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    }, {
      question: 'What is the capital of India?',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    }, {
      question: 'What is the capital of China?',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    }, {
      question: 'What is the capital of Africa?',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Paris',
    },
    // Add more questions here...
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(questions.length).fill(''));
    setShowResults(false);
  };

  useEffect(() => {
    // Save userAnswers to local storage on each update
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    // Retrieve userAnswers from local storage on component mount
    const storedAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    if (storedAnswers) {
      setUserAnswers(storedAnswers);
    }
  }, []);

  if (showResults) {
    return (
      <div>
        <h2>Quiz Results</h2>
        {userAnswers.map((answer, index) => (
          <p key={index}>
            Question {index + 1}: {answer === questions[index].correctAnswer ? 'Correct' : 'Incorrect'}
          </p>
        ))}
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to the Quiz!</h2>
      <div>
        <p>{questions[currentQuestion].question}</p>
        <ul>
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index} onClick={() => handleAnswerSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default App;
