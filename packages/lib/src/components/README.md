# mithril-scenario-timeline

A scenario timeline component for the Mithril framework, similar to a Gantt chart, but in contrast, the leaves of the project tree are all messages that are being sent, so they have no duration and are instantaneous.

## Design

The design of the scenario timeline resembles a Gantt chart component, in that it consists of a container, has items that represent a group (storyline and acts) or a single message, and links between them. There are two kinds of links: dependencies, i.e. an activity cannot start unless some other activity has started. And alternatives, i.e. only one of the connected items can be started at a certain time.

Different from a Gantt chart is the fact that real activities, e.g. messages that are sent, are instantaneous. Also, some messages may require manual activation, so they could shift in time, as well as their dependents.

The design is also based on an absolute positioning of all the items.

### ScenarioTimeline

The container component that encapsulates all.

### TimeAxis

The component that renders the time, e.g. 13:00 13:30 etc.

### ScenarioItems

The container that will place each timeline item on the screen, i.e. it will provide each timeline activity a location and size to render itself.

### ScenarioLinks

Dependency and alternative link lines between items.

### ScenarioGroup

A group of single timeline items.

### ScenarioItem

A single timeline item to be rendered.

### Timeline

A component to render the timeline on top of the view, so you can see where you are in time.

### TODO

### ObservationItems

The container that will place each observation on the timeline.

### ObservationItem

A single observation to be rendered.