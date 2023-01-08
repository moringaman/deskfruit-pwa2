import { TimeOption } from "./types";

var quarterHours = ["00", "15", "30", "45"];
var times = []; //?
for (var i = 0; i < 24; i++) {
  for (var j = 0; j < 4; j++) {
    let timeObject = {
      value: `${i}:${quarterHours[j]}`,
      label: `${i}:${quarterHours[j]}`,
    };
    times.push(timeObject);
  }
}

const timeOptions: TimeOption[] = times;

export default timeOptions;