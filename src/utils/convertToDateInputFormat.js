export default function convertToDateInputFormat(formattedDate) {
  // Split the input string into components
  const [day, month, year] = formattedDate.split(/[\s,]+/);

  // Map abbreviated month names to their numeric values
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };

  // Get the full year from the two-digit year
  const fullYear = `20${year}`;

  // Format the date as YYYY-MM-DD
  return `${fullYear}-${monthMap[month]}-${day}`;
}