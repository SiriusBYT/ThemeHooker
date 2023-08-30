import { Injector, Logger, types, webpack } from "replugged";
import { Store } from "replugged/dist/renderer/modules/common/flux";
const inject = new Injector();
const logger = Logger.plugin("ThemeHooker");
const CustomThemeBodyUpdater = webpack.getBySource<Record<string, types.AnyFunction>>("data-client-themes");
const ClientThemesBackgroundStore = webpack.getByStoreName<{gradientPreset?: {id: number;}} & Store>("ClientThemesBackgroundStore");
const ThemeNames = webpack.getByProps<Record<string, string>>("MIDNIGHT_BLURPLE","DESERT_KHAKI",);
export function start(): void {
  logger.log(`ThemeHooker has now started.`);
  const html = document.documentElement;
  const {body} = document;
  const fnKey = webpack.getFunctionKeyBySource(CustomThemeBodyUpdater, "clientThemesCSS")
  inject.after(CustomThemeBodyUpdater!, fnKey!, (_args, res: {
    clientThemesCSS: string;
    clientThemesClassName: string;
  }) => {
  if (res.clientThemesCSS && res.clientThemesClassName && ClientThemesBackgroundStore!.gradientPreset && ThemeNames![ClientThemesBackgroundStore!.gradientPreset.id]) {
    html.setAttribute("theme-hooker", `theme-${ThemeNames![ClientThemesBackgroundStore!.gradientPreset.id].toLowerCase().replaceAll("_", "-")}`);
    body.setAttribute("theme-hooker", `theme-${ThemeNames![ClientThemesBackgroundStore!.gradientPreset.id].toLowerCase().replaceAll("_", "-")}`);
    return res;
  }
  html.setAttribute("theme-hooker", "");
  return res;
  });
}

export function stop(): void {
  logger.log(`ThemeHooker has now stopped.`);
  inject.uninjectAll();
}

