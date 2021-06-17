import messages_en from "./translations/en.json";
import FamilyNotificationPickers from "./components/FamilyNotificationPickers";
import reducer from "./reducer";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: 'PolicyNotification', reducer }],
  "insuree.Family.master": [FamilyNotificationPickers],
}

export const PolicyNotification = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}