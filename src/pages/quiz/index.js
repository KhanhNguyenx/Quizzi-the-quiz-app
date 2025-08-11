import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicsService";
import { getQuestions } from "../../services/questionsService";
import "react-loading-skeleton/dist/skeleton.css";
import { getCookie } from "../../helper/cookie";
import { createAnswer } from "../../services/answersService";
import "./quiz.scss";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getQuestions(params.id);
      setDataQuestions(response);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        selectedAnswers.push({
          questionId: parseInt(e.target.elements[i].name),
          answer: parseInt(e.target.elements[i].value),
        });
      }
    }
    const options = {
      userId: parseInt(getCookie("id")),
      topicId: dataTopic.id,
      answers: selectedAnswers,
    };
    const respond = await createAnswer(options);
    if (respond) {
      navigate("/result/" + respond.id);
    }
  };

  console.log(dataQuestions);

  return (
    <>
      <div className="container">
        <div className="quiz">
          <h2 className="quiz__title">
            {dataTopic ? `Bài Quiz chủ đề: ${dataTopic.name}` : ""}
          </h2>

          <div className="quiz__form-wrapper">
            <form className="quiz__form" onSubmit={handleSubmit}>
              {dataQuestions.map((item, index) => (
                <div className="quiz__question" key={item.id}>
                  <div className="quiz__question-header">
                    <span className="quiz__question-number">
                      Câu {index + 1}
                    </span>
                    <p className="quiz__question-text">{item.question}</p>
                  </div>
                  <div className="quiz__answers">
                    {item.answers.map((itemAns, indexAns) => (
                      <div className="quiz__answer" key={indexAns}>
                        <input
                          className="quiz__answer-input"
                          type="radio"
                          name={item.id}
                          value={indexAns}
                          id={`quiz-${item.id}-${indexAns}`}
                        />
                        <label
                          className="quiz__answer-label"
                          htmlFor={`quiz-${item.id}-${indexAns}`}
                        >
                          <span className="quiz__answer-radio"></span>
                          <span className="quiz__answer-text">{itemAns}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="quiz__submit-wrapper">
                <button className="quiz__submit-btn" type="submit">
                  Nộp bài
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
