'use client'
import React, {useState} from "react";
import Header from "../components/header/Header";
import {quiz} from "./data"

export default function page(){
    const [activeQuestion, setActiveQuestion]= useState(0)
    const [selectedAnswer, setSelectedAnswer]= useState('')
    const [ischecked, setIsChecked]= useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex]= useState(null)
    const [isShowResult, setIsShowResult] =useState(false)
    const [result, setResult] =useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers:0,
    })

const {questions} = quiz
const {question, answers, correct} = questions[activeQuestion]



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
                    className={selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'}>
                        <span>{answer}</span>
                    </li>
                ))}
                 </div>) : (<div> </div>)}
        </section>
        </div>
    )
}

