export type ShareButtonProps = {
  children?: string;
  model: string;
  slug: string;
  title: string;
};
export type CommentProps = {
  _id: string;
  idUser: string;
  content: string;
  name: string;
  nameShow: string;
  commentDate: string;
  ratingVote: number;
};
export type PropsGenerateMetaData = {
  params: Promise<{ slug: string }>;
};
export type ItemBookedProps = {
  index: number;
  booked: any;
  data: any;
  status: any;
};
