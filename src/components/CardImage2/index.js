import React from "react";
import { Box, CardContent, SvgIcon, Typography } from "@material-ui/core";

import { ReactComponent as imageUpload } from "../../assets/icons/image-upload.svg";
import { ReactComponent as imageSwap } from "../../assets/icons/image-swap.svg";
import { DeleteOutline } from "@material-ui/icons";

function CardImage({ image, formik, handleImage }) {
  return (
    <CardContent>
      {image && image[1] !== null && (
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
              onClick={(e) => {
                const images = formik.values.images;
                formik.values.images.set(image[0], null);
                formik.setFieldValue("images", images);
              }}
            >
              <DeleteOutline
                style={{ margin: "2px 0px", width: "32px" }}
                color={"disabled"}
              />
            </div>
          </div>
          <div
            style={{
              height: "220px",
              borderRadius: 10,
              boxShadow: "0px 0px 3px 0px #bdbcbc",
            }}
          >
            <img
              style={{
                borderRadius: 10,
                objectFit: "cover",
              }}
              alt="imagem do produto"
              src={image && image[1]}
            />
          </div>
          <div
            style={{
              marginTop: "-36px",
              zIndex: 9999,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
          >
            <input
              accept="image/*"
              id={`contained-button-file-${image[0]}`}
              type="file"
              style={{
                display: "none",
              }}
              onChange={handleImage}
            />
            <label
              for={`contained-button-file-${image[0]}`}
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
        id={`contained-button-file-${image[0]}`}
        type="file"
        style={{
          display: "none",
        }}
        onChange={handleImage}
      />

      <label for={`contained-button-file-${image[0]}`}>
        <Box
          sx={{
            display: image && image[1] ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "220px",
            width: "220px",
            border: image && image[1] ? "none" : "2px dashed #bdbcbc",
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
