# TO-DO-LIST

My first vanilla JS project.
Design and applied styles are my own idea. 

What's unique is customizable modal window JS snippet, used twice in this project 
to display 2 different alerts (when user tries to add empty task and when there are too many tasks 
on the list)

Close icon in the modal is created using meterial.io CDN,
but delete-item icon for each task is added using pure SVG - and this caused trouble with the click event,
as SVG is a parent to <path>, so the target based on-click functionality did not work properly without
setting pointer-events: none; for the SVG.

filtering of list items using 'search field' is also a nice bonus here.

All the items are stored in / removed from local storage, so they are not gone when page reloads.
