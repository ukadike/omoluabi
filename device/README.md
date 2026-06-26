# Device

The Omoluabi device is a governed observation instrument, not a camera. See the Device Principle in `docs/vision.md`.

## In This Directory

- `parts-list.md` — MVP parts list
- `circuit-notes.md` — control-to-pin mapping direction
- `firmware-plan.md` — device workflow and what firmware must do
- `enclosure-notes.md` — physical housing considerations
- `accessibility-hardware.md` — tactile/haptic/audio accessibility requirements

## Hardware Stack

### Primary Board — Arduino UNO Q 2GB
Role: local compute, Linux-capable app layer, real-time microcontroller layer, AI assist experiments, storage and sync, hardware controls.

### Sensor Companion — Arduino Nicla Vision
Role: camera, microphone, IMU, distance sensing, TinyML field sensing.

### Education / Workshop Board — Arduino Nano 33 BLE Sense Rev2
Role: SSL workshops, Earth Sensors Lab teaching, low-cost TinyML experiments.

## Open Question

The device's planned consent switch (`private` / `consented` / `review-public`) has not been reconciled with the schema's five-state `publication_status` model. See `governance/consent-model.md`.

## Source

Synthesizes `DEVICE_MVP_PLAN.md` from the packet delivered by Kemi on 2026-06-26.
