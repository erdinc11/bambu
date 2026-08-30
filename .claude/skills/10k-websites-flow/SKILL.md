---
name: 10k-websites-flow
description: Build and locally deliver media-first cinematic scroll-driven websites where accepted Google Flow video is analyzed for negative space before the desktop UI timeline is built.
metadata:
  short-description: Semi-autonomous Google Flow website workflow
---

# 10K Websites Flow

Build a cinematic scroll-driven website with one continuous hero journey. The user
generates each video segment in Google Flow, downloads it into the current workspace,
and says koydum. You inspect the segment, extract its final frame, write the next
prompt, and continue until the storyboard is complete.

This is a local-only workflow. Do not use remote video-generation connectors, automatic
video generation, hosting integrations, domain setup, or live deployment. The only
external generation step is the user's own Google Flow session. Use the built-in image
generation tool for the first frame when one is needed.

## Operating contract

- Preserve the current workspace and use it as the project folder.
- The user never needs to edit code or rename files beyond the documented filenames.
- Prompts for Google Flow are written in English. Explain their purpose and settings in
  the user's language, in Turkish when the conversation is Turkish.
- Ask one clear question at a time. Use clickable choices when available.
- Never claim a video is ready from its filename alone. Inspect it.
- Never advance the chain from a failed or ambiguous segment.
- Keep raw videos and extracted handoff frames in the workspace root. Keep review
  material and state under .10k-flow. Keep only processed web assets under assets.
- Do not overwrite an existing asset unless the user explicitly requests replacement.
- Use plain language, no em dashes, and report the exact file being used.
- This is a media-first workflow. Do not build the desktop site shell, fixed header,
  static hero copy, or lower-page UI before the final hero video is accepted and its
  negative-space timeline has been inspected.
- The desktop presentation is one video-led story stage. Header, navigation, copy,
  cards, controls, CTA, and footer are story elements that enter and leave the frame;
  they are not a permanent HTML layer over the whole video.
- Do not leave local preview servers, ffmpeg workers, browser automation, watchers,
  or other task processes running after a check. Stop every process started for this
  workflow before handoff.

### Isolated-subject visual grammar gate

Read references/visual-grammar.md before writing any image prompt, any video prompt,
or any line of site markup. It is a binding contract, not a style suggestion. It
defines the reference class this skill produces: a single isolated hero object on a
seamless studio backdrop, giant display type sitting behind the video and occluded by
the subject, and a technical-drawing UI language.

The three rules that are violated most often, and that invalidate a prompt outright:

- The video plate carries no environment. No grove, room, street, landscape, table,
  floor texture, prop, or set. One object, seamless gradient backdrop, nothing else.
- The camera is nearly static. The object carries the motion, not the camera. A prompt
  that dollies in, cranes up, or sweeps across a space is rejected and rewritten as an
  object action from the A4 repertoire.
- Every segment uses a different action from the A4 repertoire, and the backdrop value
  travels across the journey instead of staying flat.

When the business has no physical product, invent one hero object that represents its
work, and record it in the design package as the hero object contract: what it is, its
material, how many parts it separates into, which service each part maps to, how many
variants it has, and which package each variant maps to. Do not write a prompt before
that contract exists.

### Media-first construction gate

The order below is mandatory:

1. Define the brand world, copy inventory, story arc, and video storyboard.
2. Generate, inspect, and accept every video segment.
3. Process the accepted video and inspect its actual frames and rendered crops.
4. Map subject occupancy, calm regions, and safe UI zones over time.
5. Author an exclusive story UI timeline from that map.
6. Only then build `index.html`, `styles.css`, and `script.js`.

Before step 6, site code may not be created as a placeholder, even if the final
video is not ready. The design package is allowed before generation, but its copy
positions are hypotheses until the video-derived map is complete.

The video-derived map must inspect at least the first, middle, last, and transition
frames of every segment, plus a denser contact sheet when the subject changes position.
Inspect the source at 16:9 and the actual desktop crop used by the site. Never infer a
safe zone from a segment number alone.

