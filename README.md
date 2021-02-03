# TO-DO-LIST

My first vanilla JS project.
Design and applied styles are my own idea. 

What's unique is customizable modal window JS snippet, used twice in this project 
to display 2 different alerts (when user tries to add empty task and when there are too many tasks 
on the list)

Close icon in the modal is created using material.io CDN,
but delete-item icon for each task is added using pure SVG - and this caused trouble with the click event,
as SVG is a parent to <path>, so the target based on-click functionality did not work properly(when the icon was
    clicked, the target was either the path OR the svg itself, depending on exact position of event) without
setting pointer-events: none; for the SVG.

filtering of list items using 'search field' is also a nice bonus here.

All the items are stored in / removed from local storage, so they are not gone when page reloads.

//update 1: added a juicy animation for modal opening and closure

//update 2: quick fix, changed the method for clear all button - 
used to be localStorage.clear()
so it erased all the keys, even from other web apps. Now it's set to 
localStorage.removeItem('tasks')