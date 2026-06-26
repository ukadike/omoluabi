# Tactile and Haptic Accessibility

## Device Accessibility (required)

- tactile controls
- one-handed operation research
- haptic feedback
- audio feedback option
- nonvisual consent state confirmation
- large physical buttons
- status redundancy: light + sound + vibration

## Why Status Redundancy Matters

A blind or low-vision user must be able to confirm device state (recording, consent mode, mark flagged) without relying on a screen. Status redundancy means every important state change is communicated through at least two of: light, sound, vibration. This is why `device/accessibility-hardware.md` and `device/firmware-plan.md` both list status LED, buzzer, and vibration motor as required outputs, not optional ones.

## Source

Verbatim "Device Accessibility" list from `11_accessibility/ACCESSIBILITY_BASELINE.md`; cross-referenced to `device/accessibility-hardware.md` and `device/firmware-plan.md`.