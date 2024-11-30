export default function sortAndGroupHolidaysByYear(holidays) {
  // Helper function to parse a date string into a JavaScript Date object
  const parseDate = (date) => {
    const [day, month, year] = date.split(/[\s,]+/);
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
    return new Date(Number(`20${year}`), monthIndex, Number(day));
  };

  // Create a new copy of the array to avoid mutating the original
  const sortedHolidays = [...holidays].sort((a, b) => {
    const dateA = parseDate(a.from || a.date);
    const dateB = parseDate(b.from || b.date);
    return dateA - dateB;
  });

  // Group holidays by year
  const groupedByYear = sortedHolidays.reduce((acc, holiday) => {
    const year = parseDate(holiday.from || holiday.date).getFullYear();
    const yearGroup = acc.find((group) => group.year === year);

    if (yearGroup) {
      // Add holiday to existing year group
      return acc.map((group) =>
        group.year === year
          ? { ...group, holidays: [...group.holidays, holiday] }
          : group
      );
    } else {
      // Create a new year group
      return [...acc, { year, holidays: [holiday] }];
    }
  }, []).sort((a, b) => b.year - a.year);

  return groupedByYear;
}
  
// Example input
// const holidays = [
//   {
//     id: "OjvqbYAJ7KCkThdHzNuR",
//     from: "03 Aug, 24",
//     to: "06 Aug, 24",
//     reason: "A 4 day vacay cause I'm a generous owner",
//   },
//   {
//     id: "WwqbYAasdhdHzNuR",
//     date: "01 Jan, 24",
//     reason: "Independence Day",
//   },
//   {
//     id: "XjvqbYAJ9MCkThdHzNuT",
//     date: "25 Dec, 23",
//     reason: "Christmas Celebration",
//   },
//   {
//     id: "YqvqbYAasdhdHzNuQ",
//     from: "15 Feb, 23",
//     to: "16 Feb, 23",
//     reason: "Short winter break",
//   },
// ];

// Call the function
// const groupedHolidays = sortAndGroupHolidaysByYear(holidays);
// console.log(groupedHolidays);
  