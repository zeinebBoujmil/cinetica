export const formatDate = (dateString) => {
    return dateString ? dateString.split('-').reverse().join('-') : 'Inconnue';
  };
  