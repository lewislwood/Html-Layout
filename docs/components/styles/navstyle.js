

export const navStyles = `
ul.navList {
  list-style-type:none ;
  }
  .navItem a, a:link, a:visited , a:active, a:hover {
      border: none;
      text-decoration: none;        
      background-color: var(--navBar_bg);
      color: var(--navBar_fg);;
  }
  
.navItem:active,  .navItem:hover {
  border: 2px solid var( --navBar_fg, white);
}
.navBar {
  display:flex;
  background-color: var( --navBar_bg, red);
  color: var( --navBar_fg, cyan);
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  justify-content: center ;
  }
  .navList {
  display: flex;
  flex-direction: row;
  }

  .navItem  {
      background-color: var( --navBar_bg);
      color: var( --navBar_fg);
      padding-left: 3px;
      padding-right: 3px;;
      }
`;