The UI timeline must record, for every scene and sub-beat:

- exact start and end time,
- the frame interval used for the decision,
- the safe zone and forbidden subject zone,
- the elements that enter and leave,
- the intended visual transition,
- the copy and CTA shown in that interval.

Scene and beat intervals are exclusive. The previous element must be fully hidden or
removed from layout before the next one becomes interactive. Hidden absolute beats must
not reserve layout space or remain focusable.

### Prompt delivery gate

The user must be able to complete the next Google Flow action from the current
assistant response alone. A prompt file on disk is supplementary, never a
substitute for the prompt in the response.

- Whenever a segment is pending, include that segment's complete English prompt
  in a fenced code block in the same response.
- Also state in Turkish the starting image, exact output filename, handoff-frame
  filename that Codex will create after inspection, and settings: 16:9, 720p, six seconds, no audio unless the
  storyboard explicitly deviates.
- If several segments are ready, include all currently actionable prompts, or
  clearly label the one the user must generate first and provide the remaining
  prompts as a secondary convenience.
- Do not deliver a final response that says the user should generate a segment
  while omitting the prompt text. Before sending, verify that the response has
  the prompt, filenames, and settings, not only links to `.md` files.
- Never ask the user to extract, export, screenshot, rename, or save the ending
  frame. The user supplies only the raw `.mp4`; Codex validates it and creates
  the required `segment-XX-end.png` handoff frame.

### Resolution policy

This Google Flow workflow uses 720p as its standard video output. Do not ask the
user to generate a higher-than-720p video and do not reject a readable 1280x720
video because it matches the workflow standard.

- State the generation settings as 16:9, 720p, six seconds, and no audio in every
  prompt and manual handoff response.
- Validate that the video is 16:9, readable, approximately six seconds, and has
  a usable visual frame. Treat 1280x720 as the expected resolution.
- Keep the first frame and extracted handoff frames at the highest available
  source quality. This resolution policy applies to generated video, not still
  frame extraction.
- Never write a resolution above 720p into a new prompt, settings line, or retry
  instruction for this workflow.

### Motion diversity gate

The hero must tell a visual story, not repeat the same object animation for the
whole duration.

- Give every segment one distinct primary motion verb and one distinct story
  function. Adjacent segments may not repeat the same action, camera behavior,
  or end-state pattern.
- Before writing a prompt, compare it with the previous segment. If the main
  action is still just rotate, pan, zoom, or another cosmetic synonym, stop and
  redesign the beat. Use a meaningful progression such as approach, rise, arc,
  reveal, shadow morph, assembly, opening, flow, or pullback when it fits the
  subject.
- Keep continuity through the same subject, light, palette, and physical cause,
  but allow the subject, camera, shadow, and environment to take turns carrying
  the motion.
- A user request for something different requires revising the storyboard and
  the remaining prompts, not merely changing adjectives in the current prompt.
- Add a motion-arc check to the design package: list each segment's primary
  motion, visual transformation, and visitor takeaway. Do not deliver a prompt
  until that list shows a clear beginning, development, transformation, and
  composed ending.

### Cinematic production gate

AI video generation must add a filmable visual event, not imitate a CSS
transition. A prompt is not ready when its main idea is only moving the subject
left or right, rotating it, zooming, panning, fading, or changing its scale.

- Every segment needs one authored cinematic event with a clear physical cause,
  such as a dolly or crane move with parallax, a focus pull from material to
  shadow, a volumetric light sweep, a reflection or refraction change, a breeze
  moving a real surface, a macro reveal, a motivated lens crossing, or a
  light-and-shadow interaction.
- Pair that event with the segment's visual purpose and environment. The camera,
  lens, depth, light, material, atmosphere, and subject response should be
  described precisely enough to produce a scene, not a DOM animation.
- Use one dominant cinematic event and at most one supporting event per six
  seconds. Prefer a controlled, filmable beat over a pile of abstract effects.
