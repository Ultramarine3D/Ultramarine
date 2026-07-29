# USB Autosync for Klipper 3D Printer
 
Automatically copy G-code files from a USB drive to your printer whenever you plug it in. Works on Manta M8P v2 + Raspberry Pi CM5 running Klipper.
 
---
 
## How It Works
 
1. You plug a USB drive into the printer.
2. The system detects it and mounts it automatically.
3. Any files on the USB that aren't already in your gcodes folder get copied over.
4. The USB drive is unmounted cleanly — it is never written to.
5. A background daemon quietly deletes files older than 6 months to keep things tidy.
---
 
## What You Need
 
- SSH access to your printer (e.g. `ssh ultramarine@<printer-ip>`)
- The `klipper-usb-sync.tar.gz` file transferred to the printer
---
 
## Step 1 — Transfer the Files
 
From your computer (not the printer), run:
 
```bash
scp klipper-usb-sync.tar.gz ultramarine@<printer-ip>:/home/ultramarine/
```
 
Replace `<printer-ip>` with your printer's IP address — you can find it in Mainsail or Fluidd's network settings.
 
---
 
## Step 2 — SSH Into the Printer
 
```bash
ssh ultramarine@<printer-ip>
```
 
---
 
## Step 3 — Extract the Files
 
```bash
tar -xzvf klipper-usb-sync.tar.gz
cd klipper-usb-sync
```
 
---
 
## Step 4 — Install
 
Run these commands one by one:
 
```bash
# Copy the scripts
sudo cp usb_sync.sh usb_sync_mount.sh cleanup_old_files.sh /usr/local/bin/
sudo chmod +x /usr/local/bin/usb_sync.sh
sudo chmod +x /usr/local/bin/usb_sync_mount.sh
sudo chmod +x /usr/local/bin/cleanup_old_files.sh
 
# Install the udev rule (triggers on USB plug-in)
sudo cp 99-usb-sync.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules
 
# Install and start the cleanup daemon
sudo cp klipper-cleanup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now klipper-cleanup.service
```
 
---
 
## Step 5 — Test It
 
Plug in your USB drive and wait a few seconds, then check the log:
 
```bash
cat /home/ultramarine/usb_sync.log
```
 
You should see lines like:
 
```
[2024-06-24 14:09:25] udev event: device=/dev/sda1  label='USB_DISK'
[2024-06-24 14:09:27] Mounted /dev/sda1 at /media/usb_sync/USB_DISK (read-only)
[2024-06-24 14:09:27] ===== USB sync started =====
[2024-06-24 14:09:27]   COPY  my_print.gcode
[2024-06-24 14:09:27]   SKIP  old_print.gcode  (already exists)
[2024-06-24 14:09:27] ===== USB sync finished — copied: 1 | skipped: 1 | errors: 0 =====
[2024-06-24 14:09:27] Unmounted /media/usb_sync/USB_DISK
```
 
Your files will appear in Mainsail/Fluidd's file manager shortly after.
 
---
 
## Files & What They Do
 
| File | Purpose |
|---|---|
| `usb_sync.sh` | Compares USB contents to the gcodes folder and copies new files |
| `usb_sync_mount.sh` | Called automatically on plug-in; mounts the drive and runs the sync |
| `99-usb-sync.rules` | Tells the system to trigger on USB plug-in |
| `cleanup_old_files.sh` | Runs in the background; deletes files older than 6 months |
| `klipper-cleanup.service` | Keeps the cleanup daemon running at all times |
 
---
 
## Where Files Go
 
All G-code files are copied to:
 
```
/home/ultramarine/printer_data/gcodes
```
 
This is Klipper's default location — files copied here appear immediately in Mainsail and Fluidd.
 
---
 
## Checking the Cleanup Daemon
 
To confirm the cleanup daemon is running:
 
```bash
sudo systemctl status klipper-cleanup.service
```
 
To watch its live output:
 
```bash
journalctl -u klipper-cleanup.service -f
```
 
It checks for old files every hour and logs any deletions to `/home/ultramarine/usb_sync.log`.
 
---
 
## Troubleshooting
 
**Files didn't copy after plugging in the drive**
 
Check the log first:
```bash
cat /home/ultramarine/usb_sync.log
```
 
If the log is empty, udev didn't trigger. Try reloading the rules and replugging:
```bash
sudo udevadm control --reload-rules
```
 
If there's an error in the log, it will tell you exactly what failed.
 
**Files copied but are write-protected**
 
FAT32/exFAT USB drives don't store Unix permissions, so copied files can land read-only. Fix them with:
```bash
chmod 644 /home/ultramarine/printer_data/gcodes/*.gcode
```
 
This is fixed automatically for all future syncs.
 
**Cleanup daemon isn't running**
 
```bash
sudo systemctl restart klipper-cleanup.service
sudo systemctl status klipper-cleanup.service
```
 
**I want to delete all files in the gcodes folder**
 
```bash
rm -rf /home/ultramarine/printer_data/gcodes/*
```
 
> ⚠️ This is permanent — make sure nothing is printing first.
 