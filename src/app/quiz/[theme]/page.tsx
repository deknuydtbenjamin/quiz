'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/header/Header';

import { quiz as hpQuiz } from '../data/harrypotter';
import { quiz as lotrQuiz } from '../data/seigneuranneaux';

import styles from './quiz.module.css'; 

export default function Page() {
  const { theme } = useParams();
  const quiz = theme === 'harrypotter' ? hpQuiz : lotrQuiz;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correct } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setIsChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer === correct);
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? { ...prev, score: prev.score + 5, correctAnswers: prev.correctAnswers + 1 }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setIsShowResult(true);
    }
    setIsChecked(false);
  };

  return (
    <div className={styles.quiz}>
      <Header />
      <h2 className={styles.title}>
        {theme === 'harrypotter' ? 'Quiz Harry Potter' : 'Quiz Le Seigneur des Anneaux'}
      </h2>

      {!isShowResult ? (
        <>
          <h3 className={styles.question}>{question}</h3>
          <ul className={styles.answer}>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx
                    ? styles.selected
                    : styles.answerItem
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <button className={styles.button} onClick={nextQuestion} disabled={!isChecked}>
            {activeQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
          </button>
        </>
      ) : (
        <div className={styles.result}>
          <h3>Résultats</h3>
          <p>Score: {result.score}</p>
          <p>Réponses Correctes: {result.correctAnswers}</p>
          <p>Réponses Fausses: {result.wrongAnswers}</p>
          <button onClick={() => window.location.reload()} className={styles.button}>
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
}

