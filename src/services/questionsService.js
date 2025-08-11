import { get } from "../utils/request";

export async function getQuestions(id) {
    const result = await get(`questions/?topicId=${id}`);
    return result
}