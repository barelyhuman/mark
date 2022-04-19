export default function getMDStyles() {
  return `

      @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
      
      body{
        font-family:"Inter",sans-serif;
      }

       h1 {
        font-size: 24px !important;
        font-weight: 600;
        margin: 0.67em 0;
      }
      
       h2 {
        font-size: 18px;
        font-weight: 600;
      }
      
       h3 {
        font-size: 16px;
        font-weight: 600;
      }
      
       h4,
       h5,
       h6 {
        font-size: 14px;
        font-weight: 600;
      }
      
       hr {
        padding: 10px;
        border: 0;
        border-top: 1px solid #ced4da;
      }
      
       .tag::before {
        content: "#";
        color: #dee2e6;
      }
      
       .tag {
        background-color: #868e96;
        color: #fbfbfb;
        border-radius: 50px;
        padding: 5px 9px;
        display: inline;
        font-size: 12px;
      }
      
       p {
        line-height: 1.8em;
      }
      
       code::before,
       code::after {
        content: "\`";
        color: #ced4da;
        padding: 1px;
      }
      
       code {
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        padding: 3px;
        font-family: "Ubuntu Mono","Consolas", monospace;
      }
      
       .codeblock::before,
       .codeblock::after {
        content: "\`\`\`";
        display: block;
        color: #ced4da;
        padding-bottom: 5px;
      }
      
       .codeblock {
        color: #495057;
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        padding: 5px 10px;
        font-family: "Consolas", monospace;
        line-height: 1.5em;
      }
      
       .blockquote {
        border-left: 2px solid #495057;
        padding-left: 10px;
      }
      
       u::before,
       u::after {
        content: "\u00a0\u00a0";
        color: #adb5bd;
      }
      
       u {
        text-decoration-color: #adb5bd;
      }
      
       b::before,
       b::after {
        content: "*";
        color: #ced4da;
        font-weight: normal;
      }
      
       b {
        font-weight: 600;
      }
      
       i::before,
       i::after {
        content: "/";
        color: #ced4da;
      }
      
       a::before,
       a::after {
        content: "";
        color: #adb5bd;
      }
      
       a {
        color: #495057;
        text-decoration: underline;
        transition: 0.3s;
      }
      
       a:hover {
        color: #adb5bd;
        transition: 0.3s;
      }
      
       s {
        color: #868e96;
        text-decoration-color: #868e96;
      }`;
}
