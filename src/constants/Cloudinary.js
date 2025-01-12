export const uploadFileToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "petfolio");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dphjwma4h/image/upload",
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
