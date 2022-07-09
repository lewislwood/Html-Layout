import {helpLog as hl} from "../components/utils.js";

export const cssVarsDataDesc  = {
    "--main_bg":
      "Main background. This color sets above all and many may inherit from it.",
    "--main_fg":
      "Main foreground. This color sets above all and many may inherit from it. Used by fonts and borders.",
    "--header_bg": "Header background.",
    "--header_fg": "Header fordeground. Used by fonts and borders.",
    "--footer_bg": "Footer background color",
    "--banner_bg": "Banner background color.",
    "--banner_fg": "Banner foreground color.",
    "--menu_bg":
      "Menu in the header background color. Normally set to Header value",
    "--menu_fg":
      "Menu in the header foregroundcolor. Normally set to Header value",
    "--navBar_bg":
      "Navigational bar in footer region. Normally default footer background color",
    "--navBar_fg":
      "Navigational bar in footer region. Normally default footer foregrouund color",
    "--address_bg":
      "Address background normally defaulted to footer background",
    "--address_fg":
      "Address foreground normally defaulted to footer foreground ",
    "--about_bg":
      "About page background for main portion Defaults typically to Main.",
    "--about_fg":
      "About page foreground for main portion Usually defaults to Main."
  };


export   const cssVarsDataDef  =   {
    "--header_bg": "--main_bg",
    "--header_fg": "--main_fg",
    "--footer_bg": "--main_bg",
    "--footer_fg": "--main_fg",
    "--banner_bg": "--header_bg",
    "--banner_fg": "--header_fg",
    "--menu_bg":"--header_bg",
    "--menu_fg": "--header_fg",
    "--navBar_bg":"--footer_bg",
    "--navBar_fg":"--footer_fg",
    "--address_bg":"--footer_bg",
    "--address_fg":"--footer_fg",
    "--about_bg":"--main_bg",
    "--about_fg":"--main_fg"
  };
