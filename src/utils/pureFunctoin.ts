import {debounce} from "lodash";
import {isAxiosError} from "axios";

export const debouncedFetch = debounce(async (params, setState, api) => {
  try {
    const {value} = await api(params);
    setState(value);
  } catch (err) {
    if (isAxiosError(err)) {
      // alert('Server Error')
    }
  }
}, 200);
