import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { API_URL, HEADERS } from "../constants";

function DownloadInvoice() {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const clearForm = () => {
    setSearch("");
    setSearchValue("");
    setFromDate("");
    setToDate("");
  };


const onDownload = async (type) => {
    const fileType = type === "pdf" ? "-pdf" : "";
    const path = `api/v1/purchase-order/download${fileType}-purchase-orders`;
    const res = await fetch(
      `${API_URL}/${path}?ingst=${searchValue}&fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    )
      .then((response) => {
        response.blob().then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          console.log(url);
          link.href = url;
          link.download = `${searchValue}_${fromDate}_${toDate}.${
            type === "pdf" ? type : "xls"
          }`;
          link.click();
          clearForm();
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <Box className="dl-invoice-box">
        <Paper elevation={3}>
          <Typography variant="h3" component="div" gutterBottom>
            Download Invoice
          </Typography>
          <div className="dl-form">
            <FormControl className="search-dropdown">
              <InputLabel id="search-label">Search</InputLabel>
              <Select
                labelId="search-label"
                id="search-invoice"
                value={search}
                label="Search"
                onChange={(e) => setSearch(e.target.value)}
              >
                <MenuItem value="GSTIN NO.">GSTIN No.</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="search-value"
              label="Enter No."
              value={searchValue}
              required
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <TextField
              label="From Date"
              value={fromDate}
              required
              onChange={(e) => {
                handleFromDate(e);
              }}
              type="date"
            />
            <TextField
              label="To Date"
              value={toDate}
              required
              onChange={(e) => {
                handleToDate(e);
              }}
              type="date"
            />
          </div>
          <div className="dl-buttons">
            <Button
              variant="contained"
              type="button"
              id="save-xl"
              startIcon={<InsertDriveFileIcon />}
              onClick={() => onDownload("xls")}
              disabled={search === "" || toDate === "" || fromDate === ""}
            >
              Download Excel
            </Button>
            <Button
              variant="contained"
              type="button"
              id="save-pdf"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => onDownload("pdf")}
              disabled={search === "" || toDate === "" || fromDate === ""}
            >
              Download PDF
            </Button>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

export default DownloadInvoice;
