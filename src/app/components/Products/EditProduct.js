"use client";
import { getProduct } from "@/app/utils/ProductService";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";

export default function EditProduct({ p_id, refresh }) {
  const [size, setSize] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [discount_percent, setDiscountPercent] = useState("");
  const [discount_price, setDiscountPrice] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [stock, setStock] = useState("");
  const [t_category_id, setTcategory] = useState("");
  const [m_category_id, setMcategory] = useState("");
  const [active, setActive] = useState("");
  const [special, setSpecial] = useState("");

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  useEffect(() => {
    if (isOpen && p_id) {
      const input_params = new URLSearchParams({
        product_id: p_id,
      });

      const fetchData = async () => {
        const data = await getProduct(input_params);
        if (data) {
          setProductName(data[0]?.product_name);
          setProductPrice(data[0]?.product_price);
          setDiscountPercent(data[0]?.discount_percent);
          setDiscountPrice(data[0]?.discount_price);
          setProductPhoto(data[0]?.product_photo);
          setStock(data[0]?.stock);
          setTcategory(data[0]?.t_category_id);
          setMcategory(data[0]?.m_category_id);
          setActive(data[0]?.active);
          setSpecial(data[0]?.special);
        }
      };
      fetchData();
    }
  }, [isOpen]);
  const updateData = async () => {
    try {
      const response = await fetch(
        "https://adminhydrogenous.vercel.app/api/Products/EditProduct",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_id,
            product_name,
            product_price,
            discount_percent,
            discount_price,
            product_photo,
            stock,
            t_category_id,
            m_category_id,
            active,
            special,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("updated successfully", data);
      } else {
        console.error("Error updating", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    refresh();
    onClose();
  };
  return (
    <>
      <Button
        color="success"
        className="text-white"
        onPress={() => handleOpen("3xl")}
      >
        ویرایش محصول
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <form className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="نام محصول"
                      type="text"
                      value={product_name}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <Input
                      label="قیمت محصول "
                      type="text"
                      value={product_price}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <Input
                      label="تخفیف درصدی "
                      type="tel"
                      value={discount_percent}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                    />
                    <Input
                      label="تخفیف قیمتی"
                      type="tel"
                      value={discount_price || ""}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                    />

                    <Input
                      label="عکس محصول "
                      type="text"
                      value={product_photo}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setProductPhoto(e.target.value)}
                    />
                    <Input
                      label="تعداد موجود در انبار "
                      type="text"
                      value={stock}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <Input
                      label="دسته بندی اول"
                      type="text"
                      value={t_category_id}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setTcategory(e.target.value)}
                    />
                    <Input
                      label=" دسته بندی دوم "
                      type="text"
                      value={m_category_id}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setMcategory(e.target.value)}
                    />
                    <CheckboxGroup orientation="horizontal">
                      <Checkbox value={active}>فعال</Checkbox>
                      <Checkbox value={special}>سفارش</Checkbox>
                    </CheckboxGroup>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="text-white"
                  onPress={() => {
                    updateData();
                  }}
                >
                  ویرایش
                </Button>
                <Button color="danger" onPress={onClose}>
                  انصراف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