- Reject prompts that say only “move the object”, “shift it to the right”,
  “slowly zoom”, or equivalent cosmetic instructions. Replace them with a
  motivated shot design and a visible beginning, escalation, and end state.
- Before delivery, add a `cinematic event` line to each storyboard chapter and
  check that the event cannot be reproduced by a single CSS transform on a
  static image. If it can, redesign the chapter before giving it to the user.

### High-craft 3D/VFX mode

When the user asks for Marvel-level, blockbuster, premium 3D, or similarly
high-craft animation, switch modes explicitly. Do not answer with a more ornate
version of a pan, zoom, or object translation.

- Design each six-second shot in three beats: a readable setup, a visible
  escalation, and a memorable payoff or handoff state.
- Include at least three coordinated layers: a motivated cinema-camera move
  with parallax, a real state change in the subject or its environment, and a
  lighting, particle, material, or shadow event that reacts to that change.
- Give the subject a believable 3D action such as precision disassembly,
  articulated reassembly, controlled unfolding, material fracture, energy
  transfer, depth reveal, or another physically motivated transformation. Keep
  it tied to the same subject and brand story.
- Specify lens language, depth of field, motion blur, volumetric light, surface
  response, and spatial layering where they materially improve the shot. These
  are production instructions, not decorative adjectives.
- A high-craft prompt must make clear what changes at approximately 0 to 2, 2 to
  4, and 4 to 6 seconds. If the whole shot can be summarized as “the camera
  moves toward the middle and comes back”, reject it and redesign it.
- Prefer one coherent VFX idea with a strong payoff over several unrelated
  effects. The last frame must remain usable as the next handoff image.

### Quality floor and rework gate

Once the user asks for high-craft, blockbuster, Marvel-level, or comparable
3D/VFX work, that quality level becomes the floor for every unapproved and
future chapter. Do not return to a simpler chapter because only one segment was
criticized.

- Before writing a prompt, create a compact scene card containing: dominant
  cinematic event, camera path and lens, subject state before and after, the
  physical cause of the transformation, material or lighting response, depth
  layers and parallax, three timed beats, and the exact handoff pose.
- Every chapter must contain a real three-dimensional state change in the
  subject or its environment. A camera move, object translation, rotation,
  scale change, shadow fade, or decorative particle pass alone is insufficient.
- Reject high-craft adjectives without high-craft actions. Words such as
  “cinematic”, “epic”, “premium”, “Marvel”, “detailed”, or “realistic” do not
  count unless the prompt specifies what physically changes and how the camera,
  light, material, and shadow respond.
- Reject prompts that can be summarized as “the bamboo moves”, “the bamboo is
  pushed right”, “zoom in and return”, or “spin the object”. Replace them with
  a motivated transformation that has a setup, escalation, and payoff.
- Keep one dominant VFX idea and no more than one supporting event. The shot may
  be complex, but it must remain legible and continue the same physical story.
- Run a mixed-quality check across the whole storyboard. Adjacent chapters must
  differ in action, but they must share the same production quality floor,
  camera language, material behavior, and handoff discipline.
- If a segment is reworked, treat that segment's old ending and every downstream
  prompt or ending derived from it as superseded. Preserve the old raw files for
  comparison, but never use a superseded handoff to continue the chain.
- Roll `.10k-flow/state.json` back to the last accepted segment before the
  reworked chapter, set `expected_segment` to the reworked number, remove that
  chapter and all downstream chapters from `accepted_segments`, and set
  `last_end_frame` to the previous accepted ending. Do not delete raw media.

### High-craft prompt audit

Before delivering a Google Flow prompt, verify all of the following in the
prompt itself:

- exact starting image and exact raw output filename,
- explicit `0 to 2`, `2 to 4`, and `4 to 6 seconds` beats,
- a specific lens and motivated camera path,
- at least one physical subject or environment transformation,
- a reactive material, shadow, light, particle, or atmosphere event,
- foreground and background depth or parallax,
- a readable payoff and an intentional next-frame handoff,
- negative prompts for text, logos, interface artifacts, unrelated props, and
  visual continuity breaks.

