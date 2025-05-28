import React, { useState, useEffect } from "react";

const FileUpload = ({ file, onFileChange, error }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={(e) => {
          if (e.target.files.length > 0) onFileChange(e.target.files[0]);
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Profile Preview"
          style={{
            marginTop: 10,
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default FileUpload;
