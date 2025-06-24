'use client'
import React, {useState} from "react";
import Header from "../components/header/Header";
import {quiz} from "./data"

export default function page(){
    const [activeQuestion, setActiveQuestion]= useState(0)
    const [selectedAnswer, setSelectedAnswer]= useState(false)
    const [isChecked, setIsChecked]= useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex]= useState(null)
    const [isShowResult, setIsShowResult] =useState(false)
    const [result, setResult] =useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers:0,
    })

const {questions} = quiz
const {question, answers, correct} = questions[activeQuestion]

const onAnswerSelected = (answer, idx) => {
    setIsChecked(true)
    setSelectedAnswerIndex(idx)
    if(answer === correct) {
        setSelectedAnswer(true)
        console.log('true')
    } else {
        setSelectedAnswer(false)
        console.log('false')
    }

}

const nextQuestion = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
        selectedAnswer ? 
        {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers +1
        } : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
        }
    );
    if (activeQuestion !== questions.length -1) {
        setActiveQuestion((prev) => prev +1)
    } else {
        setActiveQuestion(0)
        setIsShowResult(true)
    }
    setIsChecked(false)
}

    return(
        <div>
            <Header/>
        <p>Quiz Page</p>
        <section>
            <h2>
                Question: {activeQuestion + 1}
                <span>/{questions.length}</span>
            </h2>
        </section>
        <section>
            {!isShowResult ? (<div>
                <h3>{questions[activeQuestion].question}</h3>
                {answers.map((answer, idx) =>(
                    <li key={idx} 
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'}>
                        <span>{answer}</span>
                    </li>
                ))}
                {isChecked ? (
                    <button onClick={nextQuestion}>
                        {activeQuestion === questions.length -1 ? 'Terminer' : 'Suivante'}
                    </button>
                ) : (
                    <button onClick={nextQuestion} disabled>
                        {activeQuestion === questions.length -1 ? 'Terminer' : 'Suivante'}
                    </button>
                )}
                 </div>) : (
                    <div> 
                        <h3>Resultat</h3>
                        <h3>Total {(result.score /15) *100}%</h3>
                        <p>Questions: <span>{questions.length}</span></p>
                        <p>Score: <span>{result.score}</span></p>
                        <p>Reponse correct: <span>{result.correctAnswers}</span></p>
                        <p>Reponse fausse: <span>{result.wrongAnswers}</span></p>
                        <button onClick={()=> window.location.reload()}>Rejouer le quiz</button>
                    </div>)}
        </section>
        </div>
    )
}

