# Ultramarine (UM3DCoreXY) — Complete Manual

**Build · Commission · Operate · Repair**

### Prepared for the students of SPŠE Hálova 16

Version 2.0 · Combined edition
Supersedes *UM3DCoreXY_Build_Guide.md* and *UM3DCoreXY_Troubleshooting_Guide.md*

---

## Project repository — scan or type

```
        ┌───────────────────────────────────┐
        │                                   │
        │                                   │
        │                                   │
        │        ▛▘  QR CODE HERE  ▝▜        │
        │                                   │
        │      [ QR-01 — placeholder ]      │
        │                                   │
        │                                   │
        │                                   │
        └───────────────────────────────────┘
```

### **https://github.com/Ultramarine3D/Ultramarine**

> 🖼️ **[QR-01] Repository QR code**
> *Generate from:* `https://github.com/Ultramarine3D/Ultramarine`
> *Produce at:* minimum 30 × 30 mm printed, error-correction level **M** or higher, black on white,
> with a clear quiet zone around it. Replace this ASCII box with the image.
> *Why:* students working at the machine need the CAD, the STLs, and the config on their phone
> without typing a URL with one hand covered in grease.

**The repository holds everything this manual refers to:**

| In the repo | What it is | Referred to as |
|---|---|---|
| `cad/UM3DCoreXY.f3z` · `.step` | The full CAD model — **the authority on every dimension** | 📋 in this manual |
| `STLs/` | Printed parts | [Appendix C](#c-printed-parts-checklist) |
| `printer.cfg` | The live Klipper configuration | [§16](#16-printercfg-explained-line-by-line) |
| `firmware/` | Firmware notes and the USB auto-sync package | [Appendix F](#f-usb-auto-sync-for-g-code-files) |
| `slicer_profiles/` | OrcaSlicer profiles (0.4 mm and 0.6 mm) | [§19](#19-slicer-setup) |
| `manuals/` | This document | — |

⚠️ **If a part is listed but missing from the repository, open an issue** — or export it yourself
from the `.f3z` and add it. That is a genuinely useful contribution.

---

> ### Who this manual is written for
>
> **You have run a Prusa Mini. That is assumed, and that is all that is assumed.**
>
> This manual never says "obviously" and never says "just flash the board." Every step that
> requires knowledge a Prusa Mini owner would not have — mains wiring, a Linux terminal, CAN bus,
> CoreXY belt paths, sensorless homing — is explained from the beginning, in place, the first
> time it comes up.
>
> Wherever the Ultramarine works differently from a Mini in a way that will trip you up, you will
> see a callout like this:
>
> > 🟠 **Mini → Ultramarine:** On the Mini, the printer levels itself with PINDA and you never
> > think about it. Here, levelling is three separate operations (Z offset, Z-tilt, bed mesh),
> > you trigger them, and skipping one ruins the print.
>
> Read Part 0 completely before you touch a single screw. It is short, and it will save you weeks.

---

> ### 🎓 For SPŠE Hálova 16 students — read this before you start
>
> **1. Work with your instructor, not around them.**
> Every section marked ⚠️ **Danger** — and the whole of [Section 11](#11-electronics-bay), the
> electronics bay — involves mains AC that can kill you. **Do not do the AC wiring
> ([§11.4](#114-wiring-mains-ac) and [§11.5](#115-bed-heating--one-ssr-two-fused-zones)) without your
> instructor present and supervising.** Everything else in the build you can do independently once
> you have read the section.
>
> **2. Two people, one machine, one log.**
> If several of you are building or maintaining the same printer, keep **one shared build log**
> ([Appendix H](#h-maintenance-log-template)). The most common failure in a shared workshop is two
> people changing two settings on the same afternoon and neither knowing what the other did. Write
> down what you changed, and sign it.
>
> **3. Do not skip the checkpoints.**
> The ✅ **Checkpoint** and ⛔ **Stop** markers exist because the step after them assumes the step
> before them was done properly. In a school workshop where the machine gets handed between people,
> these are the only thing preventing someone inheriting an out-of-square frame.
>
> **4. The CAD model is the authority, not this text.**
> Anything marked 📋 means "measure it in the CAD, do not trust the number printed here."
> The design is still evolving. See
> [Appendix G](#g-known-documentation-conflicts--verify-before-you-build).
>
> **5. Use the right printer for the part.**
> Replacement parts are **not** all printed on the same machine. Structural parts go on the
> **BambuLab P1S in ABS+ with 3D Lac**; small ABS/ASA parts can go on the **enclosed MK4** with the
> door closed for the whole print; PETG parts print on anything. Full guidance in
> [§4.11](#411-where-to-print-parts-and-replacements).
>
> **6. Learn the door rule on day one.**
> 🚪 **PLA, PETG, TPU — door OPEN.** 🔒 **ABS, ASA, PC, PA — door CLOSED.**
> Get it backwards and the print fails either way. [The door rule](#the-door-rule).
>
> **7. Ask properly.**
> [Appendix I](#i-where-to-get-help) explains how to ask a question that actually gets answered —
> which is a skill worth more than anything else in this manual. If a printed part keeps breaking
> on you, email **meciar.michal7@gmail.com** rather than reprinting it a third time.

---

> ### 🖼️ About the images in this manual
>
> Image placeholders appear throughout, marked like this:
>
> > 🖼️ **[CAD-00] Short title**
> > *Show:* what the image needs to contain.
> > *Look for:* the specific detail the reader should notice.
>
> **These are not decoration — each one marks a step where words alone are not enough.**
>
> - **CAD-nn** — a render, section view, or exploded view taken from `cad/UM3DCoreXY.f3z`
> - **PHOTO-nn** — a photograph of the real machine, because CAD cannot show it (a crimp, a
>   heat-set insert going in, a bad first layer)
> - **DIAG-nn** — a diagram to be drawn, not rendered (belt paths, wiring)
> - **QR-nn** — a generated QR code
>
> Every placeholder is listed in [Appendix J](#j-image-production-checklist) as a worklist. If you
> produce one, replace the placeholder block with the image and tick it off in the appendix.

---

## Table of Contents

**Part 0 — Read This First**
- [0.1 How to use this manual](#01-how-to-use-this-manual)
- [0.2 Coming from a Prusa Mini](#02-coming-from-a-prusa-mini)
- [0.3 Safety](#03-safety)
- [0.4 Glossary](#04-glossary)
- [0.5 Skills you will need to pick up](#05-skills-you-will-need-to-pick-up)
- [0.6 Build time, cost and staging](#06-build-time-cost-and-staging)

**Part 1 — The Machine**
- [1. Overview and specifications](#1-overview-and-specifications)
- [2. Subsystem map — what talks to what](#2-subsystem-map--what-talks-to-what)
- [3. Tools required](#3-tools-required)
- [4. Bill of materials](#4-bill-of-materials)
  - [4.11 Where to print parts and replacements](#411-where-to-print-parts-and-replacements)

**Part 2 — Building the Printer**
- [5. Pre-build preparation](#5-pre-build-preparation)
- [6. Frame assembly](#6-frame-assembly)
- [7. Z axis assembly](#7-z-axis-assembly)
- [8. XY gantry assembly](#8-xy-gantry-assembly)
- [9. Toolhead assembly](#9-toolhead-assembly)
- [10. Bed and build plate](#10-bed-and-build-plate)
- [11. Electronics bay](#11-electronics-bay)
- [12. Wiring and cable management](#12-wiring-and-cable-management)
- [13. Panels and enclosure](#13-panels-and-enclosure)
- [14. Klicky probe installation](#14-klicky-probe-installation)

**Part 3 — Commissioning**
- [15. Software installation](#15-software-installation)
- [16. printer.cfg explained line by line](#16-printercfg-explained-line-by-line)
- [17. First power-on — the staged smoke test](#17-first-power-on--the-staged-smoke-test)
- [18. Calibration sequence](#18-calibration-sequence)
- [19. Slicer setup](#19-slicer-setup)
- [20. First print](#20-first-print)

**Part 4 — Operating the Printer**
- [21. Everyday operation](#21-everyday-operation)
- [22. Material guide](#22-material-guide)
  - [⚠️ The door rule](#the-door-rule)
- [23. Maintenance](#23-maintenance)

**Part 5 — Troubleshooting**
- [24. How to troubleshoot](#24-how-to-troubleshoot)
- [25. First-layer problems](#25-first-layer-problems)
- [26. Print quality problems](#26-print-quality-problems)
- [27. Motion and mechanical problems](#27-motion-and-mechanical-problems)
- [28. Extruder and filament problems](#28-extruder-and-filament-problems)
- [29. Hotend and temperature problems](#29-hotend-and-temperature-problems)
- [30. Bed and heating problems](#30-bed-and-heating-problems)
- [31. Probe and levelling problems](#31-probe-and-levelling-problems)
- [32. Electronics and connectivity problems](#32-electronics-and-connectivity-problems)
- [33. Klipper and software problems](#33-klipper-and-software-problems)
- [34. Diagnostic procedures](#34-diagnostic-procedures)
- [35. Symptom quick-reference](#35-symptom-quick-reference)

**Part 6 — Appendices**
- [A. Mainboard pin map](#a-mainboard-pin-map)
- [B. Master reference values](#b-master-reference-values)
- [C. Printed parts checklist](#c-printed-parts-checklist)
- [D. Fasteners and tightening guide](#d-fasteners-and-tightening-guide)
- [E. Command cheat sheet](#e-command-cheat-sheet)
- [F. USB auto-sync for G-code files](#f-usb-auto-sync-for-g-code-files)
- [G. Known documentation conflicts — verify before you build](#g-known-documentation-conflicts--verify-before-you-build)
- [H. Maintenance log template](#h-maintenance-log-template)
- [I. Where to get help](#i-where-to-get-help)
- [J. Image production checklist](#j-image-production-checklist)

---
---

# Part 0 — Read This First

## 0.1 How to use this manual

This document has two halves that are used at completely different times.

**Parts 1–4 are read forward.** Start at Section 5 and work down. Do not skip ahead and do not
build subsystems out of order — the frame must be square before the gantry goes on, the gantry
must be square before belts are tensioned, and belts must be right before any motor is powered.
Every one of those dependencies is real, and violating one costs you a teardown.

**Part 5 is read backwards, from a symptom.** When something breaks, go to
[Section 35](#35-symptom-quick-reference), find the symptom, and follow it to the section that
explains it. Causes within each section are listed **most likely first** — work down the list in
order, and change **one thing at a time**.

### Notation used throughout

| Marker | Meaning |
|---|---|
| 🟠 **Mini → Ultramarine** | Something that works differently from a Prusa Mini |
| ⚠️ **Danger** | Can injure or kill you. Not a suggestion. |
| ⛔ **Stop** | Do not proceed past this point until the check passes |
| ✅ **Checkpoint** | Verify this before moving to the next section |
| 🔧 **Technique** | How to physically do the thing, not just what to do |
| 💡 **Why** | The reasoning — worth reading, because it tells you what to do when reality differs |
| 📋 **Verify** | A number or fact that may differ on your build; check it against your CAD |

### Things this manual cannot tell you

The Ultramarine is a **custom, evolving design**. This manual is written from the build guide,
the troubleshooting notes, the live `printer.cfg`, and the parts list in the repository. Where
those sources disagreed with each other, the **live `printer.cfg` won**, because it describes a
machine that actually runs. Every disagreement is logged in
[Appendix G](#g-known-documentation-conflicts--verify-before-you-build) — read that appendix
before ordering parts.

Where a dimension is marked 📋, **measure it in the CAD model** (`cad/UM3DCoreXY.f3z` or
`cad/UM3DCoreXY.step`) rather than trusting the number here.

---

## 0.2 Coming from a Prusa Mini

This is the most important section in the manual. A Prusa Mini is an appliance. The Ultramarine
is a machine you are responsible for. Nearly every frustration new builders hit comes from
applying Mini habits to a machine that does not have Mini guardrails.

### The five mindset shifts

**1. Nothing is calibrated at the factory, because there is no factory.**
Your Mini arrived with e-steps, PID values, and a Z offset that someone else determined. Here,
every one of those numbers starts wrong and you produce it yourself. That is not a defect; it is
the job. [Section 18](#18-calibration-sequence) is that job, in order.

**2. Mechanical accuracy is entirely yours.**
The Mini's frame was machined and pinned. Yours is bolted extrusion, and it is exactly as square
as you made it. A frame that is 1 mm out of square will produce parallelogram parts forever and
no software setting will fix it. This is why [Section 6](#6-frame-assembly) is so long for what
looks like "bolt some aluminium together."

**3. There is no firmware menu. There is a text file.**
The Mini hides its settings behind an LCD menu. Klipper puts every setting in a plain-text file
called `printer.cfg`, which you edit in a web browser, and the printer restarts in about two
seconds. This is far more powerful and slightly more dangerous:
**a typo means the printer refuses to start.** It always tells you which line. See
[Section 33.3](#333-klipper-wont-restart-after-a-config-change).

**4. The printer is a small Linux computer that happens to melt plastic.**
You will use SSH and a command line. If you have never opened a terminal, that is fine — every
command in this manual is written out in full, and [Section 0.5](#05-skills-you-will-need-to-pick-up)
teaches the ten commands you actually need.

**5. Mains voltage is present inside this machine.**
The Mini runs on a sealed external 24 V brick. The Ultramarine has live AC mains inside the
frame, switching a bed heater through solid-state relays. This can kill you.
[Section 0.3](#03-safety) is mandatory reading, not boilerplate.

### Translation table

| On the Prusa Mini | On the Ultramarine | Where covered |
|---|---|---|
| Bed moves in Y, gantry moves in X | Bed moves only in Z; the toolhead moves in **both** X and Y on a CoreXY gantry | [§8](#8-xy-gantry-assembly) |
| One Z motor, one leadscrew | **Three** Z motors and three ballscrews, levelled in software | [§7](#7-z-axis-assembly), [§18.4](#184-z-tilt) |
| PINDA sensor, permanently mounted | **Klicky** — a physical microswitch the toolhead picks up magnetically and puts back | [§14](#14-klicky-probe-installation) |
| "Calibrate Z" from the LCD menu | `PROBE_CALIBRATE`, then `SAVE_CONFIG` | [§18.3](#183-z-offset) |
| Mesh bed levelling runs automatically | `Z_TILT_ADJUST` **then** `BED_MESH_CALIBRATE`, both triggered by `PRINT_START` | [§18.4](#184-z-tilt)–[§18.5](#185-bed-mesh) |
| LCD knob menu for everything | Web interface (Mainsail/Fluidd) in a browser; the LCD is a convenience, not the main control | [§15](#15-software-installation) |
| Load/Unload filament menu item | Manual push-and-extrude, or your own macro | [§21.3](#213-loading-and-unloading-filament) |
| E-steps are preset | `rotation_distance`, which you measure yourself | [§18.7](#187-extruder-calibration-rotation-distance) |
| Linear Advance is preset | **Pressure Advance**, which you tune with a test print | [§18.9](#189-pressure-advance) |
| Vibration is what it is | **Input Shaper** — an accelerometer measures your frame and cancels resonance | [§18.10](#1810-input-shaper) |
| Open frame, PLA/PETG | Heated enclosure — ABS, ASA, PC, and fibre-filled materials become practical | [§22](#22-material-guide) |
| Prints from USB stick or PrusaLink | Upload from OrcaSlicer over the network, or plug in a USB stick and it auto-copies | [§19](#19-slicer-setup), [App. F](#f-usb-auto-sync-for-g-code-files) |
| Print volume 180 × 180 × 180 mm | Roughly **350 × 350 × 250 mm** — a 7× volume increase | [§1](#1-overview-and-specifications) |
| 0.4 mm nozzle default | **0.6 mm** is the recommended default here | [§19.1](#191-which-nozzle-and-which-slicer) |
| It just works | It works because you made it work, and you can fix it when it doesn't | all of it |

### Habits from the Mini that will actively hurt you here

- **"I'll level it by eye and adjust with babystepping."** With three Z motors, a gantry that is
  not levelled by `Z_TILT_ADJUST` cannot be rescued with babystepping. Run `Z_TILT_ADJUST` after
  every power cycle. `PRINT_START` does this for you — do not remove it.
- **"PLA is fine for printed parts."** Every structural printed part on this machine lives inside
  a heated chamber. PLA softens around 55 °C and the chamber reaches 50–60 °C. PLA parts will
  creep, sag, and eventually drop your gantry. See [§4.10](#410-printed-parts).
- **"I'll tighten it properly."** Most fasteners here go into printed plastic or into aluminium
  T-nuts. "Properly" on a Mini means "firm." Here it means "seated, plus a small fraction of a
  turn." Over-torquing strips heat-set inserts and bows extrusions. See [Appendix D](#d-fasteners-and-tightening-guide).
- **"The first print will be fine unattended."** Watch the entire first layer of the first
  fifty prints. You are still learning what a healthy first layer looks like *on this machine*.

---

## 0.3 Safety

⚠️ **Read this fully. Two systems in this printer can seriously injure you, and one can kill you.**

### Mains AC — the one that can kill you

The Ultramarine takes mains AC (120 V or 230 V) directly into the frame, through an IEC inlet,
into two PSUs and two solid-state relays that switch the bed heater. Mains AC across your chest
stops your heart. There is no "small shock" at these voltages when your hands are on a grounded
aluminium frame.

**Absolute rules:**

1. **Unplug the machine at the wall before opening the electronics bay.** Not "switch it off" —
   unplug it. The rocker switch on the IEC inlet only breaks one conductor.
2. **After unplugging, wait 60 seconds.** PSU capacitors hold charge.
3. **Never work on AC alone in the house.** If something goes wrong, someone has to find you.
4. **Every exposed AC terminal gets covered.** SSR terminal covers on, PSU terminal covers on,
   heatshrink over every crimp. If you can touch it with a fingertip, it is not finished.
5. **Earth everything metal.** The frame, the bed plate, and every metal panel get a green/yellow
   conductor back to the inlet's earth pin. This is not optional and it is not "for noise." It is
   what makes a fault trip your breaker instead of electrifying the machine.
6. **Test with a meter, not with a finger, and not with the printer plugged in** unless you are
   deliberately taking a live measurement with one hand behind your back.
7. **If you are not confident with mains wiring, have an electrician do the AC section.**
   This is a completely reasonable choice and costs an hour of someone's time. Sections
   [11.4](#114-wiring-mains-ac) and [11.5](#115-bed-heating--one-ssr-two-fused-zones) are the AC
   sections; everything else you can do yourself.

> 🟠 **Mini → Ultramarine:** Your Mini's power supply was a sealed brick with no user-serviceable
> parts. Nothing on the Mini prepared you for this. Take it seriously.

### Heat

- The hotend reaches **300 °C**. It looks identical at 30 °C and 300 °C. Assume it is hot.
- The bed reaches **110 °C** and holds enormous thermal mass — a 350 × 350 × 8 mm aluminium
  plate stays dangerously hot for 20+ minutes after you switch it off.
- The **chamber** reaches 50–60 °C. Opening the door during an ABS print vents genuinely hot air
  into your face. Open it slowly and stand aside.
- A **failed thermistor can cause thermal runaway.** Klipper's `max_temp` checks and the
  `BED_TEMP_CHECK` macro ([§16.9](#169-the-dual-thermistor-bed-safety-check)) are your protection.
  Never disable them, never raise `max_temp` to silence an error.

### Fumes

ABS, ASA and PC emit styrene and ultrafine particles when printed. An enclosure contains them
while the door is shut and then releases them all at once when you open it.

- Print styrenics in a ventilated room, ideally vented outdoors.
- Do not sleep in the same room as a running ABS print.
- Let the chamber cool and vent for 10 minutes before reaching in.

### Mechanical

- **Pinch points:** the CoreXY gantry moves fast (up to 200 mm/s configured, and considerably
  faster during a resonance test) and the toolhead has real mass. Keep hands out during motion.
- **Crush:** the bed is a heavy aluminium plate on three ballscrews. It does not stop for fingers.
- **Magnets:** the 3 × 6 mm neodymium magnets in the Klicky assembly will pinch skin hard and will
  wipe magnetic media and interfere with pacemakers. Keep them away from your phone's compass and
  from anyone with an implanted device.
- **`M84` disables the motors and the gantry becomes free.** On a tall machine, a free Z stage can
  drop. Klipper holds Z position with motor current — if you disable steppers with the bed high,
  support it.

### Fire

- Anything that heats plastic can start a fire. Do not run unattended prints in a room with no
  smoke detector.
- Keep a **CO₂ or dry-powder extinguisher** near the machine. Not water — this is an electrical fire risk.
- The most common ignition source on a machine like this is a **loose high-current screw terminal**
  (bed heater, PSU output) arcing and heating. After the first ten hours of printing, power down,
  unplug, and re-torque every high-current screw terminal. Repeat annually. See [§23.5](#235-annually).

---

## 0.4 Glossary

Terms used in this manual that a Prusa Mini owner may not have met.

| Term | Meaning |
|---|---|
| **ABL** | Automatic Bed Levelling. Here it means the bed mesh, not the Z-tilt. |
| **Backlash** | Lost motion when a mechanism reverses direction. Ballscrews have far less than leadscrews. |
| **Ballscrew (1204)** | A precision screw using recirculating ball bearings. "1204" = 12 mm diameter, **4 mm lead** (one turn = 4 mm of travel). This is why `rotation_distance: 4`. |
| **BHCS** | Button Head Cap Screw — domed head, hex drive. Used where a low profile matters. |
| **Bed mesh** | A height map of the bed surface. Compensates for the bed *not being flat*. |
| **Bowden coupler** | The push-fit collet that grips the PTFE tube at the top of the hotend. |
| **CAN bus** | A two-wire, noise-resistant network. Carries all toolhead signals over one twisted pair instead of a dozen wires. |
| **CanBoot / Katapult** | A small bootloader on the toolboard that lets you flash Klipper over CAN instead of unplugging and using USB. |
| **CB1 / CM5** | Small Linux computers that run Klipper. This build uses a **Raspberry Pi CM5**. |
| **CoreXY** | Kinematics where two motors drive two belts and *both* motors contribute to *both* X and Y motion. Neither motor is "the X motor" mechanically. |
| **Cold pull** | Clearing a partial clog by letting filament solidify in the nozzle and pulling it out with the debris attached. |
| **DIN rail** | A standard steel mounting rail that electrical components clip onto. |
| **Direct drive** | The extruder sits on the toolhead, millimetres from the melt zone. Needs far less retraction than Bowden. |
| **EBB36** | The toolhead circuit board. A tiny mainboard that lives on the moving toolhead and talks over CAN. |
| **EVA3** | An open-source modular toolhead platform. The frame that holds hotend, fans and extruder together. |
| **Ferrule** | A metal sleeve crimped onto stranded wire so it can be safely clamped in a screw terminal. |
| **Gantry** | The moving bridge carrying the toolhead — the X rail plus its two Y carriages. |
| **GT2 belt** | 2 mm tooth pitch timing belt. This build uses 9 mm wide belt. |
| **Heat creep** | Heat travelling *up* the hotend past the heatbreak, softening filament where it should be solid, causing a jam. |
| **Heat-set insert** | A brass threaded sleeve melted into printed plastic so you can bolt into it repeatedly. |
| **Heatbreak** | The thin-walled section of the hotend separating the hot end from the cold end. |
| **Idler** | A freely-spinning pulley that redirects a belt without driving it. |
| **Input Shaper** | Klipper feature that cancels frame resonance by shaping the motion commands. Requires an accelerometer to tune. |
| **KIAUH** | Klipper Installation And Update Helper — a menu-driven installer script. |
| **Kinematics** | The mathematical relationship between motor rotation and toolhead position. |
| **Klicky** | A dockable microswitch Z probe. Picked up magnetically when needed, parked when not. |
| **Klipper** | The firmware. Runs mostly on the Linux host; the microcontrollers just execute timed steps. |
| **Mainsail / Fluidd** | Web interfaces for Klipper. Functionally equivalent; pick one. |
| **MCU** | Microcontroller Unit. This machine has two: the Manta mainboard and the EBB36 toolboard. |
| **MGN12H** | A 12 mm linear rail carriage. "H" = the longer, higher-load block. |
| **Moonraker** | The API server that sits between Klipper and the web interface. |
| **Pressure Advance** | Compensates for melt-zone pressure lag so corners don't blob and thin walls don't thin out. The Klipper equivalent of Linear Advance. |
| **PTFE** | Teflon. The white tube guiding filament. Degrades above ~250 °C — which is why it must not sit in the melt zone. |
| **Rotation distance** | How far the driven thing moves per motor revolution, in mm. Klipper's replacement for "steps per mm." |
| **Run current** | The current Klipper feeds a stepper. Too low = missed steps. Too high = hot motors and artefacts. |
| **Salmon skin** | A fine iridescent vertical texture on walls, caused by stepper driver behaviour rather than mechanics. |
| **Sensorless homing** | Homing without a switch — the driver detects the motor stalling against the frame. Tuned with `driver_SGTHRS`. |
| **SHCS** | Socket Head Cap Screw — the standard cylindrical-head hex screw. |
| **SSR** | Solid State Relay. An electronic switch that lets a low-voltage signal control mains AC. |
| **SGTHRS** | StallGuard Threshold — the sensitivity number for sensorless homing. Higher = more sensitive. |
| **T-nut** | A nut that slides into an extrusion's slot, letting you bolt anywhere along its length. |
| **TMC2209** | The stepper driver chip. Quiet, and capable of sensorless homing. |
| **Termination (120 Ω)** | Resistors at each end of a CAN bus that stop signal reflections. Missing them causes random dropouts. |
| **UUID** | The unique ID that identifies the EBB36 on the CAN bus. Goes in `printer.cfg`. |
| **WobbleX** | A coupling that lets a ballscrew push the bed vertically while absorbing the screw's sideways wobble, preventing Z banding. |
| **Z-tilt** | Using three independent Z motors to tilt the gantry until it is parallel to the bed. Distinct from bed mesh. |

---

## 0.5 Skills you will need to pick up

None of these are hard. All of them are new if the Mini was your only printer.

### Using a terminal over SSH

SSH is a way to type commands into the printer's Linux computer from your own computer.

On **macOS or Linux**, open Terminal. On **Windows**, open PowerShell or install
[Windows Terminal](https://aka.ms/terminal). Then:

```bash
ssh ultramarine@192.168.1.50
```

Replace the address with your printer's IP (find it in your router's admin page, or in
Mainsail under *Machine → System*). The first connection asks you to confirm a fingerprint —
type `yes`. Then enter the password.

The ten commands that cover 95 % of what you will do:

| Command | What it does |
|---|---|
| `ls` | List files here |
| `cd ~/printer_data/config` | Change into the config folder (`~` = your home folder) |
| `cat printer.cfg` | Print a file to the screen |
| `nano printer.cfg` | Edit a file. `Ctrl+O` `Enter` saves, `Ctrl+X` exits |
| `cp printer.cfg printer.cfg.backup` | Copy a file — **do this before every config change** |
| `sudo systemctl restart klipper` | Restart the Klipper service |
| `sudo systemctl status klipper` | Ask whether Klipper is running and why not |
| `journalctl -u klipper -f` | Watch Klipper's live log. `Ctrl+C` to stop |
| `df -h` | Check free disk space |
| `sudo reboot` | Reboot the printer |

`sudo` means "do this as administrator" and will ask for your password. Nothing in this manual
requires a `sudo` command you have not been given verbatim.

> 🔧 **Technique:** Press **Tab** to auto-complete file names. Press **Up arrow** to recall the
> previous command. These two habits make the terminal about three times faster.

### Crimping connectors

You will make dozens of connections. A bad crimp is the single most common cause of
intermittent faults on a machine like this — and intermittent faults are the hardest to find.

- **Ferrules** go on any stranded wire entering a screw terminal (PSU, SSR, bed). Strip 8 mm,
  twist, slide the ferrule on, crimp with a **hex or square-jaw ferrule crimper**. Pliers do not
  work; they flatten instead of forming.
- **JST-XH / Molex MicroFit** need a proper ratcheting crimp tool. A good crimp grips the
  conductor in the front wings and the **insulation** in the rear wings. Tug-test every one.
- **Never tin a wire that goes into a screw terminal.** Solder cold-flows under clamping pressure
  and the joint loosens over months. This is a real fire risk on the bed circuit.

### Reading a Klipper error

Klipper errors are usually precise and usually mean exactly what they say. The pattern is:

```
Internal error during connect: Option 'sensor_pin' in section 'heater_bed' must be specified
```

Section name in quotes, option name in quotes, what's wrong. Go to that section in `printer.cfg`,
fix that option. When an error is *not* self-explanatory, [Section 33](#33-klipper-and-software-problems)
covers the ones that aren't.

### Measuring with calipers

You will use digital calipers constantly — filament diameter, printed part fit, belt spans,
frame diagonals. Zero them before each use (close the jaws, press ZERO). Measure filament in
three places 100 mm apart and average.

---

## 0.6 Build time, cost and staging

**Realistic time budget for a first-time builder coming from a Mini:**

| Stage | Sections | Hours | Notes |
|---|---|---|---|
| Printing all parts | [§4.10](#410-printed-parts) | 60–100 print hours | Start this **first**, before parts arrive |
| Sorting, inserts | [§5](#5-pre-build-preparation) | 3–5 | Tedious, unskippable |
| Frame | [§6](#6-frame-assembly) | 3–4 | Most of it is squaring |
| Z axis | [§7](#7-z-axis-assembly) | 4–6 | Three of everything |
| XY gantry | [§8](#8-xy-gantry-assembly) | 5–8 | Belt routing is the hard part |
| Toolhead | [§9](#9-toolhead-assembly) | 3–4 | Fiddly, small fasteners |
| Bed | [§10](#10-bed-and-build-plate) | 2–3 | |
| Electronics + wiring | [§11](#11-electronics-bay)–[§12](#12-wiring-and-cable-management) | 8–12 | The longest single stage. Do not rush it. |
| Enclosure | [§13](#13-panels-and-enclosure) | 2–3 | |
| Software + firmware | [§15](#15-software-installation)–[§16](#16-printercfg-explained-line-by-line) | 4–8 | Longer if CAN gives trouble |
| Calibration | [§18](#18-calibration-sequence) | 4–6 | Spread over several sessions |
| **Total** | | **40–60 hours** of hands-on work | Plus print time and shipping waits |

Spread over evenings and weekends, budget **6 to 10 weeks** from parts arriving to a reliable
first print. Builders who try to compress this into one weekend produce a printer that needs
rebuilding.

### Staging advice

1. **Print every part before you order metal.** Printing takes weeks of wall-clock time and costs
   little. Metal arrives in days. Overlap them.
2. **Print two of every small bracket.** You will crack one.
3. **Order fasteners with 20 % surplus.** A build stalled for a week waiting on one M3×8 is the
   most demoralising possible delay.
4. **Do not open the AC work until you are rested.** Never wire mains tired, late, or annoyed.

---
---

# Part 1 — The Machine

## 1. Overview and specifications

The Ultramarine is a fully enclosed CoreXY printer on a 3030 aluminium extrusion frame, with
MGN12 linear rails on all axes, triple independent Z on 1204 ballscrews, a CAN-bus toolhead, and
an AC-heated bed, all driven by Klipper on a Raspberry Pi CM5 paired with a BTT Manta M8P V2
mainboard.

### 1.1 Specifications

These values come from the live `printer.cfg`, which describes a running machine. Anything marked
📋 varies by build.

| Specification | Value | Source |
|---|---|---|
| Kinematics | CoreXY | `kinematics: corexy` |
| Frame | 3030 aluminium extrusion, fully enclosed | — |
| **X travel** | 0 – 365 mm | `stepper_x: position_max: 365` |
| **Y travel** | 0 – 365 mm | `stepper_y: position_max: 365` |
| **Z travel** | −17 – 250 mm | `stepper_z: position_min/max` |
| **Usable print area** | ≈ 350 × 350 mm, meshed 30–320 mm | `bed_mesh: mesh_min/max` |
| Max velocity | 200 mm/s | `max_velocity: 200` |
| Max acceleration | 5500 mm/s² | `max_accel: 5500` |
| Max Z velocity | 8 mm/s | `max_z_velocity: 8` |
| Max Z acceleration | 20 mm/s² | `max_z_accel: 20` |
| Linear motion | MGN12H carriages, 6 × total | BOM |
| Z drive | 3 × 1204 ballscrew, 4 mm lead | `rotation_distance: 4` |
| XY drive | 2 × NEMA17 42 mm, GT2 9 mm belt, 20 T pulleys | BOM |
| Toolboard | BTT EBB36 over CAN bus | `[include ebb36.cfg]` |
| Mainboard | BTT Manta M8P V2 (STM32H723) | `[mcu] serial:` |
| Host computer | Raspberry Pi CM5 | README, `usb.md` |
| Extruder | Orbiter 2.0 / 2.5 (direct drive) | BOM |
| Hotend | Phaetus Rapido HF | BOM |
| Probe | Klicky, magnetic dock | `[include klicky-probe.cfg]` |
| XY homing | Sensorless (StallGuard), no endstops | `virtual_endstop`, `driver_SGTHRS: 35` |
| Z homing | Via Klicky probe | `endstop_pin: probe:z_virtual_endstop` |
| Gantry levelling | 3-point Z-tilt, 0.007 mm tolerance | `[z_tilt] retry_tolerance: 0.007` |
| Bed | AC silicone heaters on cast aluminium tooling plate | BOM |
| Bed max temperature | 110 °C | `heater_bed: max_temp: 110` |
| Bed sensing | **Two** independent thermistors, cross-checked | `[heater_bed]` + `[temperature_sensor heater_bed_2]` |
| Build surface | PEI-coated magnetic spring steel, 350 × 350 mm | BOM |
| Display | BTT mini12864 v2.0 with RGB status LEDs | `[display]`, `[neopixel mini12864]` |
| Power | 24 V 480 W + 24 V 240 W PSUs; AC bed via **one SSR-40 DA**, two fused heater zones | BOM |
| Accelerometer | ADXL345 on the toolhead | `[resonance_tester] accel_chip: adxl345` |
| Recommended nozzle | **0.6 mm** | `slicer_profiles/profiles.md` |
| Recommended slicer | OrcaSlicer | `slicer_profiles/profiles.md` |

> 🖼️ **[CAD-01] Hero render — the finished machine**
> *Show:* a three-quarter render of the complete printer, door closed, panels on, at eye level.
> *Look for:* overall proportions and where the door, display and spool sit — this is the picture students compare their half-built frame against.

> 🟠 **Mini → Ultramarine:** Your Mini's 180 × 180 × 180 mm volume was 5.8 litres. This is about
> 30 litres. That changes what you can print, and it also means a failed print wastes a lot more
> filament — which is exactly why the calibration sections are worth doing properly.

### 1.2 What makes this design what it is

**CoreXY.** Both belt motors stay fixed on the frame; only the lightweight gantry and toolhead
move. Less moving mass means higher acceleration without ringing. The cost is that the belt
paths are geometrically fussy — the two loops must mirror each other exactly, and the X rail must
be perpendicular to the Y rails. [Section 8](#8-xy-gantry-assembly) is mostly about getting those
two things right.

**Triple independent Z.** Three motors, three ballscrews, three separate Klipper steppers. Klipper
probes three points and drives each motor individually until the gantry is parallel to the bed.
You never turn a levelling knob again. The cost is that all three must be mechanically sound —
one slipping coupler and `Z_TILT_ADJUST` will chase its tail forever ([§31.4](#314-z-tilt-doesnt-converge)).

**Ballscrews, not leadscrews.** 1204 ballscrews have far lower friction and backlash than T8
leadscrews, giving a much better Z surface finish. They also transmit any bend or misalignment
straight into the print as Z banding — which is what the **WobbleX** couplings exist to prevent
([§7.6](#76-wobblex-couplings-and-why-they-matter)).

**CAN bus toolhead.** Instead of running eight or ten wires up to the toolhead, the EBB36 lives on
the toolhead and everything reaches it over four conductors: 24 V, ground, CAN_H, CAN_L. Fewer
wires means a thinner, longer-lasting umbilical. The cost is that CAN is unforgiving about
termination and twisting ([§32.1](#321-can-bus-errors--ebb36-disconnects)).

**AC bed, two fused zones, dual thermistors.** A 350 mm bed heated at 24 V would need absurd
current. AC mains heats it fast. Two heater pads share **one** SSR — Klipper has one `heater_bed`
PID loop, so there is nothing to control independently — but each pad carries **its own fuse**,
because protection has to be per-pad to be meaningful
([§11.5](#115-bed-heating--one-ssr-two-fused-zones)). The safety cost is that this is the part of
the machine that can kill you, and it is why two thermistors are cross-checked every 15 seconds
([§16.9](#169-the-dual-thermistor-bed-safety-check)).

**Sensorless homing.** No X or Y endstop switches exist. The TMC2209 drivers detect the motor
stalling when the gantry reaches the frame. Fewer wires and fewer parts, but it needs tuning and
it is sensitive to speed and to mechanical friction ([§18.2](#182-sensorless-homing-tuning)).

> 🖼️ **[CAD-02] Subsystem overview — exploded**
> *Show:* the whole machine pulled apart into its five subsystems (frame, Z, XY gantry, toolhead, electronics bay), each in a different colour, with leader lines naming them.
> *Look for:* how the five parts relate. Print this one large and pin it above the bench.

---

## 2. Subsystem map — what talks to what

Understanding the signal flow makes troubleshooting dramatically faster. When something fails,
you can usually name the two components between which the failure must lie.

```
                         ┌──────────────────────────┐
   MAINS AC ────────────►│ IEC inlet + switch       │
   (120/240 V)           │ + surge arrester         │
                         └────┬─────────┬───────────┘
                              │         │
              ┌───────────────┘         └────────────────┐
              │                                          │
      ┌───────▼────────┐                        ┌────────▼─────────┐
      │ 24 V PSU 480 W │                        │  SSR-40 DA  × 1  │
      │ (motors,board) │                        │ (switches both)  │
      └───────┬────────┘                        └────────┬─────────┘
              │                                          │
      ┌───────▼────────┐                        ┌────────▼─────────┐
      │ 24 V PSU 240 W │                        │  FUSE     FUSE   │
      │ (toolhead etc) │                        │    │        │     │
      │                │                        │ 2 × silicone AC  │
      │                │                        │ heater pads      │
      └───────┬────────┘                        └──────────────────┘
              │                                          ▲
              │  24 V                          control   │ 3-32 V DC
              │                                          │
      ┌───────▼──────────────────────────────────────────┴───────┐
      │  BTT MANTA M8P V2   (MCU: STM32H723)                     │
      │  ─────────────────────────────────────────────────────   │
      │  stepper_x  · stepper_y                (TMC2209, 1.20 A) │
      │  stepper_z  · stepper_z1 · stepper_z2  (TMC2209, 0.50 A) │
      │  heater_bed (PA1) → SSR control                          │
      │  bed thermistor 1 (PB1)  ·  bed thermistor 2 (PB0)       │
      │  5 × electronics-bay fans (PF6-PF9, PA4)                 │
      │  mini12864 display + RGB (SPI, PG0/PF15/PF14/PF13)       │
      └───────┬──────────────────────────────┬───────────────────┘
              │ USB                          │ CAN bus (twisted pair
              │                              │  + 24 V, 4 conductors)
      ┌───────▼────────────┐        ┌────────▼──────────────────┐
      │ Raspberry Pi CM5   │        │  BTT EBB36  (on toolhead) │
      │ ───────────────    │        │  ───────────────────────  │
      │ Klipper            │        │  extruder stepper         │
      │ Moonraker (API)    │        │  hotend heater + sensor   │
      │ Mainsail / Fluidd  │        │  4010 hotend fan          │
      │ USB auto-sync      │        │  5015 part-cooling fan    │
      └───────┬────────────┘        │  Klicky probe input       │
              │                     │  ADXL345 accelerometer    │
              │ Ethernet / WiFi     └───────────────────────────┘
              ▼
       Your browser, OrcaSlicer
```

### 2.1 Reading the map when something breaks

| Symptom | The fault is between… | Go to |
|---|---|---|
| Web page won't load | Your browser and the CM5 | Network, [§32.3](#323-mainboard-wont-boot) |
| "Lost communication with MCU 'mcu'" | CM5 and Manta (USB) | [§32.2](#322-usb-disconnects-cm5--mainboard) |
| "Lost communication with MCU 'EBBCan'" | Manta and EBB36 (CAN) | [§32.1](#321-can-bus-errors--ebb36-disconnects) |
| Hotend won't heat | EBB36 and heater cartridge | [§29.1](#291-heater-verification-failed--thermal-runaway) |
| Bed won't heat | Manta → SSR → AC → heater | [§30.1](#301-bed-doesnt-heat-at-all) |
| One axis doesn't move | Manta driver → motor cable → motor | [§32.5](#325-stepper-driver-errors) |
| Z probing is erratic | Klicky → wiring → EBB36 | [§31.3](#313-probe-gives-inconsistent-readings) |

---

## 3. Tools required

Building without the right tools produces stripped fasteners, damaged printed parts, and a build
that stalls. Buy the essentials before you start.

### 3.1 Essential

| Tool | Notes for a first-time builder |
|---|---|
| Metric hex (Allen) keys: 1.5, 2, 2.5, 3, 4, 5 mm | **Buy quality.** Cheap keys round off, and a rounded M3 in a printed part means cutting the part off. Ball-end keys for access, plain keys for final tightening. |
| Hex screwdriver handles (2 mm, 2.5 mm) | Far faster and gentler than L-keys for the hundreds of M3s. Worth every cent. |
| Phillips and flat screwdrivers | For PSU and SSR terminals. A #2 Phillips with a long shaft. |
| Metric open-end wrenches: 8, 10, 13 mm | Nyloc nuts, bed standoffs. |
| **Digital calipers** | Used constantly. 150 mm is enough. |
| **Steel machinist's square** | The single most important tool in the frame section. A cheap combination square is fine if it is actually square — check it against a known edge. |
| Steel rule or tape, 500 mm+ | Frame diagonals. |
| **Soldering iron with fine tip** | For heat-set inserts and wire joints. Temperature-controlled preferred. |
| **Heat-set insert tips** | A flat-ended tip that matches your inserts. Using a normal conical tip pushes inserts in crooked. |
| Wire strippers | Automatic strippers save a lot of time over 200 wires. |
| **Ferrule crimper (hex or square jaw)** | Mandatory for the AC and high-current DC work. Pliers are not a substitute. |
| **JST-XH / Dupont ratcheting crimper** | For signal connectors. |
| Heat gun | Heatshrink. A hairdryer is not hot enough. |
| **Multimeter** | Continuity, DC volts, AC volts, resistance. A £20 meter is fine; do not skip it. |
| Flush cutters | Trimming zip-ties and printed part supports. |
| Deburring tool or fine file | Every cut extrusion end. |
| Isopropyl alcohol (99 %) + lint-free cloth | Bed prep and rail cleaning. |

### 3.2 Strongly recommended

| Tool | Why |
|---|---|
| **Smartphone belt-tension app** (Prusa's Belt Tuner, Gates Carbon Drive, or Spectre) | Turns "does it feel right" into a number. See [§34.1](#341-belt-tension-check). |
| Blue (medium) threadlocker | Grub screws on pulleys and couplers. |
| PTFE-based grease | Ballscrews and rails. **Not** lithium grease on plastic-adjacent parts. |
| Dial test indicator + magnetic base | Makes gantry squaring and Z alignment objective instead of approximate. |
| Small parts organiser (20+ compartments) | Sorting fasteners is not optional on a build this size. |
| Label maker or masking tape + marker | Label every wire at both ends. You will thank yourself in Section 12. |
| Long-reach ball-end hex keys | Some frame bolts are genuinely awkward. |
| Second person, for one hour | Lifting the top frame square onto the uprights alone is possible but unpleasant. |

> 🖼️ **[PHOTO-01] The tool kit laid out**
> *Show:* every essential tool from the table above, laid out and labelled.
> *Look for:* the ferrule crimper and the flat-ended heat-set tip specifically — these are the two tools people substitute and regret.

### 3.3 Optional but useful

- Miter saw with a non-ferrous blade — only if cutting your own extrusion.
- M5/M6 taps and cutting fluid — only for tapping extrusion ends ([§5.4](#54-tapping-extrusion-ends)).
- Thermal camera or IR thermometer — for verifying bed uniformity and finding hot terminals.
- Bench power supply — for bench-testing fans and heaters safely.

---

## 4. Bill of materials

Quantities are for one printer. **Order 20 % extra of every fastener.**

📋 marks dimensions that should be confirmed against the CAD model before ordering — see
[Appendix G](#g-known-documentation-conflicts--verify-before-you-build).

### 4.1 Frame and structure

| Item | Qty | Notes |
|---|---|---|
| 3030 aluminium extrusion, 750 mm 📋 | 4 | Vertical uprights |
| 3030 aluminium extrusion, 500 mm 📋 | 12 | Top and bottom squares, electronics area |
| 3030 aluminium extrusion, 340 mm 📋 | 1 | Deck support / cross member |
| 20 × 20 aluminium profile, 500 mm 📋 | 1 | Deck rail / accessory mounting |
| 30 × 30 corner brackets | 16 min | Buy 24; you will use them |
| 3030 DIN rail mount brackets | 2 | Or print `din_3030_mount.stl` |
| Adjustable rubber feet | 4 | Or print `printer_foot.stl` with felt pads |

> 💡 **Why 3030 and not 2020:** A 350 mm bed and a fast-accelerating gantry put real torsional
> load into the frame. 3030 is roughly 3× stiffer in torsion than 2020 for the same length. On a
> Mini the frame is a rigid steel casting; here, stiffness comes from section size and from your
> squaring work.

### 4.2 Linear motion

| Item | Qty | Notes |
|---|---|---|
| MGN12 rail, 450 mm 📋 | 3 | X rail, Y-left, Y-right |
| MGN12 rail, 350 mm 📋 | 3 | Z axis — two front, one rear |
| MGN12**H** carriage blocks | 6 | One per rail. "H" = long block. |
| 1204 ballscrew assembly (screw + flanged ball nut) | 3 | 2 front, 1 rear. **4 mm lead.** |
| 5 × 8 mm flexible shaft couplers | 3 | Motor shaft 5 mm → screw 8 mm |
| 8 mm precision rotary shaft | 3 | Z idle / support shafts |
| Precision ball bearings for screw tops | 2 min per Z station | Confirm size against CAD 📋 |

> ⚠️ **Do not substitute T8 leadscrews.** The Klipper config uses `rotation_distance: 4`, which is
> correct for a 4 mm-lead ballscrew. A T8 leadscrew has 8 mm lead and would need
> `rotation_distance: 8`. Fitting the wrong one and not changing the config gives you a printer
> where every Z dimension is exactly half or double what it should be.

### 4.3 Belts and pulleys

| Item | Qty | Notes |
|---|---|---|
| GT2 belt, 9 mm wide | ~4 m | Two CoreXY loops. Buy 5 m. |
| GT2 20 T pulley, 9/10 mm width, 5 mm bore, **no flange** | 10 | Motor pulleys, front mounts, XY connectors, rear idlers |
| Smooth idler, 9/10 mm width, 5 mm bore | 4 | Belt-back-side idlers |
| M3 SHCS + bearings for idler stacks | as required | Confirm bearing spec against CAD 📋 |

> 💡 **Why flangeless toothed pulleys:** In a CoreXY belt path, belts cross planes. Flanges catch
> the belt edge at these transitions and shred it. Where the design specifies no flange, it means it.

### 4.4 Stepper motors

| Item | Qty | Notes |
|---|---|---|
| NEMA17 42 mm (Hanpose or equivalent) 📋 | 2 | CoreXY A and B motors |
| NEMA17 60 mm (Hanpose or equivalent) 📋 | 3 | Z motors |
| NEMA14 (Orbiter 2, normally pre-fitted) | 1 | Extruder |

Configured run currents (from `printer.cfg`): **XY 1.20 A**, **Z 0.50 A**. See
[§18.11](#1811-stepper-current-verification) — motors that are too hot to hold are running too
much current.

### 4.5 Toolhead

| Item | Qty | Notes |
|---|---|---|
| Phaetus Rapido hotend, HF variant | 1 | Check whether yours ships PT1000 or 100 K NTC — the config must match |
| Orbiter v2.0 / v2.5 extruder | 1 | Direct drive |
| BTT EBB36 CAN toolboard | 1 | Get the **CAN** version, not the USB-only one |
| 5015 radial blower, 24 V | 1 | Part cooling |
| 4010 axial fan, 24 V | 1 | Hotend heatsink cooling |
| EVA3 toolhead printed set | 1 set | Plus the Klicky and EBB36 mods listed in `STLs/stls_here.md` |
| 4 mm Bowden coupler + brass coupler ring | 1 | |
| PTFE tube, 1.75 mm bore | short length | Extruder → hotend |
| Klicky probe assembly (body, latch, dock) | 1 | |
| 3 × 6 mm magnets with screw hole | 6 min | Klicky |
| ADXL345 accelerometer | 1 | On EBB36; required for Input Shaper |

### 4.6 Bed assembly

| Item | Qty | Notes |
|---|---|---|
| Cast aluminium tooling plate, 350 × 350 × 8 mm | 1 | Cast, not rolled — cast is flatter |
| Silicone AC heater pads, 300 × 150 mm | 2 | Two zones, **individually fused**, both switched by one SSR |
| Magnetic spring steel sheet, PEI-coated, 350 × 350 mm | 1 | Buy a second; they wear |
| Bed thermistors (100 K EPCOS B57560G104F) | **2** | The config cross-checks them for safety |
| M3 × 40 BHCS | 3 | Three-point mounting |
| M3 heat-set inserts, tapered (94180A307 equivalent) | as required | |
| WAGO 221 lever nuts | as required | |
| 5010 fans for chamber air circulation | 2 | |

> ⚠️ **The bed uses two thermistors and the safety macro compares them.** Fitting only one will
> cause `BED_TEMP_CHECK` to trip and cut your heaters. Fit both, and bond both firmly to the plate.

### 4.7 Electronics

| Item | Qty | Notes |
|---|---|---|
| Raspberry Pi CM5 | 1 | Klipper host |
| **BTT Manta M8P V2** mainboard | 1 | STM32H723. Takes the CM5 directly. |
| BTT EBB36 toolboard | 1 | (listed above) |
| mini12864 LCD v2.0 | 1 | With EC11 encoder and RGB |
| 24 V PSU, 480 W | 1 | Motors, mainboard, bed-adjacent loads |
| 24 V PSU, 240 W | 1 | Toolhead and auxiliary systems |
| SSR-40 DA | **1** | Switches **both** bed heater zones together |
| AC fuse holder + fuse | **2** | ⚠️ **One per heater pad**, sized to that pad's current — see [§11.5](#115-bed-heating--one-ssr-two-fused-zones) |
| AC inlet, IEC C14 with integrated rocker switch | 1 | Fused type preferred |
| Surge arrester / inrush limiter | 1 | |
| DIN rail, 500 mm | 2 | |
| WAGO / lever-nut blocks, ferrules | as required | |
| 18 AWG silicone wire, multiple colours | ~10 m | 24 V distribution |
| 16 AWG silicone wire | ~5 m | AC and high-current DC |
| 22 AWG silicone wire | ~10 m | Signals, fans |
| 2-pin and 4-pin connectors | as required | Fans, thermistors, CAN |
| 120 Ω resistor | 1 | CAN termination at the mainboard end |

> 💡 **Why two 24 V supplies:** Separating the toolhead and auxiliary loads from the motor and
> mainboard supply keeps heater switching noise off the rail that feeds the CAN transceiver and
> the stepper drivers. It is a reliability decision, not a capacity one.

### 4.8 Endstops and probe

There are **no X or Y endstop switches**. X and Y home sensorlessly using the TMC2209 drivers'
StallGuard feature. Z homes off the Klicky probe.

| Item | Qty |
|---|---|
| Klicky probe (printed body + microswitch + magnets) | 1 |
| Printed probe dock | 1 |

### 4.9 Fasteners (approximate)

| Item | Qty |
|---|---|
| M3 SHCS assorted (6, 8, 10, 12, 16, 20, 30 mm) | ~200 |
| M3 heat-set inserts | ~80 |
| M5 BHCS assorted (8, 10, 12, 16 mm) | ~80 |
| M5 T-nuts | ~80 |
| M5 washers | ~40 |
| M3 nyloc nuts | ~20 |

> Order **at least 20 % extra of everything.** A stalled build waiting on a single missing M3 × 8
> is the worst kind of delay.

### 4.10 Printed parts

The full list, with filenames, is in `STLs/stls_here.md`. A condensed checklist is in
[Appendix C](#c-printed-parts-checklist).

**Material — this matters more than anything else about the printed parts.**

Every structural printed part lives inside a chamber that runs at 50–60 °C. Ranked best to
acceptable:

1. **PC or PC-CF** — best heat resistance and stiffness. Hard to print; needs a dry, hot chamber.
2. **ASA / ABS** (or CF-filled versions) — the practical sweet spot. Good heat resistance, prints
   reliably in an enclosure.
3. **PET-CF / PETG-CF** — stiff and heat-tolerant, easy to print.
4. **PETG** — acceptable for non-structural parts and panels only.

❌ **PLA is not acceptable for any part inside the chamber.** It softens at roughly 55 °C, which
your chamber will reach. PLA gantry parts creep under load and eventually fail, usually mid-print,
usually expensively.

**Recommended print settings** (from `STLs/stls_here.md`):

| Setting | Value |
|---|---|
| Nozzle | 0.4 mm |
| Layer height | 0.2 mm |
| Walls | 4–5 |
| Top / bottom layers | 4–5 |
| Infill | 35–45 % |
| Infill pattern | Gyroid, cubic, or adaptive cubic |

> 🟠 **Mini → Ultramarine:** You will be printing these parts *on your Mini*, which cannot make
> ABS easily in open air. Two workable options: print in PETG-CF (which the Mini handles), or
> build a temporary cardboard/acrylic enclosure around the Mini for the ASA parts. Many people
> print the frame parts in PETG, build the machine, and then reprint the critical parts in ASA on
> the Ultramarine itself. That is a legitimate strategy — just plan to actually do the reprint.

### 4.11 Where to print parts and replacements

You do not have to print everything on one machine, and for the parts that matter you should not.
Pick the printer that matches the material.

| Printer | Best for | Material | Notes |
|---|---|---|---|
| **BambuLab P1S** | ⭐ **Structural parts — the best option available** | **ABS+** | Enclosed and proven. ABS+ has printed with **very good results** on it. ⚠️ **Use 3D Lac** on the plate |
| **Prusa MK4 (enclosed)** | **Smaller parts only** | ABS / ASA | ⚠️ **Preheat the enclosure for a while first**, and the **door must stay CLOSED for the entire print** — see the warning below |
| **Any printer** | Non-structural parts, panels, jigs | **PETG** | PETG needs no enclosure. If a part is specified PETG, any machine will do |
| **The Ultramarine itself** | Everything, once it runs | ABS / ASA / PC / CF-filled | The reason you built it. Reprint your PETG placeholder parts here |

#### On the BambuLab P1S — the recommended route

**ABS+ on the P1S is the recommended combination for structural replacement parts.** It has been
tested and gives good results.

⚠️ **Use 3D Lac (or an equivalent adhesion spray) on the build plate.** ABS+ on a large flat
footprint will lift a corner without it, and a part that lifted part-way through is weaker than it
looks even if it finishes.

- Keep the P1S closed for the whole print.
- Let it heat-soak before starting, exactly as you would on the Ultramarine.
- Dry the ABS+ if it has been open to the air for a while ([§22.4](#224-filament-drying)).

#### On the enclosed Prusa MK4 — small parts only

The enclosed MK4 will do **smaller** ABS/ASA parts, with two conditions:

1. **Preheat the enclosure for some time before starting.** A cold enclosure gives you the warping
   you were trying to avoid.
2. ⛔ **The door must be CLOSED, and must NOT be opened at any point during the print.**
   Opening it drops the chamber temperature within seconds, and the result is a weak layer at
   exactly that height — or a lifted corner and a failed print. If you need to check on it, look
   through the door.

Do not attempt large structural parts here. Use the P1S.

#### Which material for which part

| Part type | Minimum acceptable | Preferred |
|---|---|---|
| Gantry, XY mounts, X-axis mounts | ASA / ABS+ | PC-CF or ABS-CF |
| Z motor mounts, ballscrew stabilisers, bed mounts, WobbleX | ASA / ABS+ | PC-CF or ABS-CF |
| Toolhead (EVA3, EBB36 mount, Klicky mount) | ASA / ABS+ | PC / PC-CF — it sits next to the hotend |
| Probe dock | ASA / ABS+ | ASA — ⚠️ heat kills the dock magnets, so heat resistance matters here |
| Electronics covers, enclosure panels | PETG | ASA |
| Feet, LCD mounts, cable chain mounts, handles | PETG | PETG is genuinely fine here |

#### ⚠️ If a part keeps breaking

If a part fails **repeatedly**, even when printed in a stronger material, that is not your printing
— it is either the part's design or a load it was never meant to take. Do not keep reprinting it in
the same material and hoping.

> 📧 **Contact: meciar.michal7@gmail.com**
>
> Send which part it is, what material you printed it in, and **a photo of how it broke** — the
> fracture surface says a great deal. Michal will either get the part printed for you in a strong
> enough material, or improve the part's design so it stops failing.
>
> A part that breaks twice for you will break for everyone else building this machine too, so
> reporting it genuinely helps. Please also open an issue on
> [the repository](https://github.com/Ultramarine3D/Ultramarine) so the fix reaches other builders.

🔧 **Before you email:** check the obvious causes first — printed in PLA by mistake, too few walls
(needs 4–5), infill below 35 %, printed with the layers perpendicular to the load, or a stripped
heat-set insert rather than a broken part.

> 🖼️ **[PHOTO-02] Printed parts, sorted by subsystem**
> *Show:* all printed parts grouped into labelled bags or trays by subsystem.
> *Look for:* how much there is. Seeing the full set at once is what convinces people to sort before building.

---
---

# Part 2 — Building the Printer

## 5. Pre-build preparation

Do not skip this section to "get started faster." Every hour here saves three later.

### 5.1 Inventory and sort

Open every package and count everything against [Section 4](#4-bill-of-materials) **before** you
start building. Finding a missing rail on day one costs a week of shipping. Finding it on day ten
costs a week of shipping *and* a stalled half-built machine on your bench.

🔧 **Technique — fastener sorting.** Get a 20+ compartment organiser. Label each compartment with
the size (`M3×8`, `M3×12`…). Sorting 400 screws takes about 45 minutes and turns every later step
from "hunt for the right screw" into "reach into the right box." This is the highest
return-on-time action in the whole build.

Group printed parts into labelled bags by subsystem:
- Frame and feet
- Z axis (motor mounts, ballscrew stabilisers, WobbleX, bed mounts)
- XY (motor mounts, idler mounts, X axis mounts)
- Toolhead (EVA3 set, Klicky, EBB36 mount)
- Electronics covers
- Enclosure (hinges, handles, panel mounts, LCD mounts)

✅ **Checkpoint:** every line of the BOM ticked off, or explicitly noted as on order.

### 5.2 Inspect the printed parts

Before anything gets assembled, check every printed part:

- **Layer adhesion:** try to split a test part along a layer line with your hands. It should not
  yield. If parts delaminate easily, your chamber was too cold when printing — reprint them.
  See [§4.11](#411-where-to-print-parts-and-replacements) for which machine to reprint them on.
- **Warping:** parts must sit flat. A warped motor mount tilts a ballscrew.
- **Holes:** test-fit an M3 screw through every clearance hole. Clear elephant-foot squish from
  the first layer with a deburring tool or a drill bit turned by hand.
- **Support residue:** remove all of it. A fragment inside a bearing seat is invisible and ruins
  alignment.

### 5.3 Install heat-set inserts

Roughly 80 brass inserts go into printed parts. This is a skill, and the first five will be bad —
practise on a scrap part.

🔧 **Technique:**

1. Set the soldering iron to **200–230 °C**. Hotter melts too much plastic; cooler forces you to
   push and the insert goes in crooked.
2. Fit a **flat-ended insert tip**, not a conical soldering tip.
3. Sit the insert on the hole, place the iron in it, and let **heat** do the work. Apply almost no
   force — the insert should sink under its own weight plus a gram of pressure.
4. Keep the iron **vertical**. Sight it against a square edge if you are unsure. A crooked insert
   makes a crooked bolt and a crooked assembly.
5. Stop when the insert is **flush** with the surface. Slightly below flush is fine. Proud is not —
   it will hold the next part off its mating face.
6. Let the part cool **completely** (60+ seconds) before touching it. Molten plastic around a
   fresh insert has zero strength.

> 🖼️ **[PHOTO-03] Heat-set insert going in**
> *Show:* three frames side by side: iron vertical with insert seated correctly; a crooked insert; an over-heated one with plastic welling out.
> *Look for:* the difference between flush-and-straight and the two failure modes. This is a skill photo, not a reference photo.

⚠️ **Do not over-heat.** If plastic wells up and out of the hole, you are too hot or pushing too
hard. That plastic is coming from the material that was supposed to grip the insert.

Parts that typically need inserts: the EVA3 toolhead plates, Z motor mounts, XY motor and idler
mounts, the bed mounts, the probe dock and Klicky mount, LCD mounts, and cable management parts.

✅ **Checkpoint:** pick three inserts at random and try to pull them out with a screw and pliers.
They should not budge.

### 5.4 Tapping extrusion ends

Only some extrusions need end-tapping — realistically, **only the bed extrusions**. Check your
CAD 📋 before tapping anything.

If tapping:
1. Use an **M5 or M6 tap** as the joint requires.
2. Use **cutting fluid** (or WD-40 in a pinch).
3. Turn in half a turn, back out a quarter turn to break the chip. Repeat.
4. Blow the chips out afterwards. Aluminium swarf inside a slot will jam a T-nut later.

### 5.5 Cutting extrusion (only if not pre-cut)

If your supplier did not cut to length:

- Length tolerance must be **±0.2 mm or better**. Anything worse and the frame cannot be squared.
- Ends must be **square to the length**, not just cut. A 1° end-cut error becomes a visible frame
  error.
- A **miter saw with a non-ferrous (negative-rake) blade** is the cleanest method. A hacksaw and
  mitre box works but you must file the ends true afterwards.
- **Deburr every cut end** — both the outer edges and the inside of the slots.

⚠️ Never cut aluminium extrusion with a wood blade at wood speeds. It grabs violently.

---

## 6. Frame assembly

**The frame is the printer.** Everything else references it. A frame that is out of square by
1 mm produces parts that are out of square by 1 mm, forever, in every print, and no amount of
software calibration will correct it.

> 🟠 **Mini → Ultramarine:** You have never had to do this. The Mini's frame was a machined casting
> that arrived square. You are now the machinist. Budget three to four hours and do not rush the
> measuring.

Time: 3–4 hours. Most of it is measuring.

### 6.1 Understand the target

You are building a rectangular box:

- A **bottom square** of four 500 mm 📋 3030 extrusions
- Four **750 mm 📋 vertical uprights**, one at each corner
- A **top square** of four more 500 mm 📋 extrusions
- **Deck supports** and a **20 × 20 accessory rail** in the lower section for electronics

"Square" here means three separate things, all of which must be true:
1. Each horizontal square has **equal diagonals** (it is a rectangle, not a parallelogram)
2. Each upright is **perpendicular** to the bottom square in both directions
3. The top square is **directly above** the bottom square (not skewed or twisted)

> 🖼️ **[CAD-03] Frame — overall dimensions**
> *Show:* the bare frame with every extrusion length dimensioned and labelled, in an isometric view.
> *Look for:* ⚠️ **the actual lengths — this render is the authority, not the BOM table.** See Appendix G for the lengths that are disputed.

### 6.2 Build the bottom square

1. Work on a **flat reference surface** — a kitchen worktop, a flat table, a piece of MDF. Not
   carpet, not a workbench with a twist in it.
2. Lay out the four bottom horizontals in a rectangle.
3. Join the corners with **30 × 30 corner brackets**, using M5 T-nuts and M5 × 14 SHCS. Use **two
   brackets per corner** if the design allows.
4. **Leave everything finger-tight.** You cannot square a frame that is already clamped.

⛔ **Stop — slide in your T-nuts now.**

Before you close any corner, slide **all the M5 T-nuts you will ever need** into the inward-facing
slots of each extrusion. Once the frame is bolted up, most slots are closed at both ends and there
is no way to add a T-nut without dismantling the frame.

Count generously: for each bottom extrusion, ~6 T-nuts in the top-facing and inward-facing slots.
Loose spare T-nuts rattling in a slot cost nothing. Missing ones cost a teardown.

> 💡 **Drop-in T-nuts exist** and can be added later without disassembly. They are more expensive
> and slightly less secure than standard slide-in T-nuts. Buying a handful as an insurance policy
> is a good idea even if you plan to slide all of yours in now.

> 🖼️ **[CAD-04] Corner joint — exploded, with T-nuts**
> *Show:* one bottom corner exploded: two extrusions, corner bracket, M5 screws, and the T-nuts already sitting in the inward-facing slots.
> *Look for:* how many T-nuts go in *before* the corner closes, and which slots they sit in.

### 6.3 Square the bottom

This is the technique you will use four or five times in this build. Learn it once.

1. Measure **diagonal A** — corner-to-opposite-corner, inside edge to inside edge. Write it down.
2. Measure **diagonal B** — the other pair of corners. Write it down.
3. If A > B, the rectangle leans one way. Push the two corners of diagonal A **toward each other**
   (equivalently, pull B's corners apart).
4. Re-measure both. Iterate.
5. **Target: the two diagonals within 0.5 mm of each other.** With care you can reach 0.2 mm.

🔧 **Technique:** measure from the same feature every time — always the inside corner of the slot,
or always the outside edge. Mixing references introduces errors bigger than the ones you are
chasing. A steel tape hooked over a corner is fine; just be consistent.

6. When square, tighten the corner bracket bolts in a **star pattern** — go around the square twice,
   tightening each bolt partway on the first pass and fully on the second. Tightening one corner
   completely before starting the next pulls the frame out of square.
7. **Re-measure the diagonals after tightening.** They move. If they moved more than 0.3 mm,
   loosen, re-square, retighten.

> 🖼️ **[DIAG-01] Measuring frame diagonals**
> *Show:* a top-down diagram of the bottom square with both diagonals drawn, arrows showing which corners to push together when diagonal A is longer than B.
> *Look for:* that you measure from the *same feature* every time — mark the reference corner on the diagram.

✅ **Checkpoint:** bottom square diagonals equal within 0.5 mm, *after* full tightening.

### 6.4 Add the vertical uprights

1. Stand a 750 mm 📋 upright at each corner of the bottom square.
2. Fix each with **two corner brackets** — one on each adjacent face. One bracket per upright
   allows the upright to rotate; two locks it.
3. Hold your **machinist's square** against the upright and the bottom extrusion while tightening.
   Check **both faces** of each upright — an upright can be perfectly vertical in one plane and
   leaning in the other.
4. Tighten in stages, alternating between the two brackets.

💡 **Why this matters so much:** a 0.5° lean at the bottom of a 750 mm upright puts the top of that
upright **6.5 mm** out of position. The gantry rails mount at the top. Errors here are amplified,
not averaged.

> 🖼️ **[CAD-05] Upright joint, and why lean is amplified**
> *Show:* one upright bolted to the base with two brackets, plus a small side diagram showing a 0.5° lean at the bottom becoming 6.5 mm of error at the top.
> *Look for:* both brackets per upright, on adjacent faces — one bracket is not enough.

✅ **Checkpoint:** all four uprights square to the base in both planes.

### 6.5 Build and fit the top square

1. Build a second square from four 500 mm 📋 extrusions, exactly as in [§6.2](#62-build-the-bottom-square)
   and [§6.3](#63-square-the-bottom). **Slide in its T-nuts first** — the top square carries the Y
   rails and the XY motor mounts, so it needs plenty.
2. **Get a second person.** Lift the assembled top square onto the four uprights and bolt it down
   with corner brackets, loosely.
3. Square the top square's diagonals with the same method.
4. Now check **twist**: measure the vertical distance from the bench to the top square at all four
   corners. They should all match. If one corner sits high, the box is twisted — loosen that corner
   and let it settle before retightening.
5. Tighten everything in a star pattern, working around the frame twice.

### 6.6 Deck supports and accessory rail

1. Fit the 340 mm 📋 3030 cross member(s) between the front and rear of the frame at the height
   given in the CAD 📋. These carry the printed deck panels and the electronics tray.
2. Fit the 20 × 20 profile along the lower deck for electronics and accessory mounting.
3. Leave these **lightly tightened** — final positions may shift once the gantry and electronics
   are in place.

### 6.7 Final frame verification

Set the frame on its feet and check every one of these:

| Check | Target | If it fails |
|---|---|---|
| Bottom diagonals equal | within 0.5 mm | Loosen that corner, re-square, retighten |
| Top diagonals equal | within 0.5 mm | Same |
| Each upright perpendicular (both faces) | square reads true | Loosen the two brackets, re-square |
| No twist (corner heights equal) | within 0.5 mm | Loosen the high corner |
| Frame does not rock on a flat floor | zero rock | Adjust the feet — this is what they are for |
| Push the top corners diagonally: does it rack? | negligible movement | **Retighten all corner brackets.** A racking frame causes ringing forever. |

> 🖼️ **[CAD-06] Completed frame, ready for the gantry**
> *Show:* the finished squared frame on its feet, with deck supports and the 20×20 accessory rail in place.
> *Look for:* the state your frame should be in before Section 7. Compare yours against this before continuing.

⛔ **Stop. Do not proceed to Section 7 until every row above passes.**

Everything from here on assumes the frame is a true rectangular prism. It is far cheaper to fix
now than after the gantry, bed, and wiring are installed.

✅ **Checkpoint:** photograph the finished frame from several angles for your build log.

---

## 7. Z axis assembly

The Ultramarine uses **three independent Z motors**: front-left, front-right, and rear-centre. Each
drives a 1204 ballscrew, and each is a separate stepper in Klipper (`stepper_z`, `stepper_z1`,
`stepper_z2`). Klipper's `Z_TILT_ADJUST` probes three points and drives each motor individually
until the gantry is parallel to the bed.

> 🟠 **Mini → Ultramarine:** Your Mini had one Z motor and one screw, and levelling was purely a
> software mesh. Here the machine physically tilts itself flat before meshing. This is much better,
> but it only works if all three stations are mechanically identical and free-running. A single
> stiff or slipping station makes `Z_TILT_ADJUST` fail to converge and you cannot print.

Time: 4–6 hours. You are building the same station three times.

### 7.1 Understand the layout

Each of the three Z stations consists of:
- A **printed motor mount** at the bottom of the frame (`z_motor_mount_left/right/rear.stl`)
- A **NEMA17 60 mm stepper**
- A **5 × 8 mm flexible coupler**
- A **1204 ballscrew** with a flanged ball nut
- A **printed ballscrew stabiliser** at the top (`ball_screw_stabilizer*.stl`) holding a bearing
- An **MGN12 rail (350 mm 📋)** with an MGN12H carriage
- A **printed rail/ballscrew/bed mount** (`linear_rail_ballscrew_bed_mount*.stl`) joining carriage,
  ball nut, and bed
- A **WobbleX** coupling and spacer between ball nut and bed mount

> 🖼️ **[CAD-07] One Z station — exploded**
> *Show:* a single Z station fully exploded top to bottom: motor, mount, coupler, ballscrew, ball nut, WobbleX, spacer, bed mount arm, MGN12H carriage, rail, top stabiliser and bearing.
> *Look for:* the order of the stack. You will build this three times, so learn it once from this image.

💡 **Why a rail *and* a screw at each station:** the rail carries all the load and defines the
direction of travel. The screw only pushes up and down. Separating "carry the load" from "provide
the motion" is what makes the Z axis both stiff and smooth.

### 7.2 Mount the three Z motors

1. **Slide M5 T-nuts into the uprights and bottom extrusions first.**
2. Bolt the printed motor mount to the frame — left and right mounts to the inside faces of the
   front uprights at the bottom; the rear mount centred on the rear bottom extrusion.
3. Bolt a NEMA17 60 mm stepper to each mount with **M3 × 8 SHCS** into the motor's tapped face.
4. Orient all three motors so their **cable exits in a sensible direction** for routing to the
   electronics bay. Deciding this now saves rework in Section 12.

> 🖼️ **[CAD-08] Z motor mounts — all three positions**
> *Show:* a bottom-up view of the frame showing the front-left, front-right and rear-centre motor mounts in place, with the rear one clearly centred.
> *Look for:* which printed mount goes where — left and right are mirrored, not identical.

### 7.3 Install the Z linear rails

Rail mounting is where most Z binding comes from. Do it deliberately.

🔧 **Technique — mounting a linear rail so it does not bind:**

1. Slide the rail's mounting bolts loosely into place — **do not tighten any of them yet**.
2. Push the rail firmly against one reference face of the extrusion slot along its whole length.
   The slot wall is your straightedge.
3. Start tightening from the **centre bolt**, then work outward alternately (centre, then one left,
   then one right, then two left…). Never start at one end.
4. Tighten each bolt only to **snug** on the first pass, then to final on a second pass in the same
   sequence.
5. When done, slide the carriage by hand along the full length. **It must feel identical everywhere.**
   Any tight spot means the rail is bowed by its own mounting.
6. If it binds: loosen every bolt, work the carriage end to end several times to let the rail
   relax, and retighten from the centre.

> 🖼️ **[DIAG-02] Rail bolt tightening sequence**
> *Show:* a rail drawn flat with its bolt holes numbered in the order they are tightened — centre first, then alternating outward.
> *Look for:* that you never start at an end. This diagram applies to every rail on the machine.

⚠️ **Immediately fit the carriage end-stops** (printed clips or the supplied set screws) after
sliding a carriage on. If an MGN12H block runs off the end of a rail, its ball bearings fall out
and the block is scrap.

### 7.4 Install ballscrews and couplers

1. Slide a 5 × 8 flexible coupler onto each motor shaft (the 5 mm bore side). Tighten the grub
   screw **onto the flat** of the shaft. If your shaft has no flat, file one — a grub screw on a
   round shaft will slip, and a slipping Z coupler is the classic cause of `Z_TILT_ADJUST` failing
   to converge.
2. Drop the ballscrew into the 8 mm side of the coupler from above. Tighten that grub screw.
3. ⚠️ **Leave a ~1 mm gap between the motor shaft end and the screw end inside the coupler.**
   Never bottom them out against each other. Bottoming them out loads the motor's bearing axially,
   which kills the motor and adds Z noise.
4. Apply **blue threadlocker** to both grub screws. These are the fasteners most likely to work
   loose, and they are the ones with the worst failure mode.

> 🖼️ **[CAD-09] Coupler — section view showing the 1 mm gap**
> *Show:* a cut-through of the flexible coupler with the motor shaft and ballscrew inside, the ~1 mm gap between them dimensioned, and both grub screws seated on shaft flats.
> *Look for:* ⚠️ the gap. Bottoming the shafts out kills the motor bearing, and this is the only image that shows it clearly.

### 7.5 Install the top ballscrew stabilisers

Each ballscrew passes through a bearing in a printed stabiliser bracket near the top of its upright.

1. Bolt the stabiliser bracket loosely to the frame.
2. Drop the bearing in and pass the ballscrew through it.
3. **Do not force alignment.** With the bracket loose, spin the screw by hand — let the bracket
   find the position where the screw runs without wobble. Then tighten the bracket.
4. The bearing constrains the screw's top laterally but must allow completely free rotation.

> 🖼️ **[CAD-10] Top ballscrew stabiliser**
> *Show:* the printed stabiliser bracket at the top of an upright, with the bearing seated and the ballscrew passing through.
> *Look for:* that the bracket is positioned by the screw, not the other way round — it is bolted last.

✅ **Checkpoint:** spin each ballscrew by hand from the coupler end. It should turn with almost no
resistance and no visible wobble at the top. Any wobble or catching means the motor mount,
stabiliser, and screw are not collinear — fix it now.

### 7.6 WobbleX couplings and why they matter

The `wobble_x.stl` and `wobble_x_spacer.stl` parts sit between each ball nut and its bed mount.

💡 **Why they exist:** no ballscrew is perfectly straight, and no motor mount is perfectly aligned.
As the screw turns, the ball nut traces a small circle — it moves sideways as well as up. If the
ball nut is bolted rigidly to the bed carrier, that sideways motion is transmitted into the bed,
and because the wobble repeats once per screw revolution, it appears in your print as a **periodic
horizontal band every 4 mm of Z height**. That is Z banding.

A WobbleX coupling constrains the connection **only in the vertical direction**. Vertical motion
passes through rigidly; lateral wobble is absorbed. The result is a Z axis whose surface finish is
set by the rails, not by the screw's straightness.

**Fitting:**
1. Assemble the WobbleX and its spacer per the CAD 📋 between the flanged ball nut and the printed
   bed mount.
2. ⚠️ **Do not over-tighten.** A WobbleX that is clamped solid does nothing at all — it becomes a
   rigid coupling again and you get the banding back. It must retain a small amount of lateral
   float. Tighten until seated, and no further.
3. Check by hand: with the assembly together, you should feel a fraction of a millimetre of
   sideways compliance while vertical movement is completely solid.

> 🖼️ **[CAD-11] WobbleX — section view, and what it absorbs**
> *Show:* a cut-through of the WobbleX between ball nut and bed mount, with an exaggerated animation-style overlay showing the ball nut tracing a small circle while the bed mount moves only vertically.
> *Look for:* ⚠️ **the single most useful image in the Z section.** It explains why Z banding happens and why this part must not be clamped solid.

### 7.7 Assemble each Z station

For each of the three stations, join:
- The MGN12H **carriage** (carries the load)
- The flanged **ball nut** via the WobbleX (provides the motion)
- The printed **bed mount arm** (carries the bed)

using the printed `linear_rail_ballscrew_bed_mount*.stl` part and M3 hardware.

🔧 **Technique — avoiding built-in stress:** bolt the carriage side fully, then leave the ball-nut
side **loose**. Rotate the ballscrew by hand to run the station through its full travel. Let the
ball nut settle into its natural position. *Then* tighten the ball-nut bolts. This lets the
assembly find its own alignment instead of you forcing one.

> 🖼️ **[CAD-12] Z station assembled, in place**
> *Show:* one complete Z station installed in the frame, from the side, with the bed mount arm attached.
> *Look for:* how the carriage carries the load while the screw only pushes — the two are doing different jobs.

### 7.8 Verify smooth Z motion

Before the bed or gantry goes anywhere near this:

1. Hand-rotate each ballscrew through its **full travel**, top to bottom.
2. Resistance must be **low and constant**. Any position where it gets harder is a problem.
3. Check all three stations.

**If a station binds:**
- Loosen the rail bolts, work the carriage end to end, retighten from the centre ([§7.3](#73-install-the-z-linear-rails)).
- Loosen the ball-nut mounting and re-settle it ([§7.7](#77-assemble-each-z-station)).
- Check the motor mount and top stabiliser are collinear ([§7.5](#75-install-the-top-ballscrew-stabilisers)).
- Check the coupler is not bottomed out ([§7.4](#74-install-ballscrews-and-couplers)).

⛔ **Stop. All three Z stations must move freely by hand before you continue.** A station that
binds by hand will bind under motor power too, and it will cause missed steps, failed Z-tilt, and
layer height errors that look like a hundred other problems.

✅ **Checkpoint:** all three stations turn freely and smoothly; grub screws threadlocked; carriage
end-stops fitted.

---

## 8. XY gantry assembly

This is the section that most distinguishes the Ultramarine from a Mini, and the section where
mistakes are hardest to spot and most annoying to fix. Read the whole section before starting.

Time: 5–8 hours.

### 8.1 How CoreXY actually works

> 🟠 **Mini → Ultramarine:** On your Mini, one motor moved X and one moved Y. You could reason about
> them separately. **That is not true here.** Forget it before you start.

On a CoreXY machine, two motors — call them **A** and **B** — each drive one continuous belt loop.
Both motors contribute to both directions:

- **A and B turn the same direction** → the toolhead moves along one diagonal
- **A and B turn opposite directions** → the toolhead moves along the other diagonal
- Pure X or pure Y motion is a **combination** of both motors

Klipper handles the mathematics; you just declare `kinematics: corexy`. What you must supply is the
mechanics, and the mechanics have two hard requirements:

> 🖼️ **[DIAG-03] How CoreXY works**
> *Show:* three panels: (a) both motors turning the same way → toolhead moves on one diagonal; (b) opposite directions → the other diagonal; (c) pure X motion shown as a combination of both. Arrows on motors and toolhead.
> *Look for:* that neither motor is 'the X motor'. Students coming from a Mini need this before they touch a belt.

1. **The two belt loops must be exact mirror images of each other.** If one loop routes over an
   idler that the other routes under, the geometry breaks and the machine will move on curves,
   skew, or fight itself.
2. **The X rail must be perpendicular to the Y rails, and both belts must be at equal tension.**
   If not, the gantry racks — one side leads the other — and prints come out as parallelograms.

💡 **The most useful diagnostic in CoreXY:** with motors disabled (`M84`), push the gantry by hand.
It should glide equally in all four diagonal directions. If one diagonal is stiff, the belts are
mismatched or the gantry is racked. That single test catches most build errors.

### 8.2 Install the Y rails

The two Y rails (450 mm 📋) mount to the inside faces of the left and right top extrusions.

1. Slide T-nuts in first, if the design mounts through the slot.
2. Mount using the **centre-out technique** from [§7.3](#73-install-the-z-linear-rails). This is
   even more important here — a bowed Y rail bows the whole gantry.
3. **Both Y rails must be at the same height and the same distance from the frame front.** Measure
   from a common reference — the top of the frame, or the front face — at both ends of each rail.
   A height difference between left and right tilts the entire gantry and cannot be corrected in
   software.
4. Slide an MGN12H carriage onto each and fit the end-stops.

📋 Measure the target rail positions in the CAD rather than eyeballing them.

> 🖼️ **[CAD-13] Y rails mounted — height reference**
> *Show:* a front section view through the frame showing both Y rails, dimensioned from a common reference (top of frame) to prove they are at equal height.
> *Look for:* the measurement you must take at four points. Unequal Y rail height cannot be fixed in software.

✅ **Checkpoint:** left and right Y carriages sit at identical heights (measure from the bench to
the carriage top face at both ends of travel — four measurements, all equal).

### 8.3 Install the X rail and its mounts

The X rail spans between the two Y carriages. The printed `x_axis_mount_left/right` (top and
bottom) parts clamp each end of the X rail to a Y carriage.

1. Bolt the **bottom half** of each X-axis mount to its Y carriage.
2. Lay the X rail into place between them.
3. Add the **top halves**, and fit their bolts **finger-tight only**.

⛔ **Do not tighten these bolts.** The X rail must be free to pivot slightly until you square the
gantry in [§8.6](#86-square-the-gantry).

> 🖼️ **[CAD-14] X rail mount — exploded**
> *Show:* one end of the X rail exploded: Y carriage, bottom mount half, X rail, top mount half, and its bolts.
> *Look for:* which half goes on first, and that the rail is sandwiched rather than screwed directly.

### 8.4 Install the idler stacks

The `rear_left_idler_mount` and `rear_right_idler_mount` parts (top and bottom halves each) carry
the idler pulley stacks that turn the belts through the corners.

1. Assemble each idler stack per the CAD 📋: typically a toothed pulley and a smooth idler on a
   shared M3 shoulder screw or shaft, with bearings.
2. Check each pulley **spins freely** before installing it. A stiff bearing here adds friction
   everywhere and shows up as inconsistent motion.
3. Bolt the stacks into their printed mounts, then the mounts to the frame.
4. Use the flangeless toothed pulleys where the CAD specifies them — see [§4.3](#43-belts-and-pulleys).

🔧 **Technique:** put a drop of light oil on each idler bearing and spin it. A bearing that
coasts for a second or two is good. One that stops immediately is either over-tightened on its
shaft or is a bad bearing. Over-tightening a shoulder screw through a bearing preloads it and
kills it — tighten only until the stack has no play.

> 🖼️ **[CAD-15] Idler stack — exploded**
> *Show:* one idler stack pulled apart: shoulder screw, bearings, toothed pulley, smooth idler, spacers, in order.
> *Look for:* the stacking order and which pulley is toothed. Getting this stack wrong is a common cause of belt rub.

### 8.5 Install the XY stepper motors

The two CoreXY motors mount at the front of the top frame using `front_left_motor_mount` and
`front_right_motor_mount` (top and bottom halves).

📋 The source build notes disagree about whether these are front or rear mounted — **follow your
CAD model**, and note that the printed part names say *front*.

1. Bolt the printed motor mount to the frame with T-nuts.
2. Bolt the stepper to the mount with **M3 × 8 SHCS**, shaft pointing **down**.
3. Fit a **GT2 20 T pulley** on each motor shaft.
4. ⚠️ **Set the pulley height carefully.** The pulley must sit at exactly the same height as the
   toothed idler it feeds, so the belt runs level with no lateral force. A belt running at an angle
   climbs its pulley, rubs, and eventually shreds.
5. Tighten the pulley grub screw **onto the shaft's flat**, and apply blue threadlocker.

> 🖼️ **[CAD-16] Motor pulley height — correct vs wrong**
> *Show:* a side section view showing the motor pulley aligned level with its toothed idler, next to a second view with the pulley 2 mm too high and the belt running at an angle.
> *Look for:* ⚠️ the belt path being level. A belt running at an angle climbs and shreds, and the cause is invisible without this comparison.

✅ **Checkpoint:** both motor pulleys at identical height; both grub screws on flats and
threadlocked; both pulleys spin true with no visible wobble.

### 8.6 Square the gantry

This is the single most important adjustment in the XY assembly.

**The principle:** the X rail must be exactly perpendicular to the Y rails. The frame itself is
your reference square — if both Y carriages contact the frame simultaneously at the end of travel,
the X rail is perpendicular.

**Procedure:**

1. With the X-rail clamp bolts still loose, push the gantry gently to the **rear** of the frame
   until both Y carriages contact their end stops.
2. Watch closely. Do **both** carriages arrive at the same instant?
   - **Yes** → the X rail is square in this direction.
   - **No** → the leading carriage arrived first. Continue pushing gently; the gantry will pivot
     as the trailing carriage catches up. Hold light pressure so both are seated.
3. With both carriages seated firmly, **tighten the X-rail clamp bolts** in the printed mounts,
   alternating between left and right, a little at a time.
4. Push the gantry to the **front** of the frame and repeat the check. Both carriages should again
   arrive together.
5. If they do not, loosen and repeat.

🔧 **Technique — a more precise version:** instead of relying on the frame ends, measure the
distance from each Y carriage to a fixed reference on the frame with calipers or a depth gauge. Do
this at both ends of travel. All four measurements should agree within 0.1 mm.

> 🖼️ **[DIAG-04] Squaring the gantry**
> *Show:* a top-down diagram of the gantry pushed to the rear: one panel with both Y carriages contacting simultaneously (correct), one with the left leading (X rail not perpendicular), with the pivot direction arrowed.
> *Look for:* what 'both carriages arrive together' actually looks like from above.

⛔ **Stop. Do not run belts until the gantry is square.** Belts lock in whatever geometry is
present when you tension them. Squaring after belting means loosening everything and starting over.

✅ **Checkpoint:** both Y carriages bottom out simultaneously at both ends of travel.

### 8.7 Route the CoreXY belts

Take your time here, and **trace the path in the CAD model before you cut anything.**

Each belt is a **closed loop** whose two ends are captured in belt grabbers on the X carriage. The
general path for one belt:

1. Start at one belt grabber on the X carriage.
2. Run **along the X axis** to the X-axis mount at one end.
3. **Down and around** the idler stack in that mount.
4. **Across the frame** to the motor pulley.
5. Around the motor pulley and back to the **second idler stack**.
6. **Back along the X axis** to the second belt grabber on the X carriage.

Then repeat for the second belt on the other side.

> 🖼️ **[DIAG-05] ⭐ CoreXY belt path — the master diagram**
> *Show:* a top-down diagram of the complete gantry with **both** belt loops drawn in two distinct colours, arrows showing direction of travel, and every pulley and idler numbered and labelled. Include a second panel showing the two loops separately so the mirroring is unmistakable.
> *Look for:* ⚠️ **the most important image in the entire manual.** Belt routing cannot be described adequately in words. Produce this one first, produce it large, and make the two loops obviously mirrored.

⚠️ **The two loops must mirror each other exactly.** Where belt 1 passes over an idler, belt 2
passes over the corresponding idler on its side. Where belt 1 goes around the front of a pulley,
belt 2 goes around the front of its mirror pulley. Trace both loops with your finger and confirm
they are mirror images before capturing the ends.

🔧 **Technique — belt grabbers:** the grabber parts have a slot with GT2 teeth moulded in.
- The belt **teeth** must engage the grabber's teeth. A grabber gripping the *smooth* back of the
  belt will slowly let go under load, causing a layer shift hours into a print.
- Leave a little extra belt at each end, then trim after tensioning.
- Feed the belt in, seat the teeth, and clamp with the grabber's screw.

> 🖼️ **[CAD-17] Belt grabber — teeth engaged vs smooth side**
> *Show:* a close-up section of a belt grabber with the belt teeth correctly meshed into the grabber's teeth, next to the wrong version gripping the smooth back of the belt.
> *Look for:* the failure mode that shows up as a layer shift days later. This is worth a large, clear render.

💡 **Common belt routing mistakes and what they look like:**

| Mistake | Symptom |
|---|---|
| Belt twisted 180° somewhere in the loop | Belt rubs and squeals; wears through in hours |
| One loop not mirrored | Gantry moves diagonally when commanded X; motion binds in one direction |
| Belt on the wrong side of an idler | Belt rubs a printed part; visible wear dust |
| Grabber holding smooth side | Works fine, then slips days later — a layer shift with no other cause |
| Belt running at an angle onto a pulley | Belt climbs, rubs the flange or the mount, frays at one edge |

✅ **Checkpoint:** trace both loops completely. No twists, both mirrored, teeth engaged in both
grabbers, no belt touching any printed part anywhere in the gantry's full travel.

### 8.8 Tension the belts

Both belts must be **equally tensioned**, and the absolute tension matters less than the match
between them.

**Target: 100–110 Hz on a free belt span, with the two belts within 5 Hz of each other.**

📋 The source documents give both 100 Hz and 110 Hz. Either works; **matching the two belts is what
actually matters.** Pick a number in that range and hold both belts to it.

**Procedure:**

1. Move the gantry to the **middle of the frame** — belt spans change with position, so always
   measure at the same position.
2. Open a belt-tension app on your phone (Prusa's Belt Tuner, Gates Carbon Drive, or Spectre).
3. **Pluck the belt span on the left of the toolhead** like a guitar string and read the frequency.
4. Adjust tension and repeat until it reads 100–110 Hz.
5. Do the same on the **right** side.
6. Move the gantry to several other positions and re-check. Readings will vary a little; large
   variation means a rail or belt path problem, not a tension problem.

> 🖼️ **[PHOTO-04] Measuring belt tension**
> *Show:* a phone running a belt-tension app held next to a belt span, with the gantry at mid-travel, and the span being measured marked.
> *Look for:* *which* span to pluck and where the gantry must be. Tension readings are meaningless without a consistent position.

> 🟠 **Mini → Ultramarine:** The Mini's belt tension was set with a screw and a spec you never
> thought about. Here it is a real tuning parameter with real consequences in both directions:
> too loose causes layer shifts and ringing; too tight causes bearing wear, motor heating, and
> **pulls the frame out of square**.

**If tension is too high** (belts sound high-pitched, motors get hot, gantry feels stiff): loosen
by about a quarter turn on the tensioner and re-measure.

**Hand check:** push the gantry diagonally. It should glide with no sticking, no notchy feel, and
no sense of the motors cogging through the belts. Test all four diagonals — they should feel the same.

⚠️ **Belts stretch in.** Re-tension after the first **10 hours** of printing, then check monthly.
This is normal and is not a defect.

✅ **Checkpoint:** both belts within 5 Hz of each other; gantry glides equally in all four
diagonals; no belt contacts anything.

---

## 9. Toolhead assembly

The toolhead is an **EVA3** platform carrying a Phaetus Rapido HF hotend, an Orbiter 2 direct-drive
extruder, a BTT EBB36 CAN toolboard, and the Klicky probe mount.

Time: 3–4 hours. Small fasteners, tight spaces, work slowly.

> 🟠 **Mini → Ultramarine:** Your Mini's hotend was a sealed E3D V6 assembly you never opened. This
> one you build yourself, and the two details that matter most — PTFE seating and hotend cooling —
> are exactly the two that cause 90 % of jamming problems if you get them wrong.

### 9.1 Build up the EVA3 body

1. The EVA3 **back plate** should already be bolted to the X carriage from [§8](#8-xy-gantry-assembly).
2. Add the **front plate**, the **bottom 5015 fan mount**, and the **side covers** per the EVA3
   reference assembly.
3. Use M3 SHCS into the heat-set inserts installed in [§5.3](#53-install-heat-set-inserts).

> 🖼️ **[CAD-18] EVA3 toolhead — exploded**
> *Show:* the complete toolhead exploded: back plate, front plate, side covers, hotend, extruder, both fans, EBB36, Klicky mount, in assembly order.
> *Look for:* the order of assembly. Several parts can only go in before others.

⚠️ **Tighten into printed plastic gently.** Screw in until the head just seats, then stop. Another
half turn and you strip the insert out of the part. See [Appendix D](#d-fasteners-and-tightening-guide).

### 9.2 Install the hotend

1. Drop the **Rapido** into its mounting hole in the EVA3 carrier.
2. Retain it with two M3 SHCS through the EVA3 plate onto the hotend's mounting flange.
3. Confirm the **nozzle protrudes correctly below the front fan duct** — if the duct sits lower
   than the nozzle, it will crash into the print.

> 🖼️ **[CAD-19] Hotend mounted — nozzle-to-duct clearance**
> *Show:* a side section view of the mounted Rapido with the vertical distance between the nozzle tip and the lowest point of the fan duct dimensioned.
> *Look for:* that the nozzle sits below the duct. A duct lower than the nozzle crashes into the print.

⚠️ **Check whether your Rapido shipped with a PT1000 or a 100 K NTC thermistor.** They are not
interchangeable in software. The wrong `sensor_type` gives temperature readings that are wrong by
tens of degrees — hot enough to burn PTFE and cook filament while the display reads normal. Look at
the packaging, or measure it: at room temperature a PT1000 reads ~1.1 kΩ and a 100 K NTC reads
~100 kΩ.

### 9.3 Install the cooling fans

**4010 axial — hotend heatsink cooling. This one keeps the printer working.**

- Bolts to the side of the EVA3 with M3 × 20 SHCS.
- Must blow **onto the hotend's heatsink fins**, not away from them. Check the arrow on the fan
  housing; if there is no arrow, power it briefly and feel the airflow.
- ⚠️ This fan is what prevents **heat creep** ([§28.5](#285-heat-creep)). If it fails or is fitted
  backwards, filament softens above the heatbreak and jams solid. It must run continuously whenever
  the hotend is above ~50 °C.

**5015 radial — part cooling. This one determines print quality.**

- Drops into the bottom mount, retained by the front cover.
- ⚠️ Orientation matters: the **inlet must face forward**, not into the EVA3 body. A blower drawing
  against a wall delivers a fraction of its rated airflow.
- Route the wires so they cannot be caught by the moving gantry.

> 🖼️ **[CAD-20] Fan airflow directions**
> *Show:* the toolhead with airflow arrows: the 4010 blowing **into** the heatsink fins, and the 5015 inlet facing forward with its output aimed at the nozzle tip.
> *Look for:* ⚠️ both orientations at once. A backwards 4010 causes heat creep; a blocked 5015 inlet ruins overhangs.

### 9.4 Install the extruder

1. Bolt the **Orbiter 2** to the top of the EVA3 platform with the supplied fasteners.
2. Fit the captive tensioner per the Orbiter instructions (printed part:
   `Orbiter 2.7 LDO Molding_CaptiveTensioner` in the CAD).
3. Connect the Orbiter to the hotend with a short **PTFE tube**:
   - Slide the tube through the brass coupler ring
   - Push it into the 4 mm Bowden coupler at the top of the hotend
   - ⚠️ **Cut the PTFE perfectly square.** An angled cut leaves a wedge-shaped gap that molten
     filament seeps into, cools in, and eventually blocks. Use a dedicated PTFE cutter or a sharp
     blade against a square edge — not side cutters, which pinch the bore closed.
   - ⚠️ **The tube must bottom out against the heatbreak.** A gap here is the number one cause of
     jams in this style of toolhead. Push firmly, pull back to confirm the collet grips, and push
     again.

💡 **Why the PTFE gap causes jams:** molten plastic under pressure flows into any void. In the gap
it cools slightly, forms a ring, and shrinks the effective bore. Each subsequent retraction drags
that ring further up. Eventually the filament cannot pass and the extruder starts clicking.

> 🖼️ **[CAD-21] PTFE seating — correct vs gap**
> *Show:* a section view through the coupler, PTFE tube and heatbreak, showing the tube fully bottomed out, next to the same view with a 1 mm gap and a ring of solidified filament forming in it.
> *Look for:* ⚠️ the number one cause of jams on this toolhead, and completely invisible once assembled.

### 9.5 Install the EBB36 toolboard

1. Mount the EBB36 to the back of the EVA3 with M3 SHCS into heat-set inserts, using the EBB36
   mount and wire guard printed parts.
2. Position it so the connector strip is **accessible from above** — you will be plugging and
   unplugging things here during commissioning and repairs.

**Connections to the EBB36:**

| Connection | Type |
|---|---|
| Hotend heater cartridge | Screw terminal |
| Hotend thermistor (or PT1000) | JST |
| 4010 hotend fan | 24 V |
| 5015 part-cooling fan | 24 V |
| Orbiter extruder stepper | 4-pin |
| Klicky probe | Probe / Z-stop input |
| ADXL345 accelerometer | SPI header |
| CAN bus + 24 V from the umbilical | 4 conductors |

⚠️ **Set the EBB36's CAN termination jumper.** The EBB36 is one end of the CAN bus, so its 120 Ω
termination jumper must be **fitted**. The other 120 Ω goes at the mainboard end
([§12.3](#123-the-toolhead-umbilical)). Missing termination produces random disconnects that look
like a dozen other faults ([§32.1](#321-can-bus-errors--ebb36-disconnects)).

🔧 **Technique:** leave a small service loop of wire at the EBB36 so you can unplug and lift the
board out without disconnecting everything. You will do this more often than you expect.

> 🖼️ **[DIAG-06] EBB36 connections**
> *Show:* the EBB36 drawn flat with every connector labelled and colour-coded: heater, thermistor, both fans, extruder stepper, probe, ADXL345, CAN + 24 V, and the termination jumper.
> *Look for:* the termination jumper position specifically — mark it clearly, it is easy to miss.

### 9.6 Filament guide

Fit the printed filament guide to the top of the frame so filament runs from the spool into the
Orbiter inlet with a gentle curve. Sharp bends add friction, and friction shows up as
under-extrusion ([§26.5](#265-under-extrusion)).

✅ **Checkpoint before moving on:**
- Nozzle sits below the fan duct
- 4010 blows onto the heatsink
- 5015 inlet faces forward
- PTFE bottoms out at the heatbreak, cut square
- CAN termination jumper fitted on the EBB36
- Nothing on the toolhead can contact the gantry, frame, or belts through the full range of motion
  — push the gantry to all four corners by hand and watch

---

## 10. Bed and build plate

Time: 2–3 hours.

### 10.1 Bed carrier

The bed sits on printed bed-mount arms attached to each of the three Z stations' ball nuts via
their WobbleX couplings ([§7.6](#76-wobblex-couplings-and-why-they-matter)).

1. Fit an **M3 × 40 BHCS** through each of the three bed mounting points, through a levelling
   spring or silicone spacer, and into a tap or heat-set insert in the bed carrier.
2. Tighten to roughly the middle of the spring's travel — this leaves adjustment range in both
   directions.

💡 **Why exactly three points:** three points define a plane. A four-point mount is
over-constrained — tightening the fourth corner bends the plate. With three points and three
independent Z motors, `Z_TILT_ADJUST` can level the gantry to the bed perfectly in software, and
you never turn a levelling screw again.

> 🟠 **Mini → Ultramarine:** Your Mini had three levelling screws you occasionally fiddled with.
> These three are set once at build time and then left alone forever. All routine levelling is
> done by the motors.

> 🖼️ **[CAD-22] Bed carrier — three-point mounting**
> *Show:* an underside view of the bed showing the three mounting points and their connection to the three Z stations, with the triangle between them drawn in.
> *Look for:* that there are exactly three points and why a fourth would over-constrain the plate.

### 10.2 Fit the heaters and thermistors

⚠️ **This is AC work. Read [§0.3](#03-safety) first.**

1. Bond the **two 300 × 150 mm silicone heater pads** to the underside of the aluminium plate, per
   the pads' adhesive instructions. Leave no air gaps — a bubble becomes a hot spot that eventually
   scorches the pad.
2. Position them to give even coverage of the plate. Symmetry matters: both pads are switched
   together by a single SSR, so any difference between them shows up directly as a thermal
   gradient across the bed.
3. Fit **both thermistors**:
   - **Thermistor 1** → mainboard pin **PB1** (`[heater_bed] sensor_pin`)
   - **Thermistor 2** → mainboard pin **PB0** (`[temperature_sensor heater_bed_2]`)
   - Both are `EPCOS 100K B57560G104F`.
   - Bond both **firmly** to the plate or into the heater pads. A loose thermistor lags the real
     temperature, which causes oscillation ([§30.3](#303-bed-temperature-unstable)) and defeats the
     cross-check.
   - Place them apart from each other — one near each heater zone — so the cross-check actually
     detects a zone failure.
4. Route thermistor leads in **shielded cable** where possible, and **away from the AC heater
   leads**. Thermistor wires running alongside switching mains pick up noise that shows as
   temperature jitter.

> 🖼️ **[CAD-23] Bed underside — heater and sensor placement**
> *Show:* the underside of the bed plate with both 300×150 heater pads positioned, both thermistors marked and labelled (PB1 and PB0), and the earth tab.
> *Look for:* that the two thermistors sit in **different heater zones** — that placement is what makes the safety cross-check work.

### 10.3 Bed AC wiring

The bed's AC leads go to the **load side of the SSR**, each pad through its own fuse. Full wiring is covered in
[§11.5](#115-bed-heating--one-ssr-two-fused-zones) — do not connect them until you get there.

⚠️ **Bond the bed plate to mains earth.** Run a green/yellow conductor from an earth tab on the
bed plate back to the inlet's earth. This is non-negotiable with an AC bed: without it, a heater
insulation failure makes the entire bed live at mains potential, and the first thing you touch
completes the circuit.

### 10.4 Magnetic build surface

1. Wipe the top of the aluminium plate — no debris.
2. Lay the magnetic sheet down, PEI side up. The magnets retain it; no clips needed.
3. ⚠️ **Always wipe under the sheet before re-seating it.** A single fragment of plastic under the
   sheet shows up as a hill in the first layer and, worse, corrupts your bed mesh
   ([§25.3](#253-inconsistent-first-layer)).

💡 **Above ~110 °C the magnets weaken** and the sheet can shift. This is normal physics, not a
fault. For hot ABS/ASA prints, a binder clip on one corner is a legitimate fix
([§30.4](#304-spring-steel-sheet-doesnt-stay-put)).

### 10.5 Chamber circulation fans

Fit the two **5010 fans** to circulate hot chamber air. Even chamber temperature reduces warping
and improves layer bonding on styrenics.

Aim them to circulate air around the chamber, **not** directly at the print (that is the part
cooling fan's job, and for ABS you specifically want minimal part cooling).

✅ **Checkpoint:** bed sits on three points only; both thermistors bonded and routed away from AC;
earth conductor fitted to the bed plate; spring steel sheet seats flat with no rock.

---

## 11. Electronics bay

⚠️⚠️ **This section contains lethal voltages. Re-read [§0.3](#03-safety) before starting. If you
are not confident with mains wiring, have an electrician do sections 11.4 and 11.5.**

Time: 8–12 hours across electronics and wiring. This is the longest stage of the build. Do it
across several sessions, and never when tired.

### 11.1 Plan before you cut a single wire

Lay out every component on the DIN rail **before** cutting anything to length. Photograph the
layout. Then work out your wire runs and cut generously — a wire that is 50 mm too long can be
managed; one that is 10 mm too short is scrap.

**Label both ends of every wire as you make it.** Masking tape and a marker is enough. In three
hours you will have forty wires and no memory of which is which, and in three years you will be
grateful all over again.

### 11.2 Mount the DIN rails

1. Bolt the 3030 DIN rail brackets (`din_3030_mount.stl` or purchased) to the frame with M5 T-nuts
   and M5 × 10 BHCS.
2. Slot the 500 mm DIN rails in and lock them with the brackets' set screws.
3. Check the rails are solid — a component on a loose rail vibrates, and vibration loosens terminals.

### 11.3 Populate the DIN rail

Suggested order, left to right, following the power flow:

1. **AC inlet with switch and surge arrester** — mains entry
2. **24 V 480 W PSU** — motors and mainboard
3. **24 V 240 W PSU** — toolhead and auxiliary
4. **SSR-40 DA × 1** — switches both bed heater zones
5. **Two AC fuse holders** — one per heater pad, on the SSR's output side
5. **Manta M8P V2 mainboard with CM5**
6. **WAGO / lever-nut blocks** — 24 V and ground distribution

**Layout rules:**

- ⚠️ **Separate AC and DC physically.** Keep AC wiring on one side of the bay and DC on the other.
  Cross them at 90° where they must cross, never run them parallel and bundled.
- **Leave airflow gaps** between the PSUs and any heat-producing component. PSUs derate when hot.
- ⚠️ **Give the SSR a heatsink and airflow.** A single SSR-40 now carries the current of **both**
  heater pads, so it dissipates more than it would in a split arrangement. An SSR fails **closed** —
  a bed stuck permanently on — and heat is what kills them. Do not skimp here.
- **Mount the fuse holders where you can reach them** without dismantling the bay. You will check
  them.
- **Keep the mainboard away from the SSR and PSUs**, both thermally and electrically.
- The `[fan_generic]` fans in `printer.cfg` (`pi_cooling`, `mcu_cooling`, `driver_coling`,
  `el_cooling`, `another_fan`) exist to cool this bay. Mount them so they actually move air across
  the CM5, the mainboard, the drivers, and the bay as a whole.

> 🖼️ **[CAD-24] Electronics bay layout**
> *Show:* the populated DIN rail from the front, components in order left to right, with the AC side and DC side clearly separated and shaded differently.
> *Look for:* ⚠️ the physical separation between AC and DC, the airflow gaps around the PSUs, and the SSR's heatsink.

### 11.4 Wiring mains AC

⛔ **The printer must be unplugged from the wall for all of this work. Not switched off — unplugged.**

**Colour conventions** (verify against your local standard):

| Conductor | EU / IEC | North America |
|---|---|---|
| Live | Brown | Black |
| Neutral | Blue | White |
| Earth | Green/Yellow | Green or bare |

**From the AC inlet:**

- **Live** → L input of the 480 W PSU, L input of the 240 W PSU, and the **load-side input of both
  SSR**
- **Neutral** → N input of both PSUs, and one terminal of **each** bed heater pad (the other
  terminal of each pad goes through **its own fuse** to the SSR's shared load output)
- **Earth** → the frame's chassis bond point, the bed plate's earth tab, and every metal panel

**Wiring rules that are not optional:**

1. **Ferrules on every stranded conductor entering a screw terminal.** Bare stranded wire in a
   screw terminal frays, and strands escape to touch adjacent terminals.
2. **Never tin a wire that goes into a screw terminal.** Solder cold-flows under clamping pressure;
   the joint loosens over months and then arcs. This is the classic 3D-printer fire cause.
3. **16 AWG minimum for AC**, and for any high-current DC.
4. **Heatshrink over every joint.** No exposed conductor anywhere.
5. **Strain-relieve the inlet cable** so a tug on the power lead cannot pull a conductor off a terminal.
6. **Fit the terminal covers** on the SSR and PSUs, and use enclosed fuse holders. If you can touch a terminal with a fingertip,
   the job is not finished.

✅ **AC checkpoint — do all of these with the printer still unplugged:**

- [ ] Continuity from the inlet's earth pin to the frame: **near 0 Ω**
- [ ] Continuity from the inlet's earth pin to the bed plate: **near 0 Ω**
- [ ] Continuity from the inlet's earth pin to every metal panel: **near 0 Ω**
- [ ] Resistance between Live and Neutral at the inlet, switch on, nothing energised: some
      resistance from the PSU inputs, but **not a short**
- [ ] Resistance between Live and Earth: **open circuit (infinite)**
- [ ] Resistance between Neutral and Earth: **open circuit (infinite)**
- [ ] Every terminal screw physically tugged and confirmed tight
- [ ] No bare conductor visible anywhere
- [ ] All terminal covers fitted

> 🖼️ **[DIAG-07] Mains AC wiring diagram**
> *Show:* a full schematic from the IEC inlet: Live, Neutral and Earth traced to both PSUs, the **single SSR**, the **two fuses**, both heater pads, and every earth bond point. Use standard colours and label every terminal.
> *Look for:* ⚠️ **every earth bond.** Draw the frame, bed and panel earths explicitly — this diagram is a safety document, and it is the one the instructor checks against.

⛔ **Any failed check above means do not plug it in.** Find the fault first.

### 11.5 Bed heating — one SSR, two fused zones

The bed uses **two silicone heater pads switched together by a single SSR-40 DA**, with **each pad
protected by its own fuse**.

```
                    ┌──────────────┐
   MAINS LIVE ──────┤  SSR-40 DA   │
                    │  (load in)   │
                    └──────┬───────┘
                           │  (load out — shared)
                  ┌────────┴────────┐
                  │                 │
              ┌───▼───┐         ┌───▼───┐
              │ FUSE 1│         │ FUSE 2│      ← one per pad
              └───┬───┘         └───┬───┘
                  │                 │
            ┌─────▼─────┐     ┌─────▼─────┐
            │ HEATER    │     │ HEATER    │
            │ PAD 1     │     │ PAD 2     │
            └─────┬─────┘     └─────┬─────┘
                  │                 │
                  └────────┬────────┘
                           │
   MAINS NEUTRAL ──────────┘

   CONTROL SIDE (low voltage, safe):
   Manta pin PA1 ──── + ┐
                        ├─ SSR control input (3–32 V DC, polarity-sensitive)
   Manta GND ──────── − ┘
```

**Load side (AC — dangerous):**
- SSR load input ← mains **Live**
- SSR load output → splits to **two fuses**, one per heater pad
- Each fuse → its heater pad → mains **Neutral**

**Control side (low-voltage DC — safe):**
- Mainboard `heater_bed` output (**pin PA1**) → SSR control **+**
- Mainboard ground → SSR control **−**

⚠️ **Control polarity matters.** An SSR-40 **DA** takes 3–32 V DC on its control input and is
polarity-sensitive. Reversed, it simply never switches, and you get "bed doesn't heat at all"
([§30.1](#301-bed-doesnt-heat-at-all)).

#### Sizing the fuses

Each fuse protects **one heater pad**, so size it from that pad's current, not the pair's:

```
fuse current = pad wattage ÷ mains voltage
```

*Example:* a 400 W pad on 230 V draws 400 ÷ 230 ≈ **1.74 A** → fit the next standard size up.

- 📋 **Read the wattage from your pad's label** — do not guess.
- Use **slow-blow (T)** fuses. Silicone heaters draw a brief inrush surge at switch-on that will
  nuisance-trip a fast-blow fuse.
- ⚠️ **Never fit a larger fuse to stop it blowing.** A fuse that blows is reporting a fault. The
  fault is in the pad, its wiring, or the SSR — find it. This is the protection that stops a
  degraded heater pad from becoming a fire.

#### Why one SSR but two fuses

💡 **The SSR and the fuses are doing two different jobs, which is why the counts differ.**

- **The SSR is the control element.** Klipper has exactly one `heater_bed` object running one PID
  loop, so both zones must switch together anyway. A second SSR would add cost, heat, and another
  failure point without giving Klipper anything to control independently.
- **The fuses are the protection element**, and protection must be *per pad*. If both pads shared
  one fuse sized for their combined current, a single pad developing a fault could draw well above
  its own rating without ever reaching the shared fuse's trip point. Individual fuses mean each pad
  is protected at its own limit.

⚠️ **The consequence for sizing:** one SSR now carries the current of **both** pads. Check the
combined draw against the SSR's rating, and heatsink it properly — see below.

#### What each failure looks like

| Failure | Effect | Caught by |
|---|---|---|
| **One fuse blows** | That zone goes cold, the other keeps heating → thermistors diverge | ✅ `BED_TEMP_CHECK` ([§16.9](#169-the-dual-thermistor-bed-safety-check)) |
| **One heater pad fails open** | Same as above | ✅ `BED_TEMP_CHECK` |
| **A thermistor detaches** | It reads air while the bed heats → divergence | ✅ `BED_TEMP_CHECK` |
| **SSR fails open** | Neither zone heats at all | ✅ Klipper heater verification ([§29.1](#291-heater-verification-failed--thermal-runaway)) |
| **SSR fails closed** ⚠️ | **Both** zones heat continuously and uncontrollably | ⚠️ **NOT** `BED_TEMP_CHECK` — both sensors rise together, so there is no divergence to detect. Caught only by `max_temp: 110` and Klipper's runaway detection |

⚠️ **Read that last row carefully.** With a single SSR, a stuck-closed relay heats both zones
symmetrically, and the dual-thermistor cross-check cannot see it. Your protection against that
specific failure is `max_temp: 110` in `[heater_bed]` — which is exactly why
[§16.7](#167-the-heated-bed-and-its-two-sensors) says never to raise it to silence an error.

🔧 **SSR mounting — more important here than in a split arrangement.** Mount the SSR to a proper
heatsink with thermal compound, and give it airflow. It is carrying both pads' current. An
overheating SSR degrades gradually: it starts conducting only partially, and your bed heats slowly
for weeks before it fails outright ([§30.2](#302-bed-heats-slowly)). An SSR run hot is also far
more likely to fail **closed**, which is the failure mode above that nothing in software will catch
early.

> 🖼️ **[DIAG-08] Bed heating — one SSR, two fused zones**
> *Show:* the single SSR with its load side splitting through two separate fuses to the two heater pads, and the control side from mainboard pin PA1 with + and − marked. Label the fuse ratings and mark the SSR's heatsink.
> *Look for:* ⚠️ that **one** relay switches both zones while **each pad has its own fuse** — and the control polarity.

### 11.6 Wire 24 V DC

Run **18 AWG silicone wire** from each PSU's output to its loads.

**480 W PSU (motors, mainboard):**
- → Manta M8P V2 main power input
- → 24 V electronics-bay fans
- → chamber lighting, if fitted

**240 W PSU (toolhead and auxiliary):**
- → the toolhead umbilical's 24 V pair
- → auxiliary 24 V loads

🔧 **Set both PSUs' output voltage** with a meter before connecting any load. Adjust the trim pot
to read **24.0–24.3 V**. Do this with the PSU energised and the output disconnected — this is a
live measurement, so one hand behind your back, and be careful.

⚠️ **Get polarity right everywhere.** Reversed 24 V destroys the mainboard instantly and is not
covered by any warranty. Check twice with a meter before the first power-on.

> 🖼️ **[DIAG-09] 24 V distribution**
> *Show:* both 24 V PSUs with every load branching off: mainboard, bay fans, lighting from the 480 W; toolhead umbilical and auxiliaries from the 240 W. Wire gauges labelled.
> *Look for:* which PSU feeds what, and why the toolhead is deliberately on the separate supply.

### 11.7 Connect the display

The **mini12864 v2.0** connects to the mainboard's EXP1/EXP2 ports (or the equivalent FPC cable on
the Manta M8P V2).

From `printer.cfg`, the display uses:

| Function | Pin |
|---|---|
| `cs_pin` | PG0 |
| `a0_pin` | PF15 |
| `rst_pin` | PF14 |
| `encoder_pins` | PE10, PE15 |
| `click_pin` | PG1 (inverted, pulled up) |
| SPI MISO / MOSI / SCLK | PE13 / PE14 / PE12 |
| Beeper | PE7 |
| RGB Neopixel | PF13 |

⚠️ **Check the ribbon cable orientation before powering on.** A reversed EXP cable can damage the
display, the mainboard, or both. Match the keying, and if there is no key, match pin 1 markings.

The display mounts to a printed bracket on the front of the printer (`lcd_mount.stl`,
`lcd_mount_2.stl`, plus the LCD cover).

> 🖼️ **[CAD-25] Display mount assembly**
> *Show:* the mini12864 in its printed mounts and cover, shown attached to the front of the frame, with the cable route to the mainboard.
> *Look for:* the cable orientation at the board end — reversed EXP cables damage hardware.

💡 **The RGB LEDs are a status indicator, and they are genuinely useful.** From `printer.cfg`:
**green = idle or finished, red = printing.** You can read the printer's state from across the room.

---

## 12. Wiring and cable management

Good cable management is not cosmetic. Every intermittent fault on a machine like this comes down
to a wire that flexed once too often or a connector that was never quite seated.

### 12.1 Principles

1. **Label both ends of every wire.** Always.
2. **Strain-relieve at both ends of every bundle.** A wire that flexes *at the connector* instead
   of along its length will break — usually inside the insulation, where you cannot see it.
3. **Gentle curves only.** Never a sharp bend, never a kink, never a zip-tie pulled tight enough to
   deform the insulation.
4. **Separate power from signal.** Do not bundle stepper power with thermistor wires or CAN.
5. **Service loops.** Leave enough slack at every board to unplug it and lift it out.
6. **Test each circuit before the bundle is closed up.** Finding a swapped pair inside a sleeved,
   zip-tied loom is miserable.

### 12.2 Stepper motor wiring

Run the four-wire cable from each stepper to its output on the Manta:

| Stepper | Mainboard motor slot | Notes |
|---|---|---|
| `stepper_x` (CoreXY A) | Motor 1 | Step PE6, Dir PE5, En PC14 |
| `stepper_y` (CoreXY B) | Motor 2 | Step PE2, Dir PE1, En PE4 |
| `stepper_z` | Motor 5 | Step PG13, Dir PG12, En PG15 |
| `stepper_z1` | Motor 6 | Step PG9, Dir PD7, En PG11 |
| `stepper_z2` | Motor 7 | Step PB4, Dir PB3, En PB6 |

The extruder stepper connects to the **EBB36**, not the mainboard.

🔧 **Getting the coil pairs right:** a stepper's four wires are two coils of two wires. If you split
a pair across the connector, the motor buzzes and does not turn. Find the pairs with a multimeter
on continuity or low-ohms — the two wires of a coil read a couple of ohms between them; wires from
different coils read open circuit.

💡 **If a motor turns the wrong way**, do not rewire it. Add or remove a `!` in front of the
`dir_pin` in `printer.cfg` — e.g. `dir_pin: !PE5` becomes `dir_pin: PE5`. This is a software fix
and takes ten seconds.

### 12.3 The toolhead umbilical

The umbilical carries everything the toolhead needs in **four conductors**:

| Conductor | Purpose | Gauge |
|---|---|---|
| 24 V + | Toolhead power (heater, fans, stepper) | **18 AWG minimum** |
| 24 V − | Return | **18 AWG minimum** |
| CAN_H | CAN data | 22 AWG, **twisted with CAN_L** |
| CAN_L | CAN data | 22 AWG, **twisted with CAN_H** |

⚠️ **The three CAN rules. Break any one and you get random mid-print disconnects that will waste
days of your life:**

1. **Twist CAN_H and CAN_L together** — roughly 2–3 twists per centimetre, along the whole run.
   The twisting is what makes CAN noise-immune; untwisted, it is just two wires next to a switching
   heater.
2. **Terminate both ends with 120 Ω.** The EBB36 has a jumper for this ([§9.5](#95-install-the-ebb36-toolboard)).
   At the mainboard end, fit a 120 Ω resistor across CAN_H and CAN_L. **Exactly two terminations —
   no more, no fewer.**
3. **Keep CAN away from AC.** Do not run the umbilical alongside bed heater wiring. Where they must
   cross, cross at 90°.

> 🖼️ **[DIAG-10] CAN bus — twisting and termination**
> *Show:* a schematic of the bus: mainboard at one end with its 120 Ω resistor, EBB36 at the other with its jumper, the twisted pair drawn as an actual twist between them, and the 60 Ω measurement point marked.
> *Look for:* ⚠️ **exactly two terminations**, and that measuring 60 Ω across the pair is how you prove it.

⚠️ **Use 18 AWG or thicker for the 24 V pair.** The toolhead draws real current (heater plus two
fans plus a stepper). Thin wire drops voltage under load, and the EBB36's CAN transceiver browns
out — which presents as a CAN error, sending you off hunting a data problem that is actually a
power problem.

**Physical routing:**
- The bundle runs from the electronics bay, up and over the gantry, to the EBB36.
- Protect it with **nylon braided sleeve**.
- The `can wire guide behind belts` printed part anchors it at the X carriage so the bundle bends
  **predictably** at the same place every time, instead of flexing randomly.
- Route it so it never contacts the belts, the rails, or the print, at any gantry position.

> 🖼️ **[CAD-26] Umbilical routing — full travel**
> *Show:* the umbilical drawn at three gantry positions (front-left, centre, rear-right) in one overlaid render, showing it never fouls a belt or rail.
> *Look for:* where the bundle bends and where the anchor point sits. This is the image to check your routing against.

🔧 **The full-travel test:** with everything unpowered, push the gantry slowly to all four corners
and through the middle, watching the umbilical the whole time. It must never snag, stretch, rub a
belt, or foul a printed part. Repeat with the bed at both top and bottom of travel. Do this now,
because a snagging umbilical at speed will rip a connector off the EBB36.

### 12.4 Probe wiring

The Klicky microswitch has two leads. Route them **alongside the umbilical** to the EBB36's probe
input.

- Configure as **normally-open** in Klipper's `[probe]` section.
- Support the wires where they pass onto the removable probe body so they are not the thing taking
  the mechanical load.
- ⚠️ A loose probe wire is the classic cause of inconsistent probe readings
  ([§31.3](#313-probe-gives-inconsistent-readings)) — the switch registers at slightly different
  positions depending on how the wire happens to be pulling.

### 12.5 There are no XY endstops

X and Y home **sensorlessly**, using the TMC2209 drivers' StallGuard feature via
`diag_pin: ^PF4` (X) and `diag_pin: ^PF3` (Y). There is nothing to wire.

Z homes off the Klicky probe (`endstop_pin: probe:z_virtual_endstop`).

### 12.6 Final wiring inspection

Before first power-on, with the machine unplugged:

- [ ] Every connector fully seated — press each one home and tug it
- [ ] No wire pinched between a printed part and the frame
- [ ] No wire in the path of the gantry, the bed, or a belt, at any position
- [ ] All bundles strain-relieved at both ends
- [ ] AC and DC physically separated
- [ ] CAN pair twisted along its full length
- [ ] CAN terminated at exactly two points
- [ ] 24 V polarity confirmed with a meter at every board
- [ ] Every wire labelled at both ends
- [ ] Photographs taken of the finished bay before the covers go on

---

## 13. Panels and enclosure

The enclosure is not optional equipment on this machine. It is what makes ABS, ASA, PC, and
fibre-filled materials printable, and it is what keeps the chamber temperature stable enough for
the printed structural parts to behave predictably.

> 🟠 **Mini → Ultramarine:** An open-frame Mini prints PLA and PETG happily and warps ABS badly.
> A sealed, warm chamber is the single biggest capability difference between these two machines.

### 13.1 Side and rear panels

The electronics covers (`electronics_cover_1` through `16`) and enclosure panels drop into the
extrusion slots and are retained by printed clips, magnetic strips, or the panel mounts
(`enclosure_panel_mount.stl`), per the CAD 📋.

Laser-cut acrylic or aluminium panels are a valid alternative to printed ones for the large side
areas.

> 🖼️ **[CAD-27] Panel layout**
> *Show:* the frame with every panel positioned and numbered to match the `electronics_cover_*.stl` filenames.
> *Look for:* which numbered cover goes where — the filenames alone do not tell you.

⚠️ **Earth any metal panel** back to the chassis bond point ([§11.4](#114-wiring-mains-ac)).

### 13.2 Front door

1. Fit the printed hinges (`enclosure_door_hinges.stl` — print-in-place) to a vertical upright.
2. Fit the door handle (`enclosure_door_handle_1/2.stl`) to the outside of the door.
3. Fit the magnetic latch: a 3 × 6 mm magnet in the latch and another in the receiver.
4. Tune the magnet spacing so the door **snaps shut firmly but opens with a controlled pull.** Too
   weak and it drifts open mid-print, losing chamber temperature; too strong and opening it racks
   the frame.

> 🖼️ **[CAD-28] Door hinge and magnetic latch**
> *Show:* the hinge assembly and the latch detail, showing the magnet seated in both the latch and the receiver.
> *Look for:* the print-in-place hinge orientation and how deep the magnets sit.

### 13.3 Top cover

A clear or printed top panel sits on the top frame, retained by gravity or magnets.

💡 **For chamber temperature stability with ABS/ASA, an opaque insulated top outperforms a clear
one.** Clear looks better and lets you watch the print; insulated holds temperature better. Many
builders make both and swap by material.

### 13.4 Ventilation and the trade-off

An enclosure is a temperature control device *and* a fume container.

⚠️ **The door position is set by the material, and it is not optional — see
[The door rule](#the-door-rule):**

- 🔒 **ABS · ASA · PC · PA and other engineering materials — door CLOSED.** Higher chamber
  temperature means less warping and stronger layer bonding. **Vent the room, not the chamber**,
  and do not open the door mid-print.
- 🚪 **PLA · PETG · TPU — door OPEN** (or the top removed). These materials need no chamber heat,
  and PLA in a hot chamber suffers heat creep and jams ([§28.5](#285-heat-creep)).
- **Consider a filtered exhaust** (activated carbon plus HEPA) if the printer lives in an occupied
  room. This is a genuine health matter with styrenics, not an accessory.

✅ **Checkpoint:** door closes firmly and stays closed; no panel fouls the gantry or bed at any
position; every metal panel earthed.

---

## 14. Klicky probe installation

The Klicky is a **microswitch that the toolhead picks up magnetically** when it needs to probe, and
parks back in its dock when finished.

> 🟠 **Mini → Ultramarine:** Your Mini's PINDA was a fixed inductive sensor that sensed the bed
> through a gap. The Klicky is a physical switch that physically touches the bed — much more
> accurate and completely unaffected by bed material or temperature, but it must reliably attach
> and detach every single time. Dock alignment is the whole game.

💡 **Why a dockable probe at all:** the probe is only needed during homing and levelling. Docking
it keeps it away from the hot nozzle for the rest of the print, avoids the mass on the toolhead
during fast moves, and eliminates the thermal drift that plagues fixed inductive probes.

### 14.1 Mount the probe dock

1. Bolt the printed dock to a 20 × 20 deck rail or to the frame, on the side **opposite the
   toolhead's normal park position**.
2. Position so the toolhead approaches the dock **straight on, perpendicular to the dock's magnet
   face**. An angled approach makes pickup unreliable.
3. The dock must be **rigid**. A dock that flexes when the probe is picked up will drop the probe
   eventually — usually the one time you are not watching.
4. Ensure the dock is clear of the print area, the bed at all Z heights, and the gantry's travel.

> 🖼️ **[CAD-29] Probe dock position**
> *Show:* a top-down view of the bed and frame with the dock position marked and dimensioned from the origin, and the toolhead's straight-on approach path arrowed.
> *Look for:* ⚠️ the approach must be perpendicular to the dock face. These coordinates go into `klicky-probe.cfg`.

### 14.2 Install the Klicky mount on the toolhead

The toolhead carries a printed receiver (`klicky_probe_mount.stl`) with two embedded 3 × 6 mm
magnets, bolted to the EVA3.

- Seat the magnets fully in their pockets. A proud magnet makes the probe sit at an angle, and an
  angled probe gives inconsistent readings.
- ⚠️ **Check magnet polarity before gluing anything.** Get one backwards and the probe is actively
  repelled. Test-fit the probe body first.
- The mount must be **rigid**. Any flex here goes straight into your probe repeatability
  ([§31.3](#313-probe-gives-inconsistent-readings)).

> 🖼️ **[CAD-30] Klicky mount on the toolhead**
> *Show:* the printed receiver on the EVA3 with both magnets seated, and the probe body shown separately in its mating orientation.
> *Look for:* magnet polarity and seating depth — mark the pole orientation on the render.

### 14.3 Wire the probe

Route the microswitch's two leads through the assembly's strain relief, then alongside the
umbilical to the EBB36's probe input. See [§12.4](#124-probe-wiring).

### 14.4 Test the pickup — by hand, before any power

⛔ **Do this before the motors are ever energised.** A failed pickup under power means the toolhead
tries to home Z with no probe attached, and drives the nozzle into the bed at homing speed.

1. Move the toolhead by hand to the dock-attach position.
2. Slide it **laterally onto the probe** — it should click into place magnetically.
3. Slide back out of the dock — **the probe should stay on the toolhead.**
4. Reverse the motion to return the probe to the dock — **it should release cleanly.**
5. Repeat ten times. It must work **every single time**. Nine out of ten is a failure.

**If pickup is unreliable:** adjust the dock position in **0.5 mm increments** and retest, until
both pickup and drop-off are consistent.

> 🖼️ **[DIAG-11] Klicky pickup and drop-off motion**
> *Show:* a four-panel sequence from above: approach, lateral slide onto the probe, retreat with probe attached, then the reverse motion sliding past the dock to release.
> *Look for:* that docking works by sliding **past** the dock, not by reversing the pickup. Reversed motion cannot release the probe.

💡 **The magnet balance:** the dock magnets must be **weaker** than the toolhead magnets, or the
probe never leaves the dock. But not so much weaker that the dock cannot pull the probe off during
docking. If you cannot find a balance, change one set of magnets or shim their depth — moving a
magnet 0.5 mm deeper into its pocket measurably weakens it.

### 14.5 Configure the macros

`printer.cfg` includes `klicky-probe.cfg`, which defines `ATTACH_PROBE`, `DOCK_PROBE`, and the
`[probe]` section.

📋 **`klicky-probe.cfg` is not in this repository.** Get it from the upstream Klicky-Probe project
and set the dock coordinates for **your** dock position. The values that matter:

| Setting | Guidance |
|---|---|
| Dock X / Y coordinates | Measured from your actual dock. Get these wrong and the toolhead crashes into the dock. |
| Attach / dock movement speed | Start at **30 mm/s** approach and **15 mm/s** lateral. Speed up later if you want. |
| `z_offset` | Set by `PROBE_CALIBRATE` in [§18.3](#183-z-offset) |
| `speed` (probing) | **5 mm/s** for the slow final approach |
| `samples` | 2–3, with `samples_result: median` |
| Probe pin logic | Normally-open switch. If it reads inverted, toggle the `!` — see [§33.5](#335-probe-triggered-prior-to-movement) |

⚠️ **Test the dock coordinates at very low speed first**, with your hand on the emergency stop, and
with Z high enough that a mistake cannot hit the bed.

✅ **Checkpoint:** ten out of ten manual pickups and drop-offs; probe mount rigid; wiring
strain-relieved; dock clear of all moving parts.

---
---

# Part 3 — Commissioning

The machine is built. Nothing has been powered yet. This part takes you from "assembled metal" to
"prints reliably," and the order matters enormously.

⛔ **Do not skip [Section 17](#17-first-power-on--the-staged-smoke-test).** It is a staged power-on
designed so that a wiring mistake damages nothing. Powering everything at once and hoping is how
people destroy mainboards.

---

## 15. Software installation

> 🟠 **Mini → Ultramarine:** Your Mini shipped with firmware already on it. Here you install an
> operating system, then the firmware, then compile firmware for two separate microcontrollers.
> It sounds worse than it is — budget an evening, and follow the steps literally.

### 15.1 What you are installing, and why

| Layer | What it is | Runs on |
|---|---|---|
| **Linux OS** | The operating system | Raspberry Pi CM5 |
| **Klipper (host)** | Does the motion planning maths | CM5 |
| **Klipper (MCU firmware)** | Executes precisely-timed steps | Manta M8P V2 |
| **Klipper (MCU firmware)** | Same, for the toolhead | EBB36 |
| **CanBoot / Katapult** | Bootloader letting you flash the EBB36 over CAN | EBB36 |
| **Moonraker** | API server between Klipper and the web UI | CM5 |
| **Mainsail** or **Fluidd** | The web interface you actually use | CM5 |

💡 **Why Klipper splits across machines:** the CM5 has the CPU power to do lookahead planning,
pressure advance, and input shaping in real time. The microcontrollers just execute a pre-computed
schedule of step timings. This is why Klipper can run accelerations that would overwhelm
traditional firmware — and it is also why "MCU shutdown: Timer too close"
([§33.1](#331-mcu-shutdown-timer-too-close)) means the schedule arrived late, not that a motor failed.

### 15.2 Flash the operating system

1. Download the appropriate OS image for the **CM5 on a Manta M8P V2** — BTT publishes images, and
   Armbian-based Klipper distributions work well.
2. Flash it to the eMMC or microSD with **Raspberry Pi Imager** or **balenaEtcher**.
3. If your imager supports it, **pre-configure WiFi credentials and enable SSH** before flashing.
   This saves needing a monitor and keyboard.
4. Insert the card / flash the eMMC, and boot.

### 15.3 Connect over SSH

Find the printer's IP address from your router's admin page, or by running `arp -a` on your
computer. Then:

```bash
ssh ultramarine@192.168.1.50
```

⚠️ **Change the default password immediately** with `passwd`. This machine is on your network and
default credentials are the first thing anything scanning your network will try.

🔧 **Give the printer a static IP or a DHCP reservation** in your router. Otherwise the address
changes and your slicer's upload configuration breaks at the worst possible moment.

### 15.4 Install Klipper, Moonraker and the web interface

**KIAUH** (Klipper Installation And Update Helper) is a menu-driven installer that handles all of it:

```bash
git clone https://github.com/dw-0/kiauh.git
```

```bash
./kiauh/kiauh.sh
```

From the menu, choose *Install*, then install in this order:

1. **Klipper**
2. **Moonraker**
3. **Mainsail** (or **Fluidd** — pick one, they are functionally equivalent)

Reboot when it finishes:

```bash
sudo reboot
```

Then open `http://<printer-ip>` in a browser. You should get the Mainsail or Fluidd interface.

⚠️ It will show errors, because there is no valid `printer.cfg` yet, and no MCU firmware. That is
expected at this stage.

### 15.5 Build and flash firmware for the mainboard

```bash
cd ~/klipper
```

```bash
make menuconfig
```

For the **Manta M8P V2**:

| Option | Setting |
|---|---|
| Micro-controller Architecture | STMicroelectronics STM32 |
| Processor model | **STM32H723** |
| Bootloader offset | **128KiB bootloader** (verify against BTT's docs for your board revision 📋) |
| Clock Reference | **25 MHz crystal** 📋 |
| Communication interface | **USB (on PA11/PA12)** 📋 |

📋 **Verify every one of these against BTT's official Manta M8P V2 documentation for your exact
board revision.** These settings vary between hardware revisions, and wrong settings produce a
board that flashes successfully and then never appears.

Save and exit, then build:

```bash
make
```

Flash per BTT's documented procedure for your board — usually copying `out/klipper.bin` to the
board's SD card as `firmware.bin` and power-cycling, or entering DFU mode.

**Confirm it worked:**

```bash
ls /dev/serial/by-id/
```

You should see something like:

```
usb-Klipper_stm32h723xx_15000F001751313434373135-if00
```

⚠️ **That string is unique to your board.** Copy it exactly into the `[mcu] serial:` line in your
`printer.cfg`. The one in this repository's config belongs to a different physical board and will
not work for you.

### 15.6 Flash the EBB36 toolboard

The EBB36 needs a bootloader (**CanBoot/Katapult**) and then Klipper firmware. Follow the **official
BTT EBB36 documentation for your board revision** — the procedure differs between revisions.

The general sequence:

1. Put the EBB36 into **DFU mode** (jumper or boot button, per your revision).
2. Flash **CanBoot/Katapult** over USB.
3. Reboot the EBB36 onto the CAN bus.
4. **Confirm the board is visible on CAN:**

```bash
~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q
```

   This prints the UUIDs of every device on the bus. **If nothing appears, stop and fix the CAN bus
   before going further** — see [§32.1](#321-can-bus-errors--ebb36-disconnects). Ninety percent of
   the time it is termination, twisting, or a swapped CAN_H/CAN_L pair.

5. Build a **separate** Klipper firmware image targeting the EBB36 (`make menuconfig` again, with
   the EBB36's settings — STM32G0B1, CAN bus interface, 1 Mbps 📋), then `make`, then flash it over
   CAN with the same script.

6. **Write down the UUID.** It goes in `printer.cfg` as:

```ini
[mcu EBBCan]
canbus_uuid: <your uuid here>
```

⚠️ **Both MCUs must run the same Klipper version.** After any Klipper update on the host, reflash
**both** the mainboard and the EBB36. A version mismatch causes connection failures that look like
hardware problems ([§32.1](#321-can-bus-errors--ebb36-disconnects)).

### 15.7 Set up the CAN interface on the host

The host needs its CAN network interface configured, typically in
`/etc/network/interfaces.d/can0`:

```
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ip link set can0 txqueuelen 128
```

📋 **The bitrate must match** what you compiled into the EBB36 firmware. 1 Mbps (1000000) is
standard. A mismatch means the device simply never appears, with no useful error.

Verify after a reboot:

```bash
ip -details link show can0
```

### 15.8 Set up the config files

The Ultramarine's configuration is split across three files:

| File | Contents | In this repo? |
|---|---|---|
| `printer.cfg` | Main config — steppers, bed, z_tilt, mesh, display, macros | ✅ Yes |
| `ebb36.cfg` | Toolhead — extruder, hotend, toolhead fans, ADXL345 | ❌ **No — you must create it** |
| `klicky-probe.cfg` | Probe definition and attach/dock macros | ❌ **No — you must create it** |

Copy `printer.cfg` from this repository into `~/printer_data/config/`, then **change these before
doing anything else:**

1. `[mcu] serial:` → your board's actual serial ID from [§15.5](#155-build-and-flash-firmware-for-the-mainboard)
2. `[virtual_sdcard] path:` → your actual username's path if it is not `ultramarine`
3. Create `ebb36.cfg` from the BTT EBB36 sample config, with **your** CAN UUID
4. Create `klicky-probe.cfg` from the upstream Klicky project, with **your** dock coordinates

⚠️ **Delete or comment out the `SAVE_CONFIG` block at the bottom** of the repository's
`printer.cfg` before first use. It contains another machine's bed mesh, input shaper values, and
bed PID constants. Those numbers are meaningless on your printer and actively harmful — you will
generate your own in [Section 18](#18-calibration-sequence).

🔧 **Back up before every change:**

```bash
cp ~/printer_data/config/printer.cfg ~/printer_data/config/printer.cfg.backup
```

Better still, keep your config in git. You will make mistakes, and being able to see exactly what
you changed is worth a great deal.

---

## 16. printer.cfg explained line by line

This section walks through the actual working configuration. You do not need to memorise it, but
you should be able to find things in it, because troubleshooting means reading and editing this file.

> 🟠 **Mini → Ultramarine:** This file *is* your printer's settings menu. Every value here is
> something the Mini decided for you. The upside is total control; the downside is that a typo
> stops the printer from starting. Klipper always tells you the offending line.

### 16.1 File structure and includes

```ini
[include ebb36.cfg]        # Toolhead: extruder, hotend, toolhead fans, ADXL345
[include klicky-probe.cfg] # Probe definition and attach/dock macros

[virtual_sdcard]
path: /home/ultramarine/printer_data/gcodes

[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h723xx_15000F001751313434373135-if00
restart_method: command
```

`[include]` pulls in another file exactly as if its contents were pasted in place. Splitting the
config keeps the toolhead and probe definitions separate from the frame's.

`virtual_sdcard path` is where G-code files live. It is the same folder the USB auto-sync copies
into ([Appendix F](#f-usb-auto-sync-for-g-code-files)).

⚠️ The `serial:` line is **unique to one physical board**. Yours will differ.

### 16.2 Machine limits

```ini
[printer]
kinematics: corexy
max_velocity: 200
max_accel: 5500
max_z_velocity: 8
max_z_accel: 20
```

These are **hard ceilings**. Your slicer can ask for less, never more.

| Setting | Value | Meaning |
|---|---|---|
| `kinematics: corexy` | — | Tells Klipper how motor rotation maps to XY motion. **Never change this.** |
| `max_velocity` | 200 mm/s | Top speed |
| `max_accel` | 5500 mm/s² | How hard it can change speed. This is high, and it is what a stiff CoreXY frame plus input shaping buys you. |
| `max_z_velocity` | 8 mm/s | Deliberately conservative — the bed is heavy |
| `max_z_accel` | 20 mm/s² | Same reasoning |

💡 **5500 mm/s² is only safe with input shaping tuned.** If you raise acceleration before running
`SHAPER_CALIBRATE`, you get ringing. If you raise it beyond what the shaper calibration recommends,
you get ringing *and* missed steps. See [§18.10](#1810-input-shaper).

> 🟠 **Mini → Ultramarine:** A Prusa Mini runs around 1250 mm/s². This machine runs over four times
> that. That is the CoreXY payoff — low moving mass and a stiff frame.

### 16.3 X and Y steppers, and sensorless homing

```ini
[stepper_x]                                       # CoreXY motor A
step_pin: PE6
dir_pin: !PE5
enable_pin: !PC14
microsteps: 16
rotation_distance: 40
endstop_pin: tmc2209_stepper_x:virtual_endstop    # No physical switch
position_endstop: 0
position_max: 365
homing_speed: 35
homing_retract_dist: 0

[tmc2209 stepper_x]
uart_pin: PC13
diag_pin: ^PF4
run_current: 1.20
stealthchop_threshold: 0
driver_SGTHRS: 35
```

Y is identical, on different pins (`PE2`/`PE1`/`PE4`, uart `PE3`, diag `PF3`).

| Setting | Why it is what it is |
|---|---|
| `rotation_distance: 40` | 20-tooth pulley × 2 mm GT2 pitch = 40 mm of belt per revolution |
| `microsteps: 16` | Plenty. Higher values increase CPU load for no real benefit |
| `virtual_endstop` | **There is no switch.** The driver detects the motor stalling |
| `position_max: 365` | Travel limit. Klipper refuses moves beyond this |
| `homing_speed: 35` | ⚠️ **Critical for sensorless homing.** StallGuard detection is speed-dependent — change this and you must re-tune `driver_SGTHRS` |
| `homing_retract_dist: 0` | No second homing pass. Sensorless homing cannot usefully re-home from a short distance |
| `run_current: 1.20` | Amps. Max for these motors is ~1.4 A |
| `stealthchop_threshold: 0` | StealthChop **disabled**. ⚠️ Sensorless homing requires SpreadCycle — StallGuard does not work in StealthChop |
| `driver_SGTHRS: 35` | Stall sensitivity. **Higher = more sensitive** (stalls earlier). Tuned in [§18.2](#182-sensorless-homing-tuning) |

💡 **`stepper_x` is CoreXY motor A, not "the X motor."** Both motors move the toolhead in both
directions. If a homing problem appears on "X," the fault could be in either motor, either belt, or
the gantry's squareness.

### 16.4 The three Z steppers

```ini
[stepper_z]                                # Front-left — Motor 5
step_pin: PG13
dir_pin: PG12
enable_pin: !PG15
microsteps: 16
rotation_distance: 4                       # 1204 ballscrew: 4 mm lead
endstop_pin: probe:z_virtual_endstop       # Homes on the Klicky probe
position_min: -17.0
position_max: 250
homing_speed: 10
second_homing_speed: 5
homing_retract_dist: 5

[tmc2209 stepper_z]
uart_pin: PG14
run_current: 0.50
stealthchop_threshold: 0
```

`stepper_z1` (Motor 6) and `stepper_z2` (Motor 7) carry only the pins, microsteps, and
`rotation_distance` — position limits and homing belong to `stepper_z` alone.

| Setting | Why |
|---|---|
| `rotation_distance: 4` | ⚠️ **A 1204 ballscrew has 4 mm lead.** If you fitted T8 leadscrews instead, this must be `8`. Getting this wrong makes every Z dimension exactly half or double |
| `endstop_pin: probe:z_virtual_endstop` | Z homes by touching the bed with the Klicky. **The probe must be attached, or the nozzle drives into the bed** |
| `position_min: -17.0` | Negative travel is allowed so a large negative Z offset can still be reached |
| `homing_speed: 10` / `second_homing_speed: 5` | Slow. Probing accuracy depends on approach speed |
| `run_current: 0.50` | Lower than XY — a ballscrew on a rail needs very little torque |

⚠️ **The most dangerous single fact in this manual:** `G28 Z` with no probe attached homes into open
air and drives the nozzle into the bed at full homing travel. `PRINT_START` attaches the probe for
you. Never issue a bare `G28 Z` manually without confirming the probe is on the toolhead.

### 16.5 Z-tilt — levelling the gantry

```ini
[z_tilt]
z_positions:          # Where the three Z motors physically push
    350, 360
    200, 10
    10, 360
points:               # Where the probe touches, to measure each motor's effect
    300, 340
    180, 75
    50, 340
speed: 200
horizontal_move_z: 20
retries: 5
retry_tolerance: 0.007
```

💡 **The two lists are different things, and confusing them is a classic mistake:**

- **`z_positions`** = the XY coordinates of the **pivot points where each Z screw lifts the gantry**.
  These are physical facts about your machine's geometry. They are not adjustable, they are measured.
- **`points`** = where the **probe touches the bed** to measure the result. These are chosen to be
  as close as practical to each pivot while remaining reachable by the probe.

**The order of the two lists must correspond** — first `z_positions` entry pairs with first `points`
entry, and each entry must line up with the correct stepper. If they are mismatched, `Z_TILT_ADJUST`
drives the gantry *further* out of level every iteration and eventually fails with "retries exceeded."

> 🖼️ **[DIAG-13] z_positions vs points**
> *Show:* a top-down bed diagram with the three `z_positions` (where screws lift) in one colour and the three `points` (where the probe touches) in another, numbered 1-2-3 and paired with lines.
> *Look for:* ⚠️ that the two lists are different things in matching order. Confusing them is the classic Z-tilt failure.

`retry_tolerance: 0.007` means the three points must agree within **7 microns** before Klipper is
satisfied — a demanding target that requires a mechanically sound machine and a repeatable probe.

> 🟠 **Mini → Ultramarine:** Nothing on the Mini does this. `Z_TILT_ADJUST` physically tilts the
> gantry by driving three motors different amounts. It is **not** the same as bed mesh — Z-tilt
> makes the gantry *parallel to the bed*, and mesh compensates for the bed *not being flat*. You
> need both, in that order.

### 16.6 Bed mesh

```ini
[bed_mesh]
speed: 200
horizontal_move_z: 20
mesh_min: 30, 30
mesh_max: 320, 320
probe_count: 5,5
algorithm: bicubic
fade_start: 1
fade_end: 10
```

| Setting | Meaning |
|---|---|
| `mesh_min` / `mesh_max` | The probed area — 30 mm to 320 mm on both axes. ⚠️ Must stay inside `position_max` **allowing for the probe's XY offset** |
| `probe_count: 5,5` | 25 points. Adequate for a flat cast plate; raise to 7×7 for a bed with more variation |
| `algorithm: bicubic` | Smooth interpolation between points. Needs at least 4×4 |
| `fade_start: 1` / `fade_end: 10` | Mesh correction fades out between Z=1 mm and Z=10 mm. Above 10 mm the mesh is ignored entirely |

💡 **Why fade exists:** the mesh corrects for the *bed's* shape, which only matters for the first
few layers. Applying it at 100 mm height would wobble the whole print vertically for no reason.

⚠️ **Always mesh at printing temperature.** Aluminium expands roughly 0.7 mm across 300 mm when
heated to 100 °C. A cold mesh is a mesh of a different bed. `PRINT_START` handles this by waiting
for bed temperature before meshing.

### 16.7 The heated bed and its two sensors

```ini
[heater_bed]
heater_pin: PA1                                 # → SSR control input
sensor_type: EPCOS 100K B57560G104F
sensor_pin: PB1                                 # Thermistor 1
min_temp: 0
max_temp: 110

[temperature_sensor heater_bed_2]
sensor_type: EPCOS 100K B57560G104F
sensor_pin: PB0                                 # Thermistor 2 — monitoring only
min_temp: 0
max_temp: 110
```

`[heater_bed]` is the controlled heater. `[temperature_sensor heater_bed_2]` is a **monitoring-only**
sensor — Klipper reports it but does not control from it. Its purpose is the cross-check in
[§16.9](#169-the-dual-thermistor-bed-safety-check).

⚠️ **`max_temp: 110` is a safety limit, not a target.** If a reading exceeds it, Klipper shuts down
immediately. **Never raise it to silence an error.** An out-of-range reading means either a real
overheat or a failed sensor, and both need investigating, not suppressing.

The bed's PID values live in the `SAVE_CONFIG` block, generated by `PID_CALIBRATE`
([§18.6](#186-pid-tuning)). From the reference machine:

```
pid_kp = 57.114
pid_ki = 1.182
pid_kd = 689.657
```

📋 These are **reference values only.** Your bed has different thermal mass and insulation. Run your
own `PID_CALIBRATE`.

### 16.8 Fans

```ini
[fan_generic pi_cooling]     pin: PF7    # CM5
[fan_generic mcu_cooling]    pin: PF9    # Mainboard MCU
[fan_generic driver_coling]  pin: PF6    # Stepper drivers  (sic — spelled this way in the config)
[fan_generic el_cooling]     pin: PA4    # Electronics bay
[fan_generic another_fan]    pin: PF8    # Spare / chamber
```

⚠️ **`fan_generic` fans do not start automatically.** They are manually controlled from the web
interface or from a macro. That is a deliberate design choice, and it has a consequence:
**if you never turn on `driver_coling`, your stepper drivers can overheat and drop out mid-print**
([§26.1](#261-layer-shifts), [§27.3](#273-motor-stalls--skips-steps)).

🔧 **Strongly recommended: turn the cooling fans on automatically at startup.** Add a delayed
G-code to `printer.cfg`:

```ini
[delayed_gcode START_COOLING_FANS]
initial_duration: 2
gcode:
    SET_FAN_SPEED FAN=pi_cooling SPEED=0.6
    SET_FAN_SPEED FAN=mcu_cooling SPEED=0.6
    SET_FAN_SPEED FAN=driver_coling SPEED=0.8
    SET_FAN_SPEED FAN=el_cooling SPEED=0.5
```

The toolhead fans (hotend 4010 and part-cooling 5015) are defined in `ebb36.cfg`, not here. The
commented-out `[fan]` and `[heater_fan fan1]` blocks in `printer.cfg` are leftovers — the live
definitions belong in the toolhead config.

### 16.9 The dual-thermistor bed safety check

This is a custom safety system, and it is worth understanding.

```ini
[gcode_macro BED_TEMP_CHECK]
gcode:
    {% set main = printer.heater_bed.temperature %}
    {% set aux = printer["temperature_sensor heater_bed_2"].temperature %}
    {% set diff = (main - aux) | abs %}

    M118 Bed temp diff: {diff}C

    {% if diff > 10 %}
    M118 WARNING: Bed temperature imbalance!
    TURN_OFF_HEATERS
    {% endif %}

[delayed_gcode BED_TEMP_MONITOR]
initial_duration: 15
gcode:
  BED_TEMP_CHECK
  UPDATE_DELAYED_GCODE ID=BED_TEMP_MONITOR DURATION=15
```

**What it does:** every 15 seconds, forever, it compares the two bed thermistors. If they disagree
by more than **10 °C**, it shuts off every heater.

**Why it matters.** The bed is heated by two AC pads — individually fused, both switched by one
SSR ([§11.5](#115-bed-heating--one-ssr-two-fused-zones)) — and Klipper controls from only one of the
two thermistors. This check watches the other one.

**What it catches — asymmetric failures, where one zone behaves differently from the other:**

- **One fuse blows** → that zone goes cold while the other keeps heating → its thermistor lags →
  divergence → shutdown. ⚠️ **This is the most likely bed fault on this machine, and this check is
  what catches it.**
- **One heater pad fails open** → same signature.
- **A thermistor detaches from the plate** → it reads air while the bed heats → divergence → shutdown.
- **A pad partially delaminates** → that zone heats unevenly → divergence as the gradient grows.

Without it, a printer with one dead zone would keep printing on a bed that is hot on one half and
cold on the other, and you would chase it as a first-layer problem for weeks.

⚠️ **What it does NOT catch — symmetric failures.** Because a single SSR switches both pads, an
**SSR failed closed** heats both zones equally. Both thermistors rise together, there is no
divergence, and this check stays silent. Your protection against that case is:

1. **`max_temp: 110`** in `[heater_bed]` — Klipper shuts down the moment the reading exceeds it
2. **Klipper's heater verification** — it notices temperature behaving impossibly
3. **You**, noticing a bed heating when nothing asked it to

This is not a design flaw so much as a limit worth knowing: the cross-check is a *zone imbalance*
detector, not a general runaway detector. ⚠️ **It is also the specific reason `max_temp` must never
be raised to silence an error** ([§16.7](#167-the-heated-bed-and-its-two-sensors)) — for one class
of failure it is the only thing standing between you and an uncontrolled 350 mm heater.

⚠️ **Never disable `BED_TEMP_MONITOR`.** If it trips, something is genuinely wrong — go to
[§30.1](#301-bed-doesnt-heat-at-all) and [§30.5](#305-bed_temp_check-keeps-tripping).

💡 **The `initial_duration: 15` / `UPDATE_DELAYED_GCODE` pattern** is how you make something run
forever in Klipper: the macro re-schedules itself every time it runs.

### 16.10 PRINT_START, step by step

This is the macro your slicer calls at the beginning of every print. Understanding it means
understanding what a healthy print startup looks like.

```ini
[gcode_macro PRINT_START]
gcode:
    {% set BED_TEMP      = params.BED_TEMP|float %}
    {% set EXTRUDER_TEMP = params.EXTRUDER_TEMP|float %}
    {% set AREA_START    = params.AREA_START|default("15,25")|string %}
    {% set AREA_END      = params.AREA_END|default("365,365")|string %}
```

It takes four parameters from the slicer. `AREA_START` / `AREA_END` are the bounding box of the
actual print, used for **adaptive meshing**.

**Step 1 — Preheat the bed and go red**

```gcode
M140 S{BED_TEMP}
SET_LED LED=mini12864 RED=1 GREEN=0 BLUE=0 ...
```

`M140` starts the bed heating **without waiting**, so homing happens while it warms. The display
turns red to indicate an active print.

**Step 2 — Home, in an unusual order**

```gcode
G28 X
G28 Y
G28 X      # again
G28 Y      # again
G28 Z
```

💡 **Why X and Y are homed twice.** This is sensorless homing on a CoreXY machine. The first pass
drives the gantry into the frame, which physically **squares the gantry against the frame ends** —
exactly the manual squaring operation from [§8.6](#86-square-the-gantry), done by the motors. The
second pass then homes from a known-square position and gets an accurate result. On a CoreXY
machine with sensorless homing, this double-home is a genuinely good idea, and removing it costs
you positional accuracy.

**Step 3 — Level the gantry**

```gcode
Z_TILT_ADJUST
```

Runs before meshing. Order matters: level the gantry first, then map the bed relative to it.

**Step 4 — Wait for the bed**

```gcode
TEMPERATURE_WAIT SENSOR=heater_bed MINIMUM={BED_TEMP - 2}
```

Blocks until the bed is within 2 °C of target, so the mesh is taken on a thermally expanded bed.

**Step 5 — Adaptive bed mesh**

```gcode
BED_MESH_CLEAR
BED_MESH_CALIBRATE ALGORITHM=bicubic \
    MESH_MIN={area_start_x},{area_start_y} \
    MESH_MAX={area_end_x},{area_end_y} \
    PROBE_COUNT=5,5
```

💡 **Adaptive meshing only probes the area you are actually printing on.** A 40 mm calibration cube
gets a 5×5 mesh over 40 mm — far denser and far faster than a 5×5 mesh over 350 mm. This requires
your slicer to pass the print bounding box; see [§19.3](#193-start-and-end-g-code).

**Step 6 — Heat the nozzle, away from the bed**

```gcode
G1 X175 Y10 Z10 F6000
M109 S{EXTRUDER_TEMP}
```

Moves to the front centre, 10 mm up, then waits for nozzle temperature. Heating away from the print
area means any ooze lands where it does not matter.

> 🖼️ **[DIAG-14] PRINT_START flowchart**
> *Show:* a flowchart of all eight steps, with the double X/Y home called out and a note on what each step depends on.
> *Look for:* the double home step — students consistently assume it is a bug and delete it.

**Step 7 — Purge lines**

Two lines at the rear of the bed: a thick one to clean the nozzle, then a thin one to stabilise flow.
By the time the real print starts, the nozzle is primed and clean.

**Step 8 — Move to the start position**

```gcode
G1 Z2.0 F3000
G1 X{area_start_x} Y{area_start_y} F6000
G1 Z0.2 F300
M117 Printing...
```

⚠️ **`PRINT_START` does not attach the Klicky probe** in the version in this repository. Your
`klicky-probe.cfg` must supply `ATTACH_PROBE` / `DOCK_PROBE` and either hook them into
`Z_TILT_ADJUST` and `BED_MESH_CALIBRATE` (the standard Klicky approach uses macro overrides), or
you must add explicit calls. **Verify this works before your first real print** — see
[§17.8](#178-stage-7--probe-and-homing-dry-run).

### 16.11 PRINT_END, PAUSE, RESUME, CANCEL_PRINT

**`PRINT_END`** lifts Z (to 150 or 200 mm depending on current height), parks at X0 Y0, turns off
both heaters, disables steppers, clears the mesh, and sets the display green.

**`PAUSE`** saves the current position, lifts 10 mm (capped so it cannot exceed `position_max`),
parks at X10 Y10, and retracts 10 mm of filament to stop oozing.

**`RESUME`** pushes 10 mm back in and restores the saved position.

**`CANCEL_PRINT`** kills both heaters, retracts 3 mm, lifts, parks at 0,0, calls Klipper's internal
cancel, and returns the display to green.

💡 **Note the `|min` and clamping patterns** in these macros — for example
`[printer.toolhead.position.z + 10, printer.toolhead.axis_maximum.z]|min`. This is what prevents a
pause near the top of the build volume from commanding a move out of range and throwing
"Move out of range" ([§33.2](#332-move-out-of-range)) at the worst possible moment.

### 16.12 The SAVE_CONFIG block

At the bottom of `printer.cfg`:

```
#*# <---------------------- SAVE_CONFIG ---------------------->
#*# DO NOT EDIT THIS BLOCK OR BELOW. The contents are auto-generated.
```

Everything below that line is written by Klipper itself when you run `SAVE_CONFIG` after a
calibration. It holds:

- `[bed_mesh default]` — the saved height map
- `[input_shaper]` — resonance frequencies and shaper types
- `[heater_bed]` — PID constants
- `[probe]` — the Z offset

**Rules:**
- **Do not hand-edit this block.** Klipper rewrites it and your edits vanish.
- To change one of these values, re-run the calibration that produces it.
- To discard a calibration, delete its sub-section from this block and restart.
- ⚠️ **When you copy someone else's `printer.cfg`, delete their SAVE_CONFIG block.** Their bed mesh
  is a map of their bed. Their shaper frequencies describe their frame. Their Z offset is a
  measurement of their nozzle and their probe.

📋 **Reference values from the machine this manual documents** — for comparison only, not to copy:

| Value | Reference reading |
|---|---|
| Input shaper X | `3hump_ei` @ 110.8 Hz |
| Input shaper Y | `2hump_ei` @ 62.8 Hz |
| Bed PID | Kp 57.114 · Ki 1.182 · Kd 689.657 |
| Bed mesh range | ±0.075 mm across 290 mm — a very flat bed |

💡 **The X shaper frequency being much higher than Y (110.8 vs 62.8 Hz) is exactly what you expect
on CoreXY**: the X axis is a short, light rail, while Y moves the entire gantry assembly. More mass
means a lower resonant frequency. If your numbers show the same pattern, your machine is behaving
normally.

---

## 17. First power-on — the staged smoke test

⛔ **This is the most important section in Part 3. Do not skip it, do not reorder it, and do not
"just try it" first.**

Every stage below adds exactly one thing and verifies it. If something is wired wrong, this
sequence finds it while the damage is still zero.

> 🖼️ **[DIAG-15] Staged power-on sequence**
> *Show:* a flowchart of Stages 0-8, each box showing what is connected at that stage and the go/no-go test, with red stop markers at the abort points.
> *Look for:* that each stage adds exactly one thing. Print this and tick the stages off physically.

> 🟠 **Mini → Ultramarine:** Your Mini was powered on for the first time at a factory, by people
> who had tested the design a thousand times. Nobody has tested *your* wiring. This section is that
> testing.

### 17.1 Stage 0 — Pre-power inspection

With the machine **unplugged**:

- [ ] All checks in [§11.4](#114-wiring-mains-ac) (AC) pass
- [ ] All checks in [§12.6](#126-final-wiring-inspection) (wiring) pass
- [ ] **24 V polarity verified with a meter at every board input**
- [ ] Nothing metallic left inside the electronics bay — no swarf, no dropped screws, no offcuts
- [ ] Every connector seated and tugged
- [ ] Extinguisher within reach; you know where the wall socket is

### 17.2 Stage 1 — PSUs only, no loads

1. **Disconnect the 24 V output leads from every board.** Mainboard, EBB36, fans — everything.
2. Plug in and switch on.
3. **Measure both PSU outputs** with a meter: each should read **24.0–24.3 V**.
4. Adjust the trim pots if needed.
5. Switch off, **unplug**, wait 60 seconds.

⚠️ **If a PSU reads 0 V, buzzes, smells, or gets hot: unplug immediately.** Do not proceed. Recheck
your AC wiring against [§11.4](#114-wiring-mains-ac).

### 17.3 Stage 2 — Mainboard and CM5

1. Connect **only** the mainboard's 24 V input. Nothing else.
2. Power on.
3. The mainboard's LEDs should light. The CM5 should boot.
4. After a minute, the printer should appear on your network. Open `http://<printer-ip>`.
5. Confirm Klipper connects to the MCU. If you have not yet loaded a valid `printer.cfg`, you will
   see a config error — that is fine. What matters is that the MCU is **found**.

**If nothing lights:** power off and unplug immediately, then check 24 V polarity again. Reversed
polarity is usually instantly fatal to the board.

### 17.4 Stage 3 — CAN bus and the EBB36

1. Power off and unplug. Connect the toolhead umbilical.
2. Power on.
3. Over SSH:

```bash
~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q
```

4. The EBB36's UUID should appear.

**If it does not**, work through, in this order: 24 V present at the EBB36? CAN_H and CAN_L not
swapped? Both terminations fitted (and only two)? Pair actually twisted? Bitrates matching? See
[§32.1](#321-can-bus-errors--ebb36-disconnects).

⛔ **Do not proceed until the EBB36 is visible on CAN.** Nothing about the toolhead works until this
does.

### 17.5 Stage 4 — Thermistors, before any heater

**Check temperatures before you allow anything to heat.** This is the stage that prevents a
thermal runaway on your very first power-up.

1. With a valid `printer.cfg` loaded, look at the temperature readings in the web interface.
2. All of these should read **room temperature (roughly 18–25 °C)**:
   - Hotend thermistor
   - Bed thermistor 1 (`heater_bed`)
   - Bed thermistor 2 (`heater_bed_2`)

⚠️ **If any sensor reads an absurd value** (−273, 0, 400, or wildly fluctuating), the sensor is
open, shorted, or the wrong `sensor_type` is configured. **Fix it before enabling any heater.** A
heater controlled by a broken sensor is a fire. See [§29.2](#292-temperature-reading-wildly-wrong).

3. Confirm bed thermistors 1 and 2 read **within a couple of degrees of each other**. If they do
   not at room temperature, one is faulty or misconfigured, and `BED_TEMP_CHECK` will trip as soon
   as you heat.

### 17.6 Stage 5 — Heaters, watched

**Hotend first** (lower energy, faster response):

1. Set the hotend to **50 °C** — well below any melting point.
2. **Watch the temperature graph.** It should rise smoothly and settle.
3. ⚠️ **If the temperature falls when you command heat, the thermistor and heater are on different
   hotends, or the reading is inverted. Stop immediately.**
4. Confirm the **4010 hotend fan** starts. It must run whenever the hotend is hot.
5. Raise to 200 °C and watch it hold.

**Then the bed:**

1. Set the bed to **50 °C**.
2. **Watch the SSR indicator LED.** It should light.
3. Watch **both** bed thermistors. They should rise together.
4. Watch the console for `Bed temp diff:` messages from `BED_TEMP_CHECK`. The difference should stay
   small.
5. Feel the bed by hand — briefly, at the edge — and confirm both zones are warming. One cold half
   means a blown fuse or a failed heater pad on that side — check the two fuses first
   ([§11.5](#115-bed-heating--one-ssr-two-fused-zones)).

⚠️ **Stay at the machine for this entire stage, with a hand near the switch.**

### 17.7 Stage 6 — Motors, unloaded and one at a time

⛔ **Before any motor moves, know how to stop it.** The **EMERGENCY STOP** button in Mainsail/Fluidd
kills everything instantly. Keep the mouse on it. `M112` does the same from the console.

1. **Check the direction of each axis before homing anything.** With the toolhead near the middle,
   issue small relative moves:

```gcode
G91
G1 X10 F1000
G90
```

   The toolhead should move **+X (right)**. If it moves left, add or remove the `!` on that
   stepper's `dir_pin` in `printer.cfg`.

2. Repeat for Y (`G1 Y10`) — should move **+Y (rear)**.
3. For Z: `G1 Z10` should move the bed **away from the nozzle** (down, since the gantry is fixed).
   ⚠️ **A reversed Z direction drives the bed into the nozzle.** Test with a large gap and be ready
   to hit emergency stop.
4. Check **all three Z motors move together**. `Z_TILT_ADJUST` cannot work if one is dead or reversed.

💡 **On CoreXY, a single reversed motor produces diagonal motion, not reversed motion.** If
commanding X moves the toolhead diagonally, one of the two motors is inverted. If commanding X
moves it in Y and vice versa, both are inverted relative to each other.

### 17.8 Stage 7 — Probe and homing dry run

⛔ **The single most dangerous moment in commissioning is the first `G28 Z`.** If the probe is not
attached, or the probe is not working, the nozzle drives into the bed.

**Test the probe before you trust it:**

1. With the probe attached to the toolhead **by hand**, and the toolhead well above the bed, run:

```gcode
QUERY_PROBE
```

   It should report `probe: open`.

2. **Press the probe switch with your finger** and run `QUERY_PROBE` again. It should now report
   `probe: TRIGGERED`.

⚠️ **If the states are backwards, fix the `!` in the probe pin definition before going any further**
([§33.5](#335-probe-triggered-prior-to-movement)). A probe that reads triggered-when-open causes
"Probe triggered prior to movement." A probe that reads open-when-triggered causes the nozzle to
drive into the bed.

3. **Test the automatic attach and dock at low speed:**

> 🖼️ **[PHOTO-05] QUERY_PROBE — both states**
> *Show:* two screenshots of the console: `probe: open` with the switch free, and `probe: TRIGGERED` with a finger pressing it.
> *Look for:* what correct looks like. If yours are reversed, fix it before homing Z.

```gcode
G28 X
G28 Y
ATTACH_PROBE
DOCK_PROBE
```

   Watch closely. Be ready to emergency stop. Repeat until it is reliable.

4. **First `G28 Z`, with a safety margin.** Lower the bed well away from the nozzle first. Home Z
   with your hand on the emergency stop and your eyes on the nozzle. If the nozzle keeps descending
   after touching, hit stop immediately.

### 17.9 Stage 8 — Sensorless homing tuning

X and Y home by stalling into the frame. Tuning this is covered in
[§18.2](#182-sensorless-homing-tuning). Do it now, before any calibration that depends on accurate
homing.

✅ **Commissioning checkpoint — all of these must be true before Section 18:**

- [ ] Both PSUs at 24.0–24.3 V
- [ ] Mainboard and CM5 boot; Klipper connects to `mcu`
- [ ] EBB36 visible on CAN; Klipper connects to `EBBCan`
- [ ] All three thermistors read room temperature at rest
- [ ] Hotend heats and holds; 4010 fan runs when hot
- [ ] Both bed zones heat; both thermistors track together
- [ ] X, Y and Z all move in the correct direction
- [ ] All three Z motors respond
- [ ] `QUERY_PROBE` reports the correct state in both positions
- [ ] `ATTACH_PROBE` / `DOCK_PROBE` work reliably
- [ ] `G28` completes on all axes without drama

---

## 18. Calibration sequence

**Do these in order.** Each step depends on the ones before it. Doing them out of order means
redoing them.

| # | Step | Depends on | Repeat when |
|---|---|---|---|
| 1 | [Stepper current check](#1811-stepper-current-verification) | — | Motors run hot |
| 2 | [Sensorless homing](#182-sensorless-homing-tuning) | Free mechanics | Homing gets unreliable |
| 3 | [Z offset](#183-z-offset) | Probe works | Nozzle or probe changed |
| 4 | [Z-tilt](#184-z-tilt) | Z offset | Every power-on (automatic) |
| 5 | [Bed mesh](#185-bed-mesh) | Z-tilt | Every print (automatic) |
| 6 | [PID tuning](#186-pid-tuning) | Heaters work | Hotend/sock/bed changed |
| 7 | [Extruder rotation distance](#187-extruder-calibration-rotation-distance) | Hotend heats | Extruder changed |
| 8 | [Flow rate](#188-flow-rate) | Rotation distance | New filament type |
| 9 | [Pressure advance](#189-pressure-advance) | Flow rate | New filament type |
| 10 | [Input shaper](#1810-input-shaper) | Mechanics final | Mechanics change |

> 🟠 **Mini → Ultramarine:** All ten of these arrived pre-done on your Mini. This is a full day of
> work spread over several sessions. It is also where you learn how your machine actually behaves,
> and that knowledge is what makes you able to fix it later.

### 18.1 Before you start

- Have the machine at a stable room temperature.
- Have filament loaded and a known-good spool — do not calibrate on damp or mystery filament.
- **`SAVE_CONFIG` restarts Klipper.** Every time. Expect it.
- Back up `printer.cfg` between steps.

### 18.2 Sensorless homing tuning

X and Y have no endstops. The TMC2209 detects the motor stalling against the frame.

**The tuning parameter is `driver_SGTHRS`.** Higher = more sensitive = stops earlier. The
repository config uses **35** for both axes.

**Procedure:**

1. Make sure the gantry moves **completely freely** by hand. Sensorless homing cannot distinguish a
   stall against the frame from a stall against a tight belt or a snagged cable. Fix mechanics first.
2. Set a starting value:

```gcode
SET_TMC_FIELD STEPPER=stepper_x FIELD=SGTHRS VALUE=35
```

3. Home the axis:

```gcode
G28 X
```

4. Judge the result:

| What happens | Meaning | Action |
|---|---|---|
| Stops firmly at the frame, no grinding | Correct | Keep it |
| Grinds/hammers into the frame before stopping | Not sensitive enough | **Raise** SGTHRS by 5 |
| Stops early, in mid-travel | Too sensitive | **Lower** SGTHRS by 5 |
| Sometimes works, sometimes doesn't | Marginal, or mechanical friction | Fix mechanics; then find the middle of the working range |

5. Once found, home the axis **ten times in a row**. It must work every time.
6. Write the value into `printer.cfg` as `driver_SGTHRS:` and restart.
7. Repeat for Y.

⚠️ **`homing_speed` and `driver_SGTHRS` are coupled.** StallGuard readings change with speed. If you
change `homing_speed` (35 in this config), you must re-tune SGTHRS.

⚠️ **`stealthchop_threshold` must be 0.** StallGuard does not work in StealthChop mode.

💡 **Sensorless homing gets less reliable as things wear or loosen.** If homing that was rock solid
becomes flaky, do not immediately reach for SGTHRS — check belt tension and gantry freedom first.
Flaky homing is often the first symptom of a developing mechanical problem.

### 18.3 Z offset

The Z offset is the distance between where the probe triggers and where the nozzle actually touches
the bed.

```gcode
G28
PROBE_CALIBRATE
```

Then use the paper method:

1. Cut a strip of ordinary printer paper (~0.1 mm thick).
2. Put it under the nozzle.
3. Lower in steps using the on-screen controls or:

```gcode
TESTZ Z=-0.1
```

   then `-0.05`, then `-0.01` as you get close.
4. **Target feel:** the paper drags with **light resistance** but still slides. Not free, not gripped.
5. Accept:

> 🖼️ **[PHOTO-06] Z offset — the paper drag**
> *Show:* a close-up of the paper under the nozzle at the correct height, with a short caption describing the feel: drags with light resistance, still slides.
> *Look for:* that this is a feel, not a measurement. A photo can only set the expectation.

```gcode
ACCEPT
SAVE_CONFIG
```

🔧 **Do this at printing temperature.** Both nozzle and bed expand when hot — a Z offset set cold is
wrong when hot. Heat the bed to 60 °C and the nozzle to 150 °C (hot enough to expand, cool enough
not to ooze) before calibrating.

> 🟠 **Mini → Ultramarine:** This is your Mini's "first layer calibration," but you set it once
> properly rather than nudging it every print. Live adjustment during a print is still available:
> `SET_GCODE_OFFSET Z_ADJUST=-0.025 MOVE=1` — the equivalent of babystepping.

### 18.4 Z-tilt

```gcode
G28
Z_TILT_ADJUST
```

Klipper probes the three `points`, works out how much each Z motor must move, adjusts each
individually, and repeats until all three agree within `retry_tolerance` (0.007 mm).

**Watch the console.** You should see the deviation shrink each iteration:

```
Retries: 1/5 Probed points range: 0.157500 tolerance: 0.007000
Retries: 2/5 Probed points range: 0.032500 tolerance: 0.007000
Retries: 3/5 Probed points range: 0.004375 tolerance: 0.007000
```

**Two to three iterations is normal on the first run** after assembly or a power cycle.

⚠️ **If the range does not shrink, or grows:** stop. Something is mechanically wrong or the config
is wrong. Go to [§31.4](#314-z-tilt-doesnt-converge).

💡 **Z-tilt must be re-run after every power cycle**, because the three motors lose their relative
positions when disabled. `PRINT_START` does this automatically. Do not remove it.

### 18.5 Bed mesh

```gcode
BED_MESH_CALIBRATE
SAVE_CONFIG
```

⚠️ **Mesh at printing temperature.** Heat the bed to your usual printing temperature and let it
soak for **10 minutes** before meshing — a 350 mm cast plate takes that long to reach a uniform
temperature. Aluminium expands ~0.7 mm across 300 mm at 100 °C, so a cold mesh describes a
different shape of bed.

View the result in Mainsail/Fluidd (*Heightmap*). A healthy mesh is a **smooth surface** — a gentle
dome, bowl, or tilt. The reference machine's mesh spans only **±0.075 mm across 290 mm**, which is
an excellent flat cast plate.

⚠️ **A lumpy, spiky mesh is not a bed problem — it is a probe problem.** Go to
[§31.5](#315-bed-mesh-looks-lumpy).

💡 In normal operation `PRINT_START` builds a **fresh adaptive mesh** of just the print area every
time, so the saved default mesh matters less than on many machines. Still generate it — it is a
useful reference and it tells you about your bed.

> 🖼️ **[PHOTO-07] Bed mesh heightmap — good vs bad**
> *Show:* two Mainsail heightmap screenshots side by side: a smooth gentle dome spanning ~0.075 mm, and a spiky noisy one.
> *Look for:* ⚠️ that spiky means **probe noise**, not a bad bed. This distinction sends people down the right path.

### 18.6 PID tuning

PID is what keeps a heater at a steady temperature instead of oscillating.

**Hotend** — at the temperature you actually print at:

```gcode
PID_CALIBRATE HEATER=extruder TARGET=240
```

**Bed** — same:

```gcode
PID_CALIBRATE HEATER=heater_bed TARGET=100
```

Then:

```gcode
SAVE_CONFIG
```

Each run takes a few minutes while the heater deliberately oscillates to characterise itself.

⚠️ **Re-run PID after any thermal change:** new silicone sock, different nozzle, changed hotend
assembly, bed insulation added, or a different part-cooling duct. PID values describe a specific
thermal system.

📋 Reference bed values from this machine: `Kp 57.114, Ki 1.182, Kd 689.657`. Yours will differ.

### 18.7 Extruder calibration (rotation distance)

> 🟠 **Mini → Ultramarine:** This is "E-steps" under a different name. Klipper uses
> `rotation_distance` (mm of filament per motor revolution) instead of steps-per-mm.

**Procedure:**

1. Heat the hotend to printing temperature.
2. Load filament.
3. **Mark the filament exactly 120 mm above the extruder inlet.** Use calipers and a fine marker.
4. Extrude 100 mm, slowly:

```gcode
G91
M83
G1 E100 F120
```

   (F120 = 2 mm/s. Slow matters — fast extrusion introduces its own errors.)

5. Measure from the mark to the inlet again. Call it `remaining`.
6. **Actual extruded = 120 − remaining.**
7. Calculate:

```
new_rotation_distance = old_rotation_distance × (actual_extruded / 100)
```

   *Example:* old value 4.637, actual extruded 97.5 mm →
   `4.637 × 0.975 = 4.521`

8. Put the new value in `ebb36.cfg` under `[extruder] rotation_distance:`, restart, and repeat.
9. **Target: within ±0.5 mm of 100 mm.**

> 🖼️ **[PHOTO-08] Extruder calibration — marking the filament**
> *Show:* filament marked at exactly 120 mm above the extruder inlet, with calipers in shot showing the measurement.
> *Look for:* where the 120 mm is measured *from*. Measuring from the wrong feature is the usual source of error.

⚠️ **If the number keeps changing between runs, it is not a calibration problem.** Something is
slipping. Check: hotend partially clogged (backpressure causes slip), Orbiter idler tension too
loose, or extrusion speed too high. See [§28.1](#281-extruder-doesnt-push-100-mm-when-asked).

### 18.8 Flow rate

Rotation distance calibrates the *extruder*. Flow rate calibrates how much plastic ends up in
the *part*.

1. Print a single-wall cube (OrcaSlicer has a built-in flow calibration test).
2. Measure the wall thickness with calipers in several places, and average.
3. `new_flow = old_flow × (expected_wall_thickness / measured)`
4. Set the result in the slicer's filament profile.

💡 **Flow rate is per-filament, not per-printer.** Rotation distance is per-printer. Do not confuse
them: if a new brand of PLA over-extrudes, adjust flow, not rotation distance.

### 18.9 Pressure advance

Pressure advance compensates for the lag between commanding extrusion and plastic actually coming
out — the melt zone acts like a spring.

**Symptoms it fixes:** blobs at corners, gaps after corners, thin walls at the start of a line,
bulging seams.

Run OrcaSlicer's built-in pressure advance test, or the Klipper tower test, and pick the value where
corners are sharpest without gaps.

📋 **Typical values for this Orbiter + Rapido combination: 0.030 – 0.060.** Direct drive needs far
less than Bowden.

Set it per filament in the slicer, or globally in `ebb36.cfg`:

```ini
[extruder]
pressure_advance: 0.040
```

💡 **Pressure advance is per-filament.** PETG typically needs more than PLA; TPU needs much more.
Setting it in the slicer's filament profile is the right place.

### 18.10 Input shaper

Input shaping measures your frame's resonant frequencies and shapes the motion commands to avoid
exciting them. It is what allows 5500 mm/s² without ringing.

> 🟠 **Mini → Ultramarine:** There is no Mini equivalent. This is a substantial capability, and it
> is why this machine can print fast and still look good.

**Requires:** the ADXL345 on the toolhead, already configured
(`[resonance_tester] accel_chip: adxl345`, probe point `175,175,20`).

```gcode
SHAPER_CALIBRATE
```

```gcode
SAVE_CONFIG
```

The test vibrates each axis through a frequency sweep and writes recommended shaper type and
frequency into the SAVE_CONFIG block.

⚠️ **It is loud and violent. This is normal.** Do not stop it because it sounds alarming — but do
make sure nothing is loose on the toolhead first, because it will find out.

📋 Reference results from this machine:

| Axis | Shaper | Frequency |
|---|---|---|
| X | `3hump_ei` | 110.8 Hz |
| Y | `2hump_ei` | 62.8 Hz |

**Reading your own results:**

> 🖼️ **[PHOTO-09] Input shaper result graph**
> *Show:* a `SHAPER_CALIBRATE` output graph for each axis, with the peak frequency marked and the recommended shaper labelled.
> *Look for:* what a healthy graph looks like — one clear peak. Multiple low-frequency peaks mean something is loose.

- **A very low frequency (< 30 Hz) means something is loose.** Find it and fix it before accepting
  the result — input shaping should compensate for a stiff frame's residual resonance, not paper
  over a floppy one.
- **X should be notably higher than Y** on CoreXY (less moving mass). If yours are similar or
  inverted, look for a loose X carriage or a loose gantry joint.
- The output also reports **maximum recommended acceleration** per axis. If it comes out below your
  configured `max_accel: 5500`, lower `max_accel` to match.

⚠️ **Re-run input shaper after any mechanical change** — retensioning belts, replacing a rail,
changing the toolhead, adding mass. The frame's resonance changed.

### 18.11 Stepper current verification

After **15 minutes of normal printing**, briefly touch each stepper:

| Feel | Verdict |
|---|---|
| Cool to mildly warm | Good |
| Warm but you can hold your hand on it | Good — this is normal |
| Too hot to hold for more than a second (≥ 75 °C) | **Too much current.** Lower by 0.05 A |

Configured values: **XY 1.20 A** (motor maximum ~1.4 A), **Z 0.50 A**.

**Driver heatsinks should never be too hot to touch.** If they are, turn on `driver_coling`
([§16.8](#168-fans)) — an overheating TMC2209 will thermally shut down mid-print and cause a layer
shift that looks like a mechanical fault.

💡 **The current trade-off:** too low causes missed steps and layer shifts under acceleration. Too
high causes hot motors, wasted power, and salmon-skin surface artefacts. When in doubt, start low
and raise in 0.05 A steps until missed steps stop, then add a small margin.

---

## 19. Slicer setup

### 19.1 Which nozzle and which slicer

From `slicer_profiles/profiles.md`:

> **Use a 0.6 mm nozzle with OrcaSlicer.** This is the combination the profiles are developed and
> tested against, and it shows the best consistency.

**Why 0.6 mm is the default here, not 0.4 mm:**

- On a 350 × 350 mm bed, most prints are large. A 0.6 mm nozzle roughly doubles throughput.
- Wider extrusions are stronger — better layer bonding and more cross-sectional area per wall.
- Fewer clogs: a 0.6 mm orifice is far more tolerant of filler, contamination, and fibre-filled
  materials.
- The Rapido HF has the melt capacity to feed it.

Use a 0.4 mm nozzle when you specifically need fine detail. Note that the profiles are less
developed for 0.4 mm.

> 🟠 **Mini → Ultramarine:** Coming from a 0.4 mm Mini, prints will look slightly coarser at the
> same layer height, and be finished in half the time. For most functional parts, that is the right
> trade.

**PrusaSlicer:** profiles are not yet available. You can import the OrcaSlicer profiles as a
starting point, but you will need to adjust settings to match. OrcaSlicer is the supported path.

### 19.2 Import the profiles

The repository provides:

| File | For |
|---|---|
| `slicer_profiles/UM3D 0.6.orca_printer` | **0.6 mm nozzle — recommended** |
| `slicer_profiles/UM3D.orca_printer` | 0.4 mm nozzle |

In OrcaSlicer: **File → Import → Import Configs**, select the `.orca_printer` file.

### 19.3 Start and end G-code

⚠️ **This must match the macros in `printer.cfg` exactly, or nothing works properly.**

**Machine start G-code:**

```gcode
PRINT_START BED_TEMP=[first_layer_bed_temperature] EXTRUDER_TEMP=[first_layer_temperature] AREA_START={first_layer_print_min[0]},{first_layer_print_min[1]} AREA_END={first_layer_print_max[0]},{first_layer_print_max[1]}
```

**Machine end G-code:**

```gcode
PRINT_END
```

**Every part of that start line matters:**

| Parameter | If you omit it |
|---|---|
| `BED_TEMP` | Macro fails — `params.BED_TEMP\|float` on a missing value throws an error |
| `EXTRUDER_TEMP` | Same |
| `AREA_START` / `AREA_END` | Falls back to meshing the **entire 350 mm bed** on every print — slow, and less accurate over your actual print area |

💡 **`AREA_START`/`AREA_END` are what enable adaptive meshing.** With them, a small print gets a
dense 5×5 mesh over just its footprint, taking seconds. Without them, every print probes the whole
bed.

⚠️ **The macro is called `PRINT_START`, not `START_PRINT`.** Klipper macro names are
case-insensitive but the words are not interchangeable. Older notes for this project use
`START_PRINT`; the live config defines `PRINT_START`. Use `PRINT_START`.

### 19.4 Slicer settings that matter on this machine

| Setting | Value | Why |
|---|---|---|
| Max acceleration | ≤ **5500 mm/s²** | Klipper's ceiling. Asking for more is silently clamped |
| Max speed | ≤ **200 mm/s** | Same |
| First layer speed | **20 mm/s** | Slow first layers stick. Raise later if you like |
| First layer height | 0.2–0.3 mm | More forgiving than thinner |
| Retraction (direct drive) | **0.5–1.0 mm** | ⚠️ Direct drive needs *far* less than Bowden. Mini-style values over-retract and cause jams |
| Travel speed | **200+ mm/s** | Gets the nozzle away before it can ooze |
| Pressure advance | **0.030–0.060** | Per filament — [§18.9](#189-pressure-advance) |
| Part cooling, PLA/PETG | 100 % / 50 % | |
| Part cooling, ABS/ASA | **0–20 %** | ⚠️ Too much cooling causes layer cracking in an enclosure |
| Brim for tall/narrow parts | **10 mm** | Cheap insurance |

> 🟠 **Mini → Ultramarine:** Retraction is the setting most likely to be wrong out of habit. The
> Mini is direct drive too, so you may already be close — but if you have ever used Bowden values
> (4–6 mm), they will cause clogs here.

### 19.5 Getting files to the printer

Three ways, in order of convenience:

1. **Upload from OrcaSlicer** — configure the printer's IP as a physical printer host (Moonraker /
   Mainsail). One click from slice to print.
2. **Drag and drop** into the Mainsail/Fluidd web interface.
3. **USB stick** — plug it in and files copy automatically. See
   [Appendix F](#f-usb-auto-sync-for-g-code-files).

> 🟠 **Mini → Ultramarine:** No more walking a USB stick back and forth, unless you want to. Network
> upload is the normal workflow.

---

## 20. First print

### 20.1 Pre-flight checklist

Work through **every** line. This is the last chance to catch something cheaply.

**Mechanical**
- [ ] Both belts tensioned and matched within 5 Hz
- [ ] Every grub screw tight and threadlocked — motor pulleys, Z couplers, idler shafts
- [ ] Gantry glides freely in all four diagonals with motors off
- [ ] All three Z stations move freely
- [ ] Nothing can foul the toolhead through its full travel

**Thermal**
- [ ] Bed at temperature and thermally soaked
- [ ] Spring steel sheet clean and fully seated, nothing underneath
- [ ] Both bed thermistors tracking together
- [ ] 4010 hotend fan running

**Calibration**
- [ ] Z offset saved
- [ ] `Z_TILT_ADJUST` runs and converges
- [ ] Bed mesh generated
- [ ] PID tuned for both heaters
- [ ] Rotation distance calibrated
- [ ] Input shaper calibrated

**Software**
- [ ] Slicer start G-code passes all four `PRINT_START` parameters
- [ ] End G-code calls `PRINT_END`
- [ ] Filament loaded and primed
- [ ] Electronics-bay cooling fans running

**Environment**
- [ ] ⚠️ **Door set correctly for the material** — 🔒 CLOSED for ABS/ASA/PC/PA, 🚪 OPEN for PLA/PETG/TPU ([The door rule](#the-door-rule))
- [ ] Room ventilated if printing styrenics
- [ ] Extinguisher accessible
- [ ] **You are staying in the room**

### 20.2 The first print itself

Print a **20 mm calibration cube**, 0.2 mm layer height, default speeds.

It validates motion, extrusion, cooling, and adhesion in fifteen minutes instead of six hours.

**Watch the entire first layer.** You are looking for:

| Good | Bad — and what it means |
|---|---|
| Lines slightly squashed, flat-topped | Round lines → Z offset too high ([§25.2](#252-first-layer-too-high)) |
| Adjacent lines fused with no gaps | Gaps → too high, or under-extruding |
| Uniform across the whole footprint | Good in one corner only → Z-tilt or mesh problem ([§25.3](#253-inconsistent-first-layer)) |
| Consistent, slightly matte finish | Translucent, smeared → too low ([§25.1](#251-nozzle-drags-or-gouges-the-bed)) |
| Corners stay down | Lifting → adhesion ([§25.4](#254-bed-adhesion-fails-mid-print)) |

**If the first layer is wrong, stop the print.** Fix it and restart. A bad first layer never
recovers.

> 🖼️ **[PHOTO-10] ⭐ First layer — good vs the four failure modes**
> *Show:* five close-up macro photographs: correct (flat-topped fused lines), too high (round separated lines), too low (translucent smeared), under-extruded (gaps), and inconsistent across the bed.
> *Look for:* ⚠️ **the most-used image in the manual.** Students cannot judge a first layer without a reference. Shoot these at a low angle with raking light.

🔧 **Live Z adjustment during the print** (the babystepping equivalent):

```gcode
SET_GCODE_OFFSET Z_ADJUST=-0.025 MOVE=1
```

Negative moves the nozzle closer. Adjust in 0.025 mm steps until the lines look right, then make it
permanent with `PROBE_CALIBRATE`.

### 20.3 Then work through the tuning prints

Once the cube succeeds:

| Print | Tests | Fix if it fails |
|---|---|---|
| Single-layer square covering most of the bed | Mesh and Z-tilt over the whole area | [§25.3](#253-inconsistent-first-layer) |
| Retraction tower | Retraction distance and speed | [§26.4](#264-stringing--oozing) |
| Flow-rate cube | Extrusion multiplier | [§18.8](#188-flow-rate) |
| Pressure advance test | Corner quality | [§18.9](#189-pressure-advance) |
| Speed / acceleration benchmark (Voron tuning prints) | Real usable limits | [§26.2](#262-ringing--ghosting) |
| Temperature tower | Best temperature for your filament | [§26.5](#265-under-extrusion) |

💡 **Do these once per new filament type, not once per printer.** They characterise the material as
much as the machine.

### 20.4 The first ten hours

- **Re-tension the belts after ~10 hours.** New belts stretch in. This is normal
  ([§27.4](#274-loose-belts)).
- **Re-check every grub screw** after the first few prints.
- **Re-torque the high-current screw terminals** after the first ten hours — thermal cycling loosens
  them, and a loose bed terminal is a fire risk.
- **Watch motor and driver temperatures** ([§18.11](#1811-stepper-current-verification)).
- **Keep a log.** Symptom, what you changed, what happened. Six months from now this will be the
  most valuable document you own.

---
---

# Part 4 — Operating the Printer

## 21. Everyday operation

### 21.1 Starting a print

1. **Check the bed** — clean, sheet seated, no debris underneath, nothing left from the last print.
2. **Check the filament** — enough on the spool, and dry ([§22.4](#224-filament-drying)).
3. ⚠️ **Set the door by material** — 🔒 **CLOSED** for ABS/ASA/PC/PA, 🚪 **OPEN** for PLA/PETG/TPU.
   [The door rule](#the-door-rule). Getting this backwards ruins the print either way.
4. **Turn on the electronics-bay fans** if you have not automated them ([§16.8](#168-fans)).
5. **Upload and start** from OrcaSlicer or the web interface.
6. **Watch the first layer.** Every time. It takes two minutes and saves whole prints.

`PRINT_START` handles homing, Z-tilt, adaptive meshing, heating, and purging. The display turns
**red** while printing and **green** when idle or finished.

### 21.2 What a healthy startup looks like

Knowing the normal sequence means you notice a deviation immediately:

1. Bed starts heating; display goes red
2. `G28 X` → gantry drives left, stalls, stops
3. `G28 Y` → gantry drives rear, stalls, stops
4. `G28 X`, `G28 Y` again — **this is intentional**, it squares the gantry ([§16.10](#1610-print_start-step-by-step))
5. Probe attaches from the dock
6. `G28 Z` → toolhead moves to centre, descends, touches, retracts
7. `Z_TILT_ADJUST` → three probes, adjust, repeat until converged (2–3 rounds is normal)
8. Waits for bed temperature
9. Adaptive mesh over the print area
10. Probe returns to the dock
11. Toolhead moves front-centre, nozzle heats to print temperature
12. Two purge lines at the rear of the bed
13. Moves to the print start position and begins

⚠️ **If step 5 fails and the probe stays in the dock, step 6 drives the nozzle into the bed.** This
is the single most common expensive mistake. Watch the probe attach.

### 21.3 Loading and unloading filament

> 🟠 **Mini → Ultramarine:** There is no "Load Filament" menu item unless you write one. The manual
> procedure is straightforward.

**Loading:**

1. Heat the nozzle to the filament's printing temperature:

```gcode
M109 S240
```

2. **Cut a fresh 45° tip on the filament.** A blunt or fat tip catches at the heatbreak — this is
   the most common load failure.
3. Feed through the filament guide into the Orbiter inlet.
4. Push until you feel the extruder gears grip.
5. Extrude to purge:

> 🖼️ **[PHOTO-11] Filament tip — cut correctly**
> *Show:* a 45° cut tip next to a blunt one and a squashed side-cutter tip.
> *Look for:* why a fresh angled cut fixes most load failures.

```gcode
G91
M83
G1 E50 F300
```

6. Watch for clean, consistent extrusion in the new colour before starting a print.

**Unloading:**

1. Heat to printing temperature.
2. Extrude ~10 mm first — this softens the tip and reduces the chance of leaving a blob behind:

```gcode
G1 E10 F300
```

3. Retract quickly:

```gcode
G1 E-80 F1800
```

4. **Inspect the removed tip.** A clean taper is healthy. A swollen blob higher up the strand means
   heat creep ([§28.5](#285-heat-creep)). Chew marks mean grinding ([§28.2](#282-filament-grinding)).

> 🖼️ **[PHOTO-12] Removed filament tips — reading the evidence**
> *Show:* four unloaded filament tips: healthy taper, heat-creep blob high on the strand, grinding chew marks, and a carbonised clog tip.
> *Look for:* ⚠️ that the *position* of the blob distinguishes heat creep from a nozzle clog. This photo is a diagnostic tool.

🔧 **Write yourself macros.** Add to `printer.cfg`:

```ini
[gcode_macro LOAD_FILAMENT]
gcode:
    M109 S{params.TEMP|default(240)|float}
    G91
    M83
    G1 E50 F300
    G1 E25 F150
    G90

[gcode_macro UNLOAD_FILAMENT]
gcode:
    M109 S{params.TEMP|default(240)|float}
    G91
    M83
    G1 E10 F300
    G1 E-80 F1800
    G90
```

### 21.4 Pausing, resuming, cancelling

| Action | What happens |
|---|---|
| `PAUSE` | Saves position, lifts 10 mm (clamped to `position_max`), parks at X10 Y10, retracts 10 mm |
| `RESUME` | Pushes 10 mm back in, restores the saved position, continues |
| `CANCEL_PRINT` | Heaters off, retract 3 mm, lift, park at 0,0, motors off, mesh cleared, display green |
| `M112` / **EMERGENCY STOP** | Immediate halt of everything. Requires `FIRMWARE_RESTART` afterwards |

⚠️ **Do not leave a print paused for long with the hotend hot.** Filament sitting in a hot nozzle
degrades and can carbonise into a clog. If you need a long pause, cancel and restart instead.

💡 **Pause is the right tool for a colour change or an embedded insert**, and it is also the right
first response to "something looks wrong but I am not sure." A pause is recoverable; a crash is not.

### 21.5 Recovering from a failure mid-print

**Spaghetti / detached part:**
1. `CANCEL_PRINT`
2. Let the bed cool to below 40 °C — plastic releases much more easily
3. Remove the sheet and flex it; do not chisel at the plate
4. Clean with IPA before the next print
5. Diagnose *why* before reprinting — [§25.4](#254-bed-adhesion-fails-mid-print)

**Layer shift:**
1. Cancel; the print cannot be saved
2. Go to [§26.1](#261-layer-shifts) — grub screws first, then belts, then current, then drivers

**Nozzle strike / crash:**
1. **Emergency stop immediately**
2. Power off; inspect the nozzle, the PEI sheet, and the toolhead mounting for damage
3. Re-home and re-run `PROBE_CALIBRATE` — the offset almost certainly moved
4. Check probe attach reliability before printing again ([§31.1](#311-klicky-wont-attach-to-the-toolhead))

**Klipper shutdown mid-print:**
1. Read the error in the web interface — it names the cause
2. `FIRMWARE_RESTART`
3. Go to [§33](#33-klipper-and-software-problems) or [§32](#32-electronics-and-connectivity-problems)
4. ⚠️ **Do not just restart and reprint without reading the error.** A `Timer too close` or a CAN
   disconnect will happen again, usually further into a longer print.

### 21.6 Shutting down

The machine is fine left powered, but if you are shutting it down properly:

1. Let the hotend cool below 60 °C **with the 4010 fan still running** — do not cut power to a hot
   hotend, because the fan stops and the residual heat travels up into the heatbreak, softening the
   filament there. That is exactly how you find a jam next time.
2. Shut down the host cleanly:

```bash
sudo shutdown -h now
```

   ⚠️ Cutting power to a running Linux system risks corrupting the SD card or eMMC.
3. Then switch off at the inlet.

---

## 22. Material guide

The enclosure is what makes this machine's material range possible.

> 🟠 **Mini → Ultramarine:** Your Mini was effectively a PLA and PETG machine. This one is
> genuinely capable across engineering materials — which also means more ways to get it wrong.

### The door rule

⚠️ **This is the single most important operational rule on this machine. Learn it before anything
else in this section.**

```
╔══════════════════════════════╦══════════════════════════════╗
║       🚪  DOOR  OPEN         ║      🔒  DOOR  CLOSED        ║
╠══════════════════════════════╬══════════════════════════════╣
║                              ║                              ║
║          P L A               ║          A B S               ║
║          P E T G             ║          A S A               ║
║          T P U               ║          P C                 ║
║                              ║          P A  (nylon)        ║
║                              ║                              ║
║                              ║   ...and every other         ║
║                              ║   engineering material       ║
╚══════════════════════════════╩══════════════════════════════╝
```

| Material | Door | Why |
|---|---|---|
| **PLA** | 🚪 **OPEN** | Softens around 55 °C. In a hot chamber it jams from heat creep, and the part itself can deform |
| **PETG** | 🚪 **OPEN** | Does not need chamber heat, and gets softer and stringier in it |
| **TPU** | 🚪 **OPEN** | Same — no chamber heat needed, and heat makes an already-difficult material worse |
| **ABS** | 🔒 **CLOSED** | Warps and delaminates without a hot chamber |
| **ASA** | 🔒 **CLOSED** | Same as ABS |
| **PC** | 🔒 **CLOSED** | Needs the hottest chamber you can achieve |
| **PA / nylon** | 🔒 **CLOSED** | Warps badly in open air |
| **CF/GF-filled versions of the above** | 🔒 **CLOSED** | Follow the base material |
| **Anything else / unsure** | 🔒 **CLOSED** | ⚠️ Closed is the safe default for any engineering material |

**What goes wrong if you get it backwards:**

| Mistake | What happens |
|---|---|
| PLA/PETG/TPU with the door **closed** | Chamber climbs above the material's softening point. Filament softens above the heatbreak and **jams solid** ([§28.5](#285-heat-creep)). Parts sag and lose dimensional accuracy |
| ABS/ASA/PC/PA with the door **open** | Corners lift off the bed, layers do not bond, and parts **crack along layer lines** under light load ([§26.8](#268-cracks-between-layers-absasa)) |

⛔ **Once an ABS/ASA/PC/PA print has started, keep the door closed.** Opening it mid-print drops the
chamber temperature within seconds and leaves a weak layer at exactly that height. If you need to
look at the print, look through the door.

⚠️ **Ventilation is a separate question from the door.** For ABS, ASA and PC you close the door
*and* ventilate the room — see [§13.4](#134-ventilation-and-the-trade-off). Closing the door
concentrates the fumes rather than removing them.

### 22.1 Material reference

| Material | Nozzle | Bed | **Door** | Cooling | Notes |
|---|---|---|---|---|---|
| **PLA** | 200–220 °C | 60 °C | 🚪 **OPEN** | 100 % | ⚠️ Heat creep in a hot chamber. Easy but not what this machine is for |
| **PETG** | 230–250 °C | 75–80 °C | 🚪 **OPEN** | 30–50 % | Forgiving, strong, stringy. Good general purpose |
| **TPU** | 220–240 °C | 40–60 °C | 🚪 **OPEN** | 50 % | Print slow (< 30 mm/s). Direct drive handles it well |
| **ABS** | 250–260 °C | 95–105 °C | 🔒 **CLOSED**, 40 °C+ | **0–20 %** | Warps without a hot chamber. Ventilate the room |
| **ASA** | 250–265 °C | 95–105 °C | 🔒 **CLOSED**, 40 °C+ | **0–20 %** | Like ABS, UV-stable. Best choice for printer parts |
| **PC** | 280–300 °C | 100–110 °C | 🔒 **CLOSED**, as hot as possible | 0–10 % | Strongest and most heat-resistant. Must be bone dry |
| **PA / nylon** | 260–290 °C | 90–110 °C | 🔒 **CLOSED** | 0–20 % | ⚠️ Absorbs moisture extremely fast — print straight from a dryer |
| **PC-CF / PET-CF** | 280–300 °C | 100–110 °C | 🔒 **CLOSED** | 0–10 % | ⚠️ **Abrasive — needs a hardened nozzle** |

See [The door rule](#the-door-rule) — door position is not a preference, it is set by the material.

### 22.2 Chamber temperature

There is no chamber heater — the bed and the 5010 circulation fans warm the chamber.

- **Bed at 100 °C, door closed, 20 minutes → roughly 40–50 °C chamber.**
- For ABS/ASA, **preheat the chamber for 20 minutes before starting**. Cracking between layers
  ([§26.8](#268-cracks-between-layers-absasa)) is almost always a cold-chamber problem.
- ⚠️ **PLA in a hot chamber jams.** Open the door or remove the top — [The door rule](#the-door-rule).

💡 **Consider adding a chamber thermistor** as a `[temperature_sensor]` in `printer.cfg`. Being able
to see the chamber temperature turns "it warped again" into a measurable problem.

### 22.3 Nozzle wear and abrasive materials

⚠️ **Carbon-fibre and glass-filled filaments destroy brass nozzles fast** — sometimes within a
single large print. A worn nozzle has a larger, irregular orifice, and the symptoms look like
under-extrusion, poor dimensional accuracy, and rough surfaces that no calibration fixes.

Use a **hardened steel or ruby nozzle** for any filled material. Check for wear if quality declines
gradually with no other explanation.

### 22.4 Filament drying

**Wet filament is the single most common cause of mysterious quality problems.** Moisture in the
filament boils in the melt zone, producing steam that causes popping sounds, stringing, rough
surfaces, and weak parts. It defeats every other calibration you have done.

| Material | Absorbs moisture | Dry at |
|---|---|---|
| PLA | Slowly | 45–50 °C, 4 h |
| PETG | Moderately | 60–65 °C, 4–6 h |
| ABS / ASA | Moderately | 70–80 °C, 4 h |
| PC | **Very fast** | 80–90 °C, 6–8 h |
| Nylon | **Extremely fast** | 80 °C, 12 h |
| TPU | Fast | 50 °C, 6 h |

💡 **The tell-tale sign is sound:** a faint popping or crackling from the nozzle means water boiling.
If you hear it, stop and dry the spool. No slicer setting fixes wet filament.

Store opened spools in sealed boxes with desiccant. PC and nylon should be printed straight out of
a dryer.

---

## 23. Maintenance

Machines that get maintained keep printing. Machines that do not develop mystery problems that get
blamed on software.

### 23.1 Before every print

- Wipe the PEI sheet with **99 % isopropyl alcohol**
- Confirm nothing is under the sheet
- Confirm enough filament remains
- Glance at the nozzle for accumulated plastic

### 23.2 Weekly

- Wipe the bed thoroughly with IPA
- Inspect both belts for fraying, tooth wear, or dust from rubbing
- Confirm the printer sits level and does not rock
- Check the electronics-bay fans are actually spinning
- Empty accumulated debris from the chamber floor

### 23.3 Monthly

- **Check belt tension** ([§34.1](#341-belt-tension-check)) — both belts, within 5 Hz
- **Check every grub screw**: two motor pulleys, three Z couplers, all idler shafts
- Clean the nozzle of accumulated plastic (hot, with a brass brush)
- Vacuum dust from the electronics bay
- ⚠️ **Check the SSR heatsink is clean and its fan is running** — a hot SSR is the one most likely to fail closed ([§11.5](#115-bed-heating--one-ssr-two-fused-zones))
- Check probe repeatability ([§34.4](#344-probe-repeatability-check)) — under 0.010 mm
- Inspect the umbilical where it flexes at the toolhead

### 23.4 Quarterly

- **Lubricate the ballscrews** with a thin PTFE-based grease
- **Clean and lubricate the linear rails**: wipe with a lint-free cloth, apply light machine oil,
  work the carriage back and forth to distribute
- Inspect the hotend's silicone sock; replace if torn ([§29.1](#291-heater-verification-failed--thermal-runaway))
- Check the bed thermistor connections
- Re-run `SHAPER_CALIBRATE` and compare against your recorded values — a drifting frequency means
  something is loosening
- Inspect every printed structural part for cracks, especially around heat-set inserts

### 23.5 Annually

- **Back up `printer.cfg`, then update Klipper**, and reflash **both** the mainboard and the EBB36
- ⚠️ **Re-torque every high-current screw terminal**: PSU outputs, SSR terminals, **both fuse
  holders**, and the bed heater connections. Thermal cycling loosens them, and a loose high-current terminal is the most likely
  fire cause on this machine
- Replace the PEI sheet if worn or warped
- Inspect all AC insulation and every earth bond ([§11.4](#114-wiring-mains-ac))
- Full frame squareness check ([§34.2](#342-frame-squareness-check))
- Replace belts if they show any tooth wear

### 23.6 Consumables and when to replace them

| Part | Typical life | Replace when |
|---|---|---|
| PEI spring steel sheet | 6–24 months | Adhesion fails in a specific spot; visible gouges |
| Nozzle (brass) | 3–6 months | Dimensional accuracy declines; under-extrusion with no cause |
| Nozzle (brass, with CF filament) | **Weeks** | Same — check often |
| Silicone sock | 6–12 months | Torn or heavily contaminated |
| PTFE tube (extruder→hotend) | 6–12 months | Discoloured, deformed, or after any heat-creep jam |
| GT2 belts | 2–3 years | Fraying, tooth wear, cannot hold tension |
| Linear rail carriages | Years | Play develops, or roughness that lubrication does not cure |
| SSR | Years | Bed heats slowly with no other cause, or fails to switch. ⚠️ Replace on any suspicion — it switches both zones |
| Bed heater fuses | Only on failure | ⚠️ **A blown fuse is a symptom.** Find the cause before fitting a new one |
| Printed structural parts | Years | Cracks, especially around heat-set inserts. Reprint per [§4.11](#411-where-to-print-parts-and-replacements) — ⚠️ **if the same part cracks twice, email meciar.michal7@gmail.com instead of reprinting it again** |

---
---

# Part 5 — Troubleshooting

## 24. How to troubleshoot

> **Almost every "mystery problem" is one of three things: a loose mechanical fastener, a marginal
> electrical connection, or a slicer setting. Check the simple things first.**

### 24.1 The method

1. **Do not panic and do not change five things at once.** Change one variable, test, then change
   the next. If you change three things and the problem goes away, you have learned nothing and it
   will come back.
2. **Describe the symptom precisely.** "It prints badly" is not actionable. "Layer shifts in X,
   always after a fast travel, roughly 30 mm up" is nearly solved already.
3. **Find the symptom in [Section 35](#35-symptom-quick-reference)** and follow it to the section.
4. **Work the causes in order** — they are sorted by how often they turn out to be the answer.
5. **Test with a short print**, not a six-hour one that fails the same way.
6. **Write down what worked.** Six months from now you will see this again.

### 24.2 Questions that narrow things down fast

| Question | What the answer tells you |
|---|---|
| Did this ever work? | Never → build or config error. Used to → something changed or wore |
| What changed most recently? | Filament, slicer setting, config edit, a part you touched |
| Is it repeatable at the same place in the print? | Yes → geometry, model, or slicer. No → mechanical or thermal |
| Does it affect one axis or both? | One → that axis's belt/motor/rail. Both → frame, gantry, or controller |
| Is it position-dependent on the bed? | Yes → mesh, Z-tilt, or bed flatness |
| Does it change with print speed? | Yes → flow rate, acceleration, or resonance |
| Does it appear only after N minutes? | Thermal — driver heating, heat creep, chamber temperature |
| Different filament, same problem? | The machine. Same filament only? The filament (probably wet) |

### 24.3 The five-minute fundamentals check

When you have no idea where to start, run this. It catches a surprising proportion of problems:

1. `M84` to disable motors. **Push the gantry by hand** in all four diagonals. Equal and smooth?
2. **Pluck both belts.** Same pitch? 100–110 Hz?
3. **Wiggle every grub screw** with a hex key — the two motor pulleys and three Z couplers.
4. **Rotate each ballscrew by hand.** All three free?
5. **`PROBE_ACCURACY SAMPLES=10`.** Range under 0.010 mm?
6. **Look at the bed mesh.** Smooth, or spiky?
7. **Check the filament.** Dry? Correct diameter? From a spool you trust?

---

## 25. First-layer problems

### 25.1 Nozzle drags or gouges the bed

**Symptoms:** nothing extrudes on the first layer; scratches in the PEI; filament smears instead of
forming lines.

**Causes, most likely first:**

- **Z offset too low.** By far the most common. Re-run `PROBE_CALIBRATE` ([§18.3](#183-z-offset)),
  set it with the paper-drag method, `SAVE_CONFIG`.
- **The Klicky probe did not attach.** ⚠️ **This is the dangerous one.** The probe stayed in the
  dock, so Z homing ran against nothing and the nozzle went to the bed. Watch the next pickup
  closely and see [§31.1](#311-klicky-wont-attach-to-the-toolhead).
- **Bed mesh stale or not loaded.** Run `BED_MESH_CALIBRATE`, and confirm `PRINT_START` is meshing
  ([§16.10](#1610-print_start-step-by-step)).
- **Bed contaminated.** Finger oils raise the effective surface, so the nozzle strikes the clean
  spots. Wipe with IPA.
- **`Z_TILT_ADJUST` did not run.** The gantry is tilted, so one region is too low. Confirm
  `PRINT_START` calls it.
- **Mesh taken cold.** The bed grew when heated. Always mesh hot ([§18.5](#185-bed-mesh)).

🔧 **Immediate fix mid-print:** `SET_GCODE_OFFSET Z_ADJUST=0.025 MOVE=1` raises the nozzle. Repeat
until lines look right, then make it permanent.

### 25.2 First layer too high

**Symptoms:** filament looks like loose spaghetti; lines are round rather than squashed; the print
gets dragged around.

**Causes:**

- **Z offset too high.** Lower in 0.025 mm steps:
  `SET_GCODE_OFFSET Z_ADJUST=-0.025 MOVE=1` until lines press flat.
- **Bed temperature too low.** PLA 60 °C, PETG 75–80 °C, ABS/ASA 95–105 °C.
- **First-layer speed too high.** Start at **20 mm/s**.
- **`Z_TILT_ADJUST` not run since power-on.** Always run it — `PRINT_START` should.
- **PEI sheet worn in that spot.** Flip the sheet or replace it.
- **Under-extruding on the first layer.** If the lines are also thin, see [§26.5](#265-under-extrusion).

### 25.3 Inconsistent first layer

**Symptoms:** perfect on one side, squished on the other, or any spatial pattern.

💡 **A spatial pattern is diagnostic.** The problem is geometric, not extrusion.

**Causes:**

- **Bed mesh missing or invalid.** Run `BED_MESH_CALIBRATE` and confirm it loads.
- **Z-tilt is off.** Run `Z_TILT_ADJUST` and watch the console — it should reach under 0.007 mm
  within five iterations. If not, [§31.4](#314-z-tilt-doesnt-converge).
- **Debris under the spring steel sheet.** A fingernail's worth becomes a hill. Lift, wipe both
  surfaces, re-seat.
- **Bed mounts loose.** Check the three M3 × 40 mounting points ([§10.1](#101-bed-carrier)).
- **A WobbleX over-tightened.** If clamped solid it transmits screw wobble
  ([§7.6](#76-wobblex-couplings-and-why-they-matter)).
- **Mesh area does not cover the print.** If `AREA_START`/`AREA_END` are wrong, part of the print
  sits outside the mesh. Check your slicer's start G-code ([§19.3](#193-start-and-end-g-code)).

### 25.4 Bed adhesion fails mid-print

**Symptoms:** the first layers stick, then a corner lifts and the part detaches.

**Causes:**

- **Thermal warping.** Standard with ABS/ASA in a cold chamber. Close the door, preheat the chamber
  for 20 minutes, drop part cooling to 0–20 %.
- **Insufficient brim.** A **10 mm brim** helps a lot on tall, narrow parts.
- **Greasy bed.** Wipe with IPA between **every** print. Skin oil transfers on every touch.
- **Part cooling on the first layers.** Disable cooling for the first 2–3 layers in the slicer.
- **Door opened mid-print.** A cold draught onto an ABS print lifts corners within a layer or two.
- **PEI worn.** PEI loses adhesion with age and IPA cycles. Light scuffing with a fine abrasive pad
  can revive it; eventually, replace it.

---

## 26. Print quality problems

### 26.1 Layer shifts

**Symptoms:** a horizontal step appears mid-print; everything above is offset in X, Y, or both.

**Causes:**

- **Loose pulley grub screw.** The most common cause. Check **both** XY motor pulleys and every
  toothed pulley with a grub screw. Tighten on the **flat** and apply threadlocker.
- **Belt tension too low.** A loose belt skips a tooth under acceleration
  ([§34.1](#341-belt-tension-check)).
- **Belt grabber slipping.** ⚠️ Check that both belt ends are captured **by the teeth**, not on the
  smooth back ([§8.7](#87-route-the-corexy-belts)). This one takes days to show up and then happens
  repeatedly.
- **Stepper current too low.** Raise XY `run_current` in 0.05 A steps. Configured at 1.20 A; the
  motors' maximum is around 1.4 A.
- **Acceleration too aggressive.** Tested value is 5500 mm/s². Reduce and retest.
- **TMC driver overheating and dropping out.** ⚠️ Check that `driver_coling` is actually on
  ([§16.8](#168-fans)). This is a very easy one to miss, because the fans do not start themselves.
- **Toolhead crashed.** Look for a lifted part the nozzle caught, a cable snag, or a printed part
  fouling.
- **Frame racked.** If shifts happen on both axes together, re-check gantry squareness
  ([§8.6](#86-square-the-gantry)).

💡 **Shifts in one axis vs both:** one axis usually means that motor, its pulley, or its belt.
Both axes together usually means the frame, the gantry geometry, or a controller-level problem.

> 🖼️ **[PHOTO-13] Layer shift**
> *Show:* a printed part with a clear single shift partway up, with the shift direction arrowed.
> *Look for:* what a shift looks like versus a crash artefact — they are often confused.

### 26.2 Ringing / ghosting

**Symptoms:** faint repeated echoes next to sharp features, like ripples after a corner.

**Causes:**

- **Input shaper not tuned or stale.** Run `SHAPER_CALIBRATE` ([§18.10](#1810-input-shaper)).
- **Frame racking.** Push the top corners — any movement means retighten every corner bracket.
- **Belt tension too low.** Re-tension both, matched.
- **Acceleration too high** for the current shaper settings. Test with
  `SET_VELOCITY_LIMIT ACCEL=2000` and see whether it disappears.
- **Loose motor mount.** Check the XY motor screws and the printed mounts.
- **Loose toolhead.** Grab the toolhead and try to wiggle it. Any play shows up as ringing.
- **The printer is on a flexible surface.** A CoreXY machine accelerating hard on a wobbly table
  makes the table part of the resonant system. Put it on something solid.

> 🖼️ **[PHOTO-14] Ringing / ghosting**
> *Show:* a macro shot of a calibration cube corner showing echo ripples, next to the same corner after input shaping.
> *Look for:* how faint ringing actually is. People often miss mild ringing entirely.

### 26.3 Z banding / ribbing

**Symptoms:** horizontal bands or ribs at regular vertical intervals.

💡 **First, measure the period of the bands.** This tells you the cause almost immediately:

| Band spacing | Cause |
|---|---|
| **Exactly 4 mm** | One ballscrew revolution → **screw wobble**. Go to the WobbleX and alignment causes below |
| **Matches layer height** | Extrusion inconsistency, not Z. Go to [§26.5](#265-under-extrusion) |
| **Irregular** | Thermal or extrusion related, not screw related |

**Causes:**

- **A WobbleX over-tightened or missing.** ⚠️ The most likely cause on this machine. If the ball nut
  is rigidly coupled to the bed mount, the screw's lateral wobble goes straight into the print, once
  per revolution — every 4 mm. Loosen until the coupling has slight lateral float
  ([§7.6](#76-wobblex-couplings-and-why-they-matter)).
- **Coupler too tight or misaligned.** A flexible coupler that cannot flex transmits motor wobble.
  Loosen the grub screws, let the screw self-centre, retighten. Check the ~1 mm internal gap
  ([§7.4](#74-install-ballscrews-and-couplers)).
- **Motor mount and top stabiliser not collinear.** Loosen the top stabiliser bracket, let the screw
  find its own position, retighten ([§7.5](#75-install-the-top-ballscrew-stabilisers)).
- **Bent ballscrew.** Roll it on a flat surface. Visible wobble means replace it.
- **`rotation_distance` wrong.** ⚠️ For a **1204 ballscrew (4 mm lead)** it must be
  `rotation_distance: 4`. If you fitted T8 leadscrews instead, it must be `8`. A wrong value gives
  layer heights that are consistently wrong and produces periodic banding.
- **One Z station binding.** With motors off, turn each screw by hand through full travel
  ([§7.8](#78-verify-smooth-z-motion)).
- **Z motor current too low.** Configured at 0.50 A. If a station is stiff, it can lag.
- **Inconsistent extrusion misread as Z banding.** If the bands do not match a 4 mm period,
  investigate extrusion first.

> 🖼️ **[PHOTO-15] Z banding, with the 4 mm period measured**
> *Show:* a printed wall showing horizontal bands, with calipers held against it measuring the band spacing at 4 mm.
> *Look for:* ⚠️ that measuring the period identifies the cause. 4 mm = one ballscrew turn = WobbleX or alignment.

### 26.4 Stringing / oozing

**Symptoms:** thin strings between separate parts of the print; blobs after travel moves.

**Causes:**

- **Wet filament.** ⚠️ Check this first — it is the most common cause and no setting fixes it.
  Listen for popping. Dry the spool ([§22.4](#224-filament-drying)).
- **Pressure advance not tuned.** Typical for Orbiter + Rapido: **0.030–0.060**
  ([§18.9](#189-pressure-advance)).
- **Retraction distance too low.** Direct drive: **0.5–1.0 mm**. ⚠️ Do not use Bowden values.
- **Print temperature too high.** Drop 5 °C and retest.
- **Travel speed too low.** Raise to 200+ mm/s so the nozzle clears before it can ooze.
- **Slicer not avoiding travel over open space.** Enable "avoid crossing perimeters."

> 🖼️ **[PHOTO-16] Stringing**
> *Show:* two towers printed with and without tuned pressure advance and retraction.
> *Look for:* the difference tuning makes, so people know what is achievable.

### 26.5 Under-extrusion

**Symptoms:** gaps between perimeters and infill, weak walls, lines that do not fuse, holes in top
surfaces.

**Causes:**

- **Rotation distance miscalibrated.** Run the 100 mm test ([§18.7](#187-extruder-calibration-rotation-distance)).
- **Nozzle partially clogged.** Cold pull ([§28.6](#286-how-to-do-a-cold-pull)).
- **Print temperature too low.** The Rapido HF has high flow capacity but still needs temperature.
  Raise 5 °C at a time.
- **Speed exceeds the hotend's flow rate.** Run a flow-rate test; slow the outer walls.
- **Friction in the filament path.** Check for tight bends in the guide or a kinked PTFE tube.
- **Orbiter gears slipping.** Increase idler tension by 1/4 turn — but see
  [§28.2](#282-filament-grinding) before going far.
- **Worn nozzle.** ⚠️ Especially after CF filament. A worn nozzle mimics under-extrusion perfectly
  ([§22.3](#223-nozzle-wear-and-abrasive-materials)).
- **Wet filament.** Steam bubbles interrupt the flow.

> 🖼️ **[PHOTO-17] Under- and over-extrusion**
> *Show:* three top surfaces: under-extruded with visible gaps, correct, and over-extruded with ridges.
> *Look for:* the middle one. Students need to know what 'correct' looks like before they can spot deviation.

### 26.6 Over-extrusion

**Symptoms:** puffy walls, ridged top surfaces, parts measuring oversize.

**Causes:**

- **Flow rate / extrusion multiplier too high.** Reduce in small increments
  ([§18.8](#188-flow-rate)).
- **Filament diameter setting wrong.** Measure in three places 100 mm apart and average.
- **Rotation distance over-tuned.** Re-run the 100 mm test.
- **Temperature too high**, making plastic spread more than intended.

### 26.7 Salmon skin / fine vertical pattern

**Symptoms:** a subtle, almost iridescent vertical texture on otherwise smooth walls.

💡 **This is a stepper driver artefact, not a mechanical one.** No amount of belt tensioning fixes it.

**Causes:**

- **Driver microstepping interpolation.** Toggle `interpolate: True/False` on the relevant stepper
  and reprint.
- **Stepper current too high.** Drop XY `run_current` by 0.05 A.
- **Driver mode.** Compare SpreadCycle against StealthChop. ⚠️ **On X and Y you cannot use
  StealthChop** — sensorless homing requires SpreadCycle (`stealthchop_threshold: 0`). Z is free to
  use either.
- **Marginal power supply.** Check the 24 V rail holds up under load ([§34.7](#347-voltage-checks)).

### 26.8 Cracks between layers (ABS/ASA)

**Symptoms:** parts split along layer lines under light force.

**Causes:**

- **Chamber too cold.** ⚠️ The dominant cause. **Close the door** ([The door rule](#the-door-rule)),
  preheat for 20 minutes, target **at least 40 °C** chamber.
- **Part cooling running on ABS.** Set part cooling to **0–20 %**. Cooling is the enemy of layer
  bonding in styrenics.
- **Print temperature too low.** ABS wants 250–260 °C.
- **Layer height too high for the nozzle.** Keep layer height under **50 %** of nozzle diameter —
  0.3 mm max on a 0.6 mm nozzle.
- **Door opened mid-print.** A sudden temperature drop creates a weak layer at exactly that height.
- **Wet filament.** Steam voids at layer boundaries make weak joins.

---

## 27. Motion and mechanical problems

### 27.1 Grinding or clicking from the steppers

**Symptoms:** grinding, clicking, or knocking from a motor during motion.

**Causes:**

- **Stepper current too low** (most common). The motor is missing steps under load. Raise by 0.1 A
  and retest.
- **Mechanical binding.** `M84`, then push the gantry by hand. It must glide. Any catch means a
  misaligned rail or a pinched cable ([§27.2](#272-gantry-binds-in-one-direction)).
- **Belt path obstructed.** Inspect every idler — a seized or rubbing bearing makes exactly this
  noise.
- **Belt slipping on a pulley.** Check the grub screw is on the flat.
- **Acceleration beyond what the motors can deliver.** Reduce and retest.

⚠️ **A clicking sound from the toolhead specifically is different** — that is the extruder skipping.
Go to [§28.4](#284-extruder-skipping).

### 27.2 Gantry binds in one direction

**Symptoms:** the gantry moves freely one way and binds another.

💡 **On CoreXY this is highly diagnostic.** Binding in one *diagonal* points to belt tension or
routing. Binding in one *linear* direction points to rail alignment.

**Causes:**

- **Y rails not parallel.** Push the gantry to one end and measure the gap to the frame at both Y
  carriages. They must be equal. If not, re-square ([§8.6](#86-square-the-gantry)).
- **A rail mounted in tension.** Loosen every rail bolt, work the carriage end to end to let the
  rail relax, retighten from the centre outward ([§7.3](#73-install-the-z-linear-rails)).
- **Belt routing wrong.** ⚠️ If the two loops are not truly mirrored, motion in some directions
  fights itself. Trace both loops completely ([§8.7](#87-route-the-corexy-belts)).
- **Belt tensions unequal.** Different tensions rack the gantry as it moves.
- **Cable catching.** Check the umbilical through the full range of motion.
- **Rail heights unequal.** If left and right Y rails sit at different heights, the gantry is tilted
  and binds ([§8.2](#82-install-the-y-rails)).

### 27.3 Motor stalls / skips steps

**Symptoms:** sudden loss of position, usually after a fast travel or hard acceleration.

**Causes:**

- **Acceleration too high.** Reduce by 25 % and retest.
- **Stepper current too low.** Raise by 0.05 A.
- **Driver overheating** and hitting thermal shutdown. ⚠️ Turn on `driver_coling`
  ([§16.8](#168-fans)).
- **Mechanical resistance.** See [§27.1](#271-grinding-or-clicking-from-the-steppers).
- **Motor overheating.** Too-high current causes the motor's own thermal issues. Check with
  [§34.6](#346-stepper-current-sanity-check).
- **24 V rail sagging** under simultaneous bed and hotend load ([§34.7](#347-voltage-checks)).

### 27.4 Loose belts

**Symptoms:** visible sag, feelable slack when pinched, or belt slap during fast moves.

**Causes:**

- **Initial tension too low.** Re-tension ([§34.1](#341-belt-tension-check)).
- **Belt stretched in.** ⚠️ **Completely normal in the first few hours.** Re-tension after the first
  10 hours of printing. This is not a defect.
- **Belt grabber slipping.** Confirm both ends are captured by the teeth, not the smooth back.
- **Tensioner backing off.** Add threadlocker if the mechanism will not hold.

### 27.5 How to tune the belts

**Target: 100–110 Hz on a free span, both belts within 5 Hz of each other.**

1. Move the gantry to the **middle** of the printer — always measure at the same position.
2. Pluck the belt span on the **left** of the toolhead, upward with a finger, and read the frequency
   on a phone tuner app.
3. Adjust until it reads in range.
4. Repeat on the **right** side.
5. Move the toolhead around and re-test at a few positions.

**If tension is too high** (stiff gantry, hot motors, high-pitched belts): loosen by **1/4 turn**
and retest.

💡 **Matching matters more than the absolute number.** Two belts at 95 Hz each will print better
than one at 100 and one at 120.

### 27.6 Bed does not move smoothly in Z

**Symptoms:** the bed judders, the Z motors buzz, or `Z_TILT_ADJUST` will not converge.

**Causes:**

- **A Z station binding.** `M84`, then rotate each ballscrew by hand through its full travel
  ([§7.8](#78-verify-smooth-z-motion)).
- **A Z rail mounted in tension.** Loosen, work the carriage, retighten from the centre.
- **A coupler bottomed out.** ⚠️ There must be a ~1 mm gap between the motor shaft and the screw
  inside the coupler ([§7.4](#74-install-ballscrews-and-couplers)).
- **Z current too low.** Configured at 0.50 A. If a station is stiff, it may be lagging.
- **`max_z_velocity` or `max_z_accel` too high** for the bed's mass. Configured conservatively at 8
  and 20 — do not raise them casually.
- **Ballscrews dry.** Lubricate with PTFE grease ([§23.4](#234-quarterly)).

---

## 28. Extruder and filament problems

### 28.1 Extruder doesn't push 100 mm when asked

**Procedure** (also [§18.7](#187-extruder-calibration-rotation-distance)):

1. Heat the hotend to print temperature.
2. Mark the filament **120 mm** above the extruder inlet.
3. `G1 E100 F120` — extrude 100 mm at 2 mm/s.
4. Measure the remaining distance from the mark to the inlet. Extruded = 120 − remaining.
5. New `rotation_distance` = old × (extruded / 100).

**Causes of error:**

- **Wrong `rotation_distance`** (most common). Recalculate as above.
- **Filament slipping in the gears.** Increase Orbiter idler tension slightly.
- **Hotend partially clogged.** Backpressure causes slip that looks exactly like miscalibration.
  ⚠️ **If your measured value changes between runs, it is a clog or slip, not a calibration
  problem.** Calibrating around a clog gives a number that is wrong the moment you clear it.
- **Extruding too fast.** F120 (2 mm/s) is deliberately slow. Faster introduces its own error.

### 28.2 Filament grinding

**Symptoms:** on unloading, a chewed section 10–20 mm long.

**Causes:**

- **Idler tension too tight** (most common). Back off the Orbiter tension by 1/4 turn.
- **Hotend partially clogged.** Cold pull or replace the nozzle.
- **Print temperature too low** — the filament cannot melt fast enough, so the gears strip it. Raise
  5 °C.
- **Speed exceeds the hotend's maximum flow.** Slow down.
- **Wet filament** causing erratic pressure.

💡 **Grinding is always a symptom of resistance downstream.** Tightening the idler harder treats
the symptom and makes it worse — find out why the filament will not go where it is being pushed.

> 🖼️ **[PHOTO-18] Ground filament**
> *Show:* a filament strand with a chewed flat section, next to the Orbiter gears.
> *Look for:* the length of the ground section — it tells you roughly how long the problem has been developing.

### 28.3 Filament won't load

**Symptoms:** filament stops at the hotend entry, or grinds in the gears.

**Causes:**

- **Hotend not at temperature.** Check the reading.
- **Filament tip fat or kinked.** ⚠️ Cut a fresh **45° tip**. This solves it more often than
  anything else.
- **Nozzle clogged.** Cold pull ([§28.6](#286-how-to-do-a-cold-pull)).
- **PTFE tube misseated.** ⚠️ **The number one cause of jams in this style of toolhead.** The PTFE
  must bottom out against the heatbreak with no gap ([§9.4](#94-install-the-extruder)).
- **Fully clogged hotend.** See the drilling procedure below.

⚠️ **Clearing a fully blocked hotend by drilling:**

> Disassemble the toolhead. Remove the hotend. **With the hotend OUT of the machine, COLD, and with
> the NOZZLE REMOVED**, use a **1.7 mm drill bit** turned **BY HAND ONLY** to slowly clear the
> blockage.
>
> **DO NOT use a powered drill. DO NOT do this with the hotend hot or installed.** You can destroy
> the heatbreak's internal geometry extremely easily, and a damaged heatbreak jams forever
> afterwards.

Try a cold pull first. Drilling is a last resort.

### 28.4 Extruder skipping

**Symptoms:** a rhythmic click from the toolhead during extrusion.

**Causes:**

- **Hotend partially clogged** (most common). Cold pull.
- **Print temperature too low.** Raise 5 °C.
- **Volumetric flow rate exceeded.** Slow the outer walls down.
- **PTFE misseated** ([§28.3](#283-filament-wont-load)).
- **Extruder current too low.** Raise the extruder `run_current` (in `ebb36.cfg`) toward 0.7 A.
- **Idler tension too loose** — but check for a clog first.
- **Retraction too aggressive**, repeatedly forcing filament back into a narrowing gap.

### 28.5 Heat creep

**Symptoms:** jams after long prints, especially on small parts where the hotend is mostly idle.
When you pull the filament out there is a swollen blob **higher up the strand than it should be**.

💡 **What is happening:** heat is travelling *up* past the heatbreak into the region that is
supposed to stay cold. Filament softens there, swells to fill the bore, and locks solid. The
tell-tale is the position of the blob — well above the melt zone.

**Causes:**

- **4010 hotend fan failed, undersized, or fitted backwards.** ⚠️ Check it first. It must run
  **continuously** whenever the hotend is above ~50 °C. Confirm it blows **onto** the heatsink
  ([§9.3](#93-install-the-cooling-fans)).
- **Chamber too hot for the material.** ⚠️ **PLA (or PETG, or TPU) printed with the door closed is
  the classic case.** These materials need the door **open** — [The door rule](#the-door-rule).
- **Long idle time at low flow.** Raise the minimum layer time slightly.
- **Heatbreak loose.** A loose heatbreak conducts heat poorly across its joint. With the hotend
  **cold**, check the Rapido assembly's tightness.
- **Heatsink clogged with dust.** Blow it out.
- **Retraction too long**, pulling molten plastic up into the cold zone where it solidifies.

### 28.6 How to do a cold pull

The standard fix for a partial clog:

1. Heat the nozzle to **240 °C** (or your filament's normal temperature).
2. Push filament through by hand until it extrudes freely.
3. Turn the heater **off**.
4. Let it cool to about **90 °C** for PLA, or **~25 °C** for a thorough clean — while applying
   gentle upward pressure on the filament.
5. When the filament is solid, **pull firmly and steadily**. It should come out with a moulded tip
   carrying the debris.
6. **Inspect the tip.** A clean, sharply moulded cone means the nozzle is clear. Grit, discoloured
   flecks, or a ragged tip means repeat.
7. Repeat until the tip comes out clean.

> 🖼️ **[PHOTO-19] Cold pull tips — dirty vs clean**
> *Show:* a sequence of three pulled tips: first pull carrying dark debris, second cleaner, third a clean sharp moulded cone.
> *Look for:* when to stop pulling. The clean moulded cone is the finish condition.

💡 **Nylon or dedicated cleaning filament works better than PLA** because it stays cohesive at
higher temperatures and grips debris more effectively.

---

## 29. Hotend and temperature problems

### 29.1 "Heater verification failed" / thermal runaway

**Symptoms:** the print stops with a thermal verification error. Klipper shut the heater off as a
safety measure.

💡 **What triggered it:** Klipper commanded heat and the temperature did not respond as expected —
either it was not rising when it should, or it moved suddenly in a way a real thermal system cannot.
⚠️ **This is a safety system doing its job. Never work around it.**

**Causes:**

- **Loose thermistor.** The reading jumped or dropped. Reseat the connector at the EBB36.
- **Loose heater cartridge.** Not getting full power. Check the screw terminals — cold, unpowered.
- **Silicone sock missing or damaged.** Without it, airflow over the heater block makes PID unable
  to hold temperature. Fit or replace it.
- **PID badly tuned.** Re-run `PID_CALIBRATE HEATER=extruder TARGET=240`.
- **Part-cooling fan blowing on the heater block.** Reposition the duct to aim at the print, not the
  block.
- **Chamber airflow.** The 5010 circulation fans blowing across the hotend can do the same thing.

### 29.2 Temperature reading wildly wrong

**Symptoms:** an absurd value (400 °C, −20 °C) or a flickering reading.

⚠️ **Never allow a heater to run with a suspect sensor.**

**Causes:**

- **Open circuit.** The reading pins to one extreme. Check connectors and continuity.
- **Short circuit.** Pins to the other extreme.
- **Wrong `sensor_type`.** ⚠️ Confirm what your Rapido actually shipped with. A PT1000 configured
  as a 100 K NTC (or vice versa) gives readings wrong by tens of degrees while looking plausible.
  At room temperature: **PT1000 ≈ 1.1 kΩ, 100 K NTC ≈ 100 kΩ.**
- **Damaged wiring in the umbilical.** Flex fatigue at the toolhead end. Wiggle-test while watching
  the reading.
- **Electrical noise.** Thermistor leads running alongside AC or stepper power. Re-route and shield.

### 29.3 Hotend slow to reach temperature

**Symptoms:** 25 °C to 240 °C takes more than 120 seconds.

**Causes:**

- **Heater cartridge underpowered.** The Rapido needs **80 W minimum**.
- **Loose heater connection.** Check the screw terminals, cold.
- **A fan blowing on the heater block** ([§29.1](#291-heater-verification-failed--thermal-runaway)).
- **PSU sagging under load.** The 24 V rail should stay above **23.5 V** while heating
  ([§34.7](#347-voltage-checks)).
- **Voltage drop in the umbilical.** ⚠️ Thin 24 V conductors. Use 18 AWG minimum
  ([§12.3](#123-the-toolhead-umbilical)).
- **Sock missing**, losing heat to chamber airflow.

### 29.4 Hotend overshoots

**Symptoms:** set 240 °C, it climbs to 250 °C before settling.

**Causes:**

- **PID needs tuning.** Re-run `PID_CALIBRATE`.
- **Thermal system changed without re-tuning.** ⚠️ **Always re-PID after changing a sock, a nozzle,
  a heater cartridge, or a fan duct.**

---

## 30. Bed and heating problems

⚠️ **Everything in this section involves mains AC. Unplug the machine before touching any wiring.
Read [§0.3](#03-safety).**

### 30.1 Bed doesn't heat at all

**Symptoms:** set a bed temperature; nothing happens.

**Diagnose in this order — it isolates the fault to one link in the chain:**

1. **Does the SSR input LED light** when the mainboard commands heat?
   - **No** → the fault is upstream: the mainboard output (pin PA1), the control wiring, or
     ⚠️ **reversed control polarity** on the SSR ([§11.5](#115-bed-heating--one-ssr-two-fused-zones)).
   - **Yes, but the bed stays cold** → the SSR has failed, or AC is not reaching the pads.
2. ⚠️ **Check the two heater fuses first.** They are the most likely fault and the easiest to test —
   pull each and check continuity with a meter. **Both blown** means no heat at all; **one blown**
   means half a cold bed ([§30.2](#302-bed-heats-slowly)).
   ⚠️ **Never replace a fuse with a larger one.** It blew for a reason; find the reason.
3. **Is AC reaching the SSR?** Check the fuse in the AC inlet. Check the connections at the bed
   terminal block. ⚠️ **Check the bed's thermal fuse** — if it has blown, inspect the entire AC
   heating circuit for the fault that blew it before replacing anything.
4. **Does the bed thermistor already read at or above target?** If a sensor is stuck reading 100 °C,
   Klipper correctly refuses to heat. Check the thermistor wiring.
5. **Only one zone heating?** ⚠️ **A blown fuse on that zone** is by far the most likely cause, or
   a failed heater pad. It cannot be the SSR — one SSR feeds both zones, so an SSR fault kills
   both. `BED_TEMP_CHECK` should have caught this — see
   [§30.5](#305-bed_temp_check-keeps-tripping).

> 🖼️ **[DIAG-16] Bed heating fault tree**
> *Show:* a decision flowchart starting at 'set bed temp, nothing happens': SSR LED lit? → yes/no branches through the **two heater fuses**, AC supply, thermal fuse and thermistor reading, ending at a named faulty component. Mark the one-vs-both-zones branch clearly.
> *Look for:* that this isolates the fault to one link. Laminate this and keep it in the electronics bay.

### 30.2 Bed heats slowly

**Causes:**

- **Only one of the two zones is working.** ⚠️ **Check the two heater fuses** and feel both halves
  of the bed. A blown fuse on one zone halves your heating power and is the most common cause of a
  bed that suddenly takes twice as long ([§11.5](#115-bed-heating--one-ssr-two-fused-zones)).
- **SSR partially failed.** A degrading SSR conducts at reduced duty, affecting **both** zones
  equally. This is the classic slow decline over weeks — replace it, and check its heatsinking,
  because heat is what degraded it.
- **Low AC voltage.** More noticeable on 120 V than 230 V. Check with a meter.
- **High thermal mass.** A 350 × 350 × 8 mm cast plate genuinely takes a while. This is normal.
- **No bed insulation.** Add insulation underneath, or turn off the chamber circulation fans during
  warm-up.
- **Chamber fans stealing heat** while the bed is coming up to temperature.

### 30.3 Bed temperature unstable

**Symptoms:** temperature swings ±5 °C around setpoint.

**Causes:**

- **PID not tuned.** `PID_CALIBRATE HEATER=heater_bed TARGET=100`.
- **Thermistor poorly bonded.** A sensor not firmly attached lags the real temperature, and PID
  oscillates chasing it.
- **The two zones heating unevenly.** Both pads switch together from one SSR, so a difference
  between them comes from the pads themselves — mismatched wattage, poor bonding, or uneven
  placement. Compare both thermistor readings over time.
- **Draughts.** An enclosure door left ajar during a hot bed print.

### 30.4 Spring steel sheet doesn't stay put

**Causes:**

- **Magnets weakening at high temperature.** ⚠️ Normal above ~110 °C — it is physics, not a fault.
  Use a high-temperature magnetic mat, or clip one corner with a binder clip during ABS prints.
- **Debris underneath.** Always wipe both surfaces before re-seating.
- **Sheet warped.** A warped sheet does not lie flat and will not hold. Replace it.

### 30.5 BED_TEMP_CHECK keeps tripping

**Symptoms:** the console shows `WARNING: Bed temperature imbalance!` and all heaters shut off.

💡 **This is the dual-thermistor safety system ([§16.9](#169-the-dual-thermistor-bed-safety-check)).
It has detected the two bed sensors disagreeing by more than 10 °C. Something is genuinely wrong.**

**Causes, in order:**

- **A blown fuse on one heater zone.** ⚠️ **The most likely cause, and exactly what this check
  exists to catch.** That zone goes cold while the other keeps heating. Check both fuses
  ([§11.5](#115-bed-heating--one-ssr-two-fused-zones)), then find out **why** it blew before
  replacing it.
- **One heater pad has failed open.** Same signature as a blown fuse. Check pad continuity, cold
  and unplugged.
- **A thermistor has come loose from the plate.** It reads air instead of bed. Find it and re-bond it.
- **A thermistor has failed.** Compare both readings at room temperature — they should agree within
  a couple of degrees.
- **The thermistors are placed too far apart** relative to how evenly the bed heats. A genuine
  thermal gradient across a large bed during rapid heat-up can approach 10 °C. If everything else
  checks out and it only trips during fast warm-up, reposition the sensors closer to the plate
  centre — ⚠️ **but rule out every real fault above first, and do not simply raise the threshold to
  silence it.**

⛔ **Never disable this monitor to make the message go away.** It is the last line of defence
against an uncontrolled bed heater.

---

## 31. Probe and levelling problems

### 31.1 Klicky won't attach to the toolhead

**Symptoms:** the toolhead approaches the dock but the probe stays put, or falls off mid-motion.

⚠️ **This failure is expensive.** If Klipper thinks the probe is attached and it is not, the next
`G28 Z` drives the nozzle into the bed.

**Causes:**

- **XY not homed properly.** The dock coordinates are absolute — if homing was inaccurate, the
  toolhead is not where Klipper thinks. Re-home X and Y, and check sensorless homing reliability
  ([§18.2](#182-sensorless-homing-tuning)).
- **Dock misaligned.** The approach must be perpendicular to the dock magnets. Adjust in **0.5 mm**
  increments.
- **Magnets weakened by heat.** ⚠️ Neodymium magnets demagnetise permanently above roughly 80 °C.
  If the dock has been baked repeatedly in a hot chamber, the magnets may simply be dead. Replace
  them, and consider relocating the dock somewhere cooler.
- **Pickup speed too high.** Lower the approach to **30 mm/s** and the lateral pickup to **15 mm/s**
  in `ATTACH_PROBE`.
- **Dock flexing.** A dock on a flexible mount moves away as the probe is picked up. Make it rigid.
- **Dock coordinates wrong** in `klicky-probe.cfg`. Verify by moving there manually at low speed.

### 31.2 Klicky won't drop off in the dock

**Symptoms:** the probe stays attached to the toolhead when you try to dock it.

**Causes:**

- **Wrong direction in the dock macro.** The toolhead must slide **past** the dock so the dock
  magnets peel the probe sideways off the toolhead. If the motion is reversed, it physically cannot
  release.
- **Toolhead magnets stronger than dock magnets.** Fit stronger dock magnets, or weaken the toolhead
  magnets by seating them a fraction deeper in their pockets.
- **Dock position off.** Adjust in 0.5 mm increments.
- **Dock obstructed** by a print, debris, or a stray cable.

### 31.3 Probe gives inconsistent readings

**Symptoms:** `PROBE_ACCURACY` shows a range greater than 0.010 mm.

💡 **Everything downstream depends on this.** Z-tilt with a 0.007 mm tolerance cannot converge if
the probe is noisier than 0.007 mm. Fix the probe first, then Z-tilt, then mesh.

**Causes:**

- **Probe wires loose.** ⚠️ The classic cause. A wire that tugs differently each time makes the
  switch register at slightly different positions. Reseat every connector; support the wires
  properly ([§12.4](#124-probe-wiring)).
- **Magnets not fully seated.** The probe wobbles instead of mounting rigidly.
- **Probe speed too high.** Lower the slow approach speed to **5 mm/s** in `[probe]`.
- **Bed shifting under probe pressure.** A loose bed deflects differently each touch. Tighten the
  three bed mounts.
- **Toolhead not rigid.** Loose toolhead screws add variability. Grab the toolhead and check for play.
- **A loose X carriage** or a loose gantry joint.
- **Probe body worn** where it seats. Reprint it.

### 31.4 Z-tilt doesn't converge

**Symptoms:** `Z_TILT_ADJUST` runs and runs, or fails with "retries exceeded."

**Watch the console output.** The behaviour tells you which cause it is:

| Behaviour | Cause |
|---|---|
| Range shrinks but stops just above tolerance | Probe noise ([§31.3](#313-probe-gives-inconsistent-readings)) |
| Range shrinks then jumps back up | ⚠️ A Z coupler slipping |
| Range does not shrink at all | ⚠️ `z_positions` or `points` wrong, or motors mismatched |
| Range **grows** each iteration | ⚠️ `z_positions` entries in the wrong order — corrections are being applied to the wrong motor |

**Causes:**

- **A Z coupler slipping.** ⚠️ **The most common mechanical cause.** One motor rotates but does not
  move the gantry. Check all three grub screws — they must be on a **flat**, and threadlocked
  ([§7.4](#74-install-ballscrews-and-couplers)).
- **Poor probe accuracy** ([§31.3](#313-probe-gives-inconsistent-readings)). Tolerance is 0.007 mm;
  the probe must be better than that.
- **`z_positions` wrong or in the wrong order.** These must be the actual XY coordinates where each
  Z screw lifts the gantry, listed in the same order as the corresponding `points`, matching the
  correct steppers ([§16.5](#165-z-tilt--levelling-the-gantry)).
- **A Z station binding.** It cannot move to where it is told
  ([§7.8](#78-verify-smooth-z-motion)).
- **One Z motor not moving at all.** Check all three respond individually.
- **The bed is loose** on its three mounts, so it moves between probes.

### 31.5 Bed mesh looks lumpy

**Symptoms:** the heightmap shows random spikes rather than a smooth surface.

💡 **A real bed is smooth.** Aluminium plates deform gently — domes, bowls, tilts. **Spiky means
measurement noise, not bed shape.**

**Causes:**

- **Probe inaccuracy.** ⚠️ Almost always the answer. Go to
  [§31.3](#313-probe-gives-inconsistent-readings).
- **Bed not clean.** Wipe with IPA before meshing.
- **Debris under the spring steel sheet.**
- **Too few mesh points** for a bed with real variation. Raise from 5×5 to 7×7.
- **Bed not at print temperature.** ⚠️ Always mesh hot ([§18.5](#185-bed-mesh)).
- **Z-tilt not run first.** Mesh after Z-tilt, never before.

> 🖼️ **[PHOTO-20] Mesh comparison — probe noise vs real bed shape**
> *Show:* two heightmaps of the *same* bed: one probed with a loose probe wire (spiky), one after fixing it (smooth).
> *Look for:* ⚠️ proof that the spikes were measurement noise, not the bed. This is the image that stops people replacing a perfectly good bed.

---

## 32. Electronics and connectivity problems

### 32.1 CAN bus errors / EBB36 disconnects

**Symptoms:** `Lost communication with MCU 'EBBCan'`, or `Timer too close`. The print stops.

💡 **CAN problems are almost always physical, not software.** Work the list in order — it is sorted
by how often each turns out to be the answer.

**Causes:**

- **Termination missing or wrong.** ⚠️ **Cause number one.** CAN needs **exactly two** 120 Ω
  terminations, one at each end of the bus. The EBB36 has a jumper; the mainboard end needs a 120 Ω
  resistor across CAN_H and CAN_L. **Too few causes reflections; too many loads the bus.** Measure
  across CAN_H and CAN_L with the power off: you should read **about 60 Ω** (two 120 Ω in parallel).
  120 Ω means one termination is missing; 40 Ω means there are three.
- **CAN pair not twisted.** ⚠️ CAN's noise immunity comes entirely from the twisting. Untwisted, it
  is two wires next to a switching bed heater. Twist 2–3 times per centimetre along the whole run.
- **CAN routed near AC.** Re-route the umbilical away from bed heater wiring. Cross at 90° where
  unavoidable.
- **24 V supply to the EBB36 sagging.** ⚠️ **This presents as a data error but is a power problem.**
  Voltage drop in a thin umbilical browns out the CAN transceiver under load. Use 18 AWG minimum
  ([§12.3](#123-the-toolhead-umbilical)). Measure 24 V **at the EBB36** while the hotend is heating.
- **Bitrate mismatch.** The host interface and the EBB36 firmware must match — typically 1 Mbps.
- **Firmware version mismatch.** ⚠️ Both MCUs must run the same Klipper version. After updating
  Klipper, reflash **both**.
- **Connector fatigue at the toolhead.** The umbilical flexes thousands of times. Check for a
  cracked solder joint or a wire broken inside its insulation. Wiggle-test while watching the log.
- **Ground offset** between the toolhead and the mainboard. Ensure a solid ground return in the
  umbilical, not a path through the frame.

### 32.2 USB disconnects (CM5 ↔ mainboard)

**Symptoms:** `Lost communication with MCU 'mcu'`.

**Causes:**

- **Poor quality USB cable.** Use a short, known-good, shielded cable.
- **Ground loop.** If the CM5 and the mainboard are powered separately *and* joined by USB, a loop
  forms. Power the CM5 from the mainboard, or break the USB +5 V line.
- **Cable too long.** Keep it under 1 m.
- **Electrical noise** from the bed SSR. Route USB away from AC.

💡 **On a Manta M8P V2 the CM5 mounts directly on the board**, so a physical USB cable may not be
involved at all. If it is not, this error points at firmware or a board-level problem — go to
[§32.3](#323-mainboard-wont-boot).

### 32.3 Mainboard won't boot

**Symptoms:** no LEDs, or the boot sequence hangs.

**Causes:**

- **24 V not present or out of range.** Measure — should be 23.8–24.5 V.
- **Short circuit on the board.** Disconnect everything except 24 V. If it boots, reconnect
  peripherals one at a time until it stops.
- **Corrupted firmware or SD card.** Reflash.
- **A damaged stepper driver** locking up the board's bus. Remove drivers one at a time to isolate.
- ⚠️ **Reversed polarity damage.** If 24 V was ever connected backwards, the board is probably dead.

### 32.4 Display shows garbage or stays dark

**Causes:**

- **Cable not fully seated.** Press both connectors home.
- **Cable reversed.** ⚠️ Check the keying and pin 1 markings.
- **5 V rail dropped out.** Measure it.
- **`[display]` section missing or wrong pins.** Compare against [§11.7](#117-connect-the-display).
- **Damaged FPC cable.** They are fragile at the fold.

💡 **The display is a convenience, not a control path.** If it fails, the printer still works fully
through the web interface. Do not stop a print to fix it.

### 32.5 Stepper driver errors

**Symptoms:** `TMC reports error: ... OPEN_LOAD` or similar.

**Causes:**

- **Loose stepper connector.** Reseat at both the motor and the board.
- **Broken wire in the motor cable**, usually where it flexes.
- **Coil pairs split across the connector.** Check with a meter — the two wires of a coil read a
  couple of ohms; wires from different coils read open ([§12.2](#122-stepper-motor-wiring)).
- **Damaged motor coil** (rare). Measure the two coil resistances — they should be roughly equal.
- **Damaged driver.** Swap with a known-good one.

💡 **`OPEN_LOAD` warnings while a motor is stationary are often spurious** and can be ignored. The
same warning during motion is real.

---

## 33. Klipper and software problems

### 33.1 "MCU shutdown: Timer too close"

**Symptoms:** Klipper aborts mid-print.

💡 **What it means:** Klipper schedules step timings in advance and sends them to the MCU. This
error means a step's scheduled moment arrived before the instruction did. Either the MCU is too
busy, or the communication link dropped the data.

**Causes:**

- **CAN bus problems.** ⚠️ On this machine, **check this first** —
  [§32.1](#321-can-bus-errors--ebb36-disconnects).
- **MCU saturated.** Too many sensors, too high a step rate. Check `STATUS` — MCU load should stay
  below 50 %.
- **Excessive microstepping.** Lower to 16× or 32×. 256× interpolated rarely improves anything and
  multiplies the step rate.
- **Host (CM5) overloaded.** Check with `top`. A misbehaving webcam stream is a common culprit.
- **USB link problems** ([§32.2](#322-usb-disconnects-cm5--mainboard)).

> 🖼️ **[DIAG-12] Software stack**
> *Show:* a layered diagram: OrcaSlicer → network → Moonraker → Klipper host on the CM5 → USB → Manta MCU, and CAN → EBB36 MCU, with what each layer is responsible for.
> *Look for:* why there are two firmware images to flash and why both must be the same Klipper version.

### 33.2 "Move out of range"

**Symptoms:** a print or macro fails with this error.

**Causes:**

- **Slicer start G-code references coordinates outside the limits.** X and Y max are **365**;
  Z ranges **−17 to 250**.
- **Bed mesh extends beyond reachable travel.** ⚠️ `mesh_max` is 320,320 — but the **probe's XY
  offset** means the toolhead must travel further than the probe does. If the probe offset pushes
  the toolhead past 365, this error appears. Reduce `mesh_max`.
- **`AREA_START`/`AREA_END` values out of range** from the slicer.
- **A macro's move is not clamped.** The built-in `PAUSE` and `CANCEL_PRINT` macros clamp their
  Z lifts with `|min` for exactly this reason ([§16.11](#1611-print_end-pause-resume-cancel_print)).
  Custom macros should too.

### 33.3 Klipper won't restart after a config change

**Symptoms:** `FIRMWARE_RESTART` fails or hangs.

💡 **Klipper's error message names the section, the option, and the problem. Read it carefully — it
is almost always exactly right.**

**Causes:**

- **Syntax error.** Check indentation (spaces, not tabs), and colons after option names.
- **Referenced pin does not exist.** Compare against the board's pin alias file, or
  [Appendix A](#a-mainboard-pin-map).
- **Duplicate section names.** Every section must be unique. This is easy to cause with `[include]`
  files that define the same thing twice.
- **An included file is missing.** `printer.cfg` includes `ebb36.cfg` and `klicky-probe.cfg` — if
  either is absent, Klipper will not start.
- **An option in the wrong section.**

🔧 **Recovery:** restore your backup and reapply the change in smaller pieces:

```bash
cp ~/printer_data/config/printer.cfg.backup ~/printer_data/config/printer.cfg
```

### 33.4 Macros don't behave as expected

**Symptoms:** `PRINT_START` skips steps or behaves oddly.

**Causes:**

- **The slicer is not passing parameters.** ⚠️ The most common cause. The start G-code must be
  exactly as in [§19.3](#193-start-and-end-g-code), with all four parameters.
- **Parameter name case mismatch.** `params.BED_TEMP` and `params.bed_temp` are different things.
- **Missing `|float` cast.** Comparisons against parameters need it:
  `{% if printer.heater_bed.temperature < params.BED_TEMP|float %}`
- **Wrong macro name.** ⚠️ It is `PRINT_START`, not `START_PRINT`.
- **A required macro is undefined.** If `klicky-probe.cfg` is missing, `ATTACH_PROBE` does not
  exist, and anything calling it fails.

### 33.5 "Probe triggered prior to movement"

**Symptoms:** Klipper aborts homing or probing.

💡 **It means the probe was already reading "triggered" when Klipper began the move.** Either the
switch really is pressed, or the logic is inverted.

**Causes:**

- **Logic inverted in the config.** Toggle the `!` in the probe pin:
  `pin: ^!EBBCan: PB6` ↔ `pin: ^EBBCan: PB6`. Verify with `QUERY_PROBE`
  ([§17.8](#178-stage-7--probe-and-homing-dry-run)) — untriggered should read `open`.
- **The probe is physically held down.** Check for a printed part or debris pressing the switch.
- **Loose probe wire shorting.** Reseat connectors.
- **The probe is not attached** and the floating input is reading as triggered.

🔧 **Always diagnose this with `QUERY_PROBE`**, pressing and releasing the switch by hand. It tells
you the truth in two seconds.

---

## 34. Diagnostic procedures

### 34.1 Belt tension check

1. `M84` to disable motors.
2. Move the gantry to the **middle** of the frame — always measure at the same position.
3. Pluck the belt span between the X carriage and the corresponding end pulley.
4. Read the frequency with a phone tuner app or a tension gauge.
5. **Target: 100–110 Hz. The two belts must be within 5 Hz of each other.**

### 34.2 Frame squareness check

1. Bottom square diagonals — equal within 0.5 mm.
2. Top square diagonals — equal within 0.5 mm.
3. A machinist's square against each upright, on both faces — 90°.
4. Push the gantry to each end of travel; **both Y carriages must bottom out simultaneously.**
5. Push the top corners diagonally — negligible racking.

### 34.3 Extrusion calibration

See [§28.1](#281-extruder-doesnt-push-100-mm-when-asked).

### 34.4 Probe repeatability check

```gcode
G28
PROBE_ACCURACY SAMPLES=20
```

| Range (max − min) | Verdict |
|---|---|
| Under 0.010 mm | Good |
| 0.010 – 0.050 mm | Marginal — Z-tilt at 0.007 mm tolerance will struggle |
| Over 0.050 mm | **Investigate.** [§31.3](#313-probe-gives-inconsistent-readings) |

🔧 **Run this at several points on the bed, not just the centre.** Good repeatability at the middle
and poor at a corner points to gantry flex or a loose bed, not the probe.

### 34.5 Resonance test

```gcode
SHAPER_CALIBRATE
```

Requires the ADXL345 on the EBB36 (already configured, probe point `175,175,20`).

The test sweeps each axis and writes recommended shaper parameters. It also reports the maximum
usable acceleration per axis — ⚠️ **if that comes out below `max_accel: 5500`, lower `max_accel`
to match.**

Reference values from this machine: X `3hump_ei` @ 110.8 Hz, Y `2hump_ei` @ 62.8 Hz.

### 34.6 Stepper current sanity check

After 15 minutes of normal printing, briefly touch each stepper:

| Feel | Verdict |
|---|---|
| Cool to mildly warm | Good |
| Warm but holdable | Good |
| Too hot to hold for more than a second | Lower `run_current` by 0.05 A |

Driver heatsinks should never be too hot to touch. If they are, switch on `driver_coling`.

### 34.7 Voltage checks

| Measurement | Expected |
|---|---|
| 24 V rail, idle | 24.0–24.3 V |
| 24 V rail, bed + hotend heating | **above 23 V** |
| 24 V **at the EBB36**, hotend heating | above 23 V — a lower reading means umbilical voltage drop |
| AC at the SSR load output, bed commanded on | mains voltage ⚠️ **live measurement — extreme care** |
| Continuity across each bed heater fuse, **unplugged** | closed circuit — an open one has blown |
| CAN_H to CAN_L, power off | **≈ 60 Ω** (two 120 Ω terminations in parallel) |
| Inlet earth to frame / bed / panels | near 0 Ω |

### 34.8 The mechanical freedom test

The fastest overall health check. `M84`, then by hand:

| Test | Expected |
|---|---|
| Push gantry along X | Smooth, equal along the whole travel |
| Push gantry along Y | Same |
| Push gantry on all four diagonals | **All four feel the same** |
| Rotate each of the three ballscrews | Free, equal, no tight spots |
| Wiggle the toolhead | No play |
| Wiggle each Y carriage | No play |
| Wiggle the bed | No play |

⚠️ Any asymmetry between the four diagonals points to belt tension, belt routing, or gantry
squareness — in that order of likelihood.

---

## 35. Symptom quick-reference

### First layer

| Symptom | Section |
|---|---|
| Nozzle scratches or gouges the bed | [25.1](#251-nozzle-drags-or-gouges-the-bed) |
| Filament doesn't stick / lines are round | [25.2](#252-first-layer-too-high) |
| Good on one side, bad on the other | [25.3](#253-inconsistent-first-layer) |
| Sticks at first, then a corner lifts | [25.4](#254-bed-adhesion-fails-mid-print) |

### Print quality

| Symptom | Section |
|---|---|
| Layer shift partway up | [26.1](#261-layer-shifts) |
| Ghosting / ringing after corners | [26.2](#262-ringing--ghosting) |
| Horizontal bands every 4 mm | [26.3](#263-z-banding--ribbing) |
| Stringing between parts | [26.4](#264-stringing--oozing) |
| Gaps, weak walls, holes in top surfaces | [26.5](#265-under-extrusion) |
| Puffy walls, parts oversize | [26.6](#266-over-extrusion) |
| Iridescent fine vertical texture | [26.7](#267-salmon-skin--fine-vertical-pattern) |
| ABS parts split along layers | [26.8](#268-cracks-between-layers-absasa) |

### Motion

| Symptom | Section |
|---|---|
| Grinding or clicking from a motor | [27.1](#271-grinding-or-clicking-from-the-steppers) |
| Gantry binds one way | [27.2](#272-gantry-binds-in-one-direction) |
| Sudden position loss after a fast move | [27.3](#273-motor-stalls--skips-steps) |
| Belts sag or slap | [27.4](#274-loose-belts) |
| How to tune belts | [27.5](#275-how-to-tune-the-belts) |
| Bed judders in Z | [27.6](#276-bed-does-not-move-smoothly-in-z) |

### Extruder and filament

| Symptom | Section |
|---|---|
| Extrusion test comes out wrong | [28.1](#281-extruder-doesnt-push-100-mm-when-asked) |
| Chewed marks on the filament | [28.2](#282-filament-grinding) |
| Filament won't load | [28.3](#283-filament-wont-load) |
| Rhythmic click from the toolhead | [28.4](#284-extruder-skipping) |
| Jams after long prints; blob high on the strand | [28.5](#285-heat-creep) |
| How to do a cold pull | [28.6](#286-how-to-do-a-cold-pull) |

### Temperature

| Symptom | Section |
|---|---|
| "Heater verification failed" | [29.1](#291-heater-verification-failed--thermal-runaway) |
| Temperature reads 400 °C or −20 °C | [29.2](#292-temperature-reading-wildly-wrong) |
| Hotend heats too slowly | [29.3](#293-hotend-slow-to-reach-temperature) |
| Hotend overshoots the setpoint | [29.4](#294-hotend-overshoots) |
| Bed doesn't heat | [30.1](#301-bed-doesnt-heat-at-all) |
| Bed heats slowly | [30.2](#302-bed-heats-slowly) |
| Bed temperature oscillates | [30.3](#303-bed-temperature-unstable) |
| Steel sheet shifts | [30.4](#304-spring-steel-sheet-doesnt-stay-put) |
| "Bed temperature imbalance!" | [30.5](#305-bed_temp_check-keeps-tripping) |

### Probe and levelling

| Symptom | Section |
|---|---|
| Klicky won't attach | [31.1](#311-klicky-wont-attach-to-the-toolhead) |
| Klicky won't dock | [31.2](#312-klicky-wont-drop-off-in-the-dock) |
| Probe readings vary | [31.3](#313-probe-gives-inconsistent-readings) |
| Z-tilt won't converge | [31.4](#314-z-tilt-doesnt-converge) |
| Bed mesh looks spiky | [31.5](#315-bed-mesh-looks-lumpy) |

### Electronics and software

| Symptom | Section |
|---|---|
| "Lost communication with MCU 'EBBCan'" | [32.1](#321-can-bus-errors--ebb36-disconnects) |
| "Lost communication with MCU 'mcu'" | [32.2](#322-usb-disconnects-cm5--mainboard) |
| Mainboard won't boot | [32.3](#323-mainboard-wont-boot) |
| Display dark or garbled | [32.4](#324-display-shows-garbage-or-stays-dark) |
| "TMC reports error" | [32.5](#325-stepper-driver-errors) |
| "MCU shutdown: Timer too close" | [33.1](#331-mcu-shutdown-timer-too-close) |
| "Move out of range" | [33.2](#332-move-out-of-range) |
| Klipper won't restart | [33.3](#333-klipper-wont-restart-after-a-config-change) |
| Macros misbehave | [33.4](#334-macros-dont-behave-as-expected) |
| "Probe triggered prior to movement" | [33.5](#335-probe-triggered-prior-to-movement) |

---
---

# Part 6 — Appendices

## A. Mainboard pin map

From the live `printer.cfg`. **Mainboard: BTT Manta M8P V2 (STM32H723).**

### Steppers

| Function | Slot | Step | Dir | Enable | UART | Diag |
|---|---|---|---|---|---|---|
| `stepper_x` (CoreXY A) | Motor 1 | PE6 | !PE5 | !PC14 | PC13 | ^PF4 |
| `stepper_y` (CoreXY B) | Motor 2 | PE2 | !PE1 | !PE4 | PE3 | ^PF3 |
| `stepper_z` (front-left) | Motor 5 | PG13 | PG12 | !PG15 | PG14 | — |
| `stepper_z1` (front-right) | Motor 6 | PG9 | PD7 | !PG11 | PG10 | — |
| `stepper_z2` (rear) | Motor 7 | PB4 | PB3 | !PB6 | PB5 | — |

A leading `!` inverts the pin. On `dir_pin` this reverses the motor's direction — the correct fix
for a motor turning the wrong way.

### Heaters and sensors

| Function | Pin | Notes |
|---|---|---|
| `heater_bed` output | PA1 | → the SSR control input (one SSR switches both heater zones) |
| Bed thermistor 1 | PB1 | `EPCOS 100K B57560G104F`, controls the heater |
| Bed thermistor 2 | PB0 | `EPCOS 100K B57560G104F`, safety cross-check only |

Hotend heater and thermistor are on the **EBB36**, defined in `ebb36.cfg`.

### Fans (all `fan_generic` — manually controlled, not automatic)

| Name | Pin | Intended purpose |
|---|---|---|
| `pi_cooling` | PF7 | CM5 |
| `mcu_cooling` | PF9 | Mainboard MCU |
| `driver_coling` | PF6 | Stepper drivers ⚠️ *(spelled this way in the config)* |
| `el_cooling` | PA4 | Electronics bay |
| `another_fan` | PF8 | Spare / chamber |

### Display — BTT mini12864 v2.0

| Function | Pin |
|---|---|
| `cs_pin` | PG0 |
| `a0_pin` | PF15 |
| `rst_pin` | PF14 |
| `encoder_pins` | ^PE10, ^PE15 |
| `click_pin` | ^!PG1 |
| SPI MISO | PE13 |
| SPI MOSI | PE14 |
| SPI SCLK | PE12 |
| Beeper | PE7 |
| Neopixel RGB | PF13 (3 LEDs, RGB order) |

### MCU identity

```ini
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32h723xx_15000F001751313434373135-if00
restart_method: command
```

⚠️ **That serial string identifies one specific physical board.** Find yours with
`ls /dev/serial/by-id/`.

---

## B. Master reference values

Every number worth knowing, in one place. Values marked 📋 are reference readings from the machine
this manual documents — yours will differ and must be measured.

### Machine limits

| Parameter | Value |
|---|---|
| X travel | 0 – 365 mm |
| Y travel | 0 – 365 mm |
| Z travel | −17 – 250 mm |
| Meshed area | 30 – 320 mm on both axes |
| Max velocity | 200 mm/s |
| Max acceleration | 5500 mm/s² |
| Max Z velocity | 8 mm/s |
| Max Z acceleration | 20 mm/s² |
| Bed max temperature | 110 °C |

### Motion and drive

| Parameter | Value |
|---|---|
| XY `rotation_distance` | 40 mm (20 T pulley × 2 mm pitch) |
| Z `rotation_distance` | **4 mm** (1204 ballscrew) |
| Microsteps, all axes | 16 |
| XY `run_current` | 1.20 A (motor max ≈ 1.4 A) |
| Z `run_current` | 0.50 A |
| Extruder `run_current` | ~0.65–0.70 A (in `ebb36.cfg`) |
| Belt tension | **100–110 Hz, both within 5 Hz** |
| XY homing speed | 35 mm/s |
| `driver_SGTHRS` (X and Y) | 35 |
| `stealthchop_threshold` | 0 (SpreadCycle — required for sensorless homing) |
| Z homing speed | 10 mm/s, second pass 5 mm/s |

### Levelling

| Parameter | Value |
|---|---|
| Z-tilt retry tolerance | **0.007 mm** |
| Z-tilt retries | 5 |
| Z-tilt / mesh travel speed | 200 mm/s |
| `horizontal_move_z` | 20 mm |
| Mesh probe count | 5 × 5 |
| Mesh algorithm | bicubic |
| Mesh fade | start 1 mm, end 10 mm |
| Probe repeatability target | **< 0.010 mm** over 20 samples |
| Probe slow approach speed | 5 mm/s |

### Tuning (📋 reference readings — measure your own)

| Parameter | Reference |
|---|---|
| Input shaper X | `3hump_ei` @ 110.8 Hz |
| Input shaper Y | `2hump_ei` @ 62.8 Hz |
| Bed PID | Kp 57.114 · Ki 1.182 · Kd 689.657 |
| Bed mesh range | ±0.075 mm across 290 mm |
| Pressure advance | 0.030 – 0.060 (Orbiter + Rapido) |
| Retraction (direct drive) | 0.5 – 1.0 mm |

### Electrical

| Parameter | Value |
|---|---|
| 24 V rail, idle | 24.0 – 24.3 V |
| 24 V rail, under full load | **> 23 V** |
| CAN bitrate | 1 Mbps |
| CAN termination | 120 Ω × 2 → measures **≈ 60 Ω** across the pair |
| Umbilical 24 V conductors | **18 AWG minimum** |
| AC conductors | **16 AWG minimum** |
| SSR control input | 3 – 32 V DC, **polarity-sensitive** |
| Bed SSRs | **1**, switching both zones |
| Bed heater fuses | **2**, one per pad, slow-blow, sized as pad watts ÷ mains volts |
| Bed thermistor divergence limit | **10 °C** → `BED_TEMP_CHECK` cuts heaters |

### Materials

| Material | Nozzle | Bed | **Door** | Cooling |
|---|---|---|---|---|
| PLA | 200–220 °C | 60 °C | 🚪 **OPEN** | 100 % |
| PETG | 230–250 °C | 75–80 °C | 🚪 **OPEN** | 30–50 % |
| TPU | 220–240 °C | 40–60 °C | 🚪 **OPEN** | 50 % |
| ABS | 250–260 °C | 95–105 °C | 🔒 **CLOSED**, 40 °C+ | 0–20 % |
| ASA | 250–265 °C | 95–105 °C | 🔒 **CLOSED**, 40 °C+ | 0–20 % |
| PC | 280–300 °C | 100–110 °C | 🔒 **CLOSED**, hot | 0–10 % |
| PA / nylon | 260–290 °C | 90–110 °C | 🔒 **CLOSED** | 0–20 % |

⚠️ **Door: OPEN for PLA/PETG/TPU · CLOSED for ABS/ASA/PC/PA.** [The door rule](#the-door-rule).

---

## C. Printed parts checklist

The authoritative list with filenames is `STLs/stls_here.md`. Print in **PC / ASA / ABS+ / PET-CF**
(in that order of preference). ⚠️ **Never PLA for anything inside the chamber.**

📌 **Which machine to print these on — and which material for which part — is in
[§4.11](#411-where-to-print-parts-and-replacements).** Short version: **ABS+ on the BambuLab P1S
with 3D Lac** for structural parts, small ABS/ASA parts on the enclosed MK4 (door closed
throughout), PETG parts on anything.

**Settings:** 0.4 mm nozzle · 0.2 mm layers · 4–5 walls · 4–5 top/bottom · 35–45 % gyroid/cubic infill

### XY

- [ ] Front left motor mount — top and bottom
- [ ] Front right motor mount — top and bottom
- [ ] Rear left idler mount — top and bottom
- [ ] Rear right idler mount — top and bottom
- [ ] X axis mount left — top and bottom
- [ ] X axis mount right — top and bottom

### Z (× 3 stations)

- [ ] WobbleX × 3 + WobbleX spacer × 3
- [ ] Linear rail / ballscrew / bed mount — left, right, rear
- [ ] Z motor mount — left, right, rear
- [ ] Ballscrew stabiliser — left, right, rear

### Toolhead

- [ ] EVA3 set (with the Klicky and EBB36 mods listed in `stls_here.md`)
- [ ] Klicky probe mount
- [ ] EBB36 mount + wire guard
- [ ] Klicky probe body, latch, and dock
- [ ] CAN wire guide (behind belts)
- [ ] Filament guide

### Electronics area

- [ ] Covers 1–4 (front panel)
- [ ] Covers 5–8 (left side)
- [ ] Covers 9–12 (right side)
- [ ] Covers 13–16 (rear)
- [ ] DIN-to-3030 rail mount × 2

### Enclosure and other

- [ ] Printer feet × 4
- [ ] LCD cover, LCD mount 1, LCD mount 2
- [ ] Cable chain mount × 2
- [ ] Enclosure panel mounts
- [ ] Door handles × 2
- [ ] Door hinges (print-in-place)

🔧 **Print two of every small bracket.** You will crack one, and reprinting mid-build costs a day.

📋 Some entries in `stls_here.md` list duplicate filenames for what should be distinct top/bottom
parts. Check against the CAD, and if a part is missing from the repository, export it from
`cad/UM3DCoreXY.f3z` — and please open an issue so it gets added.

---

## D. Fasteners and tightening guide

> 🟠 **Mini → Ultramarine:** Almost every fastener on this machine goes into either **printed
> plastic** or an **aluminium T-nut**. Neither tolerates the torque you would happily apply to a
> steel-into-steel joint. "Tight" here means "seated," not "as hard as I can turn the key."

### General rules

| Joint | How tight |
|---|---|
| **M3 into a heat-set insert** | Turn until the head just seats, then stop. Half a turn more strips the insert out of the plastic |
| **M3 into printed plastic directly** | Even gentler. Stop the moment resistance rises |
| **M5 into a T-nut in extrusion** | Firm. You can feel the T-nut bite and rotate into the slot. Do not keep going — you will bow the extrusion wall |
| **Corner brackets** | Star pattern, two passes, partial then full |
| **Linear rail bolts** | **Centre outward.** Snug on the first pass, final on the second |
| **Motor face screws (M3)** | Snug. The motor's threads are shallow |
| **Grub screws (pulleys, couplers)** | Firm, **on the flat**, with **blue threadlocker** |
| **High-current screw terminals** | **Genuinely tight**, and re-checked after 10 hours and annually. ⚠️ A loose one is a fire risk |
| **PSU / SSR / fuse-holder terminals** | Same. With ferrules, never with solder-tinned wire |

📋 **No torque specification exists for this design.** The values above are practice, not spec. If
you own a torque screwdriver, M3 into brass inserts is typically 0.4–0.6 Nm and M5 into T-nuts
typically 2–3 Nm — treat those as starting points, not gospel.

### Where threadlocker goes

**Use blue (medium) threadlocker on:**
- All pulley grub screws (2 XY motors)
- All coupler grub screws (3 Z, 2 screws each = 6)
- Idler shaft retaining screws
- Anything that has already worked loose once

**Do not use threadlocker on:**
- Anything threading into printed plastic — it is unnecessary and some formulations attack plastics
- Anything into a heat-set insert
- Anything you expect to disassemble routinely

### Recovering a stripped fastener

| Problem | Fix |
|---|---|
| Stripped heat-set insert (spins in the plastic) | Heat it, pull it out, re-install a fresh one. If the pocket is enlarged, add plastic — a sliver of the same filament melted in — and redo it |
| Rounded M3 socket | Grip with pliers if the head is accessible; otherwise a screw extractor, or cut the part off |
| Cross-threaded M5 in a T-nut | Discard the T-nut. They are cheap and a damaged one will fail under load |
| Snapped screw in a printed part | Heat a pin and melt around it, or drill it out and use a larger insert |

---

## E. Command cheat sheet

### Everyday

| Command | Effect |
|---|---|
| `G28` | Home all axes |
| `G28 X` / `G28 Y` / `G28 Z` | Home one axis |
| `Z_TILT_ADJUST` | Level the gantry using all three Z motors |
| `BED_MESH_CALIBRATE` | Build a bed height map |
| `BED_MESH_PROFILE LOAD=default` | Load the saved mesh |
| `BED_MESH_CLEAR` | Discard the active mesh |
| `PRINT_START BED_TEMP=... EXTRUDER_TEMP=...` | Full print startup sequence |
| `PRINT_END` | Print shutdown sequence |
| `PAUSE` / `RESUME` / `CANCEL_PRINT` | Print control |
| `M84` | Disable steppers (gantry becomes free) |
| `M112` | **EMERGENCY STOP** |
| `FIRMWARE_RESTART` | Restart Klipper after a config change or a shutdown |

### Calibration

| Command | Effect |
|---|---|
| `PROBE_CALIBRATE` | Set the Z offset (then `TESTZ Z=-0.1`, `ACCEPT`) |
| `TESTZ Z=-0.05` | Step during Z offset calibration |
| `PROBE_ACCURACY SAMPLES=20` | Probe repeatability test |
| `QUERY_PROBE` | Report the probe's current state |
| `PID_CALIBRATE HEATER=extruder TARGET=240` | Tune the hotend |
| `PID_CALIBRATE HEATER=heater_bed TARGET=100` | Tune the bed |
| `SHAPER_CALIBRATE` | Resonance test and input shaper tuning |
| `SAVE_CONFIG` | Write calibration results to `printer.cfg` **and restart** |

### Live adjustment

| Command | Effect |
|---|---|
| `SET_GCODE_OFFSET Z_ADJUST=-0.025 MOVE=1` | Nudge Z down mid-print (babystepping) |
| `SET_VELOCITY_LIMIT ACCEL=2000` | Temporarily change acceleration |
| `SET_TMC_CURRENT STEPPER=stepper_x CURRENT=1.1` | Temporarily change stepper current |
| `SET_TMC_FIELD STEPPER=stepper_x FIELD=SGTHRS VALUE=40` | Temporarily change homing sensitivity |
| `SET_FAN_SPEED FAN=driver_coling SPEED=0.8` | Control a `fan_generic` fan |
| `M106 S255` / `M107` | Part cooling fan full / off |

### Manual movement

```gcode
G91          ; relative positioning
G1 X10 F1000 ; move 10 mm in +X
G90          ; back to absolute positioning
```

```gcode
M83          ; relative extrusion
G1 E50 F300  ; extrude 50 mm
```

### Diagnostics

| Command | Effect |
|---|---|
| `STATUS` | Klipper state and MCU load |
| `M118 <text>` | Print a message to the console (useful in macros) |
| `DUMP_TMC STEPPER=stepper_x` | Dump every driver register for that stepper |
| `ACCELEROMETER_QUERY` | Confirm the ADXL345 is responding |
| `GET_POSITION` | Report the current toolhead position |

### SSH / Linux

```bash
ssh ultramarine@<printer-ip>
```

```bash
cp ~/printer_data/config/printer.cfg ~/printer_data/config/printer.cfg.backup
```

```bash
sudo systemctl restart klipper
```

```bash
journalctl -u klipper -f
```

```bash
ls /dev/serial/by-id/
```

```bash
~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q
```

---

## F. USB auto-sync for G-code files

The printer can copy G-code files from a USB stick automatically the moment you plug it in.

**How it works:**

1. You plug in a USB drive.
2. The system detects and mounts it **read-only**.
3. Any file not already in the gcodes folder is copied over.
4. The drive is unmounted cleanly. **It is never written to.**
5. A background daemon deletes copied files older than 6 months to keep the disk tidy.

Files land in `/home/ultramarine/printer_data/gcodes` and appear in Mainsail/Fluidd immediately.

### Installation

**1. Transfer the archive** (run this on your computer, not the printer):

```bash
scp klipper-usb-sync.tar.gz ultramarine@<printer-ip>:/home/ultramarine/
```

**2. SSH in:**

```bash
ssh ultramarine@<printer-ip>
```

**3. Extract:**

```bash
tar -xzvf klipper-usb-sync.tar.gz
```

```bash
cd klipper-usb-sync
```

**4. Install the scripts:**

```bash
sudo cp usb_sync.sh usb_sync_mount.sh cleanup_old_files.sh /usr/local/bin/
```

```bash
sudo chmod +x /usr/local/bin/usb_sync.sh /usr/local/bin/usb_sync_mount.sh /usr/local/bin/cleanup_old_files.sh
```

**5. Install the udev rule** (this is what triggers on plug-in):

```bash
sudo cp 99-usb-sync.rules /etc/udev/rules.d/
```

```bash
sudo udevadm control --reload-rules
```

**6. Install and start the cleanup daemon:**

```bash
sudo cp klipper-cleanup.service /etc/systemd/system/
```

```bash
sudo systemctl daemon-reload
```

```bash
sudo systemctl enable --now klipper-cleanup.service
```

### Testing

Plug in a USB drive, wait a few seconds, then:

```bash
cat /home/ultramarine/usb_sync.log
```

Expected output:

```
[2024-06-24 14:09:25] udev event: device=/dev/sda1  label='USB_DISK'
[2024-06-24 14:09:27] Mounted /dev/sda1 at /media/usb_sync/USB_DISK (read-only)
[2024-06-24 14:09:27] ===== USB sync started =====
[2024-06-24 14:09:27]   COPY  my_print.gcode
[2024-06-24 14:09:27]   SKIP  old_print.gcode  (already exists)
[2024-06-24 14:09:27] ===== USB sync finished — copied: 1 | skipped: 1 | errors: 0 =====
[2024-06-24 14:09:27] Unmounted /media/usb_sync/USB_DISK
```

### What each file does

| File | Purpose |
|---|---|
| `usb_sync.sh` | Compares the USB contents to the gcodes folder and copies new files |
| `usb_sync_mount.sh` | Called on plug-in; mounts the drive and runs the sync |
| `99-usb-sync.rules` | The udev rule that triggers on plug-in |
| `cleanup_old_files.sh` | Deletes files older than 6 months |
| `klipper-cleanup.service` | Keeps the cleanup daemon running |

### Troubleshooting

**Nothing copied.** Check the log first (`cat /home/ultramarine/usb_sync.log`). An empty log means
udev did not fire — reload the rules and replug:

```bash
sudo udevadm control --reload-rules
```

**Files copied but are read-only.** FAT32 and exFAT do not store Unix permissions, so copied files
can land read-only. Fix existing ones with:

```bash
chmod 644 /home/ultramarine/printer_data/gcodes/*.gcode
```

Future syncs handle this automatically.

**Cleanup daemon not running:**

```bash
sudo systemctl restart klipper-cleanup.service
```

```bash
sudo systemctl status klipper-cleanup.service
```

Watch its live output with:

```bash
journalctl -u klipper-cleanup.service -f
```

**Clearing the gcodes folder:**

```bash
rm -rf /home/ultramarine/printer_data/gcodes/*
```

> ⚠️ Permanent. Make sure nothing is printing first.

---

## G. Known documentation conflicts — verify before you build

The two source manuals, the parts list, and the live `printer.cfg` disagreed in the places below.
**The live `printer.cfg` was treated as authoritative** where it applies, because it describes a
machine that actually runs.

**Read this before ordering parts.** Confirm each row against `cad/UM3DCoreXY.f3z` or
`cad/UM3DCoreXY.step` for your build.

### Resolved — config wins

| Item | Old build guide said | Live config says | Used in this manual |
|---|---|---|---|
| Build volume | 300 × 300 × 300 mm | X/Y max 365, Z max 250, mesh 30–320 | **≈ 350 × 350 × 250 mm** |
| Mainboard | "Manta MxP", "CB1" | Manta M8P V2, STM32H723, CM5 | **Manta M8P V2 + CM5** |
| Z drive | "T8 leadscrew", `rotation_distance: 8` | `rotation_distance: 4` | **1204 ballscrew, 4 mm lead** ⚠️ *This was a genuine error in the old troubleshooting guide's §3.3* |
| XY `run_current` | 0.7 A | 1.20 A | **1.20 A** |
| Z `run_current` | 0.8 A | 0.50 A | **0.50 A** |
| Start macro name | `START_PRINT` / `END_PRINT` | `PRINT_START` / `PRINT_END` | **`PRINT_START` / `PRINT_END`** ⚠️ *Using the old name in your slicer means the macro never runs* |
| Bed heating | BOM lists **2 × SSR-40 DA** | The machine as built uses **1 SSR** for both pads, with **2 fuses**, one per pad | **1 SSR + 2 fuses**. ⚠️ The BOM quantity of 2 SSRs is wrong — order one, plus two fuse holders. Corrected on the designer's instruction |
| Display | "mini12864 LCD" | BTT mini12864 **v2.0** with RGB | **v2.0 with RGB status** |
| Bed max temp | not stated | 110 °C | **110 °C** |
| Acceleration | not stated | 5500 mm/s² | **5500 mm/s²** |

### Unresolved — 📋 check your CAD before ordering

| Item | Source A | Source B | Note |
|---|---|---|---|
| Vertical uprights | BOM: **750 mm** | Assembly text: 600 mm | Manual uses 750 mm |
| Y rails | BOM: **450 mm** | Assembly text: 500 mm | Manual uses 450 mm |
| Z rails | BOM: **350 mm** | Assembly text: 500 mm | Manual uses 350 mm |
| XY motors | BOM: **Hanpose NEMA17 42 mm** | Assembly text: "LDO 36STH17 pancake" | Manual uses the BOM |
| Z motors | BOM: **Hanpose NEMA17 60 mm** | Assembly text: "LDO NEMA17" | Manual uses the BOM |
| XY motor position | Printed parts: **front** left/right | Assembly text: rear corners | Manual follows the part names — **verify in CAD** |
| Belt tension | Build guide + diagnostics: 110 Hz | Belt tuning section: 100 Hz | Manual specifies **100–110 Hz, matched within 5 Hz** |
| 5 V PSU | Assembly text lists one | BOM lists two 24 V PSUs only | Manual assumes 5 V from the board or a buck converter |
| Toolhead part names | Build guide: `back_core_xy_fi`, `XY-LEFT-BOTTOM` etc. | `stls_here.md`: `x_axis_mount_left.stl` etc. | Naming has changed; the STL list is more current |

### Missing from the repository

| File | Needed for | Where to get it |
|---|---|---|
| `ebb36.cfg` | Extruder, hotend, toolhead fans, ADXL345, probe pin | BTT's EBB36 sample config + your CAN UUID |
| `klicky-probe.cfg` | `[probe]`, `ATTACH_PROBE`, `DOCK_PROBE` | The upstream Klicky-Probe project + your dock coordinates |
| STL files | All printed parts | Export from `cad/UM3DCoreXY.f3z` — and open an issue so they get added |

### Content changed rather than merged

| Item | What happened |
|---|---|
| Z banding (old troubleshooting §3.3, marked "FIX FIX FIX FIX !!!!!") | **Rewritten as [§26.3](#263-z-banding--ribbing).** Now covers ballscrew rather than leadscrew behaviour, the correct `rotation_distance: 4`, the **WobbleX** couplings as the primary cause on this machine, and a band-spacing measurement that identifies the cause directly |
| Wipe-pad sequence in `firmware/start_print.cfg` | That file's `PRINT_START` contains an unfinished nozzle-wipe block with `{WIPE_X_START}` placeholders that are **never defined**, so it would fail at runtime. The live `printer.cfg` version — documented in [§16.10](#1610-print_start-step-by-step) — has no wipe block and works. ⚠️ **Do not copy `firmware/start_print.cfg` over your working config without finishing or deleting the wipe section** |
| "Also, Claude can help." | Replaced with [Appendix I](#i-where-to-get-help) |

---

## H. Maintenance log template

Keep this. It is the most useful troubleshooting tool you will own, because it converts
"this feels worse than it used to" into evidence.

```
════════════════════════════════════════════════════════════════
 ULTRAMARINE — BUILD & MAINTENANCE LOG
════════════════════════════════════════════════════════════════

 Build completed:    ____________
 First print:        ____________
 Serial / name:      ____________

────────────────────────────────────────────────────────────────
 BASELINE CALIBRATION  (record after commissioning)
────────────────────────────────────────────────────────────────
 Z offset:                     ____________
 Belt tension  L / R:          ______ Hz / ______ Hz
 Input shaper X:               ____________ @ ______ Hz
 Input shaper Y:               ____________ @ ______ Hz
 Bed PID:            Kp ______  Ki ______  Kd ______
 Hotend PID:         Kp ______  Ki ______  Kd ______
 Extruder rotation_distance:   ____________
 driver_SGTHRS  X / Y:         ______ / ______
 Probe accuracy range:         ____________ mm
 Bed mesh range:               ____________ mm

────────────────────────────────────────────────────────────────
 EVENT LOG
────────────────────────────────────────────────────────────────
 Date | Hours | Symptom / Action | What fixed it
 -----|-------|------------------|---------------------------
      |       |                  |
      |       |                  |
      |       |                  |
      |       |                  |

────────────────────────────────────────────────────────────────
 MAINTENANCE PERFORMED
────────────────────────────────────────────────────────────────
 Date | Task                          | Notes
 -----|-------------------------------|--------------------------
      | Belts re-tensioned            |
      | Grub screws checked           |
      | Rails cleaned & lubricated    |
      | Ballscrews lubricated         |
      | Terminals re-torqued          |
      | PEI sheet replaced            |
      | Nozzle replaced               |
      | Klipper updated (both MCUs)   |
      | Input shaper re-run           |

────────────────────────────────────────────────────────────────
 CONSUMABLES
────────────────────────────────────────────────────────────────
 Item          | Installed  | Replaced   | Print hours
 --------------|------------|------------|-------------
 Nozzle        |            |            |
 PEI sheet     |            |            |
 PTFE tube     |            |            |
 Silicone sock |            |            |
 Belts         |            |            |
```

🔧 **Photograph every subsystem as you finish it.** When a part fails in three years, the photos
tell you how it went together far better than any manual can.

---

## I. Where to get help

### Read first

| Resource | What it covers |
|---|---|
| [Klipper documentation](https://www.klipper3d.org/) | The authoritative reference for every config option. Genuinely well written |
| [Klipper Config Reference](https://www.klipper3d.org/Config_Reference.html) | Every section and option, exhaustively |
| [CAN bus guide](https://canbus.esoterical.online/) | **The** resource for CAN toolhead problems. Read it before asking anywhere |
| [BTT Manta M8P docs](https://github.com/bigtreetech/Manta-M8P) | Board pinout, jumpers, firmware settings |
| [BTT EBB docs](https://github.com/bigtreetech/EBB) | Toolboard flashing and wiring |
| [EVA 3 documentation](https://main.eva-3d.page/) | The toolhead platform |
| [Common printing problems](https://all3dp.com/1/common-3d-printing-problems-troubleshooting-3d-printer-issues/) | General print-quality reference |

### Communities

| Where | Best for |
|---|---|
| **Klipper Discord**, `#klipper-help` | Klipper config, macros, error messages |
| **Voron Discord**, `#voron-mods`, `#electronics` | ⚠️ **The closest reference design to this machine.** CoreXY mechanics, Z-tilt, Klicky, CAN toolheads — Voron troubleshooting usually applies directly here |
| **RatRig community** | Extrusion-frame CoreXY builds |
| **Prusa community** | Slicing and general print-quality questions |
| [This project on GitHub](https://github.com/Ultramarine3D/Ultramarine) | ⚠️ **Missing STLs, doc errors, and questions about this specific machine.** Open an issue |

### Contact the designer

> 📧 **meciar.michal7@gmail.com**
>
> Write for:
> - **A printed part that keeps breaking**, even in a strong material — Michal will get it printed
>   in something stronger, or improve the design. Include the part name, the material you used, and
>   **a photo of the fracture**. See [§4.11](#411-where-to-print-parts-and-replacements)
> - Parts missing from the repository that you cannot export yourself
> - Questions specific to this machine that the communities above cannot answer
>
> For anything general — Klipper config, CAN bus, print quality — the communities above will answer
> faster and in more detail. Try them first.

### How to ask a question that gets answered

1. **State the symptom precisely.** Not "bad prints" — "layer shift in X, ~30 mm up, after fast
   travel, third occurrence."
2. **Say what you already checked.** Otherwise the first five replies tell you to check belt tension.
3. **Post photographs.** Of the defect, and of the relevant part of the machine.
4. **Post your `printer.cfg`.** Use a paste service, not a screenshot.
5. **Post the exact error text**, copied, not paraphrased.
6. **Say what changed** immediately before the problem started.
7. **Say it is a custom CoreXY, not a Voron** — otherwise people will reference Voron-specific parts
   you do not have.

---

## J. Image production checklist

Every image placeholder in this manual, as a worklist. When you produce one, replace the
placeholder block in the text with the image and tick it off here.

**Conventions for whoever produces these:**

| | |
|---|---|
| **Source** | `cad/UM3DCoreXY.f3z` for every CAD-nn. Keep a consistent camera angle across related images |
| **Format** | PNG, white or transparent background, minimum 1600 px on the long edge |
| **Storage** | `manuals/images/` — filename is the tag, e.g. `CAD-11.png` |
| **Reference in text** | `![CAD-11 — WobbleX section view](images/CAD-11.png)` plus a one-line italic caption |
| **Annotation** | Arrows, dimensions and labels go **on the image**. An unannotated render usually fails to make the point the placeholder asks for |
| **Exploded views** | Consistent explosion direction, leader lines in assembly order |

⭐ marks the two images that carry the most weight — produce those first.

### QR codes (1)

| ✓ | Tag | Image | Section |
|---|---|---|---|
| ☐ | `QR-01` | Repository QR code | **https://github.com/Ultramarine3D/Ultramarine** |

### Diagrams — drawn, not rendered (16)

| ✓ | Tag | Image | Section |
|---|---|---|---|
| ☐ | `DIAG-01` | Measuring frame diagonals | 6.3 Square the bottom |
| ☐ | `DIAG-02` | Rail bolt tightening sequence | 7.3 Install the Z linear rails |
| ☐ | `DIAG-03` | How CoreXY works | 8.1 How CoreXY actually works |
| ☐ | `DIAG-04` | Squaring the gantry | 8.6 Square the gantry |
| ☐ | `DIAG-05` | ⭐ CoreXY belt path — the master diagram | 8.7 Route the CoreXY belts |
| ☐ | `DIAG-06` | EBB36 connections | 9.5 Install the EBB36 toolboard |
| ☐ | `DIAG-07` | Mains AC wiring diagram | 11.4 Wiring mains AC |
| ☐ | `DIAG-08` | Bed heating — one SSR, two fused zones | 11.5 Bed heating — one SSR, two fused zones |
| ☐ | `DIAG-09` | 24 V distribution | 11.6 Wire 24 V DC |
| ☐ | `DIAG-10` | CAN bus — twisting and termination | 12.3 The toolhead umbilical |
| ☐ | `DIAG-11` | Klicky pickup and drop-off motion | 14.4 Test the pickup — by hand, before any power |
| ☐ | `DIAG-12` | Software stack | 33.1 "MCU shutdown: Timer too close" |
| ☐ | `DIAG-13` | z_positions vs points | 16.5 Z-tilt — levelling the gantry |
| ☐ | `DIAG-14` | PRINT_START flowchart | 16.10 PRINT_START, step by step |
| ☐ | `DIAG-15` | Staged power-on sequence | 17. First power-on — the staged smoke test |
| ☐ | `DIAG-16` | Bed heating fault tree | 30.1 Bed doesn't heat at all |

### CAD renders — from `cad/UM3DCoreXY.f3z` (30)

| ✓ | Tag | Image | Section |
|---|---|---|---|
| ☐ | `CAD-01` | Hero render — the finished machine | 1.1 Specifications |
| ☐ | `CAD-02` | Subsystem overview — exploded | 1.2 What makes this design what it is |
| ☐ | `CAD-03` | Frame — overall dimensions | 6.1 Understand the target |
| ☐ | `CAD-04` | Corner joint — exploded, with T-nuts | 6.2 Build the bottom square |
| ☐ | `CAD-05` | Upright joint, and why lean is amplified | 6.4 Add the vertical uprights |
| ☐ | `CAD-06` | Completed frame, ready for the gantry | 6.7 Final frame verification |
| ☐ | `CAD-07` | One Z station — exploded | 7.1 Understand the layout |
| ☐ | `CAD-08` | Z motor mounts — all three positions | 7.2 Mount the three Z motors |
| ☐ | `CAD-09` | Coupler — section view showing the 1 mm gap | 7.4 Install ballscrews and couplers |
| ☐ | `CAD-10` | Top ballscrew stabiliser | 7.5 Install the top ballscrew stabilisers |
| ☐ | `CAD-11` | WobbleX — section view, and what it absorbs | 7.6 WobbleX couplings and why they matter |
| ☐ | `CAD-12` | Z station assembled, in place | 7.7 Assemble each Z station |
| ☐ | `CAD-13` | Y rails mounted — height reference | 8.2 Install the Y rails |
| ☐ | `CAD-14` | X rail mount — exploded | 8.3 Install the X rail and its mounts |
| ☐ | `CAD-15` | Idler stack — exploded | 8.4 Install the idler stacks |
| ☐ | `CAD-16` | Motor pulley height — correct vs wrong | 8.5 Install the XY stepper motors |
| ☐ | `CAD-17` | Belt grabber — teeth engaged vs smooth side | 8.7 Route the CoreXY belts |
| ☐ | `CAD-18` | EVA3 toolhead — exploded | 9.1 Build up the EVA3 body |
| ☐ | `CAD-19` | Hotend mounted — nozzle-to-duct clearance | 9.2 Install the hotend |
| ☐ | `CAD-20` | Fan airflow directions | 9.3 Install the cooling fans |
| ☐ | `CAD-21` | PTFE seating — correct vs gap | 9.4 Install the extruder |
| ☐ | `CAD-22` | Bed carrier — three-point mounting | 10.1 Bed carrier |
| ☐ | `CAD-23` | Bed underside — heater and sensor placement | 10.2 Fit the heaters and thermistors |
| ☐ | `CAD-24` | Electronics bay layout | 11.3 Populate the DIN rail |
| ☐ | `CAD-25` | Display mount assembly | 11.7 Connect the display |
| ☐ | `CAD-26` | Umbilical routing — full travel | 12.3 The toolhead umbilical |
| ☐ | `CAD-27` | Panel layout | 13.1 Side and rear panels |
| ☐ | `CAD-28` | Door hinge and magnetic latch | 13.2 Front door |
| ☐ | `CAD-29` | Probe dock position | 14.1 Mount the probe dock |
| ☐ | `CAD-30` | Klicky mount on the toolhead | 14.2 Install the Klicky mount on the toolhead |

### Photographs — of the real machine and real prints (20)

| ✓ | Tag | Image | Section |
|---|---|---|---|
| ☐ | `PHOTO-01` | The tool kit laid out | 3.2 Strongly recommended |
| ☐ | `PHOTO-02` | Printed parts, sorted by subsystem | 4.11 Where to print parts and replacements |
| ☐ | `PHOTO-03` | Heat-set insert going in | 5.3 Install heat-set inserts |
| ☐ | `PHOTO-04` | Measuring belt tension | 8.8 Tension the belts |
| ☐ | `PHOTO-05` | QUERY_PROBE — both states | 17.8 Stage 7 — Probe and homing dry run |
| ☐ | `PHOTO-06` | Z offset — the paper drag | 18.3 Z offset |
| ☐ | `PHOTO-07` | Bed mesh heightmap — good vs bad | 18.5 Bed mesh |
| ☐ | `PHOTO-08` | Extruder calibration — marking the filament | 18.7 Extruder calibration (rotation distance) |
| ☐ | `PHOTO-09` | Input shaper result graph | 18.10 Input shaper |
| ☐ | `PHOTO-10` | ⭐ First layer — good vs the four failure modes | 20.2 The first print itself |
| ☐ | `PHOTO-11` | Filament tip — cut correctly | 21.3 Loading and unloading filament |
| ☐ | `PHOTO-12` | Removed filament tips — reading the evidence | 21.3 Loading and unloading filament |
| ☐ | `PHOTO-13` | Layer shift | 26.1 Layer shifts |
| ☐ | `PHOTO-14` | Ringing / ghosting | 26.2 Ringing / ghosting |
| ☐ | `PHOTO-15` | Z banding, with the 4 mm period measured | 26.3 Z banding / ribbing |
| ☐ | `PHOTO-16` | Stringing | 26.4 Stringing / oozing |
| ☐ | `PHOTO-17` | Under- and over-extrusion | 26.5 Under-extrusion |
| ☐ | `PHOTO-18` | Ground filament | 28.2 Filament grinding |
| ☐ | `PHOTO-19` | Cold pull tips — dirty vs clean | 28.6 How to do a cold pull |
| ☐ | `PHOTO-20` | Mesh comparison — probe noise vs real bed shape | 31.5 Bed mesh looks lumpy |
### Priority order

If you can only produce a few, produce these:

1. ⭐ **DIAG-05** — CoreXY belt path. Nothing else here is as hard to convey in words.
2. ⭐ **PHOTO-10** — first layer, good vs the four failure modes. The most frequently consulted image.
3. **DIAG-07** — mains AC wiring. This one is a safety document, and the instructor checks against it.
4. **CAD-11** — WobbleX section view. Explains the whole Z-banding chapter in one picture.
5. **CAD-21** — PTFE seating. The number one cause of jams, invisible once assembled.
6. **QR-01** — the repository QR code. Cheap to make, used constantly.

**Total placeholders: 67**

---

## Closing notes

The Ultramarine rewards careful assembly and punishes shortcuts, and it does so on a delay. Most
"mystery problems" months into ownership trace back to something skipped in the first week — a
frame that was almost square, a belt that was almost tensioned, a CAN pair that was almost twisted.
When something goes wrong later, the troubleshooting path nearly always leads back to a
fundamentals check.

**If you came to this machine from a Prusa Mini:** the difference is not that this printer is
harder. It is that this printer does not hide anything from you. Every value is visible, every
mechanism is accessible, and every failure has a cause you can find. That is the trade — you take
on the responsibility the Mini carried for you, and in return you get a machine you fully
understand and can repair indefinitely.

**Keep a build log.** Photograph each subsystem as you finish it. Write down what broke and what
fixed it. Six months from now you will see the same symptom, and you will be glad you have notes —
and gladder still that you took photos.

**Check the simple things first.** Loose fastener, marginal connection, slicer setting. In that order.

Happy printing.

---

*Ultramarine Complete Manual · Version 2.0*
*Combines UM3DCoreXY_Build_Guide.md v1.0 and UM3DCoreXY_Troubleshooting_Guide.md v1.0,*
*reconciled against the live `printer.cfg`, `STLs/stls_here.md`, `slicer_profiles/profiles.md`,*
*and `firmware/external_usb/usb.md`.*

*Licensed [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — see the repository README.*
