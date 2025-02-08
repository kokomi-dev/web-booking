import { apiUrl } from "@/api";
import NotFoundPage from "@/app/not-found";

import ClientBlogDetail from "@/components/dashboard/blog/client-blog";
import { PropsGenerateMetaData } from "@/types";
import { IBlog } from "@/types/blog";
import { capitalizeFirstLetter } from "@/utils/constants";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const blog = await fetch(`${apiUrl}/blog/${slug}`);
    const data = await blog.json();
    if (data.detailBlog) {
      return {
        title: capitalizeFirstLetter(data.detailBlog.title),
        description: data.detailBlog.author,
      };
    }
    return {};
  } catch (error) {
    throw new Error("Lỗi khi generateMetadata");
  }
}

export async function generateStaticParams() {
  try {
    const listBlog = await fetch(`${apiUrl}/blog`).then((res) => res.json());
    if (!listBlog || !Array.isArray(listBlog.listBlogs)) {
      console.error("Dữ liệu không hợp lệ hoặc không có trường listBlogs");
      return [];
    }
    return await listBlog.listBlogs.map((blog: IBlog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    throw new Error("Lỗi khi server-side-rendering");
  }
}
const fetchBlogDetail = async (slug: string) => {
  const res = await fetch(`${apiUrl}/blog/${slug}`, { cache: "no-store" });
  return res.json();
};
const PageBlogDetail = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const res = await fetchBlogDetail(slug);
  const initialData = res.detailBlog;
  if (!initialData) {
    return <NotFoundPage page="blog" />;
  }
  return <ClientBlogDetail initialData={initialData} />;
};

export default PageBlogDetail;
