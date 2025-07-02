import { format } from 'date-fns';

export const formatDateTime = (dateMilli: number) => {
  const date = new Date(dateMilli);
  return format(date, 'd MMMM yyyy hh:mm a');
};
