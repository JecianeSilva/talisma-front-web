import { Box } from "@material-ui/core";
import styled from "styled-components";

export const UploadCard = styled(Box)(({ theme, image }) => ({
  display: image && image[1] ? "none" : "flex",
  border: image && image[1] ? "none" : "2px dashed #bdbcbc",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "180px",
  width: "180px",
  borderRadius: 10,
}));

export const ImageCard = styled.div``;

export const ButtonCard = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export const IconButton = styled("div")(({ theme, pos }) => ({
  position: "absolute",
  background: "rgba(255,255,255,0.85)",
  borderRadius: pos === "end" ? "4px 0px 10px" : "0px 10px 0px 4px",
  zIndex: "9999",
}));
export const ImageContent = styled.div`
  height: 180px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px #bdbcbc;
`;
export const Image = styled.img`
  height: 180px;
  min-width: 180px;
  border-radius: 10px;
  object-fit: cover;
`;

export const Input = styled.input`
  display: none;
`;
export const Label = styled.label``;
