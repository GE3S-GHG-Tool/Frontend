import React, { useEffect, useState } from 'react'
import "./manageAccount.css"
import back from "../../assets/images/ArrowLeft.svg";
import uploadIcon from "../../assets/images/uploadIcon.svg";
import defaultOrg from "../../assets/images/defaultOrg.svg";
import defaultUser from "../../assets/images/defaultUser.png";
import { useNavigate } from 'react-router-dom';
import { selectStyles, textFieldStyles } from './inputStyles';
import {
    Box,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { GradientButton } from './Buttons';
import ConfirmationModal from '../Modals/ConfirmationModal';
import ImageCropper from './ImageCropper';
import { useAuth } from '../../context/AuthContext';
import constant from '../../constant';
import { fetchCities, fetchStates, getCountries, getIndustries, getSectors } from '../../api/auth';
import api from '../../api';

const ManageAccount = () => {
    const { user, getUserData } = useAuth();

    const navigate = useNavigate();

    const [companyDetails, setCompanyDetails] = useState({
        companyImage: "", // Can be a URL or a File
        companyName: "",
        country: "",
        state: "",
        city: "",
        sector: "",
        industry: "",
        employeeCount: "",
    });

    const [ownerDetails, setOwnerDetails] = useState({
        ownerImage: "",
        name: "",
        email: "",
    });

    const [initialOwnerData, setInitialOwnerData] = useState(null);
    const [initialCompanyData, setInitialCompanyData] = useState(null);


    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [sectorList, setSectorList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [openCropper, setOpenCropper] = useState(false); // State to control the cropper modal
    const [currentImageType, setCurrentImageType] = useState(null); // Whether cropping company or owner image
    const [imageToCrop, setImageToCrop] = useState(null); // URL of the image being cropped

    const [croppedCompanyImage, setCroppedCompanyImage] = useState(null); // Cropped image file for the company
    const [croppedOwnerImage, setCroppedOwnerImage] = useState(null);


    // const { deleteAcc } = useAuth();
    const { IMG_URL } = constant;


    const [formErrors, setFormErrors] = useState({});


    async function getAllSectors() {
        const response = await getSectors();
        if (response?.status === 200) {
            setSectorList(response.data);
        }
    }

    async function getAllIndustries(id) {
        const response = await getIndustries(id);
        if (response?.status === 200) {
            setIndustryList(response.data);
        }
    }
    async function getAllStates(id) {

        const response = await fetchStates(id);
        if (response) {
            setStateList(response);
        }
    }
    async function getAllCities(id) {

        const response = await fetchCities(id);
        if (response) {
            setCityList(response);
        }
    }



    async function getAllCountries() {
        const response = await getCountries();
        if (response?.status === 200) {
            const sortedData = response?.data.sort((a, b) => {
                if (a.countryName < b.countryName) return -1;
                if (a.countryName > b.countryName) return 1;
                return 0;
            });
            setCountryList(sortedData);
        }
    }


    async function updateUserData(data) {
        try {
            const response = await api.put(`/user/update_user_organization`, data);
            if (response) return response;
            else throw new Error("Could not update user data");
        } catch (err) {
            console.log(err);
            return err.response;
        }
    }

    useEffect(() => {
        getAllSectors()
        getAllCountries()
    }, [])

    useEffect(() => {
        if (companyDetails?.sector) {
            getAllIndustries(companyDetails?.sector);
        }
    }, [companyDetails?.sector]);


    useEffect(() => {
        if (countryList.length > 0 && companyDetails?.country) {
            const country = countryList.find(
                item => item.countryName === companyDetails?.country
            );
            if (country) {
                getAllStates(country?.geonameId);
            }
        }
    }, [companyDetails?.country, countryList]);

    useEffect(() => {
        if (stateList.length > 0 && companyDetails?.state) {
            const state = stateList.find(
                item => item.name === companyDetails?.state
            );
            if (state) {
                getAllCities(state?.geonameId);
                setDataLoaded(true);
            }
        }
    }, [companyDetails?.state, stateList]);

    useEffect(() => {
        if (user) {
            const initialOrgDetails = {
                companyImage: user?.organization?.logo ? `${IMG_URL}/${user?.organization?.logo}` : "",
                companyName: user?.organization?.name,
                country: user?.organization?.country,
                state: user?.organization?.state,
                city: user?.organization?.city,
                sector: user?.organization?.sector?.id,
                industry: user?.organization?.industry?.id,
                employeeCount: user?.organization?.employeecount,
            };

            const initialOwnerData = {
                name: user?.name,
                email: user?.email,
                ownerImage:
                    user?.profileImage == "null" ||
                        user?.profileImage == null ||
                        user?.profileImage == ""
                        ? ""
                        : `${IMG_URL}/${user?.profileImage}`,
            };
            setCompanyDetails(initialOrgDetails);
            setInitialCompanyData(initialOrgDetails); // Set initial values
            setOwnerDetails(initialOwnerData);
            setInitialOwnerData(initialOwnerData); // Set initial values
        }

    }, [user]);


    const handleCompanyInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'sector') {
            setCompanyDetails((prev) => ({
                ...prev,
                [name]: value,
                industry: ''
            }));
        } else if (name === 'country') {
            setCompanyDetails((prev) => ({
                ...prev,
                [name]: value,
                state: '',
                city: ''
            }));
        } else if (name === 'state') {
            setCompanyDetails((prev) => ({
                ...prev,
                [name]: value,
                city: ''
            }));
        } else {
            setCompanyDetails((prev) => ({
                ...prev,
                [name]: value,
            }));
        }


    };


    const handleOwnerInputChange = (e) => {
        const { name, value } = e.target;

        setOwnerDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const haveFieldsChanged = () => {
        return (
            JSON.stringify(companyDetails) !== JSON.stringify(initialCompanyData) ||
            JSON.stringify(ownerDetails) !== JSON.stringify(initialOwnerData)
        );
    };

    const areAllFieldsFilled = () => {
        // Check required fields for company details
        const requiredCompanyFields = [
            "companyName",
            "country",
            "sector",
            "industry",
            "state",
            "city",
            "employeeCount",
        ];
        const allRequiredCompanyFieldsFilled = requiredCompanyFields.every(
            (field) => companyDetails[field] !== ""
        );

        // Check required fields for owner details
        const requiredOwnerFields = ["name", "email"];
        const allRequiredOwnerFieldsFilled = requiredOwnerFields.every(
            (field) => ownerDetails[field] !== ""
        );

        return allRequiredCompanyFieldsFilled && allRequiredOwnerFieldsFilled;
    };


    const handleSaveData = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare FormData directly
            const formData = new FormData();

            // Helper function to check and append changed fields
            const appendIfChanged = (field, initialValue, currentValue, apiFieldName) => {
                if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
                    // Special handling for images
                    if (field === 'companyImage' || field === 'ownerImage') {
                        const croppedImage = field === 'companyImage' ? croppedCompanyImage : croppedOwnerImage;
                        if (croppedImage) {
                            formData.append(apiFieldName, croppedImage);
                        } else if (typeof currentValue === 'string' && !currentValue.includes(IMG_URL)) {
                            // Only append if it's a new URL (not our existing one)
                            formData.append(apiFieldName, currentValue);
                        }
                    } else {
                        formData.append(apiFieldName, currentValue);
                    }
                }
            };

            // Check company fields
            appendIfChanged('companyName', initialCompanyData.companyName, companyDetails.companyName, 'org_name');
            appendIfChanged('companyImage', initialCompanyData.companyImage, companyDetails.companyImage, 'organization_logo');
            appendIfChanged('employeeCount', initialCompanyData.employeeCount, companyDetails.employeeCount, 'employeeCount');
            appendIfChanged('country', initialCompanyData.country, companyDetails.country, 'country');
            appendIfChanged('state', initialCompanyData.state, companyDetails.state, 'state');
            appendIfChanged('city', initialCompanyData.city, companyDetails.city, 'city');
            appendIfChanged('sector', initialCompanyData.sector, companyDetails.sector, 'sector');
            appendIfChanged('industry', initialCompanyData.industry, companyDetails.industry, 'industry');

            // Check owner fields
            appendIfChanged('name', initialOwnerData.name, ownerDetails.name, 'name');
            appendIfChanged('ownerImage', initialOwnerData.ownerImage, ownerDetails.ownerImage, 'user_profileImage');
            formData.append('email_id', user?.email);
            formData.append('user_id', user?.id);



            // Call your API here
            await updateUserData(formData).then((res) => {
                if (res?.status === 200) {
                    // Update initial data references
                    setInitialCompanyData({ ...companyDetails });
                    setInitialOwnerData({ ...ownerDetails });
                    // Reset cropped images
                    setCroppedCompanyImage(null);
                    setCroppedOwnerImage(null);
                    // Refresh user data
                    getUserData();
                } else {
                    alert("Error saving data");
                }
            });

            console.log("FormData to be sent:", Object.fromEntries(formData.entries()));

        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (type) => {
        setCurrentImageType(type); // Set which image (company or owner) is being cropped
        setImageToCrop(
            type === "company" ? companyDetails.companyImage : ownerDetails.ownerImage
        ); // Set the image URL to crop
        setOpenCropper(true); // Open the cropper modal
    };

    const handleNewImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (e.target.files[0].size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB.");
            // e.target.value = ""; // Reset the file input
            return;
        }
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setCurrentImageType(type);
            setImageToCrop(imageURL);
            setOpenCropper(true); // Open cropper for new image
        }
    };








    return (
        <div className="manage-account_container">
            <div className="manage-account_heading-div">
                <img
                    style={{ cursor: "pointer" }}
                    src={back}
                    alt="Back"
                    height={16}
                    width={16}
                    onClick={() => navigate("/")}
                />
                <h1>Manage Account</h1>
            </div>

            {!dataLoaded ? <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                <CircularProgress color="success" />
            </Box> : (
                <div className="account-details_container">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Company Details</h2>

                    </div>

                    <form
                        onSubmit={handleSaveData}
                    >
                        <div className="company-details_form">
                            <div className="account-details_upload-div">
                                <img
                                    src={companyDetails?.companyImage || defaultOrg}
                                    height={70}
                                    width={70}
                                    alt="Company Logo"
                                    style={{ cursor: "pointer", borderRadius: "100%" }}
                                    onClick={() => {
                                        if (
                                            companyDetails?.companyImage !== null &&
                                            companyDetails?.companyImage !== ""
                                        ) {
                                            handleImageClick("company");
                                        }
                                    }} // Open image cropper for company image
                                />

                                <label className="account-details_upload-btn">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleNewImageUpload(e, "company")} // Handle new image upload for company
                                        style={{ display: "none" }}
                                    />
                                    <img src={uploadIcon} height={24} width={24} alt="Upload" />
                                    <span>
                                        {companyDetails?.companyImage ? "Re-upload" : "Upload"}
                                    </span>
                                </label>
                            </div>
                            <Grid container spacing={2.5}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        name="companyName"
                                        label="Company Name"
                                        variant="outlined"
                                        required
                                        value={companyDetails.companyName}
                                        onChange={handleCompanyInputChange}
                                        sx={textFieldStyles}
                                        placeholder="Enter Company Name"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel
                                            id="sector-select"
                                            sx={{
                                                fontSize: "14px",
                                                mt: "3px",
                                                color: "#787878",
                                                "&.Mui-focused": {
                                                    color: "#787878",
                                                },
                                            }}
                                        >
                                            Sector
                                        </InputLabel>
                                        <Select
                                            name="sector"
                                            labelId="sector-select"
                                            id="demo-simple-select"
                                            label="Sector"
                                            value={companyDetails.sector}
                                            onChange={handleCompanyInputChange}
                                            sx={selectStyles}
                                            required
                                        >
                                            <MenuItem disabled value={""} sx={{ fontFamily: "Inter" }}>
                                                Select Industry
                                            </MenuItem>
                                            {sectorList?.map((item, index) => (
                                                <MenuItem
                                                    // disabled={
                                                    //     item?.name !== "Extractives & Minerals Processing"
                                                    //         ? true
                                                    //         : false
                                                    // }
                                                    key={index}
                                                    value={item?.id}
                                                    sx={{ fontFamily: "Inter" }}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel
                                            id="industry-select"
                                            sx={{
                                                fontSize: "14px",
                                                mt: "3px",
                                                color: "#787878",
                                                "&.Mui-focused": {
                                                    color: "#787878",
                                                },
                                            }}
                                        >
                                            Industry
                                        </InputLabel>
                                        <Select
                                            required
                                            name="industry"
                                            labelId="industry-select"
                                            id="demo-industry-select"
                                            label="Industry"
                                            value={companyDetails.industry}
                                            onChange={handleCompanyInputChange}
                                            sx={selectStyles}
                                        >
                                            <MenuItem disabled value={""} sx={{ fontFamily: "Inter" }}>
                                                Select Industry
                                            </MenuItem>
                                            {industryList?.map((item, index) => (
                                                <MenuItem
                                                    // disabled={
                                                    //     item?.name !== "Oil & Gas – Exploration & Production"
                                                    //         ? true
                                                    //         : false
                                                    // }
                                                    key={index}
                                                    value={item?._id}
                                                    sx={{ fontFamily: "Inter" }}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel
                                            id="sector-select"
                                            sx={{
                                                fontSize: "14px",
                                                mt: "3px",
                                                color: "#787878",
                                                "&.Mui-focused": {
                                                    color: "#787878",
                                                },
                                            }}
                                        >
                                            Country
                                        </InputLabel>
                                        <Select
                                            required
                                            name="country"
                                            labelId="country-select"
                                            id="demo-country-select"
                                            label="Country"
                                            value={companyDetails.country}
                                            onChange={handleCompanyInputChange}
                                            sx={selectStyles}
                                        >
                                            {countryList?.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item?.countryName}
                                                    sx={{ fontFamily: "Inter" }}
                                                >
                                                    {item?.countryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel
                                            id="sector-select"
                                            sx={{
                                                fontSize: "14px",
                                                mt: "3px",
                                                color: "#787878",
                                                "&.Mui-focused": {
                                                    color: "#787878",
                                                },
                                            }}
                                        >
                                            State
                                        </InputLabel>
                                        <Select
                                            required
                                            name="state"
                                            labelId="state-select"
                                            id="demo-state-select"
                                            label="State"
                                            value={companyDetails.state}
                                            onChange={handleCompanyInputChange}
                                            sx={selectStyles}
                                        >
                                            {stateList?.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item?.name}
                                                    sx={{ fontFamily: "Inter" }}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel
                                            id="sector-select"
                                            sx={{
                                                fontSize: "14px",
                                                mt: "3px",
                                                color: "#787878",
                                                "&.Mui-focused": {
                                                    color: "#787878",
                                                },
                                            }}
                                        >
                                            City
                                        </InputLabel>
                                        <Select
                                            required
                                            name="city"
                                            labelId="city-select"
                                            id="demo-city-select"
                                            label="City"
                                            value={companyDetails.city}
                                            onChange={handleCompanyInputChange}
                                            sx={selectStyles}
                                        >
                                            {cityList?.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item?.name}
                                                    sx={{ fontFamily: "Inter" }}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        name="employeeCount"
                                        label="Employee Count"
                                        variant="outlined"
                                        required
                                        value={companyDetails.employeeCount}
                                        onChange={handleCompanyInputChange}
                                        sx={textFieldStyles}
                                        placeholder="Enter Employee Count"
                                    />
                                </Grid>

                            </Grid>
                        </div>

                        <div className="owner-details_form">
                            <h2>Owner Details</h2>
                            <div className="account-details_upload-div">
                                <img
                                    src={ownerDetails?.ownerImage || defaultUser}
                                    height={70}
                                    width={70}
                                    alt="Owner Image"
                                    style={{ cursor: "pointer", borderRadius: "100%" }}
                                    onClick={() => {
                                        if (
                                            ownerDetails?.ownerImage !== null &&
                                            ownerDetails?.ownerImage !== ""
                                        ) {
                                            handleImageClick("owner");
                                        }
                                    }} // Open image cropper for owner image
                                />

                                <label className="account-details_upload-btn">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleNewImageUpload(e, "owner")} // Handle new image upload for owner
                                        style={{ display: "none" }}
                                    />
                                    <img src={uploadIcon} height={24} width={24} alt="Upload" />
                                    {ownerDetails?.ownerImage ? "Re-upload" : "Upload"}
                                </label>
                            </div>
                            <Grid container spacing={2.5}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        required
                                        value={ownerDetails.name}
                                        onChange={handleOwnerInputChange}
                                        sx={textFieldStyles}
                                        placeholder="Name"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        required
                                        value={ownerDetails.email}
                                        onChange={handleOwnerInputChange}
                                        sx={textFieldStyles}
                                        placeholder="Email"
                                        error={!!formErrors?.email}
                                        helperText={formErrors?.email}
                                    />
                                </Grid>

                            </Grid>
                        </div>

                        <div style={{ float: "right", marginBottom: "20px" }}>
                            {/* <button
                type="submit"
                disabled={!areAllFieldsFilled() && formErrors}
                className="account-details_save-btn"
              >
                Save
              </button> */}
                            <GradientButton
                                type="submit"
                                disabled={
                                    (!areAllFieldsFilled()) ||
                                    loading ||
                                    !haveFieldsChanged()
                                }
                            >
                                {loading ? "Saving" : "Save"}
                            </GradientButton>
                        </div>
                    </form>
                </div>
            )}





            <ImageCropper
                open={openCropper}
                setOpen={setOpenCropper}
                imageUrl={imageToCrop}
                setImageApi={(croppedImageUrl) => {
                    if (currentImageType === "company") {
                        setCompanyDetails((prev) => ({
                            ...prev,
                            companyImage: croppedImageUrl,
                        }));
                    } else {
                        setOwnerDetails((prev) => ({
                            ...prev,
                            ownerImage: croppedImageUrl,
                        }));
                    }
                }}
                setCroppedImage={(croppedFile) => {
                    if (currentImageType === "company") {
                        setCroppedCompanyImage(croppedFile);
                    } else {
                        setCroppedOwnerImage(croppedFile);
                    }
                }}
            />
        </div>
    );
}

export default ManageAccount


