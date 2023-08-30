import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("ThemeHooker");

export async function start(): Promise<void> {
  console.log(`[ThemeHooker] ThemeHooker has now started.`)

  const html = document.documentElement;
  const body = document.body;
  var ThemeNames: string[] = [
    "mint-apple",
    "citrus-sherbert",
    "retro-raincloud",
    "hanami",
    "sunrise",
    "cotton-candy", //Candyfloss
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
    "easter-egg" //Memory Lane
  ]

  html.setAttribute("theme-hooker", "");
  console.log(`[ThemeHooker] Added "theme-hooker" to the <html> tag.`);
  
  DetectTheme();

  function DetectTheme() {
    for (let ThemeNumber in ThemeNames) {
      if(document.querySelector('style[data-client-themes="true"]').textContent.includes(ThemeNames[ThemeNumber])) {
        console.log(`[ThemeHooker] Detected Theme: "` + ThemeNames[ThemeNumber] + `".`)
        html.setAttribute("theme-hooker", "theme-" + ThemeNames[ThemeNumber]);
        body.setAttribute("theme-hooker", "theme-" + ThemeNames[ThemeNumber]);
        break
      }
    }
  }

  const TrackedMutation = document.head;
  const MutationConfig = { attributes: true, childList: true, subtree: true };

  const TrackerReaction = (mutationList, Tracking) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        console.log("[ThemeHooker] Child List Modification detected, trying to detect the current theme.");
        DetectTheme();
      } else if (mutation.type === "attributes") {
        console.log(`[ThemeHooker] Attribute Modification detected, trying to detect the current theme.`);
        DetectTheme();
      } else if (mutation.type === "subtree") {
        console.log(`[ThemeHooker] Subtree Modification detected, trying to detect the current theme.`);
        DetectTheme();
      }
    }
  }

  const Tracking = new MutationObserver(TrackerReaction);
  Tracking.observe(TrackedMutation, MutationConfig);

}

export function stop(): void {
  inject.uninjectAll();
}

