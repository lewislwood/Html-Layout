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

Color schema variables editing/setting them has been completed.
I simplified the interface to use a List of items (colors variables).  
You can choose one, and it immediately shoots you off to Details Heading 3.
You will hear the color read off, what name if any, color value, parent if it inherits. Also all children spoken and displayed.
 The status message times out and disappears.
 In the color details you can select foreground or background colors to edit in a radio buttons.
 Next is the colr editing mode radio buttons (Named Color, Parent to inherit from, Custome color you enter).
 Depending on the mode you will be able to access one of the following edit options:
 *  Named Color combobox. Select on some colors by their name. Displays the name that currently matches the color value.
* Parent Color to inherit from. Displays the current color it inherits from or custom if none. 
*  Custom color Picker. Color picker allows   you to enter color values your favorite way (HSL, RGB, Hex), and sliders as well. 

You will note that when a color is changed, all the children are updated and are clearly shown on the list of Color Vars their color.

Screen Reader Users:
* NVDA - Press NVDA key and "f" twice to get a dialogue of font with color value.
*  Jaws - Press Jaws + number 5 to hear the color attribute.   Twice quickly to hear rgb values. Use Jaws history to review in detail.

Currently NVDA and Jaws do not update color attributes until the text changes. I will ask around and try to see if an aria attribute exists to force screen readers to get color values refreshed, on items where text did not change.
  
  Otherwise I will do brute force method:
   (textContent + ".").replace("..", "")
   I think the above will be enough to do it.


*  Tasks to do nex:
*  Theme component (Allow apply theme, save, share)
*  DevOps debug log hotkeys make it appear and go away. Thinking of rewritin
* Images (this one I deplore, but is neccessary).
* image gallery sample.




Feel free to clone this repository and modify it.
 