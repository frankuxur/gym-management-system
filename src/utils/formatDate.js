export default function formatDate(milliseconds) {
    const date = new Date(milliseconds);
  
    const day = String(date.getDate()).padStart(2, '0'); // Ensures day is 2 digits
    const month = date.toLocaleString('en-US', { month: 'short' }); // Abbreviated month
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year
  
    return `${day} ${month}, ${year}`;
}
  