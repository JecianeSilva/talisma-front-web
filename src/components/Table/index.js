import React, { forwardRef, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import Visibility from "@material-ui/icons/Visibility";
import ViewColumn from "@material-ui/icons/ViewColumn";
import history from "../../config/history";
import { localization } from "../../utils/location-ptBr";
import { Button, Divider, Icon } from "@material-ui/core";
import { Alert } from "@mui/material";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} sx={{ color: "#F32424" }} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  View: forwardRef((props, ref) => <VisibilityOutlined {...props} ref={ref} />),
};

function Table({
  columns,
  data,
  options,
  pathname,
  pathname2,
  title,
  selectable,
  onDelete,
  hideActions,
  hideEditAction,
  hideDeleteAction,
  hideViewAction,
  perPage,
  ...rest
}) {
  const [disableEditIcon, setDisableEditIcon] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState();

  function handleDialog() {
    setOpenDialog(!openDialog);
  }
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        localization={localization}
        options={{
          pageSize: data && data.length < perPage ? data.length : perPage,
          selection: selectable,
          showTitle: false,
          toolbar: true,
          paging: false,
          pageSizeOptions: [10],
          actionsColumnIndex: -1,
          headerStyle: { color: "#4F4F4F", fontWeight: "bold" },
          rowStyle: { color: "#8C8C8C" },
          ...options,
        }}
        actions={
          hideActions
            ? []
            : [
                hideViewAction
                  ? null
                  : {
                      icon: tableIcons.View,
                      tooltip: "View",
                      position: "row",
                      onClick: (event, rowData) => {
                        event.preventDefault();
                        rowData.length > 0
                          ? history.push(
                              `${pathname}/view-${pathname2}/${rowData[0].id}`
                            )
                          : history.push(
                              `${pathname}/view-${pathname2}/${rowData.id}`
                            );
                      },
                      disabled: disableEditIcon,
                    },
                hideEditAction
                  ? null
                  : {
                      icon: tableIcons.Edit,
                      tooltip: "Editar",
                      position: "row",
                      onClick: (event, rowData) => {
                        event.preventDefault();
                        rowData.length > 0
                          ? history.push(
                              `${pathname}/editar-${pathname2}/${rowData[0].id}`
                            )
                          : history.push(
                              `${pathname}/editar-${pathname2}/${rowData.id}`
                            );
                      },
                      disabled: disableEditIcon,
                    },
                hideDeleteAction
                  ? null
                  : {
                      icon: tableIcons.Delete,
                      color: "#F32424",
                      tooltip: "Deletar",
                      onClick: (event, rowData) => {
                        event.preventDefault();
                        setId(rowData.length > 0 ? rowData[0].id : rowData.id);
                        handleDialog();
                      },
                      disabled: !onDelete,
                    },
              ]
        }
        onSelectionChange={(rows) =>
          rows.length > 1 ? setDisableEditIcon(true) : setDisableEditIcon(false)
        }
        components={{
          Toolbar: (props) => (
            <>
              {!title ? null : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "13rem",
                      fontSize: "16px",
                      padding: "10px 0px",
                      color: "#D68E70",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </div>

                  {/* <Button
                  style={{
                    height: "fit-content",
                    borderRadius: "24px",
                    color: "#4F4F4F",
                  }}
                  variant="outlined"
                >
                  <FilterList color="#4F4F4F" />
                  Filtros
                </Button> */}
                </div>
              )}
              <Divider />
            </>
          ),
        }}
        {...rest}
      />
      {/* <Alert
        openDialog={openDialog}
        handleDialog={handleDialog}
        handleSubmit={() => {
          onDelete(id);
          handleDialog();
        }}
      /> */}
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectable: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Table;
