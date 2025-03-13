"use client";
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
import { useState } from "react";

export default function AddProduct({ refresh }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [discount_percent, setDiscountPercent] = useState("");
  const [discount_price, setDiscountPrice] = useState("");
  const [product_photo, setProductPhoto] = useState(null); // 📌 مدیریت فایل
  const [stock, setStock] = useState("");
  const [t_category_id, setTcategory] = useState("");
  const [m_category_id, setMcategory] = useState("");
  const [active, setActive] = useState(false);
  const [special, setSpecial] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductPhoto(file);
  };

  const addProduct = async () => {
    if (!product_name || !product_price || !stock || !t_category_id || !m_category_id || !product_photo) {
      alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }

    const productData = {
      product_name,
      product_price: Number(product_price),
      discount_percent: Number(discount_percent) || 0,
      discount_price: Number(discount_price) || 0,
      stock: Number(stock),
      t_category_id,
      m_category_id,
      active,
      special,
    };

    const formData = new FormData();
    formData.append("product_photo", product_photo);
    formData.append("productData", JSON.stringify(productData));

    try {
      const response = await fetch("/api/Products/AddProduct", {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();

      if (response.ok) {
        refresh(); 
        onOpenChange(false)
      } else {
      }
    } catch (error) {
      console.error("خطای سرور:", error);
    }
  };

  return (
    <>
      <Button color="success" className="text-white my-4 ms-2" onPress={onOpen}>
        اضافه کردن محصول
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <form className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="نام محصول" type="text" value={product_name} onChange={(e) => setProductName(e.target.value)} />
                    <Input label="قیمت محصول" type="text" value={product_price} onChange={(e) => setProductPrice(e.target.value)} />
                    <Input label="تخفیف درصدی" type="number" value={discount_percent} onChange={(e) => setDiscountPercent(e.target.value)} />
                    <Input label="تخفیف قیمتی" type="number" value={discount_price} onChange={(e) => setDiscountPrice(e.target.value)} />
                    <Input label="تعداد موجودی" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    <Input label="دسته‌بندی اول" type="text" value={t_category_id} onChange={(e) => setTcategory(e.target.value)} />
                    <Input label="دسته‌بندی دوم" type="text" value={m_category_id} onChange={(e) => setMcategory(e.target.value)} />

                    <div>
                      <label className="block text-gray-700">انتخاب تصویر محصول</label>
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <CheckboxGroup orientation="horizontal">
                      <Checkbox checked={active} onChange={() => setActive(!active)}>فعال</Checkbox>
                      <Checkbox checked={special} onChange={() => setSpecial(!special)}>ویژه</Checkbox>
                    </CheckboxGroup>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" className="text-white" onPress={addProduct}>
                  افزودن محصول
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
