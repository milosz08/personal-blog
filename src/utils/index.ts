const formatDate = (date: Date) =>
  date.toLocaleDateString('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export { formatDate };
