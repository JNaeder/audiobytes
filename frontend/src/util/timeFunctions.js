import moment from "moment";

export const formatDate = (date) => {
  // TODO: Update this for seconds, and grammer

  // Check number of days
  const daysAgo = moment().diff(date, "days");

  if (daysAgo < 1) {
    // If it's within the last day, check hours
    const hoursAgo = moment().diff(date, "hours");
    if (hoursAgo < 1) {
      // If its within the hour, check minutes
      return moment().diff(date, "minutes") + " minutes ago";
    } else {
      return moment().diff(date, "hours") + " hours ago";
    }
  } else if (daysAgo < 7) {
    // If it's within the week, print how many days ago
    return `${daysAgo} days ago`;
  } else {
    // If it's been more than a week, print the date
    return moment(date).format("MM-DD-YY");
  }
};
