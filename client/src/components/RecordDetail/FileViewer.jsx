import { useEffect, useState } from "react";

const FileViewer = ({ recordId }) => {
  const [hasImage, setHasImage] = useState(false);
  const [hasPDF, setHasPDF] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let imgCheck = new Image();
    imgCheck.src = `/SMM/${recordId}.jpg`;

    imgCheck.onload = () => {
      setHasImage(true);
    };
    imgCheck.onerror = () => {
      setHasImage(false);
    };

    fetch(`/SMM/${recordId}.pdf`, { method: "HEAD" })
      .then((res) => {
        const contentType = res.headers.get("Content-Type");
        if (res.ok && contentType?.includes("pdf")) {
          setHasPDF(true);
        }
      })
      .catch(() => {
        setHasPDF(false);
      })
      .finally(() => {
        setChecked(true);
      });
  }, [recordId]);

  return (
    <div className="image-container p-4 border rounded-md shadow-md text-center">
      {!checked && (
        <p className="text-gray-500">Checking file availability...</p>
      )}

      {checked && hasImage && hasPDF && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700">Both Image and Official Report available:</p>
          <img
            src={`/SMM/${recordId}.jpg`}
            alt="Record"
            className="max-w-full h-auto rounded mb-2"
          />
          <a
            href={`/SMM/${recordId}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View PDF
          </a>
        </div>
      )}

      {checked && hasImage && !hasPDF && (
        <img
          src={`/SMM/${recordId}.jpg`}
          alt="Record"
          className="max-w-full h-auto rounded"
        />
      )}

      {checked && !hasImage && hasPDF && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700">
            Image not found. Official Report available:
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

      {checked && !hasImage && !hasPDF && (
        <p className="text-red-500 text-sm">
          No image or Report available for this record.
        </p>
      )}
    </div>
  );
};

export default FileViewer;
