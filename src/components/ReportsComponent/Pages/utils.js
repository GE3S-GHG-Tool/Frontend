// Function to format number with commas
export const formatNumber = (value) => {
  if (!value) return '';
  // Remove any existing commas and non-numeric characters except decimal point
  const cleanValue = value.toString().replace(/,/g, '');
  // Format with commas
  const parts = cleanValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// Function to clean number (remove commas) for storage
export const cleanNumber = (value) => {
  if (!value) return '';
  return value.toString().replace(/,/g, '');
};


export const handleCommaSeperatedKeyDown = (e) => {
  // Allow: backspace, delete, tab, escape, enter, decimal point
  if ([8, 46, 9, 27, 13, 190, 110].includes(e.keyCode) ||
    // Allow: Ctrl/cmd+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
    (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+V
    (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
    (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39) ||
    // Allow: numbers and keypad numbers
    ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
    return;
  }
  // Block all other keys
  e.preventDefault();
}

export const handleCommaSeperatedPaste = (e) => {
  // Get pasted data
  const pastedData = e.clipboardData.getData('text');
  // Check if pasted data only contains numbers and decimal point
  if (!/^[\d.,]*$/.test(pastedData)) {
    e.preventDefault();
  }
}