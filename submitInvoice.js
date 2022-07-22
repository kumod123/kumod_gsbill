import "../App.css";
import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { API_URL, HEADERS } from "../constants";
import { IconButton } from "@mui/material";

function SubmitInvoice() {
  const [billTo, setbillTo] = useState("");
  const [shipTo, setshipTo] = useState("");
  const [supplyPlace, setsupplyPlace] = useState("");
  const [pan, setPan] = useState("");
  const [gstIn, setgstIn] = useState("");
  const [billDate, setBillDate] = useState("");
  const [billNo, setBillNo] = useState("");
  const [inputList, setInputList] = useState([
    { name: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
  ]);
  //
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  //
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  //
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { name: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
    ]);
  };

  //

  const handleshipChange = (e) => {
    setshipTo(e.target.value);
  };
  const handlesBillNoChange = (e) => {
    setBillNo(e.target.value);
  };
  const handleplaceChange = (e) => {
    setsupplyPlace(e.target.value);
  };
  const handlepanChange = (e) => {
    setPan(e.target.value);
  };
  const handlegstInChange = (e) => {
    setgstIn(e.target.value);
  };

  const handlebillto = (e) => {
    setbillTo(e.target.value);
  };
  const handlebillDate = (e) => {
    setBillDate(e.target.value);
  };

  const clearForm = () => {
    setInputList([
      { name: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
    ]);
    setbillTo("");
    setshipTo("");
    setsupplyPlace("");
    setPan("");
    setgstIn("");
    setBillDate("");
    setBillNo("");
  };

  const handleSubmit = async (e) => {
    const path = "api/v1/purchase-order/save";
    const data = {
      billTo: billTo,
      shipTo: shipTo,
      supplyPlace: supplyPlace,
      pan: pan,
      gstin: gstIn,
      billNo: "",
      billDate: billDate.toString(),
      items: inputList,
    };
    const res = await fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clearForm();
      });
  };

  return (
    <Fragment>
      <Box className="main-box">
        <Paper elevation={3}>
          <div className="App">
            <Typography variant="h3" component="div" gutterBottom>
              Purchase Invoice Details Form
            </Typography>
            <form
              className="search-form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="gst-form">
                <div className="w-2/5">
                  <TextField
                    id="bill-to"
                    label="Bill To"
                    value={billTo}
                    required
                    onChange={(e) => {
                      handlebillto(e);
                    }}
                    multiline
                    rows={4}
                  />

                  <br />
                  <TextField
                    id="ship-to"
                    label="Ship To"
                    value={shipTo}
                    required
                    onChange={(e) => {
                      handleshipChange(e);
                    }}
                    multiline
                    rows={4}
                  />
                  <br />

                  <TextField
                    id="ship-to"
                    label="Supply Place"
                    value={supplyPlace}
                    required
                    onChange={(e) => {
                      handleplaceChange(e);
                    }}
                  />
                  <br />

                  <TextField
                    id="pan"
                    label="Pan"
                    value={pan}
                    required
                    onChange={(e) => {
                      handlepanChange(e);
                    }}
                  />
                  <br />
                  <TextField
                    id="ship-to"
                    label="GSTIN No."
                    value={gstIn}
                    required
                    onChange={(e) => {
                      handlegstInChange(e);
                    }}
                  />
                  <br />
                </div>
                <div className="w-2/5">
                  <TextField
                    id="ship-to"
                    label="Bill No."
                    value={billNo}
                    required
                    onChange={(e) => {
                      handlesBillNoChange(e);
                    }}
                  />
                  <br />
                  <TextField
                    label="Bill Date"
                    value={billDate}
                    required
                    onChange={(e) => {
                      handlebillDate(e);
                    }}
                    type="date"
                  />
                  <br />
                </div>
              </div>
              <div className="AppItems">
                <Typography variant="h4" component="div" gutterBottom>
                  Item Details
                </Typography>
                {inputList.map((x, i) => {
                  return (
                    <div className="box" key={`${x.name}_${i}`}>
                      <TextField
                        name="name"
                        id="ship-to"
                        placeholder="Enter name"
                        value={x.name}
                        onChange={(e) => handleInputChange(e, i)}
                        multiline
                        maxRows={4}
                      />
                      <TextField
                        className="ml10"
                        name="hsnOrSacCode"
                        placeholder="Enter HSN/SAC Code"
                        value={x.hsnOrSacCode}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <TextField
                        name="unit"
                        placeholder="Enter Unit"
                        value={x.unit}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <TextField
                        className="ml10"
                        name="cost"
                        placeholder="Enter Cost"
                        value={x.cost}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <TextField
                        className="ml10"
                        name="gstRate"
                        placeholder="Enter GST Rate"
                        value={x.gstRate}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveClick(i)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
          <div className="buttons-section">
            {inputList && (
              <Button
                className="add-btn"
                variant="contained"
                onClick={handleAddClick}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            )}
            <Button
              variant="contained"
              className="submit-btn"
              id="Submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

export default SubmitInvoice;