If any item is missing, do not send the prompt. Rewrite it first.

## Phase 0: local setup

Before creative questions:

1. Check that ffmpeg and ffprobe run.
2. Check Node.js with node --version.
3. Inspect the current workspace for existing assets, a prior .10k-flow/state.json,
   and any segment or support files.
4. Report a short checklist with what is ready and what is missing.
5. Install missing local tools yourself when the operating system package manager is
   already available. If a system-level install needs a password or manual action,
   state the one required action and pause.

There is no account check, remote connector check, generation credit check, or hosting
check in this phase.

## Phase 1: design conversation

Collect, one question at a time:

1. What is the business, product, place, or idea, and who is it for?
2. Is it a real thing with usable photos, a real business without usable photos, an
   invented brand, or a digital product with screenshots?
3. What should it feel like?
4. Are there reference websites or images?
5. Does the user have a logo, product photos, screenshots, sound, or video assets?

Use a real supplied product photo as the first frame when it is the correct asset and
its composition supports the journey. Otherwise create the first frame with the
built-in image generation tool. Do not use an identifiable person's image without
their permission.

## Phase 2: customer research and proposal

Research the niche with a handful of real reviews, forums, or communities. Collect
recurring language for:

- the buyer's pain,
- the outcome they want,
- the objection that stops them.

Use that language in the page copy and structure the page toward one clear call to
action. Then propose two or three hero concepts. For each concept, state the scroll
motion, the final resting frame, and the negative-space plan. Recommend one.

Explain that desktop and laptop visitors receive the scrub journey. Phones and other
static-hero gates receive the composed still image unless the project is explicitly
verified with a safe mobile crop.

## Phase 3: choose the journey tier

Choose the smallest tier that tells the story:

- Tier 1: one six-second segment.
- Tier 2: a chained fifteen to twenty-second journey made from several six-second
  segments.
- Tier 3: a choreographed journey whose segment beats and page sections are planned
  together.

State the segment count before starting. A tier decision controls the expected filenames
and determines when the loop is complete.

## Phase 4: design the narrative, then storyboard the video

Design the content and visual world before writing generation prompts, but do not
implement the desktop page yet. Create a narrative package using
references/design-package.md. It must contain:

- brand premise and audience,
- palette sampled from the visual world,
- display, body, and optional mono type choices,
- hero caption bands and pacing,
- the complete content inventory that will later become story scenes,
- one clear call to action,
- signature visual element,
- the intended interaction and fallback plan,
- numbered video chapters.

Each storyboard chapter must include:

- segment number,
- starting image,
- one continuous subject and motion,
- trajectory and camera behavior,
- ambient motion,
- negative-space location for text,
- exact end composition,
- the next handoff frame relationship.

For high-craft journeys, also include the scene card fields: dominant cinematic
event, camera and lens, subject state change, physical cause, reactive light or
material behavior, depth layers, three timed beats, and handoff pose.

Also record each chapter's unique primary motion verb, visual transformation,
and visitor takeaway. Adjacent chapters must not be cosmetic variations of the
same animation. The sequence should have a readable arc such as introduction,
development, transformation, and arrival.

Do not turn the copy-safe region into a permanent page column. It is only a video
composition hypothesis. The actual desktop UI position is decided after the accepted
video has been inspected frame by frame in the media-first construction gate.

Write every segment prompt before the user generates that segment. Read
references/prompt-laws.md before writing prompts.

## Phase 5: create the first frame and start the handoff

Every journey begins with an accepted start-frame.png. Segment 01 is never generated
text to video, even when the agent has no image generation tool of its own. The hero
object's identity must stay fixed across all segments, and text to video reinvents the
object on every run, which breaks the chain at the first handoff.

When a supplied product photo is the correct asset and its composition already matches
the isolated-subject grammar, use it. Otherwise produce the start frame as follows.

