import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
@font-face {
  font-family: '양진체';
  src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

  * {
    box-sizing: border-box;
    margin:0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  letter-spacing: 2px;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
  li{
    list-style:none;
  }
  a{
    text-decoration:none;
    color:black;
  }
  a>.material-icons{
    color:white;
  }
`;

export default GlobalStyle;
