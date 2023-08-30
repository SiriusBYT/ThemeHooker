import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("ThemeHooker");

export async function start(): Promise<void> {
  
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  console.log(`[ThemeHooker] ThemeHooker has now started.`)

  html.setAttribute("Theme-Hooker", "");
  const CustomThemeTag = document.querySelector('[data-client-themes="true"]');
  CustomThemeTag.setAttribute("id", "ThemeHook");
  let CustomThemeContent = document.getElementById("ThemeHook").textContent;
  console.log(document.getElementById("ThemeHook").textContent);

  if(CustomThemeContent.includes("sunset")) {
    console.log(`[ThemeHooker] Detected Theme: Sunset.`)
    html.setAttribute("Theme-Hooker", "theme-sunset");
    body.setAttribute("Theme-Hooker", "theme-sunset");
  }
  async function ThemeHooker() {
  }

}

export function stop(): void {
  inject.uninjectAll();
}

