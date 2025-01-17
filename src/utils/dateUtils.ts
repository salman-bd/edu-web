// utils/dateUtils.js  

// Function to format Date to ISO string  
export const formatDateToISOString = (date) => {  
  return date ? new Date(date).toISOString() : null;  
};  

// Function to parse ISO string to Date object  
export const parseISOStringToDate = (isoString) => {  
  return isoString ? new Date(isoString) : null;  
};