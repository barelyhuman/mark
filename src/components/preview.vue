<template>
  <article v-html="code" class="markdown-preview"></article>
</template>

<script setup>
defineProps({
  code: String,
});
</script>

<style>
/*
  CSS Credits https://github.com/pacocoursey/bear-css
*/

.markdown-preview {
  margin: 0 auto;
  width: 100%;
  padding: 20px 60px;
  font-size: 14px;
  line-height: calc(14px * 1.8);
}

.markdown-preview h1 {
  font-size: 24px !important;
  font-weight: 600;
  margin: 0.67em 0;
}

.markdown-preview h2 {
  font-size: 18px;
  font-weight: 600;
}

.markdown-preview h3 {
  font-size: 16px;
  font-weight: 600;
}

.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  font-size: 14px;
  font-weight: 600;
}

.markdown-preview hr {
  padding: 10px;
  border: 0;
  border-top: 1px solid #ced4da;
}

.markdown-preview .tag::before {
  content: "#";
  color: #dee2e6;
}

.markdown-preview .tag {
  background-color: #868e96;
  color: #fbfbfb;
  border-radius: 50px;
  padding: 5px 9px;
  display: inline;
  font-size: 12px;
}

.markdown-preview p {
  line-height: 1.8em;
}

.markdown-preview code::before,
.markdown-preview code::after {
  content: "`";
  color: #ced4da;
  padding: 1px;
}

.markdown-preview code {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  padding: 3px;
  font-family: "Consolas", monospace;
}

.markdown-preview .codeblock::before,
.markdown-preview .codeblock::after {
  content: "```";
  display: block;
  color: #ced4da;
  padding-bottom: 5px;
}

.markdown-preview .codeblock {
  color: #495057;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  padding: 5px 10px;
  font-family: "Consolas", monospace;
  line-height: 1.5em;
}

.markdown-preview .blockquote {
  border-left: 2px solid #495057;
  padding-left: 10px;
}

.markdown-preview u::before,
.markdown-preview u::after {
  content: "\00a0\00a0";
  color: #adb5bd;
}

.markdown-preview u {
  text-decoration-color: #adb5bd;
}

.markdown-preview b::before,
.markdown-preview b::after {
  content: "*";
  color: #ced4da;
  font-weight: normal;
}

.markdown-preview b {
  font-weight: 600;
}

.markdown-preview i::before,
.markdown-preview i::after {
  content: "/";
  color: #ced4da;
}

.markdown-preview a::before,
.markdown-preview a::after {
  content: "";
  color: #adb5bd;
}

.markdown-preview a {
  color: #495057;
  text-decoration: underline;
  transition: 0.3s;
}

.markdown-preview a:hover {
  color: #adb5bd;
  transition: 0.3s;
}

.markdown-preview s {
  color: #868e96;
  text-decoration-color: #868e96;
}
</style>
