![Language](https://img.shields.io/badge/HTML-5%2B-E34F26.svg?logo=html5) ![Language](https://img.shields.io/badge/CSS3-2024%2B-1572B6.svg?logo=css3) ![Language](https://img.shields.io/badge/JavaScript-ES2023%2B-F7DF1E.svg?logo=javascript) 

![Code Size](https://shields.io/github/languages/code-size/LucaGnezda/DDDAdelaide2024PresoDemo) ![Static Badge](https://img.shields.io/badge/build_status-not_required_%3A%29-green)

# DDD Adelaide 2024 Conference - Presentation & Demo
## About
This repo is a fully functional presentation intended for DDD Adelaide. After having our talk voted in by popular vote for DDD Adelaide 2024, Solomon and I built this codebase on top of a Hostless Web Framework. Lol ... In doing so we've violated two fundamental rules of developer conference presenting:
1. Never do Live Demos.
2. If you do Live Demos, play it safe, and never ever dare the Demo gods (Pleeeeeeeese Work).
 
This is therefore:
- A presentation.
- A demonstration.
- An architectural definition of the hostless web framework.
- Self defining codebase.  

I originally designed a built the underlying framework as a way of teaching my nephews about coding. What is a hostless web framework? I'm glad you asked. It is an HTML codebase that can be run in a browser straight from a filesystem, without any need for build actions or web hosting. I did this as a way of providing my nephews a fully formed framework, without the need for any of the usual the commercial development complexities. This presents several challenges, namely:
- There is no way to do package imports or dynamic loading of files (without user drag user initiated uploads)
- Without packages and builds ... this means no TypeScript, Angular, ... (so everything has to be built from first principles)

But it does actually come with some of the niceties you'd hope for, such as:
- Compartmentalisation of View, Logic and Data
- Observable objects
- Improved logging
- etc.

## How to run
This bit is easy ... and kind of cool.
1. Download or clone the repo.
2. Open index.html in your Browser (That's it, literally).

## Compatibility
At time of building this codebase, to get some of the cool transitions working without timer events, We've used a bunch of 2024 features in CSS, such as discrete transitions and starting-style rules. As at November 2024, this is fully supported in Chromium based Browsers, and it might work in Safari too (haven't tested), but it won't yet work well in Firefox until they finish implementing discrete-transitions from display: none.