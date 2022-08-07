

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
}
.sidePanel{
  width: var( --panel-side-width);
  
  
}
.leftPanel {
  background-color: var( --panel-left_bg, white);
  color : var(--panel-left_fg, black);
}
.rightPanel {
  font-size: 2rem;
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
  display: block;
}


table {
  border-spacing: 5px;
  border-width: -= 4px;
  border-color: white;
  width: 80%;
}
.colorContainer{
}
td {
  width: 25%;
  border-color: yellow:
 border-width: 5px;
 border-style: solid;
 border-spacing: 5px;
}
.nameSpan {
  width: 25%;
}
.inheritValues {
  width: 25%;
}

.colorSwatch{
  width:25%;
}

.btnColorPicker {
  width: 25%;
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

