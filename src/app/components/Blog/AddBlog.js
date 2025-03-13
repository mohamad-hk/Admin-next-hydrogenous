import { useState } from "react";
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

export default function AddBlog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadFeaturedImage = async () => {
    if (!featuredImage) return null;

    const formData = new FormData();
    formData.append("file", featuredImage);

    try {
      const res = await fetch("/api/Upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.fileName ? `/images/posts/${data.fileName}` : null;
    } catch (error) {
      console.error("خطا در آپلود تصویر شاخص:", error);
    }
    return null;
  };

  const uploadBase64Images = async (content) => {
    const base64Regex = /<img[^>]+src=["'](data:image\/[^"']+)["']/g;
    let updatedContent = content;
    let match;

    while ((match = base64Regex.exec(content)) !== null) {
      const base64String = match[1];
      const imageUrl = await uploadBase64Image(base64String);

      if (imageUrl) {
        updatedContent = updatedContent.replace(base64String, imageUrl);
      }
    }

    return updatedContent;
  };

  const uploadBase64Image = async (base64String) => {
    const blob = await fetch(base64String).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", blob, "uploaded-image.png");

    try {
      const res = await fetch("/api/Upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.fileName ? `/images/posts/${data.fileName}` : null;
    } catch (error) {
      console.error("خطا در آپلود تصویر:", error);
    }
    return null;
  };

  const saveContent = async () => {
    const updatedContent = await uploadBase64Images(content);
    const imageUrl = await uploadFeaturedImage();

    const postData = {
      post_title: title,
      post_feature_image: imageUrl,
      post_content: updatedContent,
      post_published: true,
      post_created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/AddPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        console.log(" بلاگ با موفقیت ذخیره شد!");
      } else {
        console.error(" خطا در ذخیره بلاگ:", await res.text());
      }
    } catch (error) {
      console.error(" خطای شبکه:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="ms-5 mt-3" color="success">
        افزودن بلاگ
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                افزودن بلاگ جدید
              </ModalHeader>
              <ModalBody>
                <label className="block text-gray-700 font-bold mb-2">
                  عنوان بلاگ:
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان بلاگ را وارد کنید"
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
                  <img
                    src={featuredImagePreview}
                    alt="پیش‌نمایش تصویر"
                    className="mt-3 w-full h-48 object-cover rounded"
                  />
                )}

                <label className="block text-gray-700 font-bold mb-2 mt-4">
                  محتوای بلاگ:
                </label>
                <TextEditor onChange={(newContent) => setContent(newContent)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    saveContent();
                    onClose();
                  }}
                >
                  ذخیره بلاگ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