If the agent has a built-in image generation tool:

1. Generate the first frame with it.
2. Inspect isolation, backdrop flatness, edge separation, accidental text, and negative
   space.
3. Move or copy the selected image into start-frame.png in the workspace root. It must
   not remain only in the tool output location.
4. Do not replace an existing start-frame.png without explicit permission.
5. Show the image to the user and provide the first Google Flow prompt.

If the agent has no image generation tool available in this session:

1. Set status to awaiting_start_frame.
2. Write the complete English image prompt into .10k-flow/prompts/start-frame.md and
   also deliver it inline as a fenced code block in the same response. A file path is
   never a substitute for the prompt in the response.
3. Tell the user, in their language, that they may generate it with Google Flow's own
   image generation or any image tool they prefer, and that the output goes into the
   workspace root as start-frame.png.
4. Wait for the user to say gorsel koydum.
5. Open and inspect the image against the visual-grammar checks: single isolated
   object, seamless gradient backdrop with no environment, clean edge separation from
   the backdrop, no text or logos or watermark, enough flat backdrop area for giant
   display type, and an object whose structure can carry at least four A4 actions.
6. On pass, set status to awaiting_video and deliver the segment 01 prompt.
7. On failure, give one targeted image retry prompt and do not deliver the segment 01
   prompt. Preserve the failed file.

The image prompt itself must state, at minimum: the single object and its material, the
seamless studio backdrop and its value, the studio lighting setup, the framing and where
the object sits, the flat regions reserved for display type, and a negative list that
forbids text, logos, lettering, watermarks, people, environments, props, and floors.

The first Google Flow prompt must state:

- use start-frame.png as the starting image,
- one continuous shot with no cuts,
- the object action from the A4 repertoire and its exact start-to-end states,
- that the camera stays nearly static,
- the backdrop value and whether it shifts,
- a composed final state that leaves flat backdrop area for display type,
- no text, no logos, no lettering anywhere.

Default Google Flow settings are 16:9, 720p, six seconds, and no audio. If the
storyboard needs another setting, state the deviation before the user generates.

## Phase 6: the manual Google Flow loop

Read references/flow-handoff.md for the complete protocol.

For the current expected segment:

1. Give the user its English Google Flow prompt and Turkish explanation.
2. Tell the user the exact raw output filename, for example segment-01.mp4.
   Explicitly say that the user only needs to place this `.mp4` in the workspace;
   Codex will create the ending frame after inspection.
3. Wait for the user to place only the raw video file in the workspace and say koydum.
4. Verify the exact expected file exists and is a readable video.
5. Extract start, middle, and end review frames under .10k-flow/review.
6. Inspect duration, dimensions, codec, continuity, anatomy, logos, text, and the
   ending.
7. If the segment is acceptable, extract a full-quality PNG named
   segment-01-end.png in the workspace root. This is a Codex action, not a user
   action. Report the created file after extraction.
8. Update .10k-flow/state.json.
9. If another chapter remains, write its next prompt using the extracted end frame as
   the starting image.
10. If the segment fails, do not extract a handoff frame or advance. Explain the
    concrete issue and provide one targeted retry prompt. Keep the failed file.

Every response at this manual boundary must repeat the complete current prompt
in a copyable fenced code block, even when the prompt was already written to a
file in an earlier response. The file path is useful for reference but does not
count as prompt delivery.

When writing the next prompt, run the motion diversity gate against every prior
chapter. Preserve the handoff continuity, but make the next chapter's primary
motion and visual purpose visibly different from the previous one.

A passing technical check does not hide an obvious visual failure. If the user says
the result is not right, preserve it and use a retry filename such as
segment-01-retry-01.mp4. When more than one candidate for the current segment exists,
do not guess. Report the candidates and ask which one to inspect.

If the user says an earlier accepted segment will not be used because it is too
simple, shallow, or CSS-like, that is a rework request for that exact segment:

