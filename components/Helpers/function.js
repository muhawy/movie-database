export function formatDateString(dateString) {
  let dateParts = dateString.split('-');
  return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
}
