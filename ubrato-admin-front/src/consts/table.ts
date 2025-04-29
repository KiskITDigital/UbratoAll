export const tableClassNames = {
  wrapper: "p-0 border border-border",
  thead: "[&>tr:last-child]:!mt-0 [&>tr:last-child]:!h-0",
  // this is a thead Spacer removal. For more info check
  // https://github.com/nextui-org/nextui/issues/2108
  
  th: "px-5 py-4 first:rounded-l-none last:rounded-r-none",
  tr: "border-border border-b last:border-none",
  // tbody: "[&>tr]:cursor-pointer",
  td: [
    "px-5 py-4",
    // changing the rows border radius
    // first
    "group-data-[first=true]:first:before:rounded-none",
    "group-data-[first=true]:last:before:rounded-none",
    // middle
    "group-data-[middle=true]:before:rounded-none",
    // last
    "group-data-[last=true]:first:before:rounded-none",
    "group-data-[last=true]:last:before:rounded-none",
  ],
};
