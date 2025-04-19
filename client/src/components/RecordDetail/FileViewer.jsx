import { useEffect, useState } from "react";

const FileViewer = ({ recordId }) => {
  const [fileType, setFileType] = useState("loading"); // "image", "pdf", or "none"

  useEffect(() => {
    const img = new Image();
    img.src = `/SMM/${recordId}.jpg`;
    img.onload = () => setFileType("image");
    img.onerror = () => {
      // Try loading PDF
      fetch(`/SMM/${recordId}.pdf`, { method: "HEAD" })
        .then((res) => {
          const contentType = res.headers.get("Content-Type");
          if (res.ok && contentType && contentType.includes("pdf")) {
            setFileType("pdf");
          } else {
            setFileType("none");
          }
        })
        .catch(() => setFileType("none"));
    };
  }, [recordId]);

  return (
    <div className="image-container p-4 border rounded-md shadow-md text-center">
      {fileType === "loading" && (
        <p className="text-gray-500">Loading file...</p>
      )}

      {fileType === "image" && (
        <img
          src={`/SMM/${recordId}.jpg`}
          alt="Record Visual"
          className="max-w-full h-auto rounded"
        />
      )}

      {fileType === "pdf" && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700">
            Image not found. PDF available:
          </p>
          <a
            href={`/SMM/${recordId}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View PDF
          </a>
        </div>
      )}

      {fileType === "none" && (
        <p className="text-red-500 text-sm">
          No image or PDF available for this record.
        </p>
      )}
    </div>
  );
};

export default FileViewer;
