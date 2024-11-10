![Language](https://img.shields.io/badge/HTML-5%2B-E34F26.svg?logo=html5) ![Language](https://img.shields.io/badge/CSS3-2024%2B-1572B6.svg?logo=css3) ![Language](https://img.shields.io/badge/JavaScript-ES2023%2B-F7DF1E.svg?logo=javascript) ![Code Size](https://shields.io/github/languages/code-size/LucaGnezda/DDDAdelaide2024PresoDemo)

# DDD Adelaide 2024 Conference - Presentation & Demo
## About
This Repo is a fully functional presentation intended for DDD Adelaide. After having our talk voted in by popular vote for DDD Adelaide 2024, Solomon and I built this codebase on top of a Hostless Web Framework. In attempting this we've violated two rules of developer conference presenting:
1. Never do Live Demos.
2. If you do Live Demos, play safe, and never ever dare the Demo gods.
 
This is therefore:
- A presentation
- A demonstration
- Self defines it's own architecture when you run the presentation.  

I originally designed a built the underlying framework as a way of teaching my nephews about coding. What is a hostless web framework? I'm glad you asked. It is a HTML codebase that can be run in a browser straight from a filesystem, without any need for build actions or web hosting. I did this as a way of providing my nephews a fully formed framework, without the need for any of the usual the commercial development complexities. This presents several challenges, namely:
- There is no way to do package imports or dynamic loading of files (without user drag user initiated uploads)
- Without packages and builds ... this means no TypeScript, Angular, ... (so everything has to be built from first principles)

But it does actually come with some of the niceties you'd hope for, such as:
- Compartmentalisation of View, Logic and Data
- Observable objects
- Improved logging
- etc.

After having a talk voted in by popular vote for DDD Adelaide 2024, Solomon and I built this codebase on top of the Hostless Web Framework.  specifically, took these foundations and build a fully formed presentation for the 2024 