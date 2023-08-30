import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("ThemeHooker");

export async function start(): Promise<void> {

  const html = document.documentElement;
  const body = document.body;
  console.log(`[ThemeHooker] ThemeHooker has now started.`)

  html.setAttribute("Theme-Hooker", "");
  const CustomThemeTag = document.querySelector('[data-client-themes="true"]');

  var ThemeNames: string[] = [
    "mint-apple",
    "citrus-sherbert",
    "retro-raincloud",
    "hanami",
    "sunrise",
    "candyfloss",
    "lofi-vibes",
    "desert-khaki",
    "sunset",
    "chroma-glow",
    "forest",
    "crimson-moon",
    "midnight-burple",
    "mars",
    "dusk",
    "under-the-sea",
    "retro-storm",
    "neon-lights",
    "strawberry-lemonade",
    "aurora",
    "sepia",
    "memory-lane"
  ]

  let ThemeNum: number = 0;

  for (let ThemeNum in ThemeNames) {
    console.log(ThemeNum);
    console.log(ThemeNames[ThemeNum]);

    CustomThemeTag.setAttribute("id", "ThemeHook");
    let CustomThemeContent = document.getElementById("ThemeHook").textContent;
    console.log(document.getElementById("ThemeHook").textContent);

    if(CustomThemeContent.includes(ThemeNames[ThemeNum])) {
      console.log(`[ThemeHooker] Detected Theme: "` + ThemeNames[ThemeNum] + `".`)
      html.setAttribute("Theme-Hooker", "theme-" + ThemeNames[ThemeNum]);
      body.setAttribute("Theme-Hooker", "theme-" + ThemeNames[ThemeNum]);
      break
    }
   
    
  }

}

export function stop(): void {
  inject.uninjectAll();
}

