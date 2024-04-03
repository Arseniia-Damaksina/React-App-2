export const capitalizeString = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "Low":
      return "bg-yellowPriority text-yellowSecondary border border-yellowSecondary";
    case "Medium":
      return "bg-primaryVariant text-coolBlack";
    case "High":
      return "bg-primary text-black";
    default:
      return "bg-gray-200";
  }
};

