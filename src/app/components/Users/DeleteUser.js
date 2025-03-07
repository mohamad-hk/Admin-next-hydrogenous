import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const DeleteUser = ({ c_id, refresh }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const input_params = new URLSearchParams({
    customer_id: c_id,
  });

  const removeAddress = async (input_params) => {
    try {
      const response = await fetch(
        `https://adminhydrogenous.vercel.app/api/Products/DeleteUser?${input_params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("done", result);
        refresh();
      } else {
        console.error("Failed to delete shipment:", result.error);
      }
    } catch (error) {
      console.error("Error deleting shipments:", error);
    }
  };
  const deleteData = () => {
    console.log(1);
    removeAddress(input_params);
  };
  return (
    <>
      <Button color="danger" onPress={onOpen}>
        حذف کاربر
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                آیا از حذف کاربر اطمینان دارید؟
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose;
                    deleteData();
                  }}
                >
                  بله
                </Button>
                <Button color="primary" onPress={onClose}>
                  خیر
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteUser;
