# Design package

Create the narrative package before the first video prompt. It is the source of truth
for the brand world, copy inventory, visual system, and storyboard. It is not permission
to build the desktop UI before the accepted video has been analyzed. UI positions in this
package are hypotheses until the video-derived story timeline is complete.

## 1. Brand premise

- Brand or project:
- Audience:
- Buyer pain:
- Desired outcome:
- Main objection:
- Voice:
- One call to action:

## 2. Palette

Choose three to five colors sampled from the visual world of the hero. Use CSS tokens:

    :root {
      --canvas: #___;
      --ink: #___;
      --muted: #___;
      --accent: #___;
      --surface: #___;
    }

The canvas is tinted toward the footage and is never pure black or pure white. Use
the accent sparingly.

## 3. Type trio

- Display face and exact weights:
- Body face and exact weights:
- Mono face and exact weights for labels:

Do not use Inter or Roboto as the display face. Keep only the weights actually used.

## 4. Preliminary copy bands

For every hero caption:

- band name:
- progress start:
- progress end:
- caption:
- copy position:
- calm frame region:
- local scrim behavior:
- what the visitor understands:

These ranges are hypotheses for the video storyboard. Do not turn them into fixed HTML
positions. Replace them with frame-derived ranges after the final hero is accepted.

## 5. Static hero copy

- Kicker:
- Headline:
- Supporting line:
- CTA:

## 6. Content inventory

For every section:

- section purpose:
- headline:
- body copy:
- proof or objection answered:
- media filename:
- story function:
- candidate video interval:
- candidate copy-safe region:

## 7. Fallback and interaction plan

- signature element:
- SVG or CSS drawing:
- one visitor-performed interactive moment:
- reduced-motion result:
- mobile layout:

## 8. Storyboard

For each segment:

- number:
- start image:
- subject:
- trajectory:
- ambient motion:
- copy-safe region:
- exact end frame:
- next segment's starting image:
- Google Flow settings:
- Google Flow prompt path:

## 9. Video-derived story UI timeline

Complete this section only after the final processed hero video exists and has been
inspected at its actual desktop crop.

For every scene and sub-beat:

- id and purpose:
- exact start time:
- exact end time:
- sampled frames used for the decision:
- subject and moving-shadow region:
- forbidden UI region:
- safe UI zone:
- elements that appear:
- elements that disappear:
- entry and exit treatment:
- interactive elements active in this interval:
- next scene handoff:

Hard gates:

- Scene and sub-beat ranges are sorted and exclusive.
- The next composition does not become visible before the previous composition exits.
- Hidden elements do not reserve layout space and cannot receive focus.
- Every desktop position cites a frame-derived safe zone.
- Header, navigation, progress, copy, cards, CTA, and footer are included in the
  timeline instead of being permanent overlays.

## 10. Copy gate

Every viewer-facing line above ships verbatim. Before showing the page, check for
em dashes, stock filler, accidental AI language, and the project's forbidden words.
