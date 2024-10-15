const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const sendComment = async (
  data: {
    vote: number;
    comment: string;
  },
  slug: string,
  category: string,
  idUser: string | number,
  nameUser: string,
  nameShow: string
) => {
  try {
    const res = await fetch(apiUrl + "/comment/sendComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        data,
        category,
        idUser,
        nameUser,
        nameShow,
      }),
    });
    if (res) {
      return res.json();
    }
  } catch (error) {
    throw new Error("Lỗi khi gửi thông tin bình luận ");
  }
};
const deleteComment = async (id: string, category: string, slug: string) => {
  try {
    const res = await fetch(apiUrl + "/comment/deleteComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        category,
        slug,
      }),
    });
    if (res) {
      return res.json();
    }
  } catch (error) {
    throw new Error("Lỗi khi xóa bình luận");
  }
};
export { sendComment, deleteComment };
