"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image} from "@heroui/react";
import convertToPersianDate from "../utils/ConvertToPersianDate";
import AddBlog from "../components/Blog/AddBlog";
import BlogContent from "../components/Blog/BlogContent";
import EditBlog from "../components/Blog/EditBlog";
import DeleteBlog from "../components/Blog/DeleteBlog";

const Blog = () => {
  const [posts, setpost] = useState();

  const getpost = async () => {
    const data = await fetch(
      "https://adminhydrogenous.vercel.app/api/Posts/GetBlogs"
    );
    const response = await data.json();
    setpost(response);
  };
  useEffect(() => {
    getpost();
  }, []);
  return (
    <>
      <AddBlog />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {posts?.map((post, index) => {
          return (
            <>
              <Card className="py-4 " key={index}>
                <CardHeader className="pb-0 pt-2 px-4">
                  <h2 className="font-bold text-large">{post.post_title}</h2>
                </CardHeader>
                <CardBody className="flex flex-col items-start p-2">
                  <Image
                    alt="image not found"
                    src={`${post.post_feature_image}`}
                    fill
                  />
                  <BlogContent content={post.post_content} />
                  <div className="flex flex-row gap-1 items-center mt-5">
                    <p> زمان انتشار:</p>
                    <p>{convertToPersianDate(post.post_created_at)}</p>
                  </div>
                </CardBody>
                <div className=" flex flex-row items-center gap-3 justify-end me-2 mt-5">
                <EditBlog post={post} onUpdate={getpost} />
                <DeleteBlog postId={post.post_id} onDelete={getpost} />
                </div>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Blog;
