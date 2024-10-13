import { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Grid2,
  Select,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import down_arrow from "../../../../assets/images/down_arrow.svg";
import trash_logo from "../../../../assets/images/TrashS.svg";
import { getCategories, getEmissionTypes } from "../../../../api/createReport";

function Gas1PopupEmisson({ data, onUpdate }) {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [type2, setType2] = useState(null);
  const [type3, setType3] = useState(null);
  const [type4, setType4] = useState(null);
  const [type5, setType5] = useState(null);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);
  const [last, setLast] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [quantity2, setQuantity2] = useState("");
  async function getEmission() {
    const response = await getEmissionTypes();
    if (response?.status === 200) {
      // console.log(response);
      setTypes(response.data);
    }
  }

  async function getCategoryList(id, type) {
    const response = await getCategories(id);
    if (response?.status === 200) {
      if (type === "type1") {
        setCategory1(response.data?.subCategories);
      } else if (type === "type2") {
        setCategory2(response.data?.subCategories);
      } else if (type === "type3") {
        setCategory3(response.data?.subCategories);
      } else if (type === "type4") {
        setCategory4(response.data?.subCategories);
      }
    }
  }

  useEffect(() => {
    if (type?.subCategories?.length === 0) {
      setLast(true);
    } else if (type?.subCategories?.length !== undefined) {
      getCategoryList(type._id, "type1");
    }
  }, [type]);

  useEffect(() => {
    if (type2?.subCategories?.length === 0) {
      setLast(true);
    } else if (type2?.subCategories?.length) {
      getCategoryList(type2._id, "type2");
    }
  }, [type2]);

  useEffect(() => {
    if (type3?.subCategories?.length === 0) {
      setLast(true);
      setMultiple(type3?.leaf?.multipleEntries);
    } else if (type3?.subCategories?.length) {
      getCategoryList(type3._id, "type3");
    }
  }, [type3]);

  useEffect(() => {
    if (type4?.subCategories?.length === 0) {
      console.log("tt4", type4);
      setLast(true);
      setMultiple(type4?.leaf?.multipleEntries);
    } else if (type4?.subCategories?.length) {
      getCategoryList(type4._id, "type4");
    }
  }, [type4]);

  useEffect(() => {
    if (type5?.subCategories?.length === 0) {
      // console.log("tt5", type5?.leaf?.multipleEntries);
      setLast(true);
      setMultiple(type4?.leaf?.multipleEntries);
    } else if (type5?.subCategories?.length) {
      getCategoryList(type5._id, "type5");
    }
  }, [type5, type4?.leaf?.multipleEntries]);

  useEffect(() => {
    getEmission();
  }, []);

  useEffect(() => {
    const emissionData = {
      type: data?.type || null,
      type2: data?.type2 || null,
      type3: data?.type3 || null,
      type4: data?.type4 || null,
      type5: data?.type5 || null,
      quantity: data.quantity,
      quantity2: data.quantity2,
    };
    // console.log(emissionData);
    // Update states
    setType(emissionData.type);
    setType2(emissionData.type2);
    setType3(emissionData.type3);
    setType4(emissionData.type4);
    setType5(emissionData.type5);
    setQuantity(emissionData.quantity);
    setQuantity2(emissionData.quantity2);
  }, [data]);

  // const handleUpdate = () => {
  //   const updatedData = {
  //     type: type?._id,
  //     type2: type2?._id,
  //     type3: type3?._id,
  //     type4: type4?._id,
  //     quantity: quantity,
  //   };
  //   onUpdate(data.id, updatedData);
  // };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        border: "1px solid rgba(217, 217, 217, 0.40)",
        padding: "18px",
        borderRadius: "8px",
      }}
    >
      <Grid2 item size={4}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
          Type of Process Emission
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            renderValue={(selected) => (selected ? selected.name : "")}
            value={type}
            onChange={(e) => {
              // handleUpdate();
              onUpdate(data.id, { type: e.target.value });
              setType(e.target.value);
            }}
          >
            {types.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 item size={4}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
          {type && type?.subCategories?.length ? "Select Category" : null}
        </Typography>
        {type && type?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
              renderValue={(selected) => (selected ? selected.name : "")}
              value={type2}
              onChange={(e) => {
                // handleUpdate();
                onUpdate(data.id, { type2: e.target.value });
                setType2(e.target.value);
              }}
            >
              {category1?.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </Grid2>
      <Grid2 item size={4}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
          {type2 && type2?.subCategories?.length && "Select Sub Category"}
        </Typography>
        {type2 && type2?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
              renderValue={(selected) => (selected ? selected.name : "")}
              value={type3}
              onChange={(e) => {
                // handleUpdate();
                onUpdate(data.id, { type3: e.target.value });
                setType3(e.target.value);
              }}
            >
              {category2?.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </Grid2>
      {type3 && type3?.subCategories?.length ? (
        <Grid2 item size={4}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
            {type3 && type3?.subCategories?.length
              ? "Select Sub Category"
              : null}
          </Typography>
          {type3 && type3?.subCategories?.length ? (
            <FormControl fullWidth size="small">
              <Select
                renderValue={(selected) => (selected ? selected.name : "")}
                value={type4}
                onChange={(e) => {
                  // handleUpdate();
                  onUpdate(data.id, { type4: e.target.value });
                  setType4(e.target.value);
                }}
              >
                {category3?.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Grid2>
      ) : null}
      {type4 && type4?.subCategories?.length ? (
        <Grid2 item size={4}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
            {type4 && type4?.subCategories?.length
              ? "Select Sub Sub Category"
              : null}
          </Typography>
          {type4 && type4?.subCategories?.length ? (
            <FormControl fullWidth size="small">
              <Select
                renderValue={(selected) => (selected ? selected.name : "")}
                value={type5}
                onChange={(e) => {
                  // handleUpdate();
                  onUpdate(data.id, { type5: e.target.value });
                  setType5(e.target.value);
                }}
              >
                {category4?.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Grid2>
      ) : null}

      {last && (
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="body2"
            fontSize="12px"
            fontWeight="400"
            lineHeight="19.6px"
          >
            Quantity of gas production (m3)
          </Typography>
          <TextField
            placeholder="Quantity of Gas"
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              onUpdate(data.id, { quantity: e.target.value });
            }}
            sx={{
              width: "252px",
              borderRadius: "5px",
              border: "1px solid #D9D9D966",
              "& .MuiInputBase-input": {
                padding: "10px 14px",
                height: "auto",
              },
            }}
          ></TextField>
          {multiple && (
            <TextField
              placeholder="Quantity of Gas"
              type="number"
              value={quantity2}
              onChange={(e) => {
                setQuantity2(e.target.value);
                onUpdate(data.id, { quantity2: e.target.value });
              }}
              sx={{
                width: "252px",
                borderRadius: "5px",
                border: "1px solid #D9D9D966",
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                  height: "auto",
                },
              }}
            ></TextField>
          )}
        </Grid2>
      )}
    </Grid2>
  );
}

export default Gas1PopupEmisson;
