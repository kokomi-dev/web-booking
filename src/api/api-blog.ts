import axiosClient from "@/configs/axiosClient/axiosClient";
import { IBlogComment } from "@/types/blog";
const getAllBlog = () => {
  return axiosClient.get("/blog");
};
const getAllBlogTrending = () => {
  return axiosClient.get("/blog?isTrending=true");
};
const getAllBlogRelate = (unitCode: string) => {
  return axiosClient.get(`/blog?unitCode=${String(unitCode)}`);
};
const getDetailBlog = (slug: string) => {
  return axiosClient.get("/blog/" + slug);
};
const updateLikeBlog = ({ id }: { id: string }) => {
  return axiosClient.post(`/blog/likes/${id}`);
};
const postCommentBlog = ({ id, data }: { id: string; data: IBlogComment }) => {
  return axiosClient.post(`/blog/comments/${id}`, { data });
};
export {
  getAllBlog,
  getAllBlogTrending,
  getDetailBlog,
  getAllBlogRelate,
  updateLikeBlog,
  postCommentBlog,
};
