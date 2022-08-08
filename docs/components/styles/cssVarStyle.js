

// CLASSES container    row
export const cssVarStyle = ` 
.bodyContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: var( --main_bg, white);
  color : var(--main_fg, red);
  justify-items:center;

}


.panel {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px;
}
.hidePanel {
  transform: scale(0,0);
  z-index: 0;
  position: absolute;
  top: -10;
  left: -10;

}
.contentPanel {
  width: var(--panel-content-width);
  background-color : var( --panel-content_bg, --header_bg );
  color : var( --panel-content_fg, --header_fg );
  text-align: center;
}
.contentPanel p {
  text-align: center;
  font-size: 0.75rem;
  }
  
.sidePanel{
  width: var( --panel-side-width);
  
  
}
.leftPanel {
  background-color: var( --panel-left_bg, white);
  color : var(--panel-left_fg, black);
}
.rightPanel {
  font-size: 1.25rem;
  background-color: var( --panel-right_bg, white);
  color : var(--panel-right_fg, black);
}
.rightPanelli  {
  font-weight: 800;     
}
.statusPanel {
  background-color: blue;
  color: sunshine;
  font-weight: 200;
  font-size: 0.75rem;
}

.cssContainer {
  display: FLEX;
  FLEX-DIRECTION: ROW;
  JUSTIFY: CONTENT;
}


table {
  border-spacing: 2px;
  border-width: -= 2px;
  border-color: white;
  FONT-SIZE: 0.75REM;
}
.colorContainer{
}
td {
  border-color: yellow:
 border-width: 3px;
 border-style: solid;
 border-spacing: 3px;
}
.nameSpan {
  width: 35%;
}
.inheritValues {
  width: 25%;
}

.colorSwatch{
  width:25%;
}

.btnColorPicker {
  width: 10%;
}

.radioColumns {
  display: flex;
  flex-direction: column;
  align: right;
}

`

// --panel-side_bg: #000080;
// --panel-side_fg: sunshine;
// --panel-content_fg : yellow;
// --panel-content_bg : brown;
// --panel-left_bg : var(--panel-side_bg);
// --panel-left_fg : var(--panel-side_fg);
// --panel-right_bg : var(--panel-side_bg);
// --panel-right_fg : var(--panel-side_fg);

// --panel-right-enabled: 1;
// --panel-left-enabled: 1
// --panel-columns : 3;
// --panel-content-width : 48%;
// --panel-side-width : 24%;
// --panel-left-width : var( --panel-side-width, 24%);
// --panel-right-width : var( --panel-side-width, 24%);

