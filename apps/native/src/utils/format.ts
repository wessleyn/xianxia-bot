import { formatDistanceToNow, isToday, isYesterday } from "date-fns";

export const formatSectionDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return formatDistanceToNow(date, { addSuffix: true });
};