"use client";
import Image from "next/image";
import AddButton from "../components/Sliders/AddButton";
import DeleteButton from "../components/Sliders/DeleteButton";
import { useEffect, useState } from "react";
const Slider = () => {
  const [sliders, SetSlider] = useState();
  const GetSlider = async () => {
    try {
      const response = await fetch(
        "https://adminhydrogenous.vercel.app/api/Sliders/GetSliders"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sliders");
      }
      const res = await response.json();
      SetSlider(res);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  useEffect(() => {
    GetSlider();
  }, []);
  return (
    <>
      <div className="p-3">
        <AddButton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
          {sliders?.map((slider) => {
            return (
              <div className="flex flex-col gap-2">
                <Image
                  src={`/images/sliders/${slider.slider_image}`}
                  width={600}
                  height={300}
                  alt="image not found"
                  className="rounded-md"
                />
                <DeleteButton id={slider.slider_id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
