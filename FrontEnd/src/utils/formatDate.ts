export const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  return formattedDate;
};
