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
import DeleteUser from "../components/Users/DeleteUser";

const Users = () => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
    return response.json();
  };
  const {
    data: users,
    error,
    isLoading,
  } = useSWR("https://adminhydrogenous.vercel.appapi/GetUsers", fetcher);

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableColumn> نام و نام خانوادگی </TableColumn>
          <TableColumn> شماره موبایل </TableColumn>
          <TableColumn> ایمیل </TableColumn>
          <TableColumn> تاریخ تولد </TableColumn>
          <TableColumn> زمان ایجاد حساب کاربری </TableColumn>
          <TableColumn> عملیات </TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>
                    {user.first_name + " " + user.last_name}
                  </TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.data_of_birth}</TableCell>
                  <TableCell>
                    {convertToPersianDate(user.create_Account)}
                  </TableCell>
                  <TableCell>
                    <DeleteUser c_id={user.customer_id} />
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
export default Users;
