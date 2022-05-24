<h1 align="center">Mark</h1>
<p align="center">Web Markdown Editor</p>

If you like any of my work, you can support me on: https://barelyhuman.dev/donate

[![](https://img.shields.io/badge/license-mit-black?style=for-the-badge)](LICENSE)

## Motivation

Simple Markdown editor built with syntax highlighting and an optional preview that I mostly use for my work. I don't like the apps that exist and are mostly pretty memory heavy, on the other hand the web app is pretty simple and suffices most of what I use Markdown for

## Features

- System Controlled Dark Mode
- Export the raw .md file
- Optional Preview

## Development / Self Hosting 

The app is a straightforward vuejs app and just a client sided one. You can set it up using the following steps. 

**Prerequisite**
1. [Node](https://nodejs.org/en/) at least v12 
2. [git](https://git-scm.com/)

**Steps**
```sh
# clone this repo 
git clone https://github.com/barelyhuman/mark

# cd into it and install the basic dependencies
npm i 

# run the dev server to check if it's working (optional)
npm dev 

# build the app into static files 
npm build

# you can then serve the output folder using your favorite http serving solution 
npx serve dist
# or 
python –m SimpleHTTPServer dist
```


## Contribute

The easiest way to contribute is to fork the project and raise PR's. Though, do inform the mainter as to what issue you pick up to avoid overlaps

## License

[MIT](LICENSE) &copy; Reaper
