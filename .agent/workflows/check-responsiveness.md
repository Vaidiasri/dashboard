---
description: Check the responsiveness of the web app across standard device breakpoints.
---

1. **Verify Server**: Ensure the development server is running (usually `npm run dev`). If not, ask the user to start it.
2. **Launch Verification**: Use the `browser_subagent` to visually verify the layout.
   - **TaskName**: "Responsiveness Verification"
   - **RecordingName**: "responsive_check"
   - **Task**:
     Navigate to `http://localhost:5173/login` (or the active page).
     Perform the following checks sequentially:
     1. **Mobile Small (320px width)**: Resize window to 320x700. Wait 1s. Check for horizontal scrollbars. Capture screenshot `mobile_small_320px`.
     2. **Mobile Regular (375px width)**: Resize window to 375x800. Wait 1s. Check layout. Capture screenshot `mobile_regular_375px`.
     3. **Tablet (768px width)**: Resize window to 768x1024. Wait 1s. Check layout. Capture screenshot `tablet_768px`.
     4. **Desktop (1280px width)**: Resize window to 1280x800. Wait 1s. Capture screenshot `desktop_1280px`.
     Return a report detailing:
     - Any horizontal scrolling detected at any size.
     - Any overlapping text or broken elements observed in the screenshots.
     - Confirmation that the layout adjusts correctly for each size.
3. **Report**: Based on the subagent's findings, provide a "Responsiveness Report" to the user with a pass/fail status for each breakpoint and any recommended fixes.
