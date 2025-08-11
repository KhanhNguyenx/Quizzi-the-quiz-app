import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicsService";
import { Link, useNavigate } from "react-router-dom";
import "./topic.scss";
import { useSelector } from "react-redux";
function Topic() {
  const [topics, setTopics] = useState([]);
  const isLogin = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopics();
      setTopics(response);
    };
    fetchApi();
  }, []);

  const handleClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      navigate("/login");
    }
  };
  return (
    <>
      <div className="topics">
        <h2 className="topics__heading">Danh sách các chủ đề luyện tập</h2>
        {topics.length > 0 && (
          <div className="topics__table-wrapper">
            <table className="topics__table">
              <thead>
                <tr className="topics__row topics__row--header">
                  <th className="topics__cell">ID</th>
                  <th className="topics__cell">Tên chủ đề</th>
                  <th className="topics__cell"></th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id} className="topics__row">
                    <td className="topics__cell">{topic.id}</td>
                    <td className="topics__cell">{topic.name}</td>
                    <td className="topics__cell">
                      <Link
                        to={`/quiz/${topic.id}`}
                        onClick={handleClick}
                        className="topics__btn topics__btn--sm"
                      >
                        Làm bài
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

export default Topic;
