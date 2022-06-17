# react-use-event-handler
React hook for streamlining management of event handlers for standard and custom events

## Installation
`npm install react-use-event-handler`

## How to Use
Import or require the default export `useEventHandler`.

### Parameters
The hook accepts an object with the following parameters:
| Parameter | type    | default                      | description                                                                                                              |
|-----------|---------|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| event    | `string`   |                        | The event name to listen for. Can be any standard event name or custom string for custom events
| handler  | `function` |                        | The handler function to be run by the event listener, if enabled
| target   | `element`  | `window` or `document` | Specify the element or EventTarget that should listen for your event
| options  | `object`   | `undefined`            | Event Listener capture options. Find more info [here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters)
| enabled  | `boolean`  | `true`                 | Dynamically enable/disable the event listener without adding/removing it


### Example
```jsx
import { useCallback, useEffect, useState } from "react";
import useEventHandler from "react-use-event-handler";

function Example() {
  const [ enabled, setEnabled ] = useState(true);
  const [ targetEl, setTargetEl ] = useState(null);
  
  // mouse move handler
  useEventHandler({
    target: targetEl,
    event: "mousemove",
    handler: ({ clientX, clientY }) => console.log(clientX, clientY),
    enabled
  });
  
  // scroll handler
  useEventHandler({
    target: window, // default
    event: "scroll",
    handler: () => console.log(window.scrollY)
  });
  
  // custom event handler, document.dispatchEvent(new CustomEvent("my-custom-event", { detail: "hi" }))
  useEventHandler({
    target: document,
    event: "my-custom-event",
    handler: ({ detail }) => console.log(detail),
    options: { capture: true } // custom event will trigger document's handler before any child elements
  });
  
  return (
    <div>
      <div ref={setTargetEl}/>
    </div>
  );
}
    
```

## Enjoy
