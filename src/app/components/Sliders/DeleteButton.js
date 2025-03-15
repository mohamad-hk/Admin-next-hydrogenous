"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function DeleteButton({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const input_params = new URLSearchParams({
    slider_id: id,
  });
  const DeleteSlider = async (input_params) => {
    try {
      const response = await fetch(
        `/api/Sliders/DeleteSlider?${input_params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        onOpenChange(false)
      } else {
        console.error("Failed to delete shipment:", result.error);
      }
    } catch (error) {
      console.error("Error deleting shipments:", error);
    }
  };
  return (
    <>
      <Button color="danger" onPress={onOpen}>
        حذف
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                آیا از حذف اسلایدر اطمینان دارید؟
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  خیر
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await DeleteSlider(input_params); 
                    onClose();
                  }}
                >
                  بله
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
