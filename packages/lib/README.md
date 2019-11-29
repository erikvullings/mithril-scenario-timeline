# mithril-scenario-timeline

A scenario timeline component for the Mithril framework as being used in the [DRIVER+ scenario editor](https://github.com/DRIVER-EU/scenario-editor). Also see the [live example](https://erikvullings.github.io/mithril-scenario-timeline).

![screenshot](img/mithril-scenario-timeline.png)

## Release info

### v0.1.x

- Using it in [scenario editor](https://github.com/driver-eu/scenario-editor)
- Updated timeline bounds when time exceeds beyond the current time
- Timeline width can be set (using the `width` property), or it is fixed by the initial container width
- Timeline can start at a time not equal to the scenario start time, i.e. `timelineStart`, so you can use a rounded start time

### v0.0.x

- Initial version
- FIX: `onClick` did not return the most recent item
- Returns an error (and stops rendering) when a circular dependency is encountered.
  TODO: Need to analyse the error and return a more meaningful result.
