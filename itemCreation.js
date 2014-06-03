var itemComponent = null;
var draggedItem = null;
var startingMouse;
var posnInWindow;

function startDrag(mouse)
{
    console.log("start Drag");
    posnInWindow = paletteItem.mapToItem(window, 0, 0);
    startingMouse = { x: mouse.x, y: mouse.y }
    console.log("load component");
    loadComponent();
}

//Creation is split into two functions due to an asynchronous wait while
//possible external files are loaded.

function loadComponent() {
    if (itemComponent != null) { // component has been previously loaded
        createItem();
        return;
    }

    itemComponent = Qt.createComponent(paletteItem.componentFile);
    if (itemComponent.status == Component.Loading)  //Depending on the content, it can be ready or error immediately
        component.statusChanged.connect(createItem);
    else
        createItem();
}

function createItem() {
    console.log("create item");
    if (itemComponent.status == Component.Ready && draggedItem == null) {
        draggedItem = itemComponent.createObject(window, {"x": posnInWindow.x, "y": posnInWindow.y, "z": 20});
        // make sure created item is above the ground layer
    } else if (itemComponent.status == Component.Error) {
        draggedItem = null;
        console.log("error creating component");
        console.log(itemComponent.errorString());
    }
}

function continueDrag(mouse)
{
    console.log("continueDrag");
    if (draggedItem == null)
        return;

    draggedItem.x = mouse.x + posnInWindow.x - startingMouse.x;
    draggedItem.y = mouse.y + posnInWindow.y - startingMouse.y;
}

function endDrag(mouse)
{
    console.log("endDrag");
    if (draggedItem == null)
        return;

//    if (draggedItem.y < toolbox.height) { //Don't drop it in the toolbox
//        draggedItem.destroy();
//        draggedItem = null;
//    } else {
//        draggedItem.created = true;
//        draggedItem = null;
//    }
            draggedItem = null;
}