1. Mark the old segment and its handoff as superseded in the workflow state.
2. Roll back to the last accepted segment before it. Do not continue from a
   later segment, even if a later video was already generated.
3. Preserve all old raw files with their original names and use a new retry name
   such as `segment-02-retry-02.mp4`.
4. Rewrite the segment prompt as a new authored cinematic event, not an adjective
   edit. Re-audit every downstream prompt against the new handoff and rewrite any
   prompt that assumes the old geometry or state.
5. In the same response, deliver the complete retry prompt inline, state that
   the user supplies only the new raw `.mp4`, and state that Codex extracts the
   ending frame after inspection.

Never ask the user to choose between ambiguous old files when the user has already
requested a rework. The new retry filename is the authoritative candidate for the
next generation.

When the final storyboard chapter passes, stop asking for segments and process the
complete hero video. Do not build the desktop site at this point. Continue to the
video-derived negative-space analysis and story UI timeline first.

## Phase 7: support imagery

After the hero journey is accepted, write English prompts and Turkish explanations
for the lower-page images. Number them as support-01, support-02, and so on. The user
generates them with their chosen image tool, places them in the workspace root, and
says görselleri koydum.

Validate every support image for:

- readable file and sensible dimensions,
- no accidental text, logos, or watermarks,
- consistency with the hero's palette, light, materials, and brand details,
- equal treatment of parallel cards or steps.

Do not block the site on an optional support image unless that section cannot work
without it. If a required image is missing or ambiguous, name the exact file needed.

## Phase 8: process assets

Read references/ffmpeg-recipes.md. Process approved raw media only:

- extract the final handoff frame from each approved raw segment,
- concatenate chained raw segments,
- encode the final hero with short keyframe intervals,
- create the poster and ending still,
- resize approved support images once,
- keep raw and review files out of assets.

The final web assets are:

- assets/hero-scrub.mp4
- assets/hero-poster.jpg
- assets/hero-ending.jpg
- processed support images under assets/

After encoding, inspect `assets/hero-scrub.mp4` itself, not only the raw segments.
Create a video-derived negative-space map under `.10k-flow/analysis/` with sampled
frames and exact time ranges. For each range, mark where the subject, moving shadows,
foreground leaves, bright highlights, and safe copy zones are in the rendered crop.
Do not proceed to site code until this map is complete.

## Phase 9: choreograph the video-derived UI

Use the accepted hero and the negative-space map to author the desktop story UI before
writing its markup. The page is not a normal section stack with a video behind it.

Create an exclusive timeline containing:

- one scene for each story beat,
- exact `start` and `end` times,
- the frame-derived safe zone for that interval,
- the elements that appear and disappear,
- the entry and exit treatment,
- the next scene's handoff condition.

The timeline must cover the full video from 0 to its real duration. Sort all ranges and
assert that adjacent active ranges do not overlap. If a transition needs breathing room,
use a short empty interval; never cross-fade two dense text compositions into each other.

Place every desktop element inside the safe zone selected from the actual frames. Recheck
the position after the site's `object-fit` crop at the target desktop viewport. Do not use
a fixed left column, fixed right column, or grid child that silently crosses into the
subject zone. Use one bounded inner shell with safe insets; a child must not override that
shell to touch the viewport edge.

The header, navigation, progress indicator, captions, service content, packages, process,
advertising explanation, FAQ, CTA, and footer all belong to this timeline. They must not
remain visible for the whole video. On each frame, only the current scene and current
sub-beat may be interactive. Hidden scenes and beats must be `visibility: hidden`, removed
from pointer and keyboard interaction, and removed from layout when their position would
otherwise create stacking or spacing artifacts.

Use actual frame review to check at least these points before implementation:

- video start,
- every segment seam,
- the first and last frame of every UI interval,
- the midpoint of every UI interval,
- fast scroll skips across several intervals,
- final frame.

Only after this choreography is approved internally may the static site files be written.

## Phase 10: build the local website

Build one no-build static site:

