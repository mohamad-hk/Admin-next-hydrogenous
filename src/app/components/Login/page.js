"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleVerify = async () => {
    const secret = process.env.NEXT_PUBLIC__GOOGLE_AUTHENTICATE;

    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, secret }),
    });

    const data = await res.json();
    if (data.verified) {
      setMessage("خوش آمدید");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setMessage(" کد اشتباه است");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center w-[80%] md:w-[50%] lg:w-[30%]  xl:w-[25%] mx-auto">
      <div className="flex flex-col gap-3 items-center border rounded-md shadow-md p-5">
        <h1 className="text-center text-xl font-semibold">پنل ادمین</h1>
        <Image src={"/images/statics/logo.png"} width={300} height={150} alt="image not found"/>
        <input
          type="text"
          maxLength="6"
          className="border p-2 rounded-md w-full text-center text-xl"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white p-2 my-3 w-[80%] mx-auto block rounded-md"
        >
          ورود
        </button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
}
