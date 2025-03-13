import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function DeleteBlog({ postId, onDelete }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const deletePost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/DeletePost?id=${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(); 
        onOpenChange();
      } else {
        console.error(" خطا در حذف بلاگ:", await res.text());
      }
    } catch (error) {
      console.error(" خطای شبکه:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        حذف
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>حذف بلاگ</ModalHeader>
              <ModalBody>
                <p className="text-red-600 font-bold">
                  آیا مطمئن هستید که می‌خواهید این بلاگ را حذف کنید؟
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="danger" onPress={deletePost} isLoading={loading}>
                  حذف بلاگ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