- index.html,
- assets/,
- plain HTML, CSS, and vanilla JavaScript,
- no framework,
- no package install,
- no hosting configuration.

Implement the desktop story stage as a scroll scrub:

- map the full scroll track directly to the video's real duration,
- do not call `video.play()` or use autoplay for the desktop journey,
- seek safely without overlapping seeks,
- do not use a smoothing factor that makes the video run ahead of or lag materially
  behind the scroll position,
- use a scroll distance long enough that normal and fast wheel gestures do not make the
  24-second journey appear artificially fast,
- do not use a `fetch` or `HEAD` preflight to decide whether local media can load; assign
  the video source directly so double-clicking `index.html` via `file://` remains valid,
- use a loading state that does not pretend the video is ready,
- use the poster while the video loads,
- hide the dead video on error,
- keep the complete content available in the static fallback,
- use the ending frame in a lower section only when it strengthens the story.

Keep the action lane clear of copy. Add local scrims, text shadows, worst-frame contrast
checks, visible focus states, semantic landmarks, reduced-motion behavior, coarse-pointer
touch target sizing, and a designed static fallback for phones.

The desktop DOM may contain semantic sections for accessibility, but its visual
presentation is one pinned video stage. It must contain buyer-language copy, services,
packages, process or explanation, objection handling, a final CTA, navigation, and footer
content as timed story scenes. On mobile and reduced motion, reveal the same content in a
complete readable static flow.

Before considering the site built, verify that no fixed overlay survives across all
timeline states, no hidden scene remains over another scene, no scene starts before its
previous scene has exited, and no UI element is positioned without a corresponding
frame-derived safe-zone decision.

## Phase 11: self-test and local handoff

Before showing the site:

1. Run a desktop browser preview through a local server and, when supported, open the
   same page directly from `file://`.
2. Test the video at 0%, every scene seam, the middle, 100%, and during fast flick
   scrolling. Confirm that scroll position maps to time without playback drift.
3. Test every scene boundary for text overlap, stale focus, layout reservation, and
   safe-zone collision with the subject in the rendered crop.
4. Test the final frame and the static mobile/reduced-motion flow.
5. Test buttons, navigation, FAQ behavior, focus states, WhatsApp links, and touch
   target sizes.
6. Test the page with the video file temporarily unavailable and confirm poster/fallback
   behavior without hiding the content.
7. Check console errors, narrow widths, portrait widths, viewport-edge insets, and
   horizontal overflow.
8. Check every viewer-facing line for em dashes, generic filler, accidental duplicate
   copy, and text that remains visible outside its declared timeline.
9. Stop every local server, browser automation process, ffmpeg process, watcher, and
   temporary preview worker started for the task. Verify no task-owned process remains.
10. Report what was tested and what was fixed.

If the site is being handed off while video segments are still pending, the
handoff must also contain the currently required Flow prompt inline, plus the
exact starting image and output filename. A site delivery does not close the
manual video loop or remove this requirement.

Deliver the local project path and the local preview address. Do not offer or perform
live deployment in this skill.

## Resume behavior

At the start of every later turn, read .10k-flow/state.json before asking what happens
next. If the state says awaiting_video, expect the exact current segment filename.
If it says awaiting_support_images, expect the next support filenames. If it says
processing_assets or analyzing_video, finish the hero processing and negative-space
timeline before any site implementation. If it says building_site, verify that the
video-derived UI timeline exists before editing site files. If it says ready, inspect
whether the video analysis and UI choreography were completed; do not assume a prior
site build is valid. Continue from that state instead of restarting generation.

## References

- references/flow-handoff.md: workspace files, state, triggers, retries, and loop gates.
- references/prompt-laws.md: motion laws and Google Flow prompt construction.
- references/ffmpeg-recipes.md: frame extraction, validation, concat, and web encoding.
- references/design-package.md: the page and storyboard design deliverable.
- references/visual-grammar.md: the binding isolated-subject video and UI contract.
