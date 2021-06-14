import messages_en from "./translations/en.json";
import FamilySMSPickers from "./components/FamilySMSPickers";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'policiesSMS', reducer }],
  "insuree.Family.master": [FamilySMSPickers],
}

export const PoliciesSMS = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}