# Circuit Notes

## Controls

```text
Record Button: begins observation
Consent Switch: private / consented / review-public
Mark Button: flags important moment
Power: turns device on/off
```

## Circuit Direction

```text
Record Button   -> digital input
Consent Switch  -> digital input
Mark Button     -> digital input
Status LED      -> digital output
Buzzer          -> PWM output
Vibration       -> transistor-controlled output
Display         -> I2C or SPI
GNSS receiver   -> UART
Magnetometer    -> I2C
Pressure sensor -> I2C
Nicla Vision    -> Wi-Fi / BLE / serial bridge
Power           -> USB-C / regulated battery
```

See `diagrams/circuit-directions.mmd` for this same list as a block-level wiring diagram (which component talks to the Arduino UNO Q over which bus/signal type). These are circuit *directions*, not a finished schematic — no pin numbers or component part numbers are specified yet, for any component, old or new. `docs/mvp/hardware/instrumentation-revision-v0.02.md` adds the GNSS receiver (formalizing the earlier "optional GPS module"), magnetometer, and pressure sensor; the latter two are I2C-class sensors consistent with the existing "Display -> I2C or SPI" pattern.

## Source

Verbatim from `DEVICE_MVP_PLAN.md` in the packet delivered by Kemi on 2026-06-26.
