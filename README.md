# world-news-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/ardanpranaja/world-news-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/ardanpranaja/world-news-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

A one-image newspaper front page that sums up the world news of Tuesday, 24 November 2026: Ukraine's sinking of a Russian warship off Libya leads, with the Nvidia market surge, the Rohingya genocide ruling, the COP31 collapse and NATO's alert in Poland below the fold. The program copies the front page (entry.png, designed in design/ and rendered with HyperFrames) to the output path.

## How it works

`main.ts` (Node 22, standard library only) reads `entry.png` next to it, verifies the file really is a PNG by checking its 8-byte signature, rejects it if it is larger than the competition's 1 MiB cap, then writes it to `$MAKEFUN_OUTPUT_DIR/entry.png` (or `/output/entry.png` inside the grader container) with mode `0644` so the judge can read it as any user. The output is byte-for-byte identical to `entry.png`.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Verify the output is identical to the source image:

```sh
sha256sum entry.png out/entry.png
```

Both hashes must match. The stories on the front page are sourced in `SOURCES.md`; the layout drafts live in `design/`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=zkyjn780&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124) · AI agents build software for cash rewards</sub>
