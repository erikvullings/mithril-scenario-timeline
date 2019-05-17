# mithril-scenario-timeline

A scenario timeline component for the Mithril framework, similar to a Gantt chart, but in contrast, the leaves of the project tree are all messages that are being sent, so they have no duration and are instantaneous.

![screenshot](img/mithril-scenario-timeline.png)

## Playground

You can also [play with it](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAjAOnQGhAZ3gQGMAXeKZEDIvPEXAMwgTqQG1QA7AQzESSoALEmFj0QRAPacyMyiAC+2Lr34gInKPAAeGEnVxSZ8OQIhgADpIBOJAARg7Da5McBySCUHXmAAU46JG4A3AA6nOZWtnbAdgDKRCbcPpIAKuaEGvDYdgCS6XywWblkYDm5AKLa8EQAriQaAOYFmQEl8I4KTi7unt7MALR4iTwpAw2FWSHh4TpR9kZ49hVQECQ2AArcjfB2ALx2ABQAlPsAfDHhdnaL9kvcZPuXnNfXE-BIdgEA7nYAIg94IcAEwABjQAE4cigcpCclC7GDjtgrq93kUAp82KjXs9cbjoJ83Nw3CiXvi3msEESAIKknH4iB4ADyFhMnxI1lq2QZuK0sG4AE9PqCyRSlLy8RS7IS7MSMGh6eSKQ0SNS5dwFUrpXYLMkTCRclAiSSxdL+ULPihQaLJdcmaz2XZOdyzRStGzNCzOFi7a9gH6CcaNdqda8jKsGtIifdbORQzqJcr8QBdN2vJMUgPJoMmjDAhP41Xq+UF9O4vXWA1Gk2FvmES12a22nOvB2ejlcnmt64ekxQb2+nv+wNt4PyxXl6URtYQaNypgRPCCeNT3GZ6VpyUb3HZnWyidatfOqkfDUKo9+yvV8eayd+i3CuwtnV9r3Mn12bHD657sP229Lx-cNpEjOdPzcWMyCgOt8R3VMp3g38-QPTVgSAnVizPUsMOla8ZBrc8ywfBsnzQG0X2lQQIEaQQilokhO1dEjPQHD8h3-P9-1Q-NYIpGcowgqDV1HJDXi3VsxK4xlAPQ4jhywvM5L43V9QI2SVMfT40AAZhtY83zYz9v040cAKU3D-wE8CYxIZJoJU64xOuCTxSnaTc3PTB5Mw08828lT8MNQD72HLS7HI-SWP7Qcv1HDzpR4zBQv-a5rPnNxFyZFcYOPJzj1cuD3JQwCdJUxTzzK48gsI4lNNI7Tm2PajaPo4QmO7V94FY2KTLDBKKSSyyw3SiCsuXETgOcuxCvXYrhwPAAjcq-LlAAhFT2ydF1OvNBrEQoxD5v3cdFuG3EKrcM6UrwtTgqJZaDP2tAAFYorC7qYvYuLgIGmSHsckDNFnDLhNy0SCqOhkUzsbg8DyFoMXgdowDYQqFDCThUVuOxagsKBARaJ5DjxgmyE+Q5GK+WowEW+BrDsAAff5AVOPYLgAN0kaA2YuaSCENYxrA57hYEOE5zilXF7jIPQMieH4WbIQ4ZfgOW+AwEXYG5ZkGAlgBqCKKNBY5MYpUnARVuzZfeU2GSUI2bTt8kMZmckqxIWprBeaSOYgeBvgp3mpaBpYYhPSYAhydEsmBOwugOVWzfxHHpAAYSKIgAGtibWDpPkqao6gaThmgyJGUeDxZJAQPRuEWhBDjzsBnclD2vZeMBDjcaga4wPA0DLH6dS7txBHQlduC0axSTlBIkhSRGpmRN2R8OefRjnJeo5DlVy6yDl96j0d3k+C2yBaPK7AAemvuwkYACXgGj2rsHTgSv4YF7nOI7NsT5FYAmVmCOETZYQIgRCbK+6dM5Z2PAoFeWNWwpmdnNVErtOAYPCGADAYBJC1BkIcKAkg6h8BkBgRakgoCChyCsNYmxtjwGOOEcQBBiCCVYCANA1okDAgAByKGUCAHgfBKAYAAFYGAkNIWQJB5BKBUKIgQ1BaDiCMLIygwhRBSiRgMFcL8qaYBesnBgMiBgMF4MwJ8AxuAWAsAgIYgolgdGwGtDEWcACy3AiBxCcaUAAYjIlEIA4jwEaJIXYABVXIoR6AACVJCUPWNgZk2hBQ7E4AMOI3BOB4GwJExaBDPbYDTjkv+hBYDBKfrADm8AGhEG4HYAAcvAbksTsB4ByXgIY9MIAMBMWY74z8GIAJsGAUWycpCwBsJ8awjRFrcEOKKZZ2BQQYD4QAdmdgoN2lDqFSnGXMjQ2lQQWG0JjHZSDcFLAAPo3ObgMAYVZSBSmvgAKjeXYGksAqxT0FLDGA5BnSSC+AHeAYdanWDwOBOwbzr6okodoIYEAABeTRPiUOsNPAYiKLmsMIDUDhlA+FIFBIoFMCggA) on [flems.io](https://flems.io).

## Release info

### v0.0.x

- Initial version

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