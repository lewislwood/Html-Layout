####  Read Me for HTML Layout Designer and Learing tool

Fully accessible with live status updates to your screen reader.
You can quickly use this website to get a feel for the color schemes and fonts, and responsive layout options for blind developers.
It will demonstrate practices a blind developer can use to prgrammatically create a website in the ballpark. You will still needed a sighted person to help with the final versions, but you will have it somewhat close.

Also shows tips and tricks you can implement to compartmentalize the development process so that you can focus on what you want. The developer can take this tool as a preliminary layout and show the client a version that they can choose their own colors and schemes.

Seperated out parts of the Designer from the custom element. Now color variables are proccessed in a self contained class. Including wireing of events.  This makes it easier to port elsewhere at a later time.

Works as a training tool, since it contrasts older javascript and html approaches with css as well.  Same page in  Modern Web Component approach and showdom styling.

Demonstrates a file structure similar to what is used by many developers on many platforms. 
Only exception is the "docs" folder which is typically named app or src, this was done to accomadate gitHub pages. GitHub Pages allows simple websites to be hosted. Just as this repositor is hosted. (see link below).
#####  Page url 

[HTML Layout Designer](E )

You can actually make use of it  now. You can now edit color variables.  Change colors and rearrange inheritance. You can then apply those changes to your current theme.  You can share via clipboard a new root.css.   this file can be used by anyone else to use in their production application.

Also note I really enhanced the developer Operations.  It is now as a devault set to be invisible to sighted users. Screen readers currently still hear it logging away.
New devOps features.
*  Hotkey Alt+shift+D toggles mode (disabled for all, invisible (only screen readers hear it), visible everyone look and see
*  Alt + shift + C  Will clear the log.
* Alt + shift + S  Will share the log to clipboard
*  Developer Notes section, here I list hotkeys presently. developers will be able to add to it.
*   Developer Notebook button at the top of screen. (future will override disabled
))
C
*  Tasks to do nex:
*  Theme component (Allow save)
* Images (this one I deplore, but is neccessary).
* image gallery sample.




Feel free to clone this repository and modify it.
 