import { createI18n } from "vue-i18n"
import { watch } from "vue"

import en from "./locales/en.json"
import uk from "./locales/uk.json"

const getLocale = () => {
  const locale =
    localStorage.getItem("locale") ?? navigator.language.split("-")[0]

  if (locale.includes("uk") || locale.includes("ru")) return "uk"

  return "en"
}

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: "en",
  messages: { en, uk },
})

watch(i18n.global.locale, (newLocale) => {
  localStorage.setItem("locale", newLocale)
})

export default i18n
