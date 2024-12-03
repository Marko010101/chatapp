import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

export const uploadFileToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "petfolio"); // Use your Cloudinary preset here

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dphjwma4h/image/upload", // Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Image upload failed. Please try again.");
  }
};
