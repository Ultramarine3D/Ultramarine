# UM3DCoreXY Troubleshooting Guide

A field-reference guide to the most common problems on the UM3DCoreXY printer, organized by symptom. For each issue you'll find: how to recognize it, what causes it, and how to fix it — in order from most likely to least likely cause.

> **Tip:** Most "mystery problems" trace back to one of three things — a loose mechanical fastener, a marginal electrical connection, or a slicer setting. Check the simple things first.

---

## Table of Contents

1. [How to Use This Guide](#1-how-to-use-this-guide)
2. [First-Layer Problems](#2-first-layer-problems)
3. [Print Quality Problems](#3-print-quality-problems)
4. [Motion and Mechanical Problems](#4-motion-and-mechanical-problems)
5. [Extruder and Filament Problems](#5-extruder-and-filament-problems)
6. [Hotend and Temperature Problems](#6-hotend-and-temperature-problems)
7. [Bed and Heating Problems](#7-bed-and-heating-problems)
8. [Probe and Bed Levelling Problems](#8-probe-and-bed-levelling-problems)
9. [Electronics and Connectivity Problems](#9-electronics-and-connectivity-problems)
10. [Klipper and Software Problems](#10-klipper-and-software-problems)
11. [Diagnostic Procedures](#11-diagnostic-procedures)
12. [Quick Reference Table](#12-quick-reference-table)

---

## 1. How to Use This Guide

When something goes wrong, follow this approach:

1. **Don't panic, don't change five things at once.** Change one variable, test, then change the next.
2. **Identify the symptom precisely.** "It prints badly" isn't actionable. "Layer shifts in X every ~50 mm of travel" is.
3. **Find the symptom below.** Read the listed causes in order — they're sorted by frequency.
4. **Test the fix.** A short test print is faster than a 6-hour print that fails the same way.
5. **Document what worked.** Add a note to your build log so you remember next time.

---

## 2. First-Layer Problems

### 2.1 Nozzle Drags or Gouges the Bed

**Symptoms:** No filament extrudes on the first layer, or you see scratches in the PEI sheet, or filament smears across the bed instead of forming clean lines.

**Causes (most likely first):**

- **Z offset is too low.** The most common cause. Re-run `PROBE_CALIBRATE`, set the offset using the paper-drag method, and `SAVE_CONFIG`.
- **Klicky probe didn't attach properly.** The probe is sitting in the dock instead of on the toolhead, so Klipper's probe routine ran with no probe — meaning Z homing happened against open air. Watch the next pickup carefully.
- **Bed mesh is stale or wasn't loaded.** Run `BED_MESH_CALIBRATE` and add `BED_MESH_PROFILE LOAD=default` to your `START_PRINT` macro.
- **Bed is contaminated.** Oils from your fingers raise the effective surface; the nozzle then strikes the clean spots. Wipe with isopropyl alcohol.

### 2.2 First Layer is Too High / Filament Doesn't Stick

**Symptoms:** Filament looks like loose spaghetti on the bed, lines are round in cross-section instead of squashed, or the print lifts and gets dragged around.

**Causes:**

- **Z offset is too high.** Lower it in 0.025 mm increments using `SET_GCODE_OFFSET Z_ADJUST=-0.025 MOVE=1` or through the Fluidd UI during the first layer until lines look pressed flat.
- **Bed temperature too low for the material.** PLA wants 60 °C, PETG 75–80 °C, ABS/ASA 95–105 °C.
- **Print speed too high on first layer.** Drop first-layer speed, start at 20 mm/s then try going higher.
- **Z-tilt wasn't run since power-on.** Always run `Z_TILT_ADJUST` (or `G32`) before printing.
- **PEI sheet has a worn-out spot.** Flip the sheet over or replace it.

### 2.3 Inconsistent First Layer (Good in One Corner, Bad in Another)

**Symptoms:** First layer is perfect on the left side and squished on the right (or any spatial pattern).

**Causes:**

- **Bed mesh is missing or invalid.** Run `BED_MESH_CALIBRATE`, save, and load it in `START_PRINT`.
- **Z-tilt is off.** Run `Z_TILT_ADJUST` and watch the console — it should converge to under 0.05 mm of difference within 5 iterations. If it doesn't, one of the Z motor mounts is loose or the bed is loose or some other issues is causing this.
- **Spring steel sheet isn't seated.** A fingernail's worth of debris under the sheet shows up as a hill on the first layer.

### 2.4 Bed Adhesion Fails Mid-Print

**Symptoms:** First few layers stick, then a corner lifts and the part detaches.

**Causes:**

- **Warping due to thermal stress.** Common with ABS/ASA in an unenclosed or cold chamber. Close the door, raise chamber temperature, slow first-layer cooling.
- **Insufficient brim.** Add a brim for tall narrow parts. (a 10mm brim can really help)
- **Greasy bed.** Wipe with IPA between EVERY print.
- **Part-cooling fan blowing on the first layer.** Disable cooling for the first few layers in the slicer.

---

## 3. Print Quality Problems

### 3.1 Layer Shifts

**Symptoms:** A horizontal "step" appears in the print mid-way up. Subsequent layers are offset from earlier ones in X, Y, or both.

**Causes:**

- **Loose pulley grub screw.** The most common cause. Check both XY motor pulleys and any toothed pulley with a grub screw.
- **Belt tension too low.** A loose belt can skip a tooth under acceleration. Re-tension. 
- **Stepper current too low.** Raise XY `run_current` by 0.05 A increments, XY motors have maximum current of 1.4A.
- **Print speed/acceleration too aggressive for the printer.** Drop acceleration and retest, tested acceleration is 5500mm/s^2.
- **Toolhead crashed mid-print.** Check for printed snags, cable tangles, or a part lifting and catching the nozzle.
- **TMC driver overheating and dropping out.** Check the mainboard's driver heatsinks and add active cooling fan (can be done through Fluidd's UI).

### 3.2 Ringing / Ghosting

**Symptoms:** Vertical features (like the corners of a calibration cube) show repeated faint echoes or ripples next to them.

**Causes:**

- **Input shaper not tuned.** Run `SHAPER_CALIBRATE`.
- **Loose frame.** Push the frame at the top corners — if it racks, retighten all corner brackets.
- **Belt tension too low.** Re-tension.
- **Acceleration too high.** Lower in slicer or via `SET_VELOCITY_LIMIT ACCEL=2000`.
- **Loose motor mount.** Check that motor screws are tight on both XY motors.

### 3.3 Z Banding / Ribbing --- FIX FIX FIX FIX FIX !!!!!

**Symptoms:** Horizontal bands or ribs appear at regular intervals along the Z axis.

**Causes:**

- **Coupler too tight or misaligned.** A ballscrew coupler that doesn't allow flex transmits horizontal motor wobble into the gantry. Loosen the coupler grub screws, let the leadscrew self-center, then retighten.
- **Bent leadscrew.** Roll each leadscrew on a flat surface — if it wobbles, replace it.
- **Z step is wrong.** For a T8 leadscrew with 8 mm pitch and 200-step motor with 16x microstepping, `rotation_distance: 8` is correct. Wrong values cause periodic banding.
- **Inconsistent extrusion.** Sometimes mistaken for Z banding. Check section 5 for extrusion problems.

### 3.4 Stringing / Oozing

**Symptoms:** Thin filament strings between separated parts of the print, or "blobs" on travel moves.

**Causes:**

- **Pressure advance not tuned.** Run a pressure advance test print. Typical Orbiter+Rapido values are 0.030–0.060.
- **Retraction distance too low.** For a direct-drive Orbiter, start at 0.5–1.0 mm. Direct drive needs much less than Bowden.
- **Print temperature too high.** Drop hotend temperature by 5 °C and retest.
- **Wet filament.** Moisture in filament boils at print temperature and causes uncontrolled extrusion. Dry the spool at the filaments reccomended temperature, then reprint.
- **Travel speed too low.** Raise travel speed to 200+ mm/s so the nozzle gets out of the way before it can ooze.

### 3.5 Under-Extrusion

**Symptoms:** Gaps between perimeters and infill, weak walls, lines that don't fully fuse, or visible holes in surfaces.

**Causes:**

- **Extruder rotation distance miscalibrated.** Run the 100 mm extrusion test (see section 5.1).
- **Nozzle is partially clogged.** Cold-pull the nozzle (heat to 240 °C, push filament in, cool until filament is solid (~25 °C is 100% safe), start heating again while pulling and pull the clogged material out).
- **Print temperature too low.** The Rapido handles high flow but still needs adequate temperature. Raise by 5 °C.
- **Print speed too high for the hotend's flow rate.** Run a flow rate test.
- **Filament path has too much friction.** Check for tight bends in the filament guide or PTFE tube.
- **Extruder gears slipping on filament.** Increase Orbiter idler tension by 1/4 turn.

### 3.6 Over-Extrusion

**Symptoms:** Walls look puffy, top surfaces have ridges, dimensional accuracy is poor (parts too big).

**Causes:**

- **Flow rate / extrusion multiplier too high.** Reduce in slicer by small increments and retest.
- **Filament diameter setting wrong.** Measure your filament with calipers in 3 places and average.
- **Rotation distance miscalibrated** (over-tuned). Re-run the 100 mm test.

### 3.7 Salmon Skin / Vertical Fine Pattern

**Symptoms:** A subtle, almost-iridescent vertical pattern on otherwise smooth walls.

**Causes:**

- **TMC driver microstepping interpolation issue.** Try toggling `interpolate: True/False` per stepper and reprint.
- **Stepper current too high.** Drop XY `run_current` by 0.05 A.
- **Wrong driver mode.** Switch between SpreadCycle and StealthChop and compare.

### 3.8 Cracks Between Layers / Weak Parts (ABS/ASA)

**Symptoms:** Parts split along layer lines under light force.

**Causes:**

- **Chamber temperature too low.** Close the door, run for 20 minutes before printing, aim for at least 40°C chamber for small parts.
- **Cooling fan running on ABS.** Set part cooling to 0–20 % for ABS/ASA.
- **Print temperature too low.** Raise to 250–260 °C for ABS.
- **Layer height too low for nozzle size.** Use 50 % of nozzle diameter as max layer height.

---

## 4. Motion and Mechanical Problems

### 4.1 Grinding or Clicking from Steppers

**Symptoms:** Steppers make grinding, clicking, or knocking sounds during motion.

**Causes:**

- **Stepper current too low** (most common). Motor is missing steps under load. Raise current by 0.1 A and retest.
- **Belt path obstructed.** Inspect every idler — a loose idler bearing can rub.
- **Belt teeth slipping on a pulley.** Check the GT2 pulley grub screw — if loose, tighten on the flat.
- **Mechanical binding.** With the motors unpowered (or `M84` to disable), push the gantry by hand. It should glide. Any catch points to a misaligned rail or pinched cable.

### 4.2 Gantry Binds in One Direction

**Symptoms:** Gantry moves freely in +X but binds in −X (or any axis-direction combination).

**Causes:**

- **CoreXY rails not parallel.** Push the gantry to one end and measure the gap to the frame at both Y carriages — they must be equal. If not, re-square per the build guide section 7.6.
- **A linear rail is mounted in tension.** Loosen rail screws, work the carriage end-to-end to let the rail relax, retighten center-out.
- **Belt routing wrong.** If the two CoreXY belts aren't truly mirrored, motion in some directions will fight itself. Trace each belt loop and verify mirroring.
- **Cable is catching.** Check the umbilical for snags during full-range motion.

### 4.3 Motor Stalls / Skips Steps

**Symptoms:** Sudden loss of position. Often follows a fast travel or sharp acceleration.

**Causes:**

- **Acceleration too high.** Reduce by 25 % and retest.
- **Stepper current too low** for the load. Raise by 0.05 A.
- **Driver overheating** and tripping its thermal shutdown. Add a fan blowing on the driver heatsinks.
- **Mechanical resistance.** See 4.1 — disable motors and check for hand-feel binding.

### 4.4 Loose Belts

**Symptoms:** Belts visibly sag, you can pinch a belt between two fingers and feel slack, or you hear the belt slap against itself during fast moves.

**Causes:**

- **Initial tensioning was too low.** Re-tension belts.
- **Belt has stretched in.** Normal during the first few hours of printing — re-tension after the first 10 hours.
- **Belt grabber slipping.** Check that both belt ends in the X-carriage grabbers are fully captured by the teeth. A grabber that holds smooth-side instead of teeth-side will slowly let go.

### 4.4.1 Belt tuning

**How to tune belts on the printer:**

Start by moving the gantry to the middle of the printer, 

And then pluck the belt on the left side of the toolhead upward with your finger until the frequency is arond 100Hz, do the same to the right side. Then move the toolhead around and retest. 

**Too high belt tension fix:**

If during a print the tension seems to be too high, loosen the belts by a 1/4 turn and retest.

---

## 5. Extruder and Filament Problems

### 5.1 Extruder Doesn't Push 100 mm When Asked

**Symptoms:** Marked-and-measured extrusion test shows the extruder over- or under-shooting the requested distance.

**Procedure:**

1. Heat hotend to print temp.
2. Mark filament 120 mm above the extruder inlet.
3. Issue `G1 E100 F120` (extrude 100 mm at 2 mm/s).
4. Measure remaining distance from mark to inlet. The extruder pulled in (120 − remaining) mm.
5. New `rotation_distance` = old × (extruded / 100).

**Causes of error:**

- **Wrong rotation_distance** (most common). Recalculate as above.
- **Filament slipping in the gears.** Increase Orbiter idler tension.
- **Hotend partially clogged** — backpressure causes slipping that mimics under-extrusion.

### 5.2 Filament Grinding (Bite Marks on Filament)

**Symptoms:** When you unload, the filament has a chewed/ground section about 10–20 mm long.

**Causes:**

- **Idler tension too tight** — the most common cause. Back off the Orbiter tension by 1/4 turn.
- **Hotend partially clogged.** Cold-pull or replace the nozzle.
- **Print temperature too low** — filament can't melt fast enough, so the gears strip it. Raise temperature 5 °C.
- **Print speed too high for the hotend's max flow.** Slow down or use a higher-flow hotend tip.

### 5.3 Filament Won't Load

**Symptoms:** Filament stops at the hotend entry, or grinds in the extruder gears.

**Causes:**

- **Hotend cold or not at temp.** Check temperature reading.
- **Nozzle clogged.** Cold-pull.
- **Filament tip is fat or kinked.** Cut a fresh 45° tip on the filament.
- **PTFE tube between extruder and hotend is misseated.** Make sure the PTFE bottoms out against the heatbreak — a gap here is the #1 cause of jams in this style of toolhead.
- **Hotend clogged.** In this case it is neccessary to dissassemble the toolhead and use a 1.7mm drill bit to slowly drill out clogged filament. DO THIS ONLY BY HAND AND WITH THE HOTEND OUT, COLD AND WITHOUT A NOZZLE. YOU CAN DAMAGE THE HOTEND EXTREMELY EASILY IF NOT CAREFUL.

### 5.4 Extruder Skipping (Audible Click)

**Symptoms:** Rhythmic click from the toolhead during extrusion.

**Causes:**

- **Hotend partially clogged** (most common). Cold-pull.
- **Print temperature too low.** Raise by 5 °C.
- **Volumetric flow rate exceeded.** Slow down outer-wall speed.
- **PTFE tube misseated** (see 5.3).
- **Stepper current too low for extruder.** Raise extruder `run_current` to 0.7 A.

### 5.5 Heat Creep / Filament Soft Above Heatbreak

**Symptoms:** Jams that occur after long printing, especially on small parts where the hotend is mostly idle. When you pull out the filament, there's a swollen "blob" higher up than there should be.

**Causes:**

- **Hotend cooling fan failed or undersized.** Check that the 4010 fan is spinning whenever the hotend is hot. It should run continuously above 50 °C.
- **Print idle time too long for low-flow extrusion.** Raise minimum layer time slightly.
- **Heatbreak loose.** A loose heatbreak conducts heat poorly. With hotend cold, check Rapido assembly tightness.

---

## 6. Hotend and Temperature Problems

### 6.1 "Heater Verification Failed" / Thermal Runaway Trip

**Symptoms:** Print stops with a thermal verification error in Klipper. The MCU shut the heater off as a safety measure.

**Causes:**

- **Loose thermistor.** The thermistor reading dropped or jumped suddenly. Reseat the thermistor connector at the EBB36.
- **Loose heater cartridge.** The heater isn't getting full power. Check the screw terminal connections.
- **Silicone sock missing or damaged.** Without a sock, ambient airflow over the heater block makes PID struggle to maintain temp. Install or replace the sock.
- **PID badly tuned.** Re-run `PID_CALIBRATE HEATER=extruder TARGET=240`.
- **Part-cooling fan blowing directly on heater block.** Reposition the duct so it aims at the print, not the block.

### 6.2 Temperature Reading Wildly Wrong (e.g., 400 °C or −20 °C)

**Symptoms:** Klipper shows an absurd temperature, or the reading flickers.

**Causes:**

- **Open thermistor circuit.** Reading goes to one extreme. Check connector and wiring continuity.
- **Shorted thermistor wires.** Reading goes to the other extreme.
- **Thermistor type wrong in `printer.cfg`.** Confirm the thermistor matches what your hotend ships with (Rapido stock is typically PT1000 — check yours and set `sensor_type` accordingly).

### 6.3 Hotend Slow to Reach Temperature

**Symptoms:** Heating from 25 °C to 240 °C takes more than 120 seconds.

**Causes:**

- **Heater cartridge underpowered for the hotend.** The Rapido needs a 80 W cartridge minimum.
- **Loose heater connection.** Check screw terminals.
- **Cooling fan blowing on heater block** (see 6.1).
- **PSU sagging under load.** Measure 24 V rail under heating — should stay above 23.5 V.

### 6.4 Hotend Overshoots Temperature

**Symptoms:** Set 240 °C; reading climbs to 250 °C before settling.

**Causes:**

- **PID needs tuning.** Re-run `PID_CALIBRATE`.
- **Recently changed silicone sock or hotend assembly without retuning.** Always re-PID after any thermal-system change.

---

## 7. Bed and Heating Problems

### 7.1 Bed Doesn't Heat At All

**Symptoms:** Set bed temp; nothing happens. Bed stays at room temp.

**Causes:**

- **SSR not switching.** Check the SSR's input LED — it should light when the mainboard commands heat. If LED lights but bed stays cold, SSR has failed (replace it). If LED doesn't light, the mainboard or wiring to the SSR input is the issue.
- **AC power not reaching the bed.** Check fuse on the AC inlet (some have one). Check the AC connections at the bed terminal block. Check thermal fuse on bed, if blown, inspect whole AC heating for any issues.
- **Bed thermistor reading already at target.** If thermistor reads warmer than the setpoint (say it's stuck at 100 °C), Klipper won't heat. Check thermistor wiring.

### 7.2 Bed Heats Slowly

**Symptoms:** Bed reaches target eventually but takes much longer than it should.

**Causes:**

- **AC voltage low.** Less of an issue on 230 V mains than 120 V, but worth checking with a meter.
- **Thermal mass too high** (cast aluminum plate adds time — this is normal).
- **Bed insulation missing.** Add insulation under the bed for faster heat-up or turn off chamber heating fans.
- **SSR partially failed.** A weak SSR conducts but at reduced duty. Replace.

### 7.3 Bed Temperature Unstable / Oscillating

**Symptoms:** Bed temperature swings ±5 °C around setpoint.

**Causes:**

- **PID not tuned.** Run `PID_CALIBRATE HEATER=heater_bed TARGET=100`.
- **Thermistor poorly placed.** If the thermistor isn't bonded firmly to the bed, it lags behind the actual temperature.

### 7.4 Spring Steel Sheet Doesn't Stay Put

**Symptoms:** Sheet shifts during printing.

**Causes:**

- **Magnets in the carrier weakening at high temperature.** This is normal above ~110 °C. Use a stronger high-temp magnetic mat, or hold the sheet down with a binder clip at one corner during ABS prints.
- **Debris under the sheet.** Always wipe under the sheet before re-seating.

---

## 8. Probe and Bed Levelling Problems

### 8.1 Klicky Won't Attach to Toolhead

**Symptoms:** Toolhead approaches the dock but the probe stays in the dock, or it falls off mid-motion.

**Causes:**
- **XY not homed properly.** Rerun XY homing.
- **Dock is misaligned.** The toolhead needs to approach perfectly perpendicular to the dock magnets. Adjust dock position by 0.5 mm increments.
- **Magnets weakening from heat.** If you've baked the dock above 100 °C repeatedly, the magnets may have demagnetized. Replace.
- **Pickup speed too high.** In your `ATTACH_PROBE` macro, lower the approach speed to 30 mm/s and the lateral pickup speed to 15 mm/s.

### 8.2 Klicky Won't Drop Off in Dock

**Symptoms:** Probe stays attached to the toolhead when you try to dock it.

**Causes:**

- **Wrong direction in dock-off macro.** The toolhead needs to slide past the dock so the dock magnets pull the probe sideways off the toolhead. If the motion is reversed, it can't dock.
- **Toolhead magnets stronger than dock magnets.** Replace dock magnets with stronger ones, or weaken toolhead magnets (move them slightly farther from the surface).
- **Dock position is off.** Adjust by 0.5 mm increments.

### 8.3 Probe Gives Inconsistent Readings

**Symptoms:** Repeated `PROBE_ACCURACY` calls show variation greater than 0.010 mm.

**Causes:**

- **Probe wires loose.** A jiggling wire causes the switch to register at slightly different positions. Reseat all probe connectors.
- **Magnets not fully seated.** Probe wobbles instead of attaching rigidly.
- **Probe speed too high.** Lower probe speed in `[probe]` config to 5 mm/s for the slow approach.
- **Bed shifting under probe pressure.** A wobbly bed means each probe touch deflects differently. Tighten bed mounts.
- **Toolhead not rigid.** Loose toolhead screws cause variability.

### 8.4 Z-Tilt Doesn't Converge

**Symptoms:** `Z_TILT_ADJUST` runs forever, or fails with "retries exceeded."

**Causes:**

- **Loose Z motor.** One of the three Z motors is mechanically slipping on its leadscrew coupler — it rotates but doesn't move the gantry. Check all three couplers for tightness.
- **Probe accuracy poor** (see 8.3) — Z-tilt can't converge if probe noise is greater than the convergence tolerance.
- **Pivot points wrong in `printer.cfg`.** The `[z_tilt]` `points:` list must match the actual physical positions of the Z motor lift points, not random bed coordinates.

### 8.5 Bed Mesh Looks Lumpy / Irregular

**Symptoms:** `BED_MESH_PROFILE` graph shows random irregularities rather than a smooth curve.

**Causes:**

- **Bed not clean.** Wipe with IPA before meshing.
- **Mesh points too few.** Use at least 7×7 points for the 350 mm bed.
- **Probe inaccuracy** (see 8.3).
- **Bed not at print temperature when meshing.** Always mesh hot — aluminum expands ~0.7 mm across 300 mm at 100 °C.

---

## 9. Electronics and Connectivity Problems

### 9.1 CAN Bus Errors / EBB36 Disconnects

**Symptoms:** Klipper logs `Timer too close` or `Lost communication with MCU 'EBBCan'`. Print stops mid-way.

**Causes:**

- **Termination resistor missing.** A CAN bus needs 120 Ω at each end. The EBB36 has a built-in jumper for this; the mainboard CAN side needs a 120 Ω resistor across CAN_H and CAN_L. Without termination, you get random disconnects.
- **CAN wires not twisted.** CAN_H and CAN_L must be twisted as a pair to reject noise.
- **CAN running too close to high-current AC.** Re-route the umbilical away from AC bed wiring. (Shielded wires can help with this.)
- **Bitrate mismatch.** Mainboard and EBB36 must use identical bitrate (typically 1 Mbps).
- **24 V power to EBB36 unstable.** Voltage drop in the umbilical under load. Use 18 AWG or thicker for the 24 V conductors.
- **EBB36 firmware mismatch.** Reflash EBB36 with the same Klipper version as the mainboard.

### 9.2 USB Disconnects (Mainboard ↔ CB1)

**Symptoms:** Klipper shuts down with "Lost communication with MCU 'mcu'".

**Causes:**

- **USB cable poor quality.** The included cable with most boards is fine; aftermarket cables often aren't. Use a known-good cable.
- **Ground loop.** If the CB1 is powered separately and the mainboard via USB, a ground loop can cause noise. Power the CB1 from the mainboard's 5 V output, or break the USB +5V line and power both separately.
- **USB cable too long.** Keep under 1 m.

### 9.3 Mainboard Won't Boot

**Symptoms:** No LEDs, or the boot sequence hangs.

**Causes:**

- **24 V PSU not delivering.** Measure with a multimeter — should be 23.8–24.5 V.
- **Short on the board.** Disconnect everything except 24 V input and observe — if it boots, reconnect peripherals one at a time to find the short.
- **MicroSD card corrupted.** Reflash the firmware.
- **Damaged driver.** A blown TMC stepper driver can lock up the board's SPI bus. Disconnect drivers one at a time to isolate.

### 9.4 Display Shows Garbage / Doesn't Light Up

**Symptoms:** mini12864 shows random pixels or stays dark.

**Causes:**

- **Cable not fully seated.** Press the connectors firmly home.
- **5 V supply to display dropped out.** Check the 5 V rail.
- **Klipper config missing display section.** Add the appropriate `[display]` block in `printer.cfg`.

### 9.5 Stepper Driver Errors / Skipping

**Symptoms:** Klipper logs `TMC reports error: ...OPEN_LOAD` or similar.

**Causes:**

- **Loose stepper connector.** Reseat at both motor and board ends.
- **Damaged stepper coil** (rare). Measure resistance between coil pairs — should be roughly equal (~2 Ω for an LDO 36STH17).
- **Driver damaged.** Swap with a known-good driver.

---

## 10. Klipper and Software Problems

### 10.1 "MCU shutdown: Timer too close"

**Symptoms:** Klipper aborts mid-print with this error.

**Causes:**

- **Mainboard CPU saturated.** Too many sensors, too high a step rate, or bad firmware. Check `STATUS` — MCU load should stay below 50 %.
- **CAN bus issues** (see 9.1).
- **Pressure advance plus very high microstepping.** Lower microstepping to 16x or 32x — 256x interpolated rarely improves anything.

### 10.2 "Move out of range"

**Symptoms:** Print or macro fails with this error.

**Causes:**

- **Slicer start gcode references coordinates outside `position_min` / `position_max`.** Check your start macro.
- **Bed mesh extends past `position_max`.** Adjust the mesh range.
- **Probe offsets push moves out of range.** Account for `x_offset` and `y_offset` in your `position_min`.

### 10.3 Klipper Won't Restart After Config Change

**Symptoms:** `FIRMWARE_RESTART` fails or hangs.

**Causes:**

- **Syntax error in `printer.cfg`.** Klipper's error message in the web UI usually points to the bad line. Read it carefully.
- **Referenced pin doesn't exist.** Check the pin name against the board's pin alias file.
- **Duplicate section names.** Each section in `printer.cfg` must be unique.

### 10.4 Macros Don't Run as Expected

**Symptoms:** `START_PRINT` or `END_PRINT` skips steps or behaves oddly.

**Causes:**

- **Slicer not passing parameters.** If your macro takes `BED_TEMP` and `EXTRUDER_TEMP`, your slicer's start gcode must call it as `START_PRINT BED_TEMP=[first_layer_bed_temperature] EXTRUDER_TEMP=[first_layer_temperature]`.
- **Macro variable names inconsistent.** `params.BED_TEMP` is different from `params.bed_temp`.
- **Conditionals using wrong syntax.** `{% if printer.heater_bed.temperature < params.BED_TEMP|float %}` — note `|float` cast.

### 10.5 "Probe Triggered Prior to Movement"

**Symptoms:** Klipper aborts homing or probing with this error.

**Causes:**

- **Probe pressed at start of move.** Klicky may have an obstruction holding it down. Check for printed-part contact.
- **Wiring inverted.** In `[probe]`, toggle `pin: ^!EBBCan: PB6` ↔ `pin: ^EBBCan: PB6` (the `!` inverts the logic).
- **Loose probe wire shorting.** Reseat connectors.

---

## 11. Diagnostic Procedures

### 11.1 Belt Tension Check

1. Disable motors with `M84`.
2. Push gantry to one corner.
3. Pluck the belt span between the X carriage and the corresponding XY-end pulley.
4. Use a phone tuner app or a tension gauge.
5. Target ~110 Hz on a free span. The two belts should be within 5 Hz of each other.

### 11.2 Frame Squareness Check

1. Measure both diagonals of the bottom square — should be equal.
2. Measure both diagonals of the top square — should be equal.
3. Place a square against two adjacent uprights at the corners — they should be 90°.
4. Push the gantry to each end of travel and confirm both Y carriages bottom out simultaneously.

### 11.3 Extrusion Calibration

See section 5.1.

### 11.4 Probe Repeatability Check

```
G28
PROBE_ACCURACY SAMPLES=20
```

Result should show a range (max − min) of less than 0.010 mm. Anything above 0.05 mm needs investigation.

### 11.5 Resonance Test

```
SHAPER_CALIBRATE
```

(ADXL345 is on the EBB36 and configured.)

The test runs each axis individually and writes recommended shaper parameters to `printer.cfg`. After calibration, accel limits in the test results show the practical maximum acceleration for each axis.

### 11.6 Stepper Current Sanity Check

After 15 minutes of normal printing, touch each stepper briefly:

- **Cool to mildly warm:** good.
- **Warm but tolerable to touch:** good.
- **Too hot to hold for more than a second:** lower current by 0.05 A.

Driver heatsinks should never be too hot to touch.

### 11.7 Voltage Checks

- 24 V rail under load: should stay above 23 V at full bed + hotend draw.
- AC voltage at SSR load output, when bed commanded on..

---

## 12. Quick Reference Table

| Symptom | Section |
|---|---|
| Nozzle scratching bed | 2.1 |
| Filament not sticking | 2.2 |
| Inconsistent first layer | 2.3 |
| Layer shifts | 3.1 |
| Ghosting / ringing | 3.2 |
| Z banding | 3.3 |
| Stringing | 3.4 |
| Under-extrusion | 3.5 |
| Cracks between layers | 3.8 |
| Stepper grinding | 4.1 |
| Gantry binds | 4.2 |
| Loose belts | 4.4 |
| Filament grinding | 5.2 |
| Heat creep | 5.5 |
| Thermal runaway | 6.1 |
| Temperature reading wrong | 6.2 |
| Bed not heating | 7.1 |
| Klicky won't attach | 8.1 |
| Probe inconsistent | 8.3 |
| Z-tilt won't converge | 8.4 |
| CAN errors | 9.1 |
| USB disconnects | 9.2 |
| Display garbage | 9.4 |
| Timer too close | 10.1 |

---

## Closing Notes

When you fix something, write down what the symptom was and what worked. Six months from now you'll see the same symptom and be glad you have notes — and even gladder if you took photos.

For problems not covered here, the Klipper Discord (`#klipper-help`) and the Voron Discord (`#voron-mods` and `#electronics`) are excellent resources. The Voron community has the closest reference designs to this build, so their troubleshooting often applies directly. Some help can also be found from Prusa or RatRig community.

Happy printing — and when in doubt, check the simple things first.

---
Also, Claude can help.
---
*Document version 1.0 — companion to the UM3DCoreXY Build Guide.*
