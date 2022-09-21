import React from "react";
import { Box, CardContent, SvgIcon, Typography } from "@material-ui/core";

import { ReactComponent as imageUpload } from "../../assets/icons/image-upload.svg";
import { ReactComponent as imageSwap } from "../../assets/icons/image-swap.svg";
import { DeleteOutline } from "@material-ui/icons";

function CardImage({ image, formik, index }) {
  const handleImage = (e) => {
    formik.setFieldValue(
      `image${index}`,
      URL.createObjectURL(e.target.files[0])
    );
  };

  return (
    <CardContent>
      {image && (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                background: "#FFFFFF",
                borderRadius: "0px 4px",
                zIndex: 9999,
              }}
              onClick={() => formik.setFieldValue(`image${index}`, null)}
            >
              <DeleteOutline style={{ margin: "4px 2px" }} color={"disabled"} />
            </div>
          </div>
          <div
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain",
              borderRadius: 10,
              boxShadow: "0px 0px 3px 0px #bdbcbc",
            }}
          >
            <img
              style={{
                objectFit: "contain",
              }}
              alt="imagem do produto"
              src={image}
            />
          </div>
          <div
            style={{
              marginTop: "-44px",
              zIndex: 9999,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
          >
            <input
              accept="image/*"
              id={`contained-button-file-${index}`}
              type="file"
              style={{
                display: "none",
              }}
              onChange={handleImage}
            />
            <label
              for={`contained-button-file-${index}`}
              style={{
                background: "rgba(255, 255, 255,0.96)",
                borderRadius: "4px 0px",
              }}
            >
              <SvgIcon
                component={imageSwap}
                style={{ margin: 4 }}
                viewBox="0 0 35 28"
              />
            </label>
          </div>
        </div>
      )}
      <input
        accept="image/*"
        id={`contained-button-file-${index}`}
        type="file"
        style={{
          display: "none",
        }}
        onChange={handleImage}
      />

      <label for={`contained-button-file-${index}`}>
        <Box
          sx={{
            display: image ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "220px",
            width: "220px",
            border: image ? "none" : "2px dashed #bdbcbc",
            borderRadius: 10,
          }}
        >
          <SvgIcon
            component={imageUpload}
            style={{ width: "1.3em", height: "1.3em" }}
            viewBox="0 0 32 32"
          />
          ,
          <Typography
            variant="h2"
            color="secondary"
            style={{ textAlign: "center", padding: "0px 2rem" }}
          >
            Fazer upload de imagem...
          </Typography>
        </Box>
      </label>
    </CardContent>
  );
}

export default CardImage;
