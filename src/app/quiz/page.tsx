'use client';
import React, { useState } from 'react';
import Header from '../components/header/Header';
import { quiz } from './data';
import styles from './quiz.module.css';

export default function Page() {
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
      setActiveQuestion(0);
      setIsShowResult(true);
    }
    setIsChecked(false);
  };

  return (
    <div className={styles.quiz}>
      <Header />
      <p>Quiz Page</p>
      <section>
        <h2 className={styles.title}>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </section>
      <section className={styles.answer}>
        {!isShowResult ? (
          <div>
            <h3 className={styles.question}>{question}</h3>
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
                <span>{answer}</span>
              </li>
            ))}
            <button
              className={styles.button}
              onClick={nextQuestion}
              disabled={!isChecked}
            >
              {activeQuestion === questions.length - 1 ? 'Terminer' : 'Suivante'}
            </button>
          </div>
        ) : (
          <section className={styles.result}>
            <h3 className={styles.resultTitle}>Résultats</h3>
            <p className={styles.resultItem}>
              Total: <span>{(result.score / 50) * 100}%</span>
            </p>
            <p className={styles.resultItem}>
              Questions: <span>{questions.length}</span>
            </p>
            <p className={styles.resultItem}>
              Réponses correctes: <span>{result.correctAnswers}</span>
            </p>
            <p className={styles.resultfalse}>
              Réponses fausses: <span>{result.wrongAnswers}</span>
            </p>
            <button
              className={styles.button}
              onClick={() => window.location.reload()}
            >
              Rejouer le quiz
            </button>
          </section>
        )}
      </section>
    </div>
  );
}

