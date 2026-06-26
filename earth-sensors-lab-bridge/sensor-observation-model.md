# Sensor Observation Model

## Principle

A soil sensor reading is still an observation, and is governed the same way any other Omoluabi observation is governed.

## Required Fields

A soil moisture reading should have:

- timestamp
- device ID
- sensor type
- calibration state
- location precision
- accessibility representation
- publication status

## Mapping to Schemas

- timestamp, device ID, location precision, publication status → `schemas/observation.schema.json`
- accessibility representation → `schemas/accessibility.schema.json`
- sensor type and calibration state are not yet represented as named fields in `schemas/observation.schema.json`; today they live informally inside a `sensor_reading` object, as shown in `examples/esl-sensor-reading.json`. Whether calibration state needs its own schema field is an open question, not yet decided.

## Source

Verbatim "Example" list from `16_esl_bridge/ESL_BRIDGE.md`; schema mapping and open calibration-state question added since the source packet does not specify exact field names for sensor type or calibration state.