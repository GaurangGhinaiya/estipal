import moment from "moment";

export const sortData = (data, key, order) => {
  return [...data].sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];
    console.log("valueA: ", valueA, valueB, order);

    // Handle undefined or null values explicitly
    if (valueA == null) valueA = "";
    if (valueB == null) valueB = "";

    // Check if values are numbers
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Check if values are valid dates
    if (   
      moment(valueA, moment.ISO_8601, true).isValid() &&
      moment(valueB, moment.ISO_8601, true).isValid()
    ) {
      return order === "asc"
        ? moment(valueA).valueOf() - moment(valueB).valueOf()
        : moment(valueB).valueOf() - moment(valueA).valueOf();
    }

    // Default to string comparison (case-insensitive)
    return order === "asc"
      ? valueA
          .toString()
          .localeCompare(valueB.toString(), undefined, { sensitivity: "base" })
      : valueB
          .toString()
          .localeCompare(valueA.toString(), undefined, { sensitivity: "base" });
  });
};
