import ordinalSuffix from "./ordinalSuffix.js";

export interface DateObject {
  day: number;
  month: number;
  year: number;
}

export default function getReleaseDate(options: DateObject) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = ordinalSuffix(options.day);
  const releaseDate = `${day} ${monthNames[options.month]}, ${options.year}`;
  return releaseDate;
}
