export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateScopeReport = (keys, obj) => {
  for (const key of keys) {
    const value = obj[key];
    if (
      value &&
      ((Array.isArray(value) && value.length > 0) ||
        (typeof value === "string" && value.trim() !== "") ||
        (typeof value === "object" && Object.keys(value).length > 0))
    ) {
      return true;
    }
  }
  return false;
};

export const formatIndianNumber = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  } else if (!value) return "";
  return parseFloat(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
};

export const parseStringAndRoundOff = (value) => {
  return Number(parseFloat(value).toFixed(2));
};
