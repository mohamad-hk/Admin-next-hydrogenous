"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import convertToPersianDate from "../utils/ConvertToPersianDate";

const Blog = () => {
  const [posts, setpost] = useState();

  const getpost = async () => {
    const data = await fetch(
      "https://adminhydrogenous.vercel.app/api/GetBlogs"
    );
    const response = await data.json();
    setpost(response);
  };
  useEffect(() => {
    getpost();
  }, []);
  return (
    <>
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
                    src={`/images/posts/${post.post_feature_image}`}
                    fill
                  />
                  <p>{post.post_content}</p>
                  <div className="flex flex-row gap-1 items-center mt-5">
                    <p> زمان انتشار:</p>
                    <p>{convertToPersianDate(post.post_created_at)}</p>
                  </div>
                </CardBody>
                <div className=" flex flex-row items-center gap-3 justify-end me-2 mt-5">
                  <Button color="warning">ویرایش</Button>
                  <Button color="danger">حذف</Button>
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
