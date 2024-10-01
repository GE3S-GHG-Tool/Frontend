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
  // console.log("dataid", data);
  const [types, setTypes] = useState([]);
  const [categorydata, setCategoryData] = useState([]);
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
  const [quantity, setQuantity] = useState("");

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
      // console.log("categories:", response.data);
      setCategoryData(response.data);
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
    } else if (type3?.subCategories?.length) {
      getCategoryList(type3._id, "type3");
    }
  }, [type3]);

  useEffect(() => {
    if (type4?.subCategories?.length === 0) {
      setLast(true);
    } else if (type4?.subCategories?.length) {
      getCategoryList(type4._id, "type4");
    }
  }, [type4]);

  useEffect(() => {
    if (type5?.subCategories?.length === 0) {
      setLast(true);
    } else if (type5?.subCategories?.length) {
      getCategoryList(type5._id, "type5");
    }
  }, [type5]);

  useEffect(() => {
    getEmission();
  }, []);
  const handleUpdate = () => {
    const updatedData = {
      type: type?._id,
      type2: type2?._id,
      type3: type3?._id,
      type4: type4?._id,
      quantity: quantity,
    };
    onUpdate(data.id, updatedData);
  };
  // const RecursiveSelect = ({ categories }) => {
  //   const [selectedOption, setSelectedOption] = useState(null);

  //   const handleChange = (e) => {
  //     const selected = categories.find(
  //       (category) => category.name === e.target.value
  //     );
  //     setSelectedOption(selected);
  //   };

  //   return (
  //     <div>
  //       <select onChange={handleChange} defaultValue="">
  //         <option value="" disabled>
  //           Select an option
  //         </option>
  //         {categories.map((category) => (
  //           <option key={category._id} value={category.name}>
  //             {category.name}
  //           </option>
  //         ))}
  //       </select>

  //       {selectedOption && selectedOption.subCategories.length > 0 ? (
  //         <RecursiveSelect categories={selectedOption.subCategories} />
  //       ) : selectedOption?.leaf ? (
  //         <div>input for quantity</div>
  //       ) : null}
  //     </div>
  //   );
  // };

  // console.log(type4?.subCategories?.length, type4);

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        border: "1px solid rgba(217, 217, 217, 0.40)",
        flexDirection: "column",
        display: "flex",
        padding: "18px",
        borderRadius: "8px",
      }}
    >
      <Box>
        <p>Type of Process Emission</p>
        <FormControl fullWidth size="small">
          <Select
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
        {/* {type && categorydata.length && (
          <RecursiveSelect categories={categorydata} />
        )} */}
        {type && type?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
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
        {type2 && type2?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
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
        {type3 && type3?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
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
        {type4 && type4?.subCategories?.length ? (
          <FormControl fullWidth size="small">
            <Select
              value={type5}
              onChange={(e) => {
                // handleUpdate();
                onUpdate(data.id, { type5: e.target.value.id });
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
      </Box>

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
        </Grid2>
      )}
    </Grid2>
  );
}

export default Gas1PopupEmisson;
