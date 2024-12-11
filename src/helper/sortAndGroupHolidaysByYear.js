// function that takes an array of objects, each of which represents a holiday in the format: { id: "OjvqbYAJ7KCkThdHzNuR", from: "03 Aug, 24", to: "06 Aug, 24", reason: "A 4 day vacay cause I'm a generous owner" }
// it categorizes the holidays into separate objects, each of which represents holidays in a year in the format: { year: 2024, holidays: [{}, {}, ...] }. this arrays is sorted by year in descending order but the holidays array is sorted in ascending order

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