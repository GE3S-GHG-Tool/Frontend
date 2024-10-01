import React, { useState } from "react";

const Test = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  console.log(selectedValues);
  // const inputData = {
  //   "_id": "66f6aa9f7d6f3c015a12ddf3",
  //   "name": "Emission from Waste Gas Disposal",
  //   "process_emission_field": "TYPE",
  //   "subCategories": [
  //     {
  //       "_id": "66f6aa9f7d6f3c015a12ddf1",
  //       "name": "Flaring",
  //       "process_emission_field": "CATEGORY",
  //       "subCategories": [
  //         {
  //           "_id": "66f6aa9f7d6f3c015a12dde8",
  //           "name": "Heavy oil/ cold bitumen Production",
  //           "process_emission_field": "SUB_CATEGORY",
  //           "subCategories": [],
  //           "leaf": {
  //             "dependentVariable": "heavy oil production",
  //             "unit": "m3",
  //             "EF": 0.022,
  //             "unitOfEF": "tonnes CO2/m3 heavy oil production",
  //             "_id": "66f6aa9f7d6f3c015a12dde9"
  //           },
  //           "__v": 0
  //         },
  //         {
  //           "_id": "66f6aa9f7d6f3c015a12ddea",
  //           "name": "Gas Production",
  //           "process_emission_field": "SUB_CATEGORY",
  //           "subCategories": [],
  //           "leaf": {
  //             "dependentVariable": "raw gas feed",
  //             "unit": "m3",
  //             "EF": 0.0000018,
  //             "unitOfEF": "tonnes CO2/m3 raw gas feed",
  //             "_id": "66f6aa9f7d6f3c015a12ddeb"
  //           },
  //           "__v": 0
  //         },
  //         {
  //           "_id": "66f6aa9f7d6f3c015a12ddec",
  //           "name": "Thermal oil Production",
  //           "process_emission_field": "SUB_CATEGORY",
  //           "subCategories": [],
  //           "leaf": {
  //             "dependentVariable": "thermal bitumen production",
  //             "unit": "m3",
  //             "EF": 0.027,
  //             "unitOfEF": "tonnes CO2/m3 thermal bitumen production",
  //             "_id": "66f6aa9f7d6f3c015a12dded"
  //           },
  //           "__v": 0
  //         }
  //       ],
  //       "__v": 0
  //     }
  //   ],
  //   "__v": 0
  // };

  // // Recursive function to transform the data
  // const transformData = (category) => {
  //   return {
  //    [category.name]: {subcategories: category.subCategories.map(subCategory => transformData(subCategory))}
  //     // subcategories: category.subCategories.map(subCategory => transformData(subCategory))
  //   };
  // };
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
  {
    /* {type && categorydata.length && (
          <RecursiveSelect categories={categorydata} />
        )} */
  }
  const data = {
    "Emission from Waste Gas Disposal": {
      subcategories: [
        {
          name: "Flaring",
          subcategories: [
            {
              name: "Heavy oil/ cold bitumen Production",
              subcategories: [],
            },
            {
              name: "Gas Production",
              subcategories: [],
            },
            {
              name: "Thermal oil Production",
              subcategories: [],
            },
          ],
        },
      ],
    },
  };

  const handleSelectChange = (event, index) => {
    const value = event.target.value;
    const newSelectedValues = [...selectedValues.slice(0, index), value];

    setSelectedValues(newSelectedValues);
  };

  const renderSelect = (options, index) => {
    const currentValue = selectedValues[index] || "";
    const hasSubcategories = options.some(
      (option) => option.subcategories && option.subcategories.length > 0
    );

    return (
      <div key={index}>
        <select
          onChange={(e) => handleSelectChange(e, index)}
          value={currentValue}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.name || option} value={option.name || option}>
              {option.name || option}
            </option>
          ))}
        </select>

        {hasSubcategories &&
          currentValue &&
          renderSelect(
            options.find((option) => (option.name || option) === currentValue)
              .subcategories,
            index + 1
          )}
      </div>
    );
  };

  return (
    <div>
      {renderSelect(
        Object.keys(data).map((key) => ({
          name: key,
          subcategories: data[key].subcategories,
        })),
        0
      )}
    </div>
  );
};

export default Test;
