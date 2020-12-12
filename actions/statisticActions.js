import axios from "axios";
import {URL, url} from "../common/URL";
import {defaultConfig} from "../common/Config";

const loadProjectMonths = async (request) => {
  const result = await axios.post(url(URL.STATISTICS.projectMonthsList), request, defaultConfig);

  return result.data;
}

export {
  loadProjectMonths,
};
