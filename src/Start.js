import React, { useState, useEffect } from "react";

const Start = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const questionCount = 5;
  useEffect(() => {
    const api = `https://opentdb.com/api.php?amount=${questionCount}&difficulty=easy&encode=url3986`;
    fetch(api)
      .then((Response) => Response.json())
      .then((data) => setQuestions(data.results));
  }, []);

  //const decoded = decodeURIComponent(questions);
  const nextQuestion = () => {
    //check length handle
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const scoreAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }
  };
  if (currentQuestionIndex === -1) {
    return (
      <div>
        <button onClick={nextQuestion}>start !</button>
      </div>
    );
  }
  if (currentQuestionIndex > questions.length - 1) {
    return `You finished with the score of ${score}`;
  }
  if (lives < 1) {
    return "failed";
  }
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div>
      <div>
        <strong>Score:</strong>
        {score}/<strong>Lives:</strong>
        {lives}
      </div>
      {decodeURIComponent(currentQuestion.question)}
      <div>
        {[currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
          .sort(() => Math.random() - 0.5)
          .map((answer, index) => (
            <button
              onClick={() => {
                const isCorrect = answer === currentQuestion.correct_answer;

                scoreAnswer(isCorrect);
                nextQuestion();
              }}
              key={index}
            >
              {decodeURIComponent(answer)}
            </button>
          ))}
      </div>
    </div>
  );
};
export default Start;
