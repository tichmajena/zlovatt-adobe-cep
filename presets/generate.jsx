// test this sript
var state = {};
// examples of a function call

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":0,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"OPTIONS","preferredSize":[300,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"mode_group","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"Panel","parentId":1,"style":{"enabled":true,"varName":"mode_panel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Mode","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-3":{"id":3,"type":"RadioButton","parentId":2,"style":{"enabled":true,"varName":"lines_btn","text":"Generate Lines","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-4":{"id":4,"type":"RadioButton","parentId":2,"style":{"enabled":true,"varName":"dots_btn","text":"Generate Dots","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-6":{"id":6,"type":"Button","parentId":8,"style":{"enabled":true,"varName":"ok_btn","text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":8,"style":{"enabled":true,"varName":"cancel_btn","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"execute_group","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Slider","parentId":13,"style":{"enabled":true,"varName":"density_slide","preferredSize":[200,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"density_group","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":13,"style":{"enabled":true,"varName":"density_low","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Low","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"StaticText","parentId":13,"style":{"enabled":true,"varName":"density_high","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"High","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Panel","parentId":10,"style":{"enabled":true,"varName":"density_panel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Choose Density","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["center","top"],"alignment":null}}},"order":[0,1,2,3,4,10,13,11,9,12,8,6,7],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "OPTIONS";
dialog.preferredSize.width = 300;
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// MODE_GROUP
// ==========
var mode_group = dialog.add("group", undefined, { name: "mode_group" });
mode_group.orientation = "row";
mode_group.alignChildren = ["left", "center"];
mode_group.spacing = 10;
mode_group.margins = 0;

// MODE_PANEL
// ==========
var mode_panel = mode_group.add("panel", undefined, undefined, {
  name: "mode_panel",
});
mode_panel.text = "Mode";
mode_panel.orientation = "column";
mode_panel.alignChildren = ["left", "top"];
mode_panel.spacing = 10;
mode_panel.margins = 10;

var lines_btn = mode_panel.add("radiobutton", undefined, undefined, {
  name: "lines_btn",
});
lines_btn.text = "Generate Lines";

var dots_btn = mode_panel.add("radiobutton", undefined, undefined, {
  name: "dots_btn",
});
dots_btn.text = "Generate Dots";
dots_btn.value = true;

// DENSITY_GROUP
// =============
var density_group = dialog.add("group", undefined, { name: "density_group" });
density_group.orientation = "row";
density_group.alignChildren = ["left", "center"];
density_group.spacing = 10;
density_group.margins = 0;

// DENSITY_PANEL
// =============
var density_panel = density_group.add("panel", undefined, undefined, {
  name: "density_panel",
});
density_panel.text = "Choose Density";
density_panel.orientation = "row";
density_panel.alignChildren = ["center", "top"];
density_panel.spacing = 10;
density_panel.margins = 10;

var density_low = density_panel.add("statictext", undefined, undefined, {
  name: "density_low",
});
density_low.text = "Low";

var density_slide = density_panel.add(
  "slider",
  undefined,
  undefined,
  undefined,
  undefined,
  { name: "density_slide" }
);
density_slide.minvalue = 0;
density_slide.maxvalue = 100;
density_slide.value = 50;
density_slide.preferredSize.width = 200;

var density_high = density_panel.add("statictext", undefined, undefined, {
  name: "density_high",
});
density_high.text = "High";

// EXECUTE_GROUP
// =============
var execute_group = dialog.add("group", undefined, { name: "execute_group" });
execute_group.orientation = "row";
execute_group.alignChildren = ["left", "center"];
execute_group.spacing = 10;
execute_group.margins = 0;

var ok_btn = execute_group.add("button", undefined, undefined, {
  name: "ok_btn",
});
ok_btn.text = "OK";

var cancel_btn = execute_group.add("button", undefined, undefined, {
  name: "cancel_btn",
});
cancel_btn.text = "Cancel";

dialog.show();
//alert(mode_panel.children.length);
alert(density_slide.value);
state.density = Math.floor(density_slide.value);

function selected_rbutton(rbuttons) {
  for (var i = 0; i < rbuttons.children.length; i++) {
    if (rbuttons.children[i].value == true) {
      return rbuttons.children[i].text;
    }
  }
}

var select_mode = selected_rbutton(mode_panel);

//alert(select_mode );

if (select_mode == "Generate Lines") {
  alert(select_mode);
  runDrawLine();
} else if (select_mode == "Generate Dots") {
  alert(select_mode);
  runDrawCircle();
}

function runDrawCircle() {
  var dw = app.activeDocument.width;
  var dh = app.activeDocument.height;
  alert(dw);

  for (i = 0; i < state.density; i++) {
    var xValue = randomIntFromInterval(0, 1920);
    var yValue = randomIntFromInterval(0, 1080);

    circle(3, xValue, yValue, 3, "black");
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // runMenuItem(stringIDToTypeID('placedLayerEditContents'))

  function circle(r, x, y, w, c_r, c_g, c_b) {
    try {
      select_layer_rgb();

      var d1 = new ActionDescriptor();

      var d2 = new ActionDescriptor();

      var r1 = new ActionReference();

      r1.putProperty(charIDToTypeID("Path"), charIDToTypeID("WrPt"));

      d1.putReference(charIDToTypeID("null"), r1);

      d2.putUnitDouble(charIDToTypeID("Top "), charIDToTypeID("#Pxl"), y - r);

      d2.putUnitDouble(charIDToTypeID("Left"), charIDToTypeID("#Pxl"), x - r);

      d2.putUnitDouble(charIDToTypeID("Btom"), charIDToTypeID("#Pxl"), y + r);

      d2.putUnitDouble(charIDToTypeID("Rght"), charIDToTypeID("#Pxl"), x + r);

      d1.putObject(charIDToTypeID("T   "), charIDToTypeID("Elps"), d2);

      executeAction(charIDToTypeID("setd"), d1, DialogModes.NO);

      d1 = null;

      d2 = null;

      r1 = null;

      var idx = curr_path_idx();

      app.activeDocument.pathItems[idx].makeSelection(
        0,
        true,
        SelectionType.REPLACE
      );

      app.activeDocument.pathItems[idx].remove();

      var c = new SolidColor();

      with (c.rgb) {
        red = green = blue = 0;
      }

      if (c_r != undefined) {
        if (typeof c_r == "string") {
          if (c_r.indexOf("#") == 0) {
            c.rgb.hexValue = c_r.substr(1);
          } else {
            switch (c_r.toLowerCase()) {
              case "red":
                c.rgb.red = 255;
                c.rgb.green = 0;
                c.rgb.blue = 0;
                break;

              case "green":
                c.rgb.red = 0;
                c.rgb.green = 255;
                c.rgb.blue = 0;
                break;

              case "blue":
                c.rgb.red = 0;
                c.rgb.green = 0;
                c.rgb.blue = 255;
                break;

              case "yellow":
                c.rgb.red = 255;
                c.rgb.green = 255;
                c.rgb.blue = 0;
                break;

              case "magenta":
                c.rgb.red = 255;
                c.rgb.green = 0;
                c.rgb.blue = 255;
                break;

              case "cyan":
                c.rgb.red = 0;
                c.rgb.green = 255;
                c.rgb.blue = 255;
                break;

              case "black":
                c.rgb.red = 0;
                c.rgb.green = 0;
                c.rgb.blue = 0;
                break;

              case "white":
                c.rgb.red = 255;
                c.rgb.green = 255;
                c.rgb.blue = 255;
                break;

              case "gray":
                c.rgb.red = 128;
                c.rgb.green = 128;
                c.rgb.blue = 128;
                break;

              default:
                c.rgb.red = 0;
                c.rgb.green = 0;
                c.rgb.blue = 0;
                break;
            }
          }
        } else if (typeof c_r == "number") {
          c.rgb.red = c_r;

          c.rgb.green = c_g;

          c.rgb.blue = c_b;
        }
      }

      stroke(w, c.rgb.red, c.rgb.green, c.rgb.blue);

      app.activeDocument.selection.deselect();
    } catch (e) {
      alert(e);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  function select_layer_rgb() {
    try {
      var d = new ActionDescriptor();

      var r = new ActionReference();

      r.putEnumerated(
        charIDToTypeID("Chnl"),
        charIDToTypeID("Chnl"),
        charIDToTypeID("RGB ")
      );

      d.putReference(charIDToTypeID("null"), r);

      d.putBoolean(charIDToTypeID("MkVs"), false);

      executeAction(charIDToTypeID("slct"), d, DialogModes.NO);

      r = null;

      d = null;
    } catch (e) {
      alert(e);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  function curr_path_idx() {
    try {
      var r = new ActionReference();

      r.putProperty(
        charIDToTypeID("Prpr"),
        stringIDToTypeID("targetPathIndex")
      );

      r.putEnumerated(
        charIDToTypeID("Dcmn"),
        charIDToTypeID("Ordn"),
        charIDToTypeID("Trgt")
      );

      r = executeActionGet(r);

      return r.getInteger(stringIDToTypeID("targetPathIndex"));
    } catch (e) {
      alert(e);
      return -1;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  function stroke(size, r, g, b) {
    try {
      var d1 = new ActionDescriptor();

      var d2 = new ActionDescriptor();

      d1.putInteger(charIDToTypeID("Wdth"), size);

      d1.putEnumerated(
        charIDToTypeID("Lctn"),
        charIDToTypeID("StrL"),
        charIDToTypeID("Cntr")
      );

      d1.putUnitDouble(charIDToTypeID("Opct"), charIDToTypeID("#Prc"), 100.0);

      d1.putEnumerated(
        charIDToTypeID("Md  "),
        charIDToTypeID("BlnM"),
        charIDToTypeID("Nrml")
      );

      d2.putDouble(charIDToTypeID("Rd  "), r);

      d2.putDouble(charIDToTypeID("Grn "), g);

      d2.putDouble(charIDToTypeID("Bl  "), b);

      d1.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), d2);

      executeAction(charIDToTypeID("Strk"), d1, DialogModes.NO);
    } catch (e) {
      alert(e);
    }
  }

  function randomIntFromInterval(min, max) {
    //min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// Draw Line
function runDrawLine() {
  var dw = app.activeDocument.width.as("px");
  var dh = app.activeDocument.height.as("px");

  // two element array of numbers for x,y start of line,
  // two element array of numbers for x,y endof line,
  //number;line width in pixels
  // uses foreground color
  function drawLine(startXY, endXY, width) {
    var desc = new ActionDescriptor();
    var lineDesc = new ActionDescriptor();
    var startDesc = new ActionDescriptor();
    startDesc.putUnitDouble(
      charIDToTypeID("Hrzn"),
      charIDToTypeID("#Pxl"),
      startXY[0]
    );
    startDesc.putUnitDouble(
      charIDToTypeID("Vrtc"),
      charIDToTypeID("#Pxl"),
      startXY[1]
    );
    lineDesc.putObject(
      charIDToTypeID("Strt"),
      charIDToTypeID("Pnt "),
      startDesc
    );
    var endDesc = new ActionDescriptor();
    endDesc.putUnitDouble(
      charIDToTypeID("Hrzn"),
      charIDToTypeID("#Pxl"),
      endXY[0]
    );
    endDesc.putUnitDouble(
      charIDToTypeID("Vrtc"),
      charIDToTypeID("#Pxl"),
      endXY[1]
    );
    lineDesc.putObject(charIDToTypeID("End "), charIDToTypeID("Pnt "), endDesc);
    lineDesc.putUnitDouble(
      charIDToTypeID("Wdth"),
      charIDToTypeID("#Pxl"),
      width
    );
    desc.putObject(charIDToTypeID("Shp "), charIDToTypeID("Ln  "), lineDesc);
    desc.putBoolean(charIDToTypeID("AntA"), true);
    executeAction(charIDToTypeID("Draw"), desc, DialogModes.NO);
  }

  var line_count = 30;

  // Find the height and the width of the document
  // divide the height by number of rows
  // subtract the margin
  // equals line height

  var rows = 4;
  var margin = 100;
  var middle_margin = margin / 2;
  var line_height = dh / rows - margin - middle_margin;

  var lineWidth = 3;

  // dww document working width
  var docWorkingWidth = dw - margin - margin;
  var linesPerRow = state.density / rows;
  var spacing = docWorkingWidth / linesPerRow;

  alert(
    rows +
      " " +
      margin +
      " " +
      middle_margin +
      " " +
      line_height +
      " " +
      docWorkingWidth +
      " " +
      linesPerRow +
      " " +
      spacing +
      " "
  );

  function straightLines() {
    var startX = margin;
    var startY = margin;
    var endX = margin;
    var endY = line_height + margin;

    for (ii = 0; ii < rows; ii++) {
      if (ii === 0) {
        alert("i'm here");
        // drawinile
        for (var i = 0; i < state.density / rows; i++) {
          drawLine([startX, startY], [endX, endY], lineWidth);
          startX = startX + spacing;
          endX = endX + spacing;
        }
      }
      if (ii > 0) {
        alert("i'm now here");
        // next line
        startY = startY + line_height + margin;
        endY = startY + line_height;
        startX = margin;
        endX = margin;
        alert(startY + " " + endY);

        for (var i = 0; i < state.density / rows; i++) {
          drawLine([startX, startY], [endX, endY], lineWidth);
          startX = startX + spacing;
          endX = endX + spacing;
        }
      }
    }
  }

  straightLines();

  // for (i = 0; i < state.density; i++) {
  //   var startX = randomIntFromInterval(10, dw);
  //   var startY = randomIntFromInterval(10, dh);
  //   var endX = randomIntFromInterval(10, dw);
  //   var endY = randomIntFromInterval(10, dh);
  //   var lineWidth = 2;

  //   var startPoint = [startX, startY];
  //   var endPoint = [endX, endY];

  //   drawLine(startPoint, endPoint, lineWidth);
  //   drawLine([startX, startY], [endX, endY], lineWidth);
  // }

  function randomIntFromInterval(min, max) {
    //min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //alert(dw);
  //alert(dh);
}
