//this function makes the rectangles where ever we want it,and
var eventFlag;
var currentlyEditElement;
var rectangleCounter = 1;
var dragX;
var dragY;
var positionTooltip = document.createElement("DIV");
document.body.appendChild(positionTooltip);
var resize_width_height_div = document.createElement("DIV");
resize_width_height_div.style.position = "absolute";
positionTooltip.style.position = "absolute";

/*var rectangleBuilder = function(x,y,width,height,color) {
  // alert("here"); 
   document.write("<div id = "+rectangleCounter +"rectangle"+" style = 'position:absolute" + ";background-color:" +color+";height:" + height +";width:" + width +";margin-left:" + x +"px" +";margin-right:" + y+"px" + "'></div>");
   var rectangle = document.getElementById(rectangleCounter +"rectangle");
   rectangle.onmouseenter = function() {
       alert("fuck");
        }
   rectangleCounter++;
   var x = document.createElement("DIV");
   document.body.appendChild(x);
 //alert("back");   
}
*/
document.body.addEventListener("click", function (event) {
  if(eventFlag == "click"){
  pointerPosition(event);
  }
});
//
document.body.addEventListener("dblclick", function (event) {
     
     rectangleBuilder(event.offsetX,event.offsetY, 100, 100, "red");  
});
var rectangleBuilder = function (x, y, width, height, color) {
  // alert("here");
  var rectangle = document.createElement("DIV");
  document.body.appendChild(rectangle);
  rectangle.style.position = "absolute";
  rectangle.style.height = height + "px";
  rectangle.style.width = width + "px";
  rectangle.style.marginLeft = x;
  rectangle.style.marginTop = y;
  rectangle.style.backgroundColor = color;
  rectangle.style.cursor = "se-resize";
  rectangle.id = "rectangle" + rectangleCounter;
  rectangle.draggable = true;
  //code for resizing a rectangle

  rectangle.addEventListener('mousedown', initialiseResize, false);
  //click selector event listeners
  rectangle.addEventListener('click', editSelector, false);
  function editSelector() {
    var editedName = document.getElementById("editedName");
    editedName.textContent = this.id;
    currentlyEditElement = this;

  }
  function initialiseResize(e) {
    window.addEventListener('mousemove', startResizing, false);
   	window.addEventListener('mouseup', stopResizing, false);
  }

  function startResizing(e) {
    if (eventFlag == "resize") {
      rectangle.style.width = (e.clientX - rectangle.offsetLeft) + 'px';
      rectangle.style.height = (e.clientY - rectangle.offsetTop) + 'px';
      width_height(rectangle);
       positionTooltip.textContent = "";
    }
  }
  //remove event listeners after resizing
  function stopResizing(e) {
    window.removeEventListener('mousemove', startResizing, false);
    window.removeEventListener('mouseup', stopResizing, false);
  }


  //code for dragging a rectangle

  rectangle.addEventListener("drag", forDrag, false);
  rectangle.addEventListener("dragend", forDragend, false);
  //calll back function for drag event
  function forDrag(drag) {

    if (eventFlag == "drag") {
      if (drag.clientX && drag.clientY != 0) {
        this.style.marginLeft = drag.clientX + "px";
        this.style.marginTop = drag.clientY + "px";
        dragX = drag.clientX;
        dragY = drag.clientY;
      }
    }
  }
  //callback function for dragend
  function forDragend(drag) {
    // alert(dragX);
    if (eventFlag == "drag") {
      this.style.marginLeft = dragX + "px";
      this.style.marginTop = dragY + "px";
      positionTooltip.textContent = "";
    }
  }




  rectangleCounter++;

  //alert("back");   
}
//width height determiner
function width_height(rectangle) {
  resizeWidth = rectangle.style.width;
  resizeHeight = rectangle.style.height;
  document.getElementById("width").value = resizeWidth;
  document.getElementById("height").value = resizeHeight;
  //resize_width_height_div.style.marginLeft = Number(rectangle.style.marginLeft.replace("px", "")) + Number(resizeWidth.replace("px", "")) + "px";
  //alert(Number(rectangle.style.marginLeft));
  //resize_width_height_div.style.marginTop = rectangle.style.marginTop;
  //document.body.appendChild(resize_width_height_div);
 // resize_width_height_div.innerText = "X:" + resizeWidth + " Y:" + resizeHeight;
}
//mouse pointer position
function pointerPosition(event) {
  var x = event.clientX;
  var y = event.clientY;
  positionTooltip.style.marginLeft = x;
  positionTooltip.style.marginTop = y;
  positionTooltip.height = "1000px";
  positionTooltip.backgroundColor = "black";
  positionTooltip.innerText = "X:" + x + " Y:" + y;
  // alert();

}
//sets the flag to intended event
function handleEvent(element) {
  eventFlag = element.id;
  // alert(eventFlag);
}
//this function handles two way height on the view side and in the toolbox side
function handleTwoWaySizeBinding(element) {
  var currentInputBox = element;
  //alert(element.id);
  if (Number(currentInputBox.value)) {
    //alert(heightFromTheToolbox.value);
    //making sure that currentlyEditElement is nat undefined before usage
    if (currentlyEditElement != undefined) {
      //if the currentInputBox is height
      if (currentInputBox.id == "height") {
        currentlyEditElement.style.height = currentInputBox.value + "px";
      }
      else if (currentInputBox.id == "width") {
        currentlyEditElement.style.width = currentInputBox.value + "px";
      }
      else if (currentInputBox.id == "offsetX") {
        currentlyEditElement.style.marginLeft = currentInputBox.value + "px";
      }
      else if (currentInputBox.id == "offsetY") {
        currentlyEditElement.style.marginTop = currentInputBox.value + "px";
      }
    }
  }
 if (currentInputBox.id == "color") {
    currentlyEditElement.style.backgroundColor = element.value;
  }
}


