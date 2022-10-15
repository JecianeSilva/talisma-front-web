import React, { useRef, useState } from "react";
// import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import PropTypes from "prop-types";
// import Api from "../../../config/api";

// import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import FormEditClient from "./EditClient";
import CardVirtual from "./CardVirtual";
import StockHistory from "./StockHistory";

function EditClient() {
  const params = useParams();
  const formEl = useRef(null);

  const { id } = params;
  const [value, setValue] = React.useState(0);
  const [callHandleSubmit, setCallHandleSubmit] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container>
        <ContentHeader>
        <IconButton
            onClick={() => history.goBack()}
            style={{
              backgroundColor: "#70163A",
              color: "#D68E70",
              paddingRight: "3px",
              height: "40px",
              width: "40px",
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <Typography
            variant="h1"
            style={{
              color: "#656263",
              marginLeft: "24px",
              flex:1
            }}
          >
            Cliente
          </Typography>

          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: value === 0 ? "#F35457" : "#8e8e8e",
                color: "#FFF",
                borderRadius: "24px",
              }}
              disabled={value !== 0}
              onClick={() => history.goBack()}
            >
              Descartar
            </Button>
            <Button
              ref={formEl}
              variant="contained"
              size="large"
              style={{
                backgroundColor: value === 0 ? "#21AB69" : "#8e8e8e",
                color: "#FFF",
                marginLeft: "20px",
                borderRadius: "24px",
              }}
              type="submit"
              disabled={value !== 0}
              onClick={() => setCallHandleSubmit(true)}
            >
              Salvar
            </Button>
          </div>
        </ContentHeader>
        <ContentBody>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              // indicatorColor="transparent"
              textColor="secondary"
            >
              <Tab label="Cliente" {...a11yProps(0)} />
              <Tab label="Carteira virtual" {...a11yProps(1)} />
              <Tab label="Histórico de pedidos" {...a11yProps(2)} />
            </Tabs>
            <Divider />
          </Box>
          <TabPanel value={value} index={0} style={{ padding: "1rem 0rem" }}>
            <FormEditClient
              id={id}
              formEl={formEl}
              callHandleSubmit={callHandleSubmit}
              setCallHandleSubmit={setCallHandleSubmit}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{ padding: "1rem 0rem", width: "100%", margin: "0px" }}
          >
            <CardVirtual id={id} />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            style={{ padding: "1rem 0rem", width: "100%", margin: "0px" }}
          >
            <StockHistory id={id} />
          </TabPanel>
        </ContentBody>
      </Container>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box container>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default EditClient;
