import { Injector, Logger, webpack } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("ThemeHooker");

const ThemeNames: string[] = [
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

function setTheme() {
  const {body, documentElement: html} = document

  for (const Theme of ThemeNames) {
    try {
      if(document.querySelector('style[data-client-themes="true"]').textContent.includes(Theme)) {
        logger.log(`Detected Theme: "${Theme}".`)
        html.setAttribute("theme-hooker", `theme-${Theme}`);
        body.setAttribute("theme-hooker", `theme-${Theme}`);
        break
      }
    }
    catch {
      html.setAttribute("theme-hooker", `theme-null`);
      body.setAttribute("theme-hooker", `theme-null`);
    }
  }
}

export async function start(): Promise<void> {
  logger.log(`ThemeHooker has now started.`)

  const html = document.documentElement;

  html.setAttribute("theme-hooker", "theme-null");
  logger.log(`Added "theme-hooker" to the <html> tag.`);

  setTheme();


  const TrackedMutation = document.head;
  const MutationConfig = { attributes: true, childList: true, subtree: true };

  const TrackerReaction = (mutationList, Tracking) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        logger.log("Child List Modification detected, trying to detect the current theme.");
        setTheme();
      } else if (mutation.type === "attributes") {
        logger.log(`Attribute Modification detected, trying to detect the current theme.`);
        setTheme();
      } else if (mutation.type === "subtree") {
        logger.log(`Subtree Modification detected, trying to detect the current theme.`);
        setTheme();
      }
    }
  }

  const Tracking = new MutationObserver(TrackerReaction);
  Tracking.observe(TrackedMutation, MutationConfig);

}

export function stop(): void {
  inject.uninjectAll();
}

