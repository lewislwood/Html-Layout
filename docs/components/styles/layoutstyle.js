

export const layoutStyle = `
.layout{
    color: var(--main_fg,blue);
    background-color: var( --main_bg, yellow);
    display: block;
    width: 100%;
    padding-left: 15px;
    padding-right : 0px;
}
.skip-to-content-link {
    background: --main_bg;
    height: 30px;
    left: 50%;
    padding: 8px;
    position: absolute;
    transform: translateY(-100%);
    transition: transform 0.3s;
  }
  
  .skip-to-content-link:focus {
    transform: translateY(0%);
  }

.layoutHeader, .layoutBody, .layoutFooter {
display: block;
justify-items: unset;

width: 100%;
}
`