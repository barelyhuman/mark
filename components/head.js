import _Head from 'next/head';

const Head = (props) => {
  return (
    <_Head>
      <title>Monotes | Web Markdown</title>
      <link rel="icon" href="https://reaper.im/logo.svg" />

      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {props.children}
    </_Head>
  );
};
export default Head;
