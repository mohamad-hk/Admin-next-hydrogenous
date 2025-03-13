import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import TextEditor from "../Editor/TextEditor";
import Image from "next/image";

export default function EditBlog({ post, onUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState(post.post_title);
  const [content, setContent] = useState(post.post_content);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(
    post.post_feature_image
  );

  useEffect(() => {
    setTitle(post.post_title);
    setContent(post.post_content);
    setFeaturedImagePreview(post.post_feature_image);
  }, [post]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadFeaturedImage = async () => {
    if (!featuredImage) return featuredImagePreview;

    const formData = new FormData();
    formData.append("file", featuredImage);

    try {
      const res = await fetch("/api/Upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.fileName
        ? `/images/posts/${data.fileName}`
        : featuredImagePreview;
    } catch (error) {
      console.error("خطا در آپلود تصویر شاخص:", error);
    }
    return featuredImagePreview;
  };

  const updateBlog = async () => {
    const imageUrl = await uploadFeaturedImage();

    const updatedData = {
      post_id: post.post_id,
      post_title: title,
      post_feature_image: imageUrl,
      post_content: content,
      post_published: true,
      post_created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/EditPost", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        onUpdate();
        onOpenChange();
      } else {
        console.error(" خطا در ویرایش بلاگ:", await res.text());
      }
    } catch (error) {
      console.error(" خطای شبکه:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="warning">
        ویرایش
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش بلاگ</ModalHeader>
              <ModalBody>
                <label className="block text-gray-700 font-bold mb-2">
                  عنوان بلاگ:
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label className="block text-gray-700 font-bold mb-2 mt-4">
                  تصویر شاخص:
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {featuredImagePreview && (
                  <Image
                    src={featuredImagePreview}
                    width={300}
                    height={300}
                    alt=" image not found "
                    className="mt-3 w-full h-48 object-cover rounded"
                  />
                )}

                <label className="block text-gray-700 font-bold mb-2 mt-4">
                  محتوای بلاگ:
                </label>
                <TextEditor
                  onChange={(newContent) => setContent(newContent)}
                  initialValue={content}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button color="primary" onPress={updateBlog}>
                  ذخیره تغییرات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
