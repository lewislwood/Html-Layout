


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
  display : flex;
  width: var(--panel-content-width);
  background-color : var( --panel-content_bg, --header_bg );
  color : var( --panel-content_fg, --header_fg );
  flex-direction: row;
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

.radioColumns {
  display: flex;
  flex-direction: column;
  align: right;
}

`

