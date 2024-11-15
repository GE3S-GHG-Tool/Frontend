export function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate - givenDate; // difference in milliseconds
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximation, assuming 30 days per month
  
    if (diffInSeconds < 60) {
      return "few seconds ago";
    } else if (diffInMinutes < 60) {
      return `Updated ${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `Updated ${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `Updated ${diffInDays} days ago`;
    } else if (diffInWeeks < 5) {
      return `Updated ${diffInWeeks} weeks ago`;
    } else {
      return `Updated ${diffInMonths} months ago`;
    }
  }