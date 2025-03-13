"use client";

import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({ onChange, initialValue }) {

  return (
    <Editor
      apiKey="tbcoajdje3qd3ko22vfhgmsenuj0osmac2syprih2lh9vgle"
      initialValue={initialValue} 
      init={{
        height: 400,
        menubar: true,
        directionality: "rtl",
        plugins: "image",
        automatic_uploads: false,
        images_upload_url: "/api/Upload",
        toolbar: "undo redo | bold italic | image",
        images_upload_handler: async (blobInfo, success, failure) => {
          try {
            const formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());

            const res = await fetch("/api/Upload", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              throw new Error("خطا در آپلود تصویر");
            }

            const data = await res.json();
            console.log("Response from server:", data); 

            if (!data.fileName) {
              throw new Error("نام فایل دریافت نشد!");
            }

            const fullPath = `/images/posts/${data.fileName}`;
            console.log("Final image URL:", fullPath);
            success(fullPath); 
          } catch (error) {
            console.error("Upload Error:", error);
            if (typeof failure === "function") {
              failure(error.message);
            }
          }
        },
      }}
      onEditorChange={(newContent) => {
        if (onChange) {
          onChange(newContent); 
        }
      }}
    />
  );
}
