import { useState } from "react";
import UploadPrompt from "./UploadPrompt";
import UploadSuccess from "./UploadSuccess";

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
