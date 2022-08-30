import React, { useState } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowBackIos, Search } from "@material-ui/icons";
import PropTypes from "prop-types";
import Api from "../../../config/api";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import FormEditClient from "./EditClient";

function EditClient() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleLoad() {
    setLoading(false);
  }
  return (
    <>
      {loading ? (
        <Loading size={3} color="#70163A" />
      ) : (
        <Container>
          <ContentHeader>
            <IconButton
              onClick={() => history.goBack()}
              style={{
                backgroundColor: "#70163A",
                color: "#D68E70",
                paddingRight: "3px",
                height: "48px",
                width: "48px",
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <Typography
              variant="h3"
              style={{
                color: "#656263",
                marginRight: "40px",
                flex: 1,
                marginLeft: "20px",
                fontSize: "35px",
                lineheight: "43px",
              }}
            >
              Cliente
            </Typography>

            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#F35457",
                  color: "#FFF",
                  borderRadius: "24px",
                }}
                onClick={() => history.goBack()}
              >
                Descartar
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#21AB69",
                  color: "#FFF",
                  marginLeft: "20px",
                  borderRadius: "24px",
                }}
                type="submit"
                // onClick={formik.handleSubmit}
              >
                Salvar
              </Button>
            </div>
          </ContentHeader>
          <ContentBody>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="transparent"
                textColor="secondary"
              >
                <Tab label="Cliente" {...a11yProps(0)} />
                <Tab label="Carteira virtual" {...a11yProps(1)} />
                <Tab label="Histórico de pedidos" {...a11yProps(2)} />
              </Tabs>
              <Divider />
            </Box>
            <TabPanel value={value} index={0}>
              <FormEditClient
                id={id}
                loading={loading}
                setLoading={() => handleLoad()}
              />
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
            <TabPanel value={value} index={2}></TabPanel>
          </ContentBody>
        </Container>
      )}
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
        <Box sx={{ p: 3 }}>
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
