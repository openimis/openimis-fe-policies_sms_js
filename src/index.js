import messages_en from "./translations/en.json";
import FamilySMSPickers from "./components/FamilySMSPickers";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'PolicyNotification', reducer }],
  "insuree.Family.master": [FamilySMSPickers],
}

export const PolicyNotification = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}