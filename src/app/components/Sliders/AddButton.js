"use client";
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
export default function AddButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productPhoto, setProductPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductPhoto(file);
  };

  const AddSlider = async () => {
    if (!productPhoto) {
      alert("لطفاً یک تصویر انتخاب کنید.");
      return;
    }

    const formData = new FormData();
    formData.append("product_photo", productPhoto);

    try {
      const response = await fetch("/api/Sliders/AddSlider", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onOpenChange(false);
      } else {
        console.error("آپلود ناموفق بود.");
      }
    } catch (error) {
      console.error("خطای سرور:", error);
    }
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>
        افزودن اسلایدر
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                انتخاب تصویر اسلایدر
              </ModalHeader>
              <ModalBody>
                <div>
                  <label className="block text-gray-700">
                    انتخاب تصویر اسلایدر
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="primary" onPress={AddSlider}>
                  افزودن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
