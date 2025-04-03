export interface IBlog {
  _id: string;
  slug: string;
  title: string;
  author: string;
  content: any;
  createdAt: string;
  likes: number;
  comments: [];
  imgBanner: string;
  isToday: boolean;
  isTrending: boolean;
}
export interface IBlogComment {
  email: string;
  roles: string;
  id: string | number;
  name: string;
  content: string;
  nameShow: string;
}
export interface IBlogCommentResponse {
  email: string;
  roles: string;
  idUser: string | number;
  name: string;
  nameShow: string;
  content: string;
  commentDate: string;
}
