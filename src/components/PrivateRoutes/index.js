import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoutes() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer);

  return(
    <>
      {isLogin ? <Outlet /> : navigate('/login')}
    </>
  ) 
}

export default PrivateRoutes;
