import {helpLog} from "./utils.js";
import {regFooter} from "./footer.js";
import {regHeader } from "./header.js";

export const getLayout = () => {
    const hl = helpLog;
    helpLog("Doing Layout");
const footer = regFooter;
hl("Registering Footer..");
footer();

const header = regHeader;
hl( "Registering Header");
header();


}