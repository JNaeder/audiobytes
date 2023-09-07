import moment from "moment";

export const formatDate = (date) => {
  // TODO: Update this for seconds, and grammer
  const daysAgo = moment().diff(date, "days");
  if (daysAgo < 1) {
    const hoursAgo = moment().diff(date, "hours");
    if (hoursAgo < 1) {
      return moment().diff(date, "minutes") + " minutes ago";
    } else {
      return moment().diff(date, "hours") + " hours ago";
    }
  } else if (daysAgo < 7) {
    return `${daysAgo} days ago`;
  } else {
    return moment(date).format("MM-DD-YY");
  }
};
