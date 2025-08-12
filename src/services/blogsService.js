import { get } from "../utils/request";

export const getBlogs = async () => {
  const result = await get("blogs");
  return result;
};

export const getBlog = async (id) => {
  const result = await get(`blogs/${id}`);
  return result;
};
