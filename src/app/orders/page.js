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
import convertToPersianDate from "../utils/ConvertToPersianDate";

const Order = () => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
    return response.json();
  };
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR("https://adminhydrogenous.vercel.app/api/GetOrders", fetcher);

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableColumn>شماره سفارش</TableColumn>
          <TableColumn>لیست محصولات</TableColumn>
          <TableColumn>مجموع سفارش</TableColumn>
          <TableColumn>هزینه ارسال</TableColumn>
          <TableColumn>زمان سفارش</TableColumn>
          <TableColumn>روش ارسال</TableColumn>
          <TableColumn>وضعیت سفارش</TableColumn>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>{order.order_code}</TableCell>
                  <TableCell>{order.l_products}</TableCell>
                  <TableCell>
                    {PersianNumbers(order.total_price) + " تومان"}
                  </TableCell>
                  <TableCell>{PersianNumbers(order.price_deliver)}</TableCell>
                  <TableCell>
                    {convertToPersianDate(order.order_date)}
                  </TableCell>
                  <TableCell>{order.method_sending}</TableCell>
                  <TableCell>{order.status_order}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default Order;
