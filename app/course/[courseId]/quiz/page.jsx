'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuizCardItem from './_components/QuizCardItem'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Timer, Award, RotateCcw } from 'lucide-react'

function Quiz() {
    const { courseId } = useParams()
    const router = useRouter()
    const [quizData, setQuizData] = useState(null)
    const [quiz, setQuiz] = useState([])
    const [stepCount, setStepCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [correctAns, setCorrectAnswer] = useState(null)
    const [isAnswer, setIsAnswer] = useState(null)
    const [userAnswers, setUserAnswers] = useState([])
    const [error, setError] = useState(null)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [timer, setTimer] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)

    useEffect(() => {
        if (courseId) {
            GetQuiz()
        }
    }, [courseId])

    useEffect(() => {
        if (!quizCompleted) {
            setCorrectAnswer(null)
            setIsAnswer(null)
        }
    }, [stepCount])

    useEffect(() => {
        if (quiz.length > 0 && userAnswers.length === quiz.length) {
            setQuizCompleted(true)
            setIsTimerActive(false)
        }
    }, [userAnswers, quiz])

    // Timer effect
    useEffect(() => {
        let interval
        if (isTimerActive && !quizCompleted) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTimerActive, quizCompleted])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const GetQuiz = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'Quiz'
            })
            setQuizData(result.data)
            setQuiz(result.data?.content?.questions || [])
            setIsTimerActive(true)  // Start timer when quiz loads
        } catch (error) {
            console.error('Error fetching quiz:', error)
            setError('Failed to load quiz. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const checkAnswer = (userAnswer, currentQuestion) => {
        const isCorrect = userAnswer === currentQuestion?.correctAnswer
        setCorrectAnswer(isCorrect)
        setIsAnswer(currentQuestion?.correctAnswer)
        
        setUserAnswers(prev => [...prev, {
            questionId: currentQuestion.id,
            userAnswer,
            isCorrect,
            timeTaken: timer
        }])

        if (!quizCompleted && stepCount < quiz.length - 1) {
            setTimeout(() => {
                setStepCount(prev => prev + 1)
            }, 1500)
        }
    }

    const calculateScore = () => {
        const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length
        const averageTimePerQuestion = Math.round(timer / quiz.length)
        return {
            score: correctAnswers,
            total: quiz.length,
            percentage: Math.round((correctAnswers / quiz.length) * 100),
            totalTime: timer,
            averageTime: averageTimePerQuestion
        }
    }

    const restartQuiz = () => {
        setStepCount(0)
        setUserAnswers([])
        setQuizCompleted(false)
        setCorrectAnswer(null)
        setIsAnswer(null)
        setTimer(0)
        setIsTimerActive(true)
    }

    const renderProgressBar = () => {
        const progress = (stepCount / (quiz.length - 1)) * 100
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        )
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-pulse text-gray-600">
                        Loading quiz...
                    </div>
                </div>
            )
        }

        if (error) {
            return (
                <Alert variant="destructive" className="m-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )
        }

        if (!quiz || quiz.length === 0) {
            return (
                <div className="p-4">
                    <h2 className='font-bold text-2xl'>Quiz</h2>
                    <div className="text-gray-600 mt-4">No quiz questions available.</div>
                </div>
            )
        }

        if (quizCompleted) {
            const stats = calculateScore()
            return (
                <div className="p-6 max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="text-center mb-8">
                            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h2 className='font-bold text-2xl mb-2'>Quiz Completed!</h2>
                            <p className="text-gray-600">Great job completing the quiz!</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-primary mb-1">
                                    {stats.percentage}%
                                </p>
                                <p className="text-sm text-gray-600">Score</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-primary mb-1">
                                    {formatTime(stats.totalTime)}
                                </p>
                                <p className="text-sm text-gray-600">Total Time</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-8">
                            <p className="text-center text-gray-600">
                                You got <span className="font-bold text-primary">{stats.score}</span> out of <span className="font-bold">{stats.total}</span> questions correct
                                <br />
                                Average time per question: {formatTime(stats.averageTime)}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Button 
                                onClick={restartQuiz} 
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Retry Quiz
                            </Button>
                            <Button 
                                onClick={() => router.back()}
                                className="flex items-center gap-2"
                            >
                                Back to Course
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className='font-bold text-2xl'>Quiz</h2>
                        <p className="text-gray-600 mt-2">
                            Question {stepCount + 1} of {quiz.length}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Timer className="w-4 h-4" />
                        {formatTime(timer)}
                    </div>
                </div>

                {renderProgressBar()}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {quiz[stepCount] && (
                        <QuizCardItem 
                            quiz={quiz[stepCount]} 
                            userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])} 
                        />
                    )}
                </div>

                {correctAns === false && (
                    <div className="mt-4 animate-fadeIn">
                        <div className='border p-4 border-red-700 bg-red-50 rounded-lg'>
                            <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
                            <p className='text-red-600'>Correct Answer: {isAnswer}</p>
                        </div>
                    </div>
                )}

                {correctAns === true && (
                    <div className="mt-4 animate-fadeIn">
                        <div className='border p-4 border-green-700 bg-green-50 rounded-lg'>
                            <h2 className='font-bold text-lg text-green-600'>Correct!</h2>
                            <p className='text-green-600'>Great job! Keep going!</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return renderContent()
}

export default Quiz