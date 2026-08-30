# Motion laws and Google Flow prompts

Precedence: references/visual-grammar.md outranks this file. Where a motion law below
suggests an environment, a moving camera, or an atmospheric subject, the visual-grammar
contract wins: one isolated object on a seamless backdrop, a nearly static camera, and
an action drawn from the A4 repertoire. Read visual-grammar.md first, then read this
file for prompt construction and chaining discipline.

Read this file before writing any video prompt. The goal is a single visual journey
that feels correct when scrubbed forward and backward by scrolling.

## Motion laws

1. Downward page scroll must agree with the motion. Prefer descent, approach, opening,
   arrival, assembly, pour, or another readable forward journey.
2. Use one subject and one continuous motion. Do not ask for a transformation between
   unrelated subjects.
3. Lock the trajectory but keep the subject and environment alive with small natural
   movement.
4. Plan the final resting frame first. It must have margin, a clear subject, and room
   for the page header and copy.
5. Prefer forgiving subjects such as fluid, mist, steam, light, fabric, and distant
   silhouettes. Keep exact anatomy and tiny interfaces away from risky close-ups.
6. Prefer a vertical motion axis when concepts are otherwise equal.
7. Compose the action lane and the provisional copy lane before generating, but expect
   the copy lane to change after the finished video is inspected.
8. Describe physical lens moments when crossing mist, water, glass, dust, or another
   boundary.
9. If a product is present, use its supplied image or frame it close enough that its
   design carries the brand.
10. Reserve calm regions for copy. The site adds a local scrim, text shadow, and
    worst-frame contrast check, but the agent must remeasure the region in the rendered
    desktop crop after generation.
11. Do not assume one copy lane is safe for the whole clip. If the subject, shadow,
    foreground, or highlight enters the lane, move the next UI beat or leave a short
    intentional blank interval.
12. Give each caption a long readable plateau. A visitor flick-scrolls, they do not
    watch the clip at normal playback speed.
13. Add the standing guard to every prompt: no text, no logos, no lettering anywhere.

## Start-frame specification

The first frame is normally a 16:9 image at high resolution. Describe the world from
edge to edge and reserve copy space as part of that same world. Do not ask for literal
black side panels or empty borders.

Use this structure for the built-in image generation prompt:

    Use case: photorealistic-natural or product-mockup
    Asset type: cinematic website hero starting frame
    Primary request: [subject and the first moment of the journey]
    Scene/backdrop: [one continuous environment]
    Composition/framing: 16:9, [subject position], [copy-safe region]
    Lighting/mood: [source, direction, and feeling]
    Color palette: [three to five material and light colors]
    Materials/textures: [specific surfaces]
    Constraints: no text, no logos, no lettering, no watermark
    Avoid: [unwanted objects, anatomy, preset look, or crop]

Inspect the generated image for anatomy, accidental marks, brand coherence, and
negative space before saving start-frame.png.

## Google Flow segment prompt

Give the prompt as plain copy the user can paste:

    Use the supplied starting image as the exact first frame.
    One continuous shot, no cuts. [SUBJECT] [VERB] from [START STATE] to [END STATE]
    along [EXPLICIT TRAJECTORY]. The subject stays alive throughout with [SMALL NATURAL
    MOTION]. The environment stays alive with [AMBIENT MOTION]. [BOUNDARY LENS MOMENT,
    IF NEEDED]. The shot ends at [COMPOSED END FRAME WITH MARGINS AND COPY SPACE].
    The motion must feel continuous and physically plausible. No text, no logos, no
    lettering anywhere.

Alongside it, state:

- Starting image: exact workspace filename.
- Output filename: exact segment-NN.mp4 name.
- Settings: 16:9, 720p, six seconds, no audio.
- Scroll meaning: what moving down reveals.
- End-frame handoff: whether this frame starts the next segment.

Never hide the fact that the next segment uses the previous segment's extracted end
frame as its starting image.

## Chained journeys

Segment 1 always uses start-frame.png. Text to video is not permitted for segment 1,
because the hero object's identity must survive all four handoffs.

For segment 1, use start-frame.png. For every later segment, use segment-NN-end.png
from the previous accepted segment. The continuation prompt must preserve:

- direction,
- approximate speed,
- camera height and heading,
- light direction and grade,
- subject position,
- physical cause of the motion.

Middle segments should normally end inside motion. Only the final segment needs the
composed resting ending. Never place two rest states back to back on a highly specific
texture. Put the seam inside movement, blur, darkness, a lens sweep, or another
motivated texture refresh.

Do not use a review JPEG as a handoff image. Extract the handoff as a full-quality PNG
from the raw accepted video.

## Retry prompts

When a segment fails, change one cause at a time:

- anatomy failure: simplify the subject and move risky detail farther away;
- trajectory failure: state the path and direction once, with a single verb;
- ending failure: describe the final composition with margins and a calm hold;
- seam failure: continue the motion through the join and add a physical transition;
- text or logo failure: repeat the no-text guard and remove branded objects.

Preserve the failed file and write the retry prompt in
.10k-flow/prompts/segment-NN-retry-MM.md.
