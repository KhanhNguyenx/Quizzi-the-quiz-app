"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAnswer } from "../../services/answersService"
import { getQuestions } from "../../services/questionsService"
import { getTopic } from "../../services/topicsService"
import "./result.scss"

function Result() {
  const params = useParams()
  const navigate = useNavigate()
  const [dataResult, setDataResult] = useState([])
  const [dataTopic, setDataTopic] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id)
      const dataQuestions = await getQuestions(dataAnswers.topicId)
      const dataTopic = await getTopic(dataAnswers.topicId)
      console.log(dataAnswers)
      console.log(dataQuestions)

      const result = []
      for (let i = 0; i < dataQuestions.length; i++) {
        result.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find((item) => item.questionId === Number(dataQuestions[i].id)),
        })
      }
      setDataResult(result)
      setDataTopic(dataTopic)
    }
    fetchApi()
  }, [])

  // Calculate results
  const totalQuestions = dataResult.length
  const correctAnswers = dataResult.filter((item) => item.correctAnswer === item.answer).length
  const incorrectAnswers = totalQuestions - correctAnswers
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  // Get performance level
  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: "Xuất sắc", class: "excellent" }
    if (percentage >= 80) return { level: "Tốt", class: "good" }
    if (percentage >= 70) return { level: "Khá", class: "fair" }
    if (percentage >= 60) return { level: "Trung bình", class: "average" }
    return { level: "Cần cải thiện", class: "poor" }
  }

  const performance = getPerformanceLevel(scorePercentage)

  const handleRetakeQuiz = () => {
    if (dataTopic) {
      navigate(`/quiz/${dataTopic.id}`)
    }
  }

  const handleBackToTopics = () => {
    navigate("/topics")
  }

  // Show loading if data not ready
  if (dataResult.length === 0) {
    return (
      <div className="container">
        <div className="quiz-result">
          <div className="quiz-result__loading">
            <div className="quiz-result__loading-spinner"></div>
            <p>Đang tải kết quả...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="quiz-result">
        {/* Header */}
        <div className="quiz-result__header">
          <h1 className="quiz-result__title">Kết quả bài quiz</h1>
          <div className="quiz-result__topic">Chủ đề: {dataTopic ? dataTopic.name : "Đang tải..."}</div>
        </div>

        {/* Score Overview */}
        <div className="quiz-result__overview">
          <div className="quiz-result__score">
            <div className={`quiz-result__score-circle quiz-result__score-circle--${performance.class}`}>
              <span className="quiz-result__score-percentage">{scorePercentage}%</span>
              <span className="quiz-result__score-label">Điểm số</span>
            </div>
          </div>

          <div className="quiz-result__stats">
            <div className="quiz-result__stat">
              <span className="quiz-result__stat-number">{correctAnswers}</span>
              <span className="quiz-result__stat-label">Câu đúng</span>
            </div>
            <div className="quiz-result__stat">
              <span className="quiz-result__stat-number">{incorrectAnswers}</span>
              <span className="quiz-result__stat-label">Câu sai</span>
            </div>
            <div className="quiz-result__stat">
              <span className="quiz-result__stat-number">{totalQuestions}</span>
              <span className="quiz-result__stat-label">Tổng câu</span>
            </div>
          </div>

          <div className={`quiz-result__performance quiz-result__performance--${performance.class}`}>
            <span className="quiz-result__performance-label">Xếp loại:</span>
            <span className="quiz-result__performance-level">{performance.level}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="quiz-result__actions">
          <button className="quiz-result__btn quiz-result__btn--primary" onClick={handleRetakeQuiz}>
            Làm lại bài quiz
          </button>
          <button className="quiz-result__btn quiz-result__btn--secondary" onClick={handleBackToTopics}>
            Về danh sách chủ đề
          </button>
          <button className="quiz-result__btn quiz-result__btn--outline" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ẩn chi tiết" : "Xem chi tiết"}
          </button>
        </div>

        {/* Detailed Results */}
        {showDetails && (
          <div className="quiz-result__details">
            <h3 className="quiz-result__details-title">Chi tiết từng câu hỏi</h3>
            <div className="quiz-result__questions">
              {dataResult.map((item, index) => {
                const isCorrect = item.correctAnswer === item.answer
                return (
                  <div
                    key={item.id}
                    className={`quiz-result__question ${isCorrect ? "quiz-result__question--correct" : "quiz-result__question--incorrect"}`}
                  >
                    <div className="quiz-result__question-header">
                      <span className="quiz-result__question-number">Câu {index + 1}</span>
                      <span
                        className={`quiz-result__question-status ${isCorrect ? "quiz-result__question-status--correct" : "quiz-result__question-status--incorrect"}`}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </span>
                    </div>

                    <p className="quiz-result__question-text">{item.question}</p>

                    <div className="quiz-result__answers">
                      {item.answers.map((answer, answerIndex) => {
                        const isUserAnswer = answerIndex === item.answer
                        const isCorrectAnswer = answerIndex === item.correctAnswer

                        let answerClass = "quiz-result__answer"
                        if (isCorrectAnswer) {
                          answerClass += " quiz-result__answer--correct"
                        } else if (isUserAnswer && !isCorrectAnswer) {
                          answerClass += " quiz-result__answer--incorrect"
                        }

                        return (
                          <div key={answerIndex} className={answerClass}>
                            <span className="quiz-result__answer-text">{answer}</span>
                            {isCorrectAnswer && (
                              <span className="quiz-result__answer-label quiz-result__answer-label--correct">
                                Đáp án đúng
                              </span>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="quiz-result__answer-label quiz-result__answer-label--incorrect">
                                Bạn đã chọn
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result
