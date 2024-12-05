// Utility function for dynamic sorting
export const sortData = (data, key, order) => {
    return [...data].sort((a, b) => {
      const valueA = a[key] || "";
      const valueB = b[key] || "";
  
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      }
  
      return order === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });
  };