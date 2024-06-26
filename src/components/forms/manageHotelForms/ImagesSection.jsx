import React from "react";
import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  let existingImageFiles = watch("imageUrls");

  const handleDeteleImage = (e, imageUrl) => {
    e.preventDefault();
    setValue("imageUrls", [
      existingImageFiles?.filter((url) => url !== imageUrl),
    ]);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageFiles && existingImageFiles?.length > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageFiles?.map((image) => (
              <div className="relative group" key={image}>
                <img src={image} className="object-cover min-h-full" />
                <button
                  onClick={(e) => handleDeteleImage(e, image)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              // const totalFiles =
              //   imageFiles?.length +
              //   (existingImageFiles[0]
              //     ? existingImageFiles[0]?.length
              //       ? existingImageFiles
              //         ? existingImageFiles?.length
              //         : 0
              //       : 0
              //     : 0);

              let totalFiles = 0;

              if (imageFiles?.length) {
                totalFiles += imageFiles.length;
              }
              if (existingImageFiles && existingImageFiles[0]) {
                if (existingImageFiles[0].length) {
                  if (existingImageFiles) {
                    totalFiles += existingImageFiles.length;
                  }
                }
              } else {
                existingImageFiles?.length &&
                  (totalFiles += existingImageFiles?.length);
              }

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
