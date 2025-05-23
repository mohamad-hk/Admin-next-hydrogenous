"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import PersianNumbers from "../utils/ToPersianNumber";
import useSWR from "swr";
import OptionsProduct from "../components/Products/OptionsProduct";
import AddProduct from "../components/Products/AddProduct";

const Products = () => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
    return response.json();
  };
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/api/Products/GetProducts`, fetcher);

  // آیدی رو ست کنم
  // const {
  //   data: products,
  //   error,
  //   isLoading,
  // } = useSWR("http://localhost:3000api/GetProducts", fetcher);

  return (
    <>
      <AddProduct
        refreshData={() =>
          mutate(`/api/Products/GetProduct?product_id=${product.product_id}`)
        }
      />
      <Table className="">
        <TableHeader>
          <TableColumn>نام محصول</TableColumn>
          <TableColumn>قیمت محصول</TableColumn>
          <TableColumn>درصد تخفیف</TableColumn>
          <TableColumn>تخفیف براساس قسمت</TableColumn>
          <TableColumn>موجودی انبار</TableColumn>
          <TableColumn>تعداد بازدید</TableColumn>
          <TableColumn>تعداد فروش</TableColumn>
          <TableColumn>فعال</TableColumn>
          <TableColumn>ویژه</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>
                    {PersianNumbers(product.product_price) + " تومان"}
                  </TableCell>
                  <TableCell>
                    {PersianNumbers(product.discount_percent)}
                  </TableCell>
                  <TableCell>
                    {PersianNumbers(product.discount_price)}
                  </TableCell>
                  <TableCell>{PersianNumbers(product.stock)}</TableCell>
                  <TableCell>{PersianNumbers(product.view)}</TableCell>
                  <TableCell>
                    {PersianNumbers(product.number_of_sale)}
                  </TableCell>
                  <TableCell>{product.active}</TableCell>
                  <TableCell>{product.special}</TableCell>
                  <TableCell>
                    <OptionsProduct
                      p_id={product.product_id}
                      refreshData={() =>
                        mutate(
                          `/api/Products/GetProduct?product_id=${product.product_id}`
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default Products;
