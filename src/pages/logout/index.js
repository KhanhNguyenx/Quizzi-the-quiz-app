import { useEffect } from "react";
import { checkLogin } from "../../actions/login";
import { deleteAllCookies } from "../../helper/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin(false));
    deleteAllCookies();
    navigate("/login");
  }, []);

  return <></>;
}
