# UM3DCoreXY Build Guide

A complete build guide for the UM3DCoreXY — a custom CoreXY 3D printer based on a 3030 aluminum extrusion frame, MGN12 linear motion, CAN-based toolhead electronics, and a Klipper-driven CB1 control system.

> **Note:** Image placeholders are marked throughout this guide as `[IMAGE: description]`. Replace these with your own renders or photographs as you build.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tools Required](#2-tools-required)
3. [Bill of Materials (BOM)](#3-bill-of-materials-bom)
4. [Pre-Build Preparation](#4-pre-build-preparation)
5. [Frame Assembly](#5-frame-assembly)
6. [Z-Axis Assembly](#6-z-axis-assembly)
7. [XY Gantry Assembly](#7-xy-gantry-assembly)
8. [Toolhead Assembly](#8-toolhead-assembly)
9. [Bed and Build Plate](#9-bed-and-build-plate)
10. [Electronics Bay](#10-electronics-bay)
11. [Wiring and Cable Management](#11-wiring-and-cable-management)
12. [Panels and Enclosure](#12-panels-and-enclosure)
13. [Klicky Probe Installation](#13-klicky-probe-installation)
14. [Firmware and Software Setup](#14-firmware-and-software-setup)
15. [Initial Calibration](#15-initial-calibration)
16. [First Print](#16-first-print)
17. [Maintenance](#17-maintenance)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. Introduction

The UM3DCoreXY is a custom-designed CoreXY printer built around a rigid 3030 aluminum extrusion frame. It uses a fully enclosed chamber, magnetically-latched front door, MGN12 linear rails on every axis, and a CAN-based toolhead running an EBB36 board with an Orbiter 2 extruder and a Rapido hotend. Motion is driven by Nema 17 stepper motors and controlled by a Raspberry Pi CM5 SBC running Klipper.

**Key Specifications:**

| Specification | Value |
|---|---|
| Kinematics | CoreXY |
| Frame | 3030 aluminum extrusion |
| Build volume (approx.) | 300 × 300 × 300 mm |
| Linear motion | MGN12H rails (X, Y, Z) |
| Toolhead board | BTT EBB36 (CAN bus) |
| Mainboard SBC | CB1 (Klipper) |
| Extruder | Orbiter 2.0 / 2.7 |
| Hotend | Phaetus Rapido |
| Probe | Klicky (magnetic dock) |
| Display | mini12864 LCD |
| Bed heating | AC bed via SSR-40A |
| Power | Mains inlet with switch and surge arrestor |

[IMAGE: Hero shot of completed printer]

---

## 2. Tools Required

Before starting, gather the following tools. Building without the right tools will lead to stripped fasteners and frustration.

**Essential:**

- Metric hex (Allen) key set: 1.5 mm, 2 mm, 2.5 mm, 3 mm, 4 mm, 5 mm
- Phillips and flathead screwdrivers
- Adjustable wrench and a small set of metric open-end wrenches (8, 10, 13 mm)
- Digital calipers
- Steel machinist's square (or a known-square reference)
- Soldering iron with fine tip
- Wire strippers and crimpers (for ferrules, JST, Dupont and Molex MicroFit 3.0)
- Heat gun (for heatshrink and heat-set inserts)
- Multimeter
- Sharp side cutters / flush cutters
- Tape measure or steel rule (300 mm minimum)

**Recommended:**

- Belt tension smartphone-based tension app or website (Prusa is reccomended)
- Threadlocker (medium strength, blue)
- Anti-seize compound for leadscrews
- Dial test indicator (for gantry alignment)

[IMAGE: Tools laid out]

---

## 3. Bill of Materials (BOM)

The full sourcing list is grouped by subsystem. Quantities given are for a single printer.

### 3.1 Frame and Structure

- 3030 aluminum extrusion, 750 mm — 4× (vertical uprights)
- 3030 aluminum extrusion, 500 mm — 12× (top/bottom horizontals + electronics area)
- 3030 aluminum extrusion, 340 mm — 1× (deck supports / cross member)
- 20×20 aluminum profile, 500 mm — 1× (deck rails / accessory mounts)
- 30×30 corner brackets — 16× minimum
- 3030 DIN rail mount brackets — 2×
- M5 T-nuts and M5×14 socket-head screws — for corner brackets
- M5 T-nuts and a assortment of M5, M4 socket-head screws — for general assembly
- Adjustable rubber feet — 4×

### 3.2 Linear Motion

- MGN12 rail, 450 mm — 3× (one per axis: X, Y-left, Y-right)
- MGN12 rail, 350 mm — 3x (for Z axis, two in the front one in the back)
- MGN12H carriage blocks — 6x
- 1204 Ballscrew (per Z motor design) — 2× front, 1× rear (3 total Z motors)
- 5×8 mm flexible shaft couplers — 3× (one per ballscrew)
- 8 mm precision rotary shaft (1327K509 equivalent) — 3× (Z idle shafts)
-  precision ball bearings — at least 2× per Z station

### 3.3 Belts and Pulleys

- GT2 belt, 9 mm wide — sufficient for two CoreXY loops (typically 4 m total)
- GT2 20T pulley (W10, 5 mm bore, no flange) — 10× (motor pulleys, fron motor mounts, XY connectors, rear belt idlers)
- Smooth idler (W10, 5mm bore) — 4x

### 3.4 Stepper Motors

- Hanpose (or equivalent NEMA17 42mm motor) — 2× for XY (CoreXY A and B)
- LDO NEMA14 stepper — 1× for extruder (Orbiter 2, usually preinstalled)
- Hanpose (or equivalent NEMA17 60mm motor) — 3× for Z motors

### 3.5 Toolhead

- Phaetus Rapido hotend (HF variant)
- Orbiter v2.0 / 2.5 extruder
- BTT EBB36 CAN toolboard
- 5015 radial blower fan, 24 V — 1× (part cooling)
- 4010 axial fan, 24 V — 1× (hotend cooling)
- EVA3 toolhead platform printed parts (front, back, fan ducts, cable strain relief), ideally printed from PC/ASA/ABS/PET-CF (preference in this order)
- 4 mm Bowden coupler with brass coupler ring
- PTFE tube section, 1.75 mm bore (short, between extruder and hotend)
- Klicky probe assembly (probe body, latch, dock)
- 3×6 mm magnets with hole for screw — 6× minimum (Klicky)

### 3.6 Bed Assembly

- Heated bed (AC, sized to build plate — typically 350×350 mm)
- Cast aluminum tooling plate, 350×350×8 mm
- Magnetic spring steel sheet with PEI coating, 350×350 mm
- Silicone heater pad bonded to underside (2x 300x150 is preffered)
- 100 kΩ NTC thermistor or PT1000 (matched to mainboard input, usually mounted to the silicone heater)
- M3×40 mm BHCS — 3× (bed mounting points)
- M3 heat-set inserts (94180A307 tapered inserts) for printed mounts
- WAGO 221 as needed
- 5010 fans for circulating hot air - 2x

### 3.7 Electronics

- RPi CM5 SBC (or comparable Klipper host)
- Compatible mainboard for the CM5 (Manta-class motherboard, ideally BTT Manta MxP)
- BTT EBB36 toolhead board (already listed under Toolhead)
- mini12864 LCD display, or any other compatible display
- First 24 V DC PSU 480W (Motors and mainboard)
- Second 24 V DC PSU 240W (toolhead and other systems)
- SSR-40 DA solid-state relay (for AC bed) - 2x
- AC power inlet with switch (IEC C14 with integrated rocker)
- Surge arrester / inrush limiter
- DIN rail, 500 mm - 2x
- Wago / lever-nut connectors and ferrules
- 18 AWG and 22 AWG silicone wire (multiple colors)
- 16 AWG silicone wire for AC and high-current DC
- 2-pin and 4-pin connectors for fans, thermistor, and CAN bus

### 3.8 Endstops and Probe

- No endstops needed, XY is sensorless, Z is homed through klicky probe
- Klicky probe (printed body + microswitch + magnets)
- Probe dock (printed)

### 3.9 Fasteners (Approximate Quantities)

- M3×6, M3×8, M3×10, M3×12, M3×16, M3×20, M3×30 SHCS — assorted (~200 total)
- M3 heat-set inserts — ~80
- M5×8, M5×10, M5×12, M5×16 BHCS — assorted (~80 total)
- M5 T-nuts — ~80
- M5 washers — ~40
- M3 nyloc nuts — ~20

> Always order **at least 20% extra** of every fastener. You will lose some, and a stalled build waiting on a single missing M3×8 is the worst kind of delay.

### 3.10 Printed Parts

All bracket parts, motor mounts, belt grabbers, toolhead plates, and the probe dock are printed ideally in PC/ASA/ABS/PETG for chamber temperature stability. Recommended print settings: 4-5 walls, 35% gyroid/adaptive-cubic infill, 0.2 mm layer height. PLA is not recommended for any structural parts inside the chamber.

[IMAGE: Sample of printed parts laid out]

---

## 4. Pre-Build Preparation

### 4.1 Inspect and Sort Parts

Open every package and verify quantities against the BOM before you start. Sort fasteners into labeled containers — a multi-compartment bead organizer works well. Group printed parts by subsystem (frame brackets, Z mounts, toolhead, probe).

### 4.2 Install Heat-Set Inserts

Many printed parts need M3/M4 heat-set inserts before assembly. Set your soldering iron to ±200 °C and use a flat-tipped insert driver. Press each insert in straight, slowly, until flush with the part surface. Let parts cool fully before handling.

Parts that typically need inserts include the toolhead plates (EVA3), Z motor mounts, belt grabbers, the probe dock, and any cable management mounts.

[IMAGE: Heat-set insert installation]

### 4.3 Cut and Square Extrusions (If Not Pre-Cut)

If your supplier did not provide pre-cut extrusions, cut them now. Length tolerance must be ±0.2 mm or better, and all ends must be square. A miter saw with a non-ferrous metal blade is the cleanest approach. Deburr every cut edge.

### 4.4 Tap Extrusion Ends (Optional)

If the design calls for end-tapped extrusions for blind connections, tap each end now with an M5 or M6 tap depending on the joint. Use cutting fluid and back the tap out frequently to clear chips. Realistically, only Bed extrusions need to be tapped.

---

## 5. Frame Assembly

The frame is the foundation. **Time spent squaring the frame is paid back at every later step.**

### 5.1 Build the Bottom Square

Start with the four bottom horizontal extrusions (typically 500 mm 3030). Lay them on a flat reference surface — a kitchen counter or a flat tabletop. Using 60×30 corner brackets, loosely join the four pieces into a square. Do not tighten yet.

Slide M5 T-nuts into the inside-facing slots of each extrusion as you go. You will need them for later mounts and there is no way to add them once the frame is closed.

### 5.2 Square the Bottom

Measure both diagonals of the bottom square. Adjust until the two diagonals are identical (within 0.5 mm). At that point the frame is square. Tighten the corner bracket bolts in a star pattern, going around the square twice in increments to keep everything pulled in evenly.

### 5.3 Add the Vertical Uprights

Stand the four 600 mm vertical extrusions at each corner of the bottom square. Connect each upright to the bottom frame using two corner brackets per joint (one on each adjacent face).

Keep each upright vertical against a square as you tighten — small errors at the bottom become large errors at the top.

[IMAGE: Bottom square with uprights installed]

### 5.4 Build the Top Square

Build a second square of four 500 mm 3030 extrusions identical to the bottom. Lift it onto the top of the four uprights and bolt it down with corner brackets. Once again, measure diagonals and square the top before final tightening.

### 5.5 Install the Deck Supports

Slot the two 340 mm 3030 cross members between the front and rear of the frame at the height called out in the CAD model — these support the printed deck panels and the electronics tray. Use T-nuts and corner brackets at each end.

### 5.6 Install the 20×20 Accessory Rails

The one 20×20 profiles run along the lower deck for electronics mounting. Position them per the CAD and tighten lightly — final positioning may shift after the gantry is in place.

### 5.7 Final Frame Squaring

With everything bolted up, set the frame on its feet and check:

- Bottom diagonals equal
- Top diagonals equal
- Each upright perpendicular to the bottom (use a square against two adjacent faces)
- Frame does not rock on a flat surface — adjust feet as needed

If anything is out, loosen the offending corner brackets, persuade the frame square, and retighten.

[IMAGE: Completed frame with feet]

---

## 6. Z-Axis Assembly

The UM3DCoreXY uses a triple-Z layout: two Z motors at the front-left and front-right corners and one at the rear center, each driving a leadscrew. This allows automatic gantry leveling (Z-tilt) under Klipper.

### 6.1 Mount the Front-Left and Front-Right Z Motors

The "FL Z motor mount" printed part bolts to the inside face of each front upright at the bottom. Slide M5 T-nuts into the upright before mounting. Bolt the printed mount in place, then attach an LDO NEMA17 stepper to the top of the mount with M3×8 SHCS. Mirror the mount for the right side.

### 6.2 Mount the Rear Z Motor

The "rear z motor mount" sits centered on the rear bottom extrusion. Install it the same way — printed part first, then stepper.

### 6.3 Install the Leadscrews and Couplers

Slide a 5×8 flexible coupler onto each stepper shaft (5 mm side) and tighten the grub screw onto the motor's flat. Drop a T8 leadscrew into the 8 mm side of the coupler from above and tighten that grub screw too. Leave a small (~1 mm) gap between the motor shaft end and the leadscrew end inside the coupler — never bottom them out, or you will load the motor bearing axially.

### 6.4 Install the Top Leadscrew Bearings

Each leadscrew passes through a precision ball bearing housed in a printed bracket near the top of its upright. Bolt the printed bearing block in place, drop the bearing in, and pass the leadscrew through it. The bearing constrains the top of the leadscrew but should allow free rotation — spin the leadscrew by hand and confirm there is no binding.

### 6.5 Install the Z Carriages

Each Z stage has an MGN12H carriage on a 500 mm MGN12 rail mounted to the inside face of an upright. Mount the rails first using the M3 hardware that came with them, working from the center bolt outward and tightening only after all bolts are started. Then slide an MGN12H block onto each rail and immediately install end-stops or printed retaining clips so the block cannot run off the end.

The flange ball nut for each leadscrew threads onto a printed gantry-corner part (for the front pair) or a printed bed-support arm (for the rear). Bolt the ball nut into its printed carrier with the supplied M3 fasteners.

[IMAGE: Z motor mount with leadscrew and bearing]

### 6.6 Verify Smooth Z Motion

Before installing the bed or gantry, hand-rotate each leadscrew and confirm the carrier travels smoothly along the rail without binding. If a stage binds, loosen the rail-mount bolts, work the carriage up and down to let the rail self-align, and retighten.

---

## 7. XY Gantry Assembly

The gantry rides on two MGN12 rails (left and right Y rails), each 500 mm, mounted to the inside top of the frame. The X-axis MGN12 rail spans between two Y carriages, and the toolhead carriage rides on the X rail.

### 7.1 Install the Y Rails

Bolt one MGN12 rail to the inside face of the left top extrusion using M3×8 SHCS into the extrusion's inner slot via T-nuts (or per the CAD's specified mounting method). Mirror on the right side. Use the same center-out tightening sequence as before.

### 7.2 Install the X Rail Mounts

The four printed parts named **XY-LEFT-BOTTOM**, **XY-LEFT-TOP**, **XY-RIGHT-BOTTOM**, and **XY-RIGHT-TOP** sandwich the X-axis MGN12 rail between two MGN12H blocks (one per Y rail). Each pair forms a Y carriage that holds an end of the X rail and houses the CoreXY belt idlers.

Bolt the bottom half of each pair to its corresponding Y carriage block. Drop the X rail in place between the two Y carriages and add the top halves to clamp it down. Leave bolts loose for now — the X rail must be parallel to the Y rails before final tightening.

### 7.3 Install the CoreXY Idlers

Reference the **back_core_xy_fi** printed part and the front belt graber parts. Each Y carriage holds two stacked idler pulleys (one toothed, one smooth) plus a third idler that turns the belt 90° toward the rear motor mounts. Use M3 SHCS through MF148ZZ or specified bearings for each idler stack.

Two more idlers live at the back of the frame — these are the corner idlers that route the belts across the rear of the printer to the two stepper motors.

### 7.4 Install the XY Stepper Motors

The two CoreXY stepper motors (LDO 36STH17 pancakes) mount at the rear-left and rear-right corners of the top frame, motor shaft pointing down with the GT2 20T pulley installed. Install the motors using M3×8 SHCS into the motor's tapped face, through a printed motor mount, into T-nuts on the rear top extrusions.

Set the GT2 20T pulley height on each motor shaft so the belt path is level — the pulley should be at the same height as the toothed idler on the rear-corner of the frame. Tighten the pulley grub screw onto the flat of the shaft.

[IMAGE: Rear motor mount with pulley installed]

### 7.5 Install the X Carriage

The X carriage is a single MGN12H block riding on the X rail, with the toolhead-mount printed part (the EVA3 back plate, **back_core_xy_fi**) bolted to it. Install the block on the X rail and bolt the back plate to it now — the toolhead itself will go on later.

### 7.6 Square the Gantry

With the gantry parts in place but everything still loose:

- Push both Y carriages all the way to one end of the frame.
- Confirm both carriages bottom out simultaneously against the frame.
- If one carriage hits first, the X rail is not perpendicular to the Y rails. Adjust by gently sliding the front of the X rail in the appropriate XY-end printed part until both carriages bottom together.
- Tighten the X-rail clamping bolts in the XY-end parts in sequence.

Then push the gantry to the other end and confirm the same thing happens. Repeat the squaring as needed.

### 7.7 Run the CoreXY Belts

Each belt forms a closed loop. Starting at one belt grabber on the X carriage:

1. Run the belt out along the X axis to the corresponding XY-end pulley stack.
2. Down through the stack, around the toothed idler.
3. Across the rear of the frame to the motor pulley.
4. Down (or around — refer to the CAD belt path) to the second toothed idler.
5. Back along the X axis to the second belt grabber on the X carriage.
6. Capture both ends in the belt grabber — the **core_xy_belt_grabber** and **face_belt_grabber** printed parts each have a belt-tooth-mating slot and a clamp screw.

Repeat for the second belt on the opposite side. The two belts must mirror each other exactly — get this wrong and the printer will not move correctly under CoreXY kinematics.

### 7.8 Tension the Belts

Both belts must have equal tension. Use a tension gauge or a phone tuner app (the **Gates Carbon Drive** app or **Spectre** work for belt tuning by frequency). Aim for ~110 Hz on a free belt span between two known points. If you don't have a measurement tool, the rule of thumb is "firm pluck, no slap" — the belt should sing when plucked, not thud.

Verify by hand: push the gantry diagonally. It should glide smoothly with no sticking or stepper cogging felt through the belts.

[IMAGE: Belt path with arrows]

---

## 8. Toolhead Assembly

The toolhead is built around the EVA3 platform with a Phaetus Rapido hotend, an Orbiter 2 extruder, and a BTT EBB36 CAN toolboard.

### 8.1 Build Up the EVA3 Body

Start with the back plate already installed on the X carriage. Add the EVA3 front plate, the bottom 5015 fan mount (**EVA3-5015-Mount-Bottom**), and the side covers per the EVA3 reference assembly. Use M3 SHCS into the heat-set inserts you installed earlier.

### 8.2 Install the Hotend

Drop the Rapido hotend into its mounting hole in the EVA3 carrier. Two M3 SHCS through the EVA3 plate retain the hotend by its mounting flange. Confirm the nozzle protrudes correctly below the front fan duct.

### 8.3 Install the Cooling Fans

- **4010 hotend fan**: bolts to the side of the EVA3 with M3×20 SHCS, blowing onto the hotend's heatsink fins.
- **5015 part-cooling blower**: drops into the bottom mount and is retained by the front cover. Wire orientation matters — verify the 5015 inlet faces forward, not into the EVA3 body.

### 8.4 Install the Extruder

The Orbiter 2.0 / 2.7 sits on top of the EVA3 platform. Bolt it down with the supplied fasteners. Install the captive tensioner per the Orbiter assembly instructions (the printed **Orbiter 2.7 LDO Molding_CaptiveTensioner** is shown in the CAD).

Connect the Orbiter to the hotend with a short section of PTFE tube — slide the tube through the brass coupler ring and into the 4 mm Bowden coupler at the top of the hotend. Cut the PTFE square; an angled cut leads to filament jams.

### 8.5 Install the EBB36 Toolboard

The EBB36 mounts to the back of the EVA3 with M3 SHCS into heat-set inserts. Position it so the connector strip is accessible from above for cable management.

Connect to the EBB36:

- Hotend heater cartridge (screw terminal)
- Hotend thermistor (JST)
- Hotend fan (4010) — 24 V
- Part cooling fan (5015) — 24 V
- Extruder stepper motor (Orbiter 2)
- Klicky probe input — wired to the Z-stop / probe pin on the EBB36
- CAN bus and 24 V power input from the umbilical (we will run this in the wiring section)

[IMAGE: EBB36 wiring]

### 8.6 Filament Guide

The **filament guide** printed part clips to the top of the frame and routes filament from the spool down into the Orbiter inlet. Install it now or after wiring — your choice.

---

## 9. Bed and Build Plate

### 9.1 Bed Carrier

The bed sits on a printed/aluminum bed carrier that bolts to the rear-Z carriage and the front-Z ball-nut carriers via the lower MGN12 stages. The bed assembly is the printed gantry parts referred to in the CAD as the bed support arms attached to each Z stage's flange ball nut.

Thread an M3×40 BHCS up through each of the three bed mounting points, through a leveling spring or silicone spacer, and into a bed-mount tap or insert. Three-point mounting is intentional — it removes the need for manual bed leveling and works perfectly with the Z-tilt routine.

### 9.2 Wire the Bed

If your bed has an AC silicone heater:

- The two AC leads go to the **load** side of the SSR-40 (we'll wire the SSR in the electronics section).
- The thermistor or PT1000 goes to the appropriate analog input on the mainboard. Run thermistor leads through a grounded shielded cable if possible to reduce noise.
- Bond the bed's frame to mains earth — this is non-negotiable for safety with an AC bed.

### 9.3 Magnetic Build Surface

Lay the magnetic spring steel sheet on top of the cast aluminum tooling plate. The PEI-coated side faces up. The magnets in the tooling plate retain the sheet; no clips are needed.

[IMAGE: Bed assembly from below]

---

## 10. Electronics Bay

The electronics live on a DIN-rail-mounted bay at the rear or underside of the frame, accessible by removing the rear panel.

### 10.1 Mount the DIN Rail

The 500 mm DIN rail mounts to the **3030 DIN rail mount** brackets on the rear (or bottom) of the frame. Bolt the brackets to the frame with M5 T-nuts and M5×10 BHCS. Slot the DIN rail into the brackets and lock it with the bracket's set screws.

### 10.2 Install Components on the DIN Rail

Snap the following onto the DIN rail in this order, left to right:

1. **AC inlet with switch and surge arrestor** — entry point for mains.
2. **24 V DC PSU** — sized for the heaters and motors.
3. **5 V DC PSU** (or buck converter) — for the SBC and accessories.
4. **SSR-40 DA** — drives the AC bed.
5. **Mainboard with CB1** — Klipper host.
6. **Wago / lever-nut blocks** — for distributing 24 V and ground.

Spacing matters: leave airflow gaps between the PSUs and any heat-producing component.

### 10.3 Wire Mains AC

> **Safety:** do not energize anything until every AC connection is complete, insulated, and double-checked. AC at 120/240 V is lethal.

From the AC inlet:

- **Live (brown / black)** — to the L input on the 24 V PSU, the L input on the 5 V PSU, and the **input** of the SSR-40 (load side).
- **Neutral (blue / white)** — to the N input on both PSUs and to one terminal of the bed heater (the other bed heater terminal goes to the SSR-40 load output).
- **Earth (green / yellow)** — to the chassis bond point on the frame, and to the bed plate's earth tab. Every metal panel and the bed must be earthed.

The SSR's **control input** (typically 3–32 V DC) connects to the mainboard's bed heater output. Polarity matters — get the + and − right.

[IMAGE: AC wiring diagram]

### 10.4 Wire 24 V DC

Run 18 AWG silicone wire from the 24 V PSU output (V+ and V−) to the mainboard's main power input. Branch off as needed for:

- Mainboard
- 5 V buck (if used)
- Toolhead umbilical (CAN bus + 24 V to the EBB36)
- Any 24 V chamber lighting

### 10.5 Connect the Display

The mini12864 LCD with EC11 encoder connects to the mainboard's EXP1 / EXP2 ports via two ribbon cables (or the equivalent JST connector pair, depending on the mainboard). The display mounts to a printed bracket on the front of the printer.

[IMAGE: Electronics bay populated]

---

## 11. Wiring and Cable Management

### 11.1 Stepper Motor Wiring

Run the four-wire cable from each stepper to the corresponding stepper output on the mainboard. Use the existing cables that come with LDO motors — they are shielded and pre-crimped.

For the toolhead extruder stepper, the cable is short and connects to the EBB36, not the mainboard.

### 11.2 Toolhead Umbilical

The umbilical bundle runs from the rear of the printer up over the gantry to the EBB36. It contains:

- 24 V power (2 conductors, 18 AWG)
- CAN bus (CAN_H, CAN_L, twisted pair)
- Optional: chain-style cable can also include hotend AC if running a high-power 24 V hotend, but keep CAN twisted and away from any high-current AC if possible.

A nylon braided sleeve protects the bundle. The **can wire guide behind belts** printed part anchors the umbilical at the X carriage so the bundle bends predictably as the gantry moves.

### 11.3 Endstop and Probe Wires

The Klicky probe wires run alongside the umbilical to the EBB36. The X- and Y-axis endstops (if used; many CoreXY builds use sensorless homing instead, in which case there's nothing to wire) connect to the mainboard's endstop inputs.

### 11.4 Strain Relief

Anchor every cable bundle to a printed strain-relief mount at both ends. A wire that flexes at a connector instead of along its length will fail. Use zip-ties or velcro and route bundles in gentle curves, never sharp bends.

[IMAGE: Cable management overview]

---

## 12. Panels and Enclosure

### 12.1 Side and Rear Panels

The **side covers**, **el top cover**, and **el bottom cover** printed parts (or laser-cut acrylic / aluminum panels per your preference) drop into the frame slots and are retained by the extrusion grooves. Use printed corner clips or magnetic strips per the CAD.

### 12.2 Front Door

The front door uses two printed **PIPHInge** parts as hinges, mounted to the right vertical upright. Latch the door with the **magnet latch** printed part — a 3×6 mm magnet sits in each of the latch and the receiver, and the **door handle** printed part bolts to the outside of the door for opening.

Tune the magnet alignment so the door snaps shut firmly but opens with a controlled pull.

### 12.3 Top Cover

A clear or printed top panel sits on the top frame and is retained by gravity or magnets. For chamber temperature stability while printing ABS/ASA, an opaque insulated top is preferable.

[IMAGE: Door and side panels installed]

---

## 13. Klicky Probe Installation

The Klicky probe is a magnetically-attached Z probe. The toolhead picks it up before bed-related operations and parks it back at the dock when finished.

### 13.1 Mount the Probe Dock

The **Probe Dock v0.2** printed part bolts to one of the 20×20 deck rails or directly to the frame on the side opposite the toolhead's normal park position. Position it so the toolhead can approach the dock straight-on, perpendicular to the dock's magnet face.

### 13.2 Install the Klicky on the Toolhead

The toolhead has a Klicky receiver — typically a small printed bracket with two embedded 3×6 mm magnets — bolted to the side of the EVA3 (refer to the **probe heatset** part for the magnet/insert seating). The probe body itself drops onto this receiver via its own pair of matching magnets.

### 13.3 Wire the Probe

The microswitch in the Klicky body has two leads. Route them up through the **Klicky Probe** assembly's strain relief, then alongside the umbilical to the EBB36's probe input. The probe pin should be configured as a normally-open switch in Klipper's `[probe]` section.

### 13.4 Test the Probe Pickup

Before powering motion, walk the toolhead through the pickup motion by hand:

1. Move toolhead to dock-attach position.
2. Slide laterally onto the probe — it should click into place via magnets.
3. Slide back out of the dock — the probe stays attached to the toolhead.
4. Reverse the motion to drop the probe back in the dock — it should release cleanly.

If pickup is unreliable, adjust the dock position by 0.5 mm increments until pickup and drop-off are both consistent.

[IMAGE: Klicky dock]

---

## 14. Firmware and Software Setup

### 14.1 Flash the CB1

Download the latest CB1 image (typically a Klipper-flavored Linux distribution like Armbian-based with KIAUH support). Flash it to a microSD card with **balenaEtcher** or **Raspberry Pi Imager**. Insert the microSD into the CB1 and boot.

Find the printer's IP on your network (router admin page or `arp -a`). SSH into it with the default credentials and immediately change the password.

### 14.2 Install Klipper, Moonraker, and Mainsail

The easiest path is **KIAUH**:

```bash
git clone https://github.com/dw-0/kiauh.git
./kiauh/kiauh.sh
```

From the menu, install Klipper, Moonraker, and Mainsail (or Fluidd, your preference). Reboot when done.

### 14.3 Flash Klipper Firmware to the Mainboard

In an SSH session:

```bash
cd ~/klipper
make menuconfig
```

Select your mainboard's microcontroller (STM32 family is common for CB1-paired boards), the correct clock speed, and the appropriate communication interface (USB or UART). Build with `make` and flash per the board's documented procedure (often DFU mode or a `make flash FLASH_DEVICE=` command).

### 14.4 Flash the EBB36 (CAN Toolboard)

The EBB36 needs both a bootloader (CanBoot) and Klipper firmware. Follow the **BTT EBB36 documentation** for the exact procedure for your board revision. The general flow is:

1. Boot the EBB36 into DFU mode (jumper or button).
2. Flash CanBoot to it via USB.
3. Reboot the EBB36 onto the CAN bus.
4. Use `~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q` to confirm the EBB36 is visible on CAN.
5. Build a Klipper firmware image targeted at the EBB36 (separate `make menuconfig`/`make`) and flash it over CAN with the same script.

Note the CAN UUID — you will need it in `printer.cfg`.

### 14.5 Configure printer.cfg

A skeleton `printer.cfg` for this build will reference:

- Three Z motors with `[stepper_z]`, `[stepper_z1]`, `[stepper_z2]` entries
- A `[z_tilt]` section listing the three pivot points (front-left, front-right, rear-center)
- CoreXY kinematics: `kinematics: corexy`
- The EBB36's CAN UUID under `[mcu EBBCan]`
- A `[probe]` block referencing the EBB36's probe pin
- A `[bed_mesh]` section with appropriate mesh dimensions
- `[temperature_sensor]` blocks for the chamber and electronics if you have those sensors
- Macros: `START_PRINT`, `END_PRINT`, `G32` (home + Z-tilt + bed mesh), `ATTACH_PROBE` and `DOCK_PROBE` for Klicky

Reference any well-documented Voron 2.4 `printer.cfg` as a starting template — the kinematics and Z-tilt structure are identical, and you only need to substitute pins and mechanical numbers.

### 14.6 Calibrate Stepper Drivers

For each stepper, set the run current in `printer.cfg`. Conservative starting values:

- XY (LDO 36STH17 pancake): `run_current: 0.7`
- Z (NEMA17): `run_current: 0.8`
- Extruder (Orbiter NEMA14): `run_current: 0.65`

Verify motor temperatures after a 15-minute idle — they should be warm but never too hot to touch (≥75 °C is too hot — drop the current).

---

## 15. Initial Calibration

### 15.1 Endstop / Sensorless Homing Tuning

If using sensorless homing, set `driver_SGTHRS` per stepper and tune by running `G28 X` and `G28 Y` repeatedly, raising or lowering the threshold until homing is reliable but not too eager (no false trips).

### 15.2 Z Offset

With the probe attached:

```
G28
PROBE_CALIBRATE
```

Lower the nozzle until a single sheet of paper drags between nozzle and bed with light resistance. Accept the offset and `SAVE_CONFIG`.

### 15.3 Z-Tilt

Run `Z_TILT_ADJUST`. Klipper will probe the three points and adjust each Z stepper individually until the gantry is level relative to the bed. It may take 2–3 iterations on the first run.

### 15.4 Bed Mesh

Run `BED_MESH_CALIBRATE` to generate a height map of the bed. Save with `SAVE_CONFIG`.

### 15.5 PID Tune the Hotend and Bed

```
PID_CALIBRATE HEATER=extruder TARGET=240
PID_CALIBRATE HEATER=heater_bed TARGET=100
SAVE_CONFIG
```

### 15.6 Extruder Calibration (E-Steps and Rotation Distance)

Mark the filament 120 mm above the extruder inlet. Extrude 100 mm at low speed. Measure how much filament was actually drawn in. Adjust `rotation_distance` in `printer.cfg` proportionally:

```
new_rotation_distance = old_rotation_distance × (actual_extruded / 100)
```

Repeat until the extruder is within ±0.5 mm of 100 mm extrusion.

### 15.7 Pressure Advance and Input Shaper

Run a pressure advance test print and tune per the [Klipper documentation](https://www.klipper3d.org/Pressure_Advance.html). Then run input shaper calibration with an accelerometer (an ADXL345 mounted to the toolhead, even temporarily) to characterize and damp resonances.

[IMAGE: Calibration test prints]

---

## 16. First Print

### 16.1 Pre-Flight Checklist

Before starting your first print, walk through this list:

- All belts are tensioned and equal.
- All grub screws are tight (motor pulleys, couplers, idler pulley shafts).
- Bed is at temperature and the spring steel sheet is seated.
- Z offset is saved.
- Z-tilt has been run since power-on.
- Bed mesh is loaded (if used in your slicer's start gcode).
- Filament is loaded and primed.
- Part-cooling fan is unobstructed.
- Door is closed (for ABS/ASA) or open (for PLA) per material.
- Camera or webcam, if installed, is recording.

### 16.2 Recommended First Print

A simple 20 mm calibration cube at 0.2 mm layer height with default speeds. This validates motion, extrusion, cooling, and bed adhesion all at once. Watch the entire first layer — never leave a first print unattended until you're sure the printer is well-behaved.

### 16.3 Tuning Test Prints

After the calibration cube succeeds, work through:

- A first-layer test pattern (one-layer square covering most of the bed)
- A retraction tower
- A flow rate calibration
- A speed/acceleration benchmark (Voron tuning prints work well)

[IMAGE: First print on the bed]

---

## 17. Maintenance

### 17.1 Weekly

- Wipe the bed surface with isopropyl alcohol.
- Inspect belts for wear or fraying.
- Check that the printer is sitting level on its feet.

### 17.2 Monthly

- Check belt tension; re-tension if either has loosened.
- Verify all grub screws are tight (motor pulleys, couplers).
- Clean the nozzle of accumulated plastic.
- Vacuum dust from inside the electronics bay.

### 17.3 Quarterly

- Lubricate the leadscrews with a thin layer of PTFE-based grease.
- Wipe the linear rails with a lint-free cloth and apply fresh light machine oil to the carriages.
- Inspect the hotend's silicone sock for damage; replace if torn.
- Check the bed thermistor connection.

### 17.4 Annually

- Re-flash Klipper to the latest stable release after backing up `printer.cfg`.
- Pull every printed structural part and inspect for cracks, especially around heat-set inserts and high-stress joints.
- Replace the PEI sheet if it's worn or warped.

---

## 18. Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Layer shifts in one axis | Loose pulley grub screw or low stepper current | Tighten grub on flat; raise `run_current` |
| Both axes shift together | Frame rack — gantry not square | Re-square X to Y rails |
| Z banding | Bent leadscrew or coupler too tight | Loosen coupler, re-square; replace if bent |
| Probe gives random Z readings | Loose probe wiring or magnet alignment | Reseat probe; check wiring continuity |
| Hotend heating fault | Loose thermistor connection or bad cartridge | Check connections at EBB36; replace cartridge |
| First layer too high | Z offset drifted | Re-run `PROBE_CALIBRATE` |
| Toolhead crashes into bed during Z homing | Klicky probe failed to attach | Inspect dock alignment; lower XY pickup speed |
| Ringing / ghosting on prints | Resonance not damped | Re-run input shaper |
| CAN errors on EBB36 | Bus termination or wiring issue | Check 120 Ω termination at both ends; reroute CAN twisted pair |
| Bed not heating | SSR not switching, or AC fuse blown | Verify SSR control voltage; check SSR LED; check fuse |

---

## Closing Notes

The UM3DCoreXY rewards careful assembly. Most "mystery problems" come from things skipped in early stages — an out-of-square frame, a slightly loose belt, a marginal CAN connection. When something goes wrong later, the troubleshooting path almost always leads back to a fundamentals check.

Keep a build log. Photograph each subsystem as you finish it. When a part wears out three years from now, you will be grateful for the photos.

Happy printing.

---

*Document version 1.0 — generated from the UM3DCoreXY STEP assembly.*
