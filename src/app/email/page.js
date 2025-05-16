"use client";

import { useEffect, useState } from "react";
import convertToPersianDate from "../utils/ConvertToPersianDate";
import { GoPerson } from "react-icons/go";
import { MdSubject } from "react-icons/md";
import { PiChatText } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const Email = () => {
  const [emails, SetEmails] = useState();
  const GetSlider = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Email/GetEmails");
      if (!response.ok) {
        throw new Error("Failed to fetch sliders");
      }
      const res = await response.json();
      SetEmails(res);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  useEffect(() => {
    GetSlider();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5 p-5">
        {emails?.map((email) => {
          return (
            <div className="flex flex-col gap-3 p-2 shadow-lg">
              <div className="flex flex-row items-center gap-2">
                <GoPerson className="text-2xl" />
                <p>نام و نام خانوادگی</p>
                <p>{email.fn + " " + email.ln}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <MdSubject className="text-2xl" />
                <p>موضوع پیام</p>
                <p>{email.subject}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <PiChatText className="text-2xl" />
                  <p>متن پیام</p>
                </div>
                <p className="text-justify">{email.message}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <SlCalender className="text-2xl" />
                <p>تاریخ رسال</p>
                <p>{convertToPersianDate(email.created_at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Email;
