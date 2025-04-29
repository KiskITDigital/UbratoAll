export function getTimestampDate(timestamp: string) {
  return new Date(timestamp).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeZone: "UTC",
  });
}

export function getTimestampDatetime(timestamp: string) {
  return new Date(timestamp).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC",
  });
}