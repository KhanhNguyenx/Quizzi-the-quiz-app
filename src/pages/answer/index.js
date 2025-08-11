import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicsService";
import { getAnswersByUserId } from "../../services/answersService";
import { Link } from "react-router-dom";
import "./answer.scss";
function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answers = await getAnswersByUserId();
      const topics = await getTopics();

      let result = [];

      for (let i = 0; i < answers.length; i++) {
        result.push({
          ...topics.find((item) => Number(item.id) === answers[i].topicId),
          ...answers[i],
        });
      }
      setDataAnswers(result.reverse());
    };
    fetchApi();
  }, []);

  return (
    <>
      <div className="answers">
        <h2 className="answers__heading">Danh sách bài đã luyện tập</h2>
        {dataAnswers.length > 0 && (
          <div className="answers__table-wrapper">
            <table className="answers__table">
              <thead className="answers__thead">
                <tr className="answers__row">
                  <th className="answers__cell">ID</th>
                  <th className="answers__cell">Tên bài</th>
                  <th className="answers__cell">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {dataAnswers.map((answer) => (
                  <tr key={answer.id} className="answers__row">
                    <td className="answers__cell">{answer.id}</td>
                    <td className="answers__cell">{answer.name}</td>
                    <td className="answers__cell">
                      <Link
                        to={`/result/${answer.id}`}
                        className="answers__btn"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Answers;
