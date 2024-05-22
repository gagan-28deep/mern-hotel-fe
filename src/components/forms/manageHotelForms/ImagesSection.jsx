import React from "react";
import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalFiles = imageFiles?.length;
              if (totalFiles === 0) {
                return "At least one image file is required";
              }
              if (totalFiles > 6) {
                return "Maximum of 6 images are allowed";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors?.imageFiles?.message}</span>
      )}
    </div>
  );
};

export default ImagesSection;
