# Google Flow handoff protocol

This reference defines the human and agent boundary. The user operates Google Flow.
The agent owns the workspace, inspection, frame extraction, prompt writing, and site
processing.

## Workspace layout

The current Codex workspace is the working folder. Use these root filenames:

    start-frame.png
    segment-01.mp4
    segment-01-end.png
    segment-02.mp4
    segment-02-end.png
    support-01.png
    support-02.png

Use this private working area:

    .10k-flow/
      state.json
      prompts/
      review/

Use assets/ only for processed files that the static site consumes.

## Segment naming

The expected primary name is segment-NN.mp4 with a two-digit number. The extracted
handoff frame is segment-NN-end.png. Retry files preserve the original:

    segment-01-retry-01.mp4
    segment-01-retry-02.mp4

The agent may inspect a retry file only when it is the current segment's candidate.
Never select a file from modification time when two candidates exist. If a name is
missing, malformed, or ambiguous, stop and name the exact expected file.

## State file

Create and update .10k-flow/state.json as a small, human-readable JSON document:

    {
      "workflow": "10k-websites-flow",
      "tier": 2,
      "segment_count": 3,
      "expected_segment": 1,
      "accepted_segments": [],
      "start_frame": "start-frame.png",
      "last_end_frame": null,
      "status": "awaiting_video",
      "support_expected": 0,
      "support_received": []
    }

Allowed status values:

- setup
- awaiting_brief
- awaiting_start_frame
- awaiting_start_frame_review
- awaiting_video
- reviewing_video
- analyzing_video
- awaiting_support_images
- processing_assets
- building_site
- ready
- blocked_on_file

Keep paths relative to the current workspace. Add a segment object to
accepted_segments after inspection:

    {
      "number": 1,
      "source": "segment-01.mp4",
      "end_frame": "segment-01-end.png",
      "status": "accepted"
    }

## Trigger: koydum

When the user says koydum:

1. Read state.json.
2. Determine the expected segment number from expected_segment.
3. Check the primary filename and any retry candidates for that number.
4. If there is exactly one intended candidate, validate it with ffprobe.
5. Extract review frames and inspect the video.
6. On pass, extract the full-quality end frame into the workspace root.
7. Update last_end_frame and accepted_segments.
8. Increment expected_segment if another segment remains.
9. Give the next prompt and set status to awaiting_video.
10. On failure, set status to blocked_on_file, preserve the file, and give one retry
    prompt without advancing the segment number.

The word koydum is a delivery signal, not proof that the video is good. The agent
must perform the check.

## Trigger: gorsel koydum

Signals that start-frame.png is in the workspace root. When the user says gorsel
koydum, or any close variant meaning the start frame was placed:

1. Confirm start-frame.png exists and opens.
2. Inspect it against references/visual-grammar.md: single isolated object, seamless
   gradient backdrop with no environment, clean edge separation, no text or logos or
   watermark, flat backdrop area large enough for giant display type, and an object
   whose structure can carry at least four A4 actions.
3. On pass, set status to awaiting_video, set expected_segment to 1, and deliver the
   segment 01 prompt inline.
4. On failure, keep status awaiting_start_frame, preserve the file, and give one
   targeted image retry prompt. Do not deliver the segment 01 prompt.

This trigger is distinct from görselleri koydum, which refers to lower-page support
images and only applies after the hero journey is accepted.

## Trigger: görselleri koydum

When the user says görselleri koydum:

1. Read the expected support count from state.json.
2. Check support-01.png through the expected last file.
3. Report missing, unreadable, or ambiguous files by exact name.
4. Inspect the accepted set for dimensions, visual coherence, text, logos, and
   watermarks.
5. Process accepted images into assets/ and update support_received.
6. Set status to processing_assets or building_site.

## Completion

The video loop ends when accepted_segments contains segment_count entries. No extra
user message is needed. The agent then concatenates and encodes the hero, creates its
poster and ending still, and sets status to `analyzing_video`. It must inspect the
processed hero at actual desktop crops, map subject occupancy and safe UI zones over
time, and author the exclusive story UI timeline before setting `building_site` or
editing site files. A complete segment set alone is not permission to build the site.

If the user explicitly changes the story or asks for another chapter, revise the
storyboard and state before asking for a new file. Do not silently change the expected
segment count.
