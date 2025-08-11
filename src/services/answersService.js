import { getCookie } from "../helper/cookie";
import { get, post } from "../utils/request";

export async function createAnswer(options) {
  const result = await post(`answers`, options);
  return result;
}

export async function getAnswer(id) {
  const result = await get(`answers/${id}`);
  return result;
}

export async function getAnswersByUserId() {
  const userId = parseInt(getCookie("id"));
  const result = await get(`answers/?userId=${userId}`);
  return result;
}
