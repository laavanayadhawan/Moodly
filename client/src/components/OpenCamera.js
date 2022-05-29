import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  boxShadow: 24,
};

const videoConstraints = {
  width: 800,
  height: 600,
  facingMode: "user",
};

export default function OpenCamera(props) {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const done = () => {
    let file = dataURLtoFile(image, "filename.png");
    props.setFile([file]);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="__OpenCamera">
          {!props.error ? (
            <div className="webcam-container">
              <div className="webcam-img">
                {image == "" ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={image} />
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center mt-5">
                {image != "" ? (
                  <>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setImage("");
                      }}
                      className="Button-Custom-1 white"
                    >
                      Retake
                    </Button>
                    <Button
                      onClick={done}
                      className="mx-5 Button-Custom-1 black"
                    >
                      Done
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className="Button-Custom-1 black"
                  >
                    Capture
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <p className="text-danger display-6">
                Make sure to upload/capture a picture with your face!
              </p>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
