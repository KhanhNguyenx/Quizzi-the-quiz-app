import "./login.scss";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helper/cookie";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    Swal.fire({
      title: "Đang xử lý...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await login(email, password);
      Swal.close();

      if (response.length > 0) {
        const user = response[0];
        setCookie("id", user.id, 1);
        setCookie("email", user.email, 1);
        setCookie("fullName", user.fullName, 1);
        setCookie("token", user.token, 1);

        await Swal.fire({
          title: "Đăng nhập thành công",
          text: `Xin chào, ${user.fullName}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
        dispatch(checkLogin(true));
        navigate("/");
      } else {
        await Swal.fire({
          title: "Lỗi đăng nhập",
          text: "Email hoặc mật khẩu không đúng",
          icon: "error",
          confirmButtonText: "Thử lại",
        });
      }
    } catch (error) {
      Swal.close();
      await Swal.fire({
        title: "Lỗi hệ thống",
        text: "Không thể kết nối tới server. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="login-form">
        <div className="login-form__box">
          <h2 className="login-form__title">Login</h2>
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form__input-group">
              <input
                className="login-form__input"
                type="email"
                name="email"
                required
                placeholder=" "
              />
              <label className="login-form__label">Email</label>
            </div>
            <div className="login-form__input-group">
              <input
                className="login-form__input"
                type="password"
                name="password"
                required
                placeholder=" "
              />
              <label className="login-form__label">Password</label>
            </div>
            <button className="login-form__button" type="submit">
              Submit
            </button>
            <div className="login-form__extra">
              <a href="/forgot" className="login-form__link">
                Forgot password?
              </a>
              <span className="login-form__separator">•</span>
              <a href="/register" className="login-form__link">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
