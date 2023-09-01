import { useState } from "react";
import UploadPrompt from "./UploadPage/UploadPrompt";
import UploadSuccess from "./UploadPage/UploadSuccess";

function UploadPage() {
  const [songUploaded, setSongUploaded] = useState(false);

  return (
    <>
      {songUploaded ? (
        <UploadSuccess />
      ) : (
        <UploadPrompt setSongUploaded={setSongUploaded} />
      )}
    </>
  );
}

export default UploadPage;
