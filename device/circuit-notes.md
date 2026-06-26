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
Record Button  -> digital input
Consent Switch -> digital input
Mark Button    -> digital input
Status LED     -> digital output
Buzzer         -> PWM output
Vibration      -> transistor-controlled output
Display        -> I2C or SPI
GPS            -> UART
Nicla Vision   -> Wi-Fi / BLE / serial bridge
Power          -> USB-C / regulated battery
```

These are circuit *directions*, not a finished schematic — no pin numbers or component part numbers are specified yet.

## Source

Verbatim from `DEVICE_MVP_PLAN.md` in the packet delivered by Kemi on 2026-06-26.
