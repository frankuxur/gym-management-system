export default function daysLeft(targetTimeInMillis) {
    const currentTime = Date.now(); // Get the current time in milliseconds
    const differenceInMillis = targetTimeInMillis - currentTime; // Difference in milliseconds
  
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const daysLeft = Math.ceil(differenceInMillis / (1000 * 60 * 60 * 24));
  
    return daysLeft > 0 ? daysLeft : 0; // Return 0 if the date has already passed
}