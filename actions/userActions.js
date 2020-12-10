import axios from "axios";
import {URL, url} from "../common/URL";
import {defaultConfig} from "../common/Config";

const saveUser = async (user) => {
  try {
    return await axios.post(url(URL.USER.updateUser), user, defaultConfig);
  } catch (e) {
    return e.response;
  }
}

export {
  saveUser,
}
