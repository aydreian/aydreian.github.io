# aydreian.github.io

Static personal portfolio. Rebuild styles with:

```sh
node node_modules/@tailwindcss/cli/dist/index.mjs -i src/input.css -o src/output.css
```

The contact form opens Gmail's compose page addressed to
`carladriantcarbaquil@gmail.com`; the visitor must press Send in Gmail.
The direct email link also works with a configured email application.
No email credentials or backend are required.

NU shield: National University, vector by Moonrivers, via
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:NU_shield.svg),
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), used unchanged.

Hero icons: [Lucide](https://lucide.dev), served locally from `src/icons/`.
The original [ISC license](src/icons/LICENSE) is included with the assets.

Scroll reveals run once per element and respect reduced-motion preferences.
Content remains visible without JavaScript or IntersectionObserver support.
