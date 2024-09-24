const constant = {
  BACKEDN_BASE_URL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  IMG_URL: "https://annual-reports-si-tool.s3.ap-south-1.amazonaws.com",
};

export const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export default constant;
