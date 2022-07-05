

// Classes addrItem,addressBar ,"); 
// tags div, ul, li, a, img
export const addressStyle = `
ul{
  list-style-type:none ;
  display:flex;
  }

a, a:link, a:visited , a:active, a:hover {
      border: none;
      text-decoration: none;        
      background-color: var(--footer_bg);
      color: var(--footer_fg);
}

        .addrItem {
          margin-left  : 5px;
          margin-right: 5px;
      }

      a:hover {
        font-weight: bold; 
        font-size: larger;
      }

      .addressBar{
      background-color: var(--footer_bg);
      color: var(--footer_fg);
    display:flex;
  font-weight: 600;
  flex-direction: row;
  align-items: right;
  justify-content: right;
  }

`;

export const addressAboutStyle = `
ul{
  display:block;
  }
  li {
    width: 100%;
    display: inline block;
  }

a, a:link, a:visited , a:active, a:hover {
      border: none;
      background-color: var(--footer_bg);
      color: var(--footer_fg);
}

        .addrItem {
          display:inline;
          margin-left  : 5px;
          margin-right: 5px;
          width: 100%;
      }

      a:hover {
        font-weight: bold; 
        font-size: larger;
      }

      .addressColumn, {
        justify-items: unset;
      background-color: var(--footer_bg);
      color: var(--footer_fg);
    display: block;
  font-weight: 600;
  align-items: left;
  }

`;