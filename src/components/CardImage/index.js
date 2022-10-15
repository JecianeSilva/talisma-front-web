import React from "react";
import { Box, CardContent, SvgIcon, Typography } from "@material-ui/core";

import { ReactComponent as imageUpload } from "../../assets/icons/image-upload.svg";
import { ReactComponent as imageSwap } from "../../assets/icons/image-swap.svg";
import { DeleteOutline } from "@material-ui/icons";
import {
  ButtonCard,
  IconButton,
  Image,
  ImageCard,
  ImageContent,
  Input,
  Label,
  UploadCard,
} from "./styles";

function CardImage({ image, formik, handleImage, disabled }) {
  const handleDelete = (e) => {
    const images = formik.values.images;
    formik.values.images.set(image[0], null);
    formik.setFieldValue("images", images);
  };
  return (
    <CardContent
    style={{padding: '0px'}}>
      {image && image[1] !== null ? (
        <ImageCard>
          <ButtonCard>
            <IconButton onClick={handleDelete} disabled={disabled}>
              <DeleteOutline style={{ margin: "2px 4px" }} color={"disabled"} />
            </IconButton>
          </ButtonCard>
          <ImageContent>
            <Image alt="imagem do produto" src={image && image[1]} />
          </ImageContent>
          <ButtonCard style={{ marginTop: "-36px" }}>
            <Input
              accept="image/*"
              id={`image-${image[0]}`}
              type="file"
              onChange={handleImage}
              disabled={disabled}
            />
            <Label for={`image-${image[0]}`}>
              <ButtonCard>
                <IconButton pos={"end"} disabled={disabled}>
                  <SvgIcon
                    component={imageSwap}
                    style={{ margin: 4 }}
                    viewBox="0 0 35 28"
                  />
                </IconButton>
              </ButtonCard>
            </Label>
          </ButtonCard>
        </ImageCard>
      ) : (
        <Box>
          <Input
            accept="image/*"
            id={`image-${image[0]}`}
            type="file"
            onChange={handleImage}
            disabled={disabled}
          />
          <Label for={`image-${image[0]}`}>
            <UploadCard image={image}>
              <SvgIcon
                component={imageUpload}
                style={{ width: "1.3em", height: "1.3em" }}
                viewBox="0 0 32 32"
              />
              ,
              <span style={{color:'#D68E70', fontSize: '1.2rem', textAlign:'center', lineHeight:'1.3rem'}}>
                Fazer upload de imagem...
              </span>
            </UploadCard>
          </Label>
        </Box>
      )}
    </CardContent>
  );
}

export default CardImage;
