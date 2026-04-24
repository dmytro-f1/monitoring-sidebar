import { createI18n } from "vue-i18n"

import en from "./locales/en.json"
import uk from "./locales/uk.json"

const getBrowserLocale = () => {
  const browserLocale = navigator.language.split("-")[0]

  if (browserLocale.includes("uk") || browserLocale.includes("ru")) return "uk"

  return "en"
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: "en",
  messages: { en, uk },
})

export default i18n
