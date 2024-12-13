export const sortData = (data, key, order) => {
  return [...data].sort((a, b) => {
    const valueA = a[key] || "";
    const valueB = b[key] || "";
    console.log("valueA: ", valueA, valueB);

    // Check if values are numbers
    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Check if values are dates
    const dateA = new Date(valueA);
    const dateB = new Date(valueB);

    if (!isNaN(dateA) && !isNaN(dateB)) {
      return order === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Default to string comparison
    return order === "asc"
      ? valueA.toString().localeCompare(valueB.toString())
      : valueB.toString().localeCompare(valueA.toString());
  });
};
