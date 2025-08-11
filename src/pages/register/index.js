import { useNavigate } from "react-router-dom";
import { checkExist, register } from "../../services/userService";
import { generateToken } from "../../helper/generateToken";
import Swal from "sweetalert2";
import "./register.scss";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    Swal.fire({
      title: "Đang xử lý...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const existEmail = await checkExist("email", email);
      Swal.close();

      if (existEmail.length > 0) {
        await Swal.fire({
          title: "Email đã tồn tại",
          text: "Vui lòng sử dụng email khác",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const options = {
        fullName,
        email,
        password,
        token: generateToken(),
      };
      Swal.fire({
        title: "Đang đăng ký...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await register(options);
      Swal.close();

      if (response) {
        await Swal.fire({
          title: "Đăng ký thành công!",
          text: "Bạn có thể đăng nhập ngay bây giờ.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login");
      } else {
        await Swal.fire({
          title: "Đăng ký thất bại",
          text: "Xin vui lòng thử lại.",
          icon: "error",
          confirmButtonText: "Thử lại",
        });
      }
    } catch (err) {
      Swal.close();
      await Swal.fire({
        title: "Lỗi hệ thống",
        text: "Không thể kết nối đến server. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <div className="register-form">
        <div className="register-form__box">
          <h2 className="register-form__title">Register</h2>
          <form className="register-form__form" onSubmit={handleSubmit}>
            <div className="register-form__input-group">
              <input
                className="register-form__input"
                type="text"
                name="fullName"
                required
                placeholder=" "
              />
              <label className="register-form__label">Full Name</label>
            </div>
            <div className="register-form__input-group">
              <input
                className="register-form__input"
                type="email"
                name="email"
                required
                placeholder=" "
              />
              <label className="register-form__label">Email</label>
            </div>
            <div className="register-form__input-group">
              <input
                className="register-form__input"
                type="password"
                name="password"
                required
                placeholder=" "
              />
              <label className="register-form__label">Password</label>
            </div>
            <button className="register-form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
