const constant = {
  BACKEDN_BASE_URL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  IMG_URL: import.meta.env.VITE_APP_AWS_IMAGE_URL,
};

export const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export default constant;
