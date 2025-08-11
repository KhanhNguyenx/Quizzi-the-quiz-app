import { getCookie } from "../helper/cookie";

export const loginReducer = (state = getCookie("token"), action) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return action.status;

    default:
      return state;
  }
};
