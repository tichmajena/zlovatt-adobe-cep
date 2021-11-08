var state = {};
try {
  app.activeDocument.suspendHistory("Test", "main()");
} catch (e) {
  alert(e);
}

function main() {
  /*
  Code for Import https://scriptui.joonas.me — (Triple click to select): 
  {"activeId":18,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varname":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"OPTIONS","preferredSize":[200,0],"margins":[16,16,16,16],"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":0,"style":{"enabled":true,"varname":"json_group","preferredSize":[218,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"Panel","parentId":1,"style":{"enabled":true,"varname":"json_panel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Choose JSON file","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-6":{"id":6,"type":"Button","parentId":2,"style":{"enabled":true,"varname":"btn_select_json","text":"Select JSON file","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":0,"style":{"enabled":true,"varname":"folder_group","preferredSize":[200,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":8,"style":{"enabled":true,"varname":"folder_panel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Choose Destination Folder","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-10":{"id":10,"type":"Button","parentId":9,"style":{"enabled":true,"varname":"btn_choose_folder","text":"Select Folder","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Group","parentId":0,"style":{"enabled":true,"varname":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-13":{"id":13,"type":"StaticText","parentId":0,"style":{"enabled":true,"varname":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Save file as","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"RadioButton","parentId":12,"style":{"enabled":true,"varname":"radio_jpeg","text":".jpeg","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"RadioButton","parentId":12,"style":{"enabled":true,"varname":"radio_pdf","text":".pdf","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-16":{"id":16,"type":"RadioButton","parentId":12,"style":{"enabled":true,"varname":"radio_png","text":".png","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"RadioButton","parentId":12,"style":{"enabled":true,"varname":"radio_gif","text":".gif","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"StaticText","parentId":2,"style":{"enabled":true,"varname":"json_path","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"nknk","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"StaticText","parentId":9,"style":{"enabled":true,"varname":"folder_path","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"RadioButton","parentId":12,"style":{"enabled":true,"varname":"radio_psd","text":".psd","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-21":{"id":21,"type":"Button","parentId":22,"style":{"enabled":true,"varname":null,"text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-22":{"id":22,"type":"Group","parentId":0,"style":{"enabled":true,"varname":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-23":{"id":23,"type":"Button","parentId":22,"style":{"enabled":true,"varname":null,"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-24":{"id":24,"type":"Divider","parentId":0,"style":{"enabled":true,"varname":null}},"item-25":{"id":25,"type":"Divider","parentId":0,"style":{"enabled":true,"varname":null}}},"order":[0,1,2,6,18,8,9,10,19,25,13,12,14,16,17,20,15,24,22,21,23],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
  */

  // DIALOG
  // ======
  var dialog = new Window("dialog");
  dialog.text = "OPTIONS";
  dialog.preferredSize.width = 200;
  dialog.alignChildren = ["center", "top"];
  dialog.spacing = 10;
  dialog.margins = [16, 16, 16, 16];

  // JSON_GROUP
  // ==========
  var json_group = dialog.add("group", undefined, { name: "json_group" });
  json_group.preferredSize.width = 218;
  json_group.orientation = "row";
  json_group.alignChildren = ["left", "center"];
  json_group.spacing = 10;
  json_group.margins = 0;

  // JSON_PANEL
  // ==========
  var json_panel = json_group.add("panel", undefined, undefined, {
    name: "json_panel",
  });
  json_panel.text = "Choose JSON file";
  json_panel.orientation = "row";
  json_panel.alignChildren = ["left", "top"];
  json_panel.spacing = 10;
  json_panel.margins = 10;

  var btn_select_json = json_panel.add("button", undefined, undefined, {
    name: "btn_select_json",
  });
  btn_select_json.text = "Select JSON file";
  var jsonFile = "";
  btn_select_json.onClick = function () {
    // body
    jsonFile = File.openDialog("Select the JSON", "*.json");
  };

  var json_path = json_panel.add("statictext", undefined, undefined, {
    name: "json_path",
  });
  json_path.text = jsonFile;

  // PICS_GROUP
  // ============
  var pics_group = dialog.add("group", undefined, { name: "pics_group" });
  pics_group.preferredSize.width = 200;
  pics_group.orientation = "row";
  pics_group.alignChildren = ["left", "center"];
  pics_group.spacing = 10;
  pics_group.margins = 0;

  // PICS_PANEL
  // ============
  var pics_panel = pics_group.add("panel", undefined, undefined, {
    name: "pics_panel",
  });
  pics_panel.text = "Choose Images Folder";
  pics_panel.orientation = "row";
  pics_panel.alignChildren = ["left", "top"];
  pics_panel.spacing = 10;
  pics_panel.margins = 10;

  var btn_choose_pics = pics_panel.add("button", undefined, undefined, {
    name: "btn_choose_pics",
  });
  btn_choose_pics.text = "Select Images Folder";

  var pics_path = pics_panel.add("statictext", undefined, undefined, {
    name: "pics_path",
  });

  var picsPath;
  var picsFilesNm = [];
  var picsFiles = [];

  btn_choose_pics.onClick = function () {
    // body
    picsPath = Folder.selectDialog("Select Images Folder");
  };

  // FOLDER_GROUP
  // ============
  var folder_group = dialog.add("group", undefined, { name: "folder_group" });
  folder_group.preferredSize.width = 200;
  folder_group.orientation = "row";
  folder_group.alignChildren = ["left", "center"];
  folder_group.spacing = 10;
  folder_group.margins = 0;

  // FOLDER_PANEL
  // ============
  var folder_panel = folder_group.add("panel", undefined, undefined, {
    name: "folder_panel",
  });
  folder_panel.text = "Choose Destination Folder";
  folder_panel.orientation = "row";
  folder_panel.alignChildren = ["left", "top"];
  folder_panel.spacing = 10;
  folder_panel.margins = 10;

  var btn_choose_folder = folder_panel.add("button", undefined, undefined, {
    name: "btn_choose_folder",
  });
  btn_choose_folder.text = "Select Destination Folder";

  var folder_path = folder_panel.add("statictext", undefined, undefined, {
    name: "folder_path",
  });

  var folderPath;

  btn_choose_folder.onClick = function () {
    // body
    folderPath = Folder.selectDialog("Select Destination Folder");
  };

  // DIALOG
  // ======
  var divider1 = dialog.add("panel", undefined, undefined, {
    name: "divider1",
  });
  divider1.alignment = "fill";

  var statictext1 = dialog.add("statictext", undefined, undefined, {
    name: "statictext1",
  });
  statictext1.text = "Save file as";

  // radio_group
  // ======
  var radio_group = dialog.add("group", undefined, { name: "radio_group" });
  radio_group.orientation = "row";
  radio_group.alignChildren = ["left", "center"];
  radio_group.spacing = 10;
  radio_group.margins = 0;

  var radio_jpeg = radio_group.add("radiobutton", undefined, undefined, {
    name: "radio_jpeg",
  });
  radio_jpeg.text = ".jpeg";

  var radio_png = radio_group.add("radiobutton", undefined, undefined, {
    name: "radio_png",
  });
  radio_png.text = ".png";

  var radio_gif = radio_group.add("radiobutton", undefined, undefined, {
    name: "radio_gif",
  });
  radio_gif.text = ".gif";

  var radio_psd = radio_group.add("radiobutton", undefined, undefined, {
    name: "radio_psd",
  });
  radio_psd.text = ".psd";

  var radio_pdf = radio_group.add("radiobutton", undefined, undefined, {
    name: "radio_pdf",
  });
  radio_pdf.text = ".pdf";

  // DIALOG
  // ======
  var divider2 = dialog.add("panel", undefined, undefined, {
    name: "divider2",
  });
  divider2.alignment = "fill";

  // GROUP2
  // ======
  var group2 = dialog.add("group", undefined, { name: "group2" });
  group2.orientation = "row";
  group2.alignChildren = ["left", "center"];
  group2.spacing = 10;
  group2.margins = 0;

  var button1 = group2.add("button", undefined, undefined, { name: "button1" });
  button1.text = "OK";

  var button2 = group2.add("button", undefined, undefined, { name: "button2" });
  button2.text = "Cancel";

  dialog.show();

  function selected_rbutton(rbuttons) {
    for (var i = 0; i < rbuttons.children.length; i++) {
      if (rbuttons.children[i].value == true) {
        return rbuttons.children[i].text;
      }
    }
  }

  var format_yangu = selected_rbutton(radio_group);

  var files = picsPath.getFiles();
  for (var i = 0; i < files.length; i++) {
    var nm = files[i].name;

    // TODO: Add more file formarts
    if (
      nm.indexOf(".jpg") != -1 ||
      nm.indexOf(".gif") != -1 ||
      nm.indexOf("jpeg") != -1 ||
      nm.indexOf(".png") != -1
    ) {
      var masinh = files[i].fsName.toString();
      var strArry = masinh.split("\\");
      var gama = strArry[strArry.length - 1];

      picsFilesNm.push(gama);
      picsFiles.push(files[i]);

      state.pics = picsFiles;
      state.picNm = picsFilesNm;
    }
  }

  //var postObj = loadJson(jsonFile);
  artworkArry = postObj.artworks;

  for (var i = 0; i < artworkArry.length; i++) {
    var fieldArry = artworkArry[i];

    for (var ii = 0; ii < fieldArry.length; ii++) {
      runUpdate(fieldArry[ii]);
    }
    // Create quotes_flyer and give a number
    var numbering = i + 1;

    //save("post_" + numbering, folderPath, format_yangu );
    save(
      "post_" + numbering + "_of_" + fieldArry.length,
      folderPath,
      format_yangu
    );
  }

  alert("Done!");

  //var _location = Folder.openDialog("Your Files");
}

function loadJson(jsonFile) {
  jsonFile.open("r");
  var str = jsonFile.read();
  jsonFile.close();

  return JSON.parse(str);
}

function save(zita, folder, format) {
  if (".png" === format) {
    savePNG(zita, folder);
  }
  if (".jpeg" === format) {
    saveJpeg(zita, folder);
  }
  if (".pdf" === format) {
    savePDF(zita, folder);
  }
  if (".psd" === format) {
    savePSD(zita, folder);
  }
  if (".gif" === format) {
    saveGIF(zita, folder);
  }
}

function saveJpeg(zita, folder) {
  var doc = app.activeDocument;
  var file = new File(folder + "/" + zita + ".jpg");
  var opts = new JPEGSaveOptions();
  opts.quality = 10;
  doc.saveAs(file, opts, true);
}

function savePDF(zita, folder) {
  var doc = app.activeDocument;
  var pdfFile = new File(folder.toString() + "/" + zita + ".pdf");
  var pdfOptions = new PDFSaveOptions();
  pdfOptions.compatibility = PDFCompatibility.ACROBAT5;
  pdfOptions.generateThumbnails = true;
  pdfOptions.preserveEditability = false;
  pdfOptions.preset = "[Smallest File Size]";
  doc.saveAs(pdfFile, pdfOptions);
}

function savePNG(zita, folder) {
  var doc = app.activeDocument;
  var saveFile = File(folder + "/" + zita + ".png");

  if (saveFile.exists) saveFile.remove();
  var pngSaveOptions = new PNGSaveOptions();
  doc.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

function SavePSD(zita, folder) {
  doc = app.activeDocument;
  var saveFile = new File(folder.toString() + "/" + zita + ".psd");
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;
  psdSaveOptions.layers = true;
  psdSaveOptions.annotations = true;
  psdSaveOptions.spotColors = true;
  doc.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);
}

function saveGIF(zita, folder) {
  doc = app.activeDocument;
  var saveFile = new File(folder + "/" + zita + ".gif");
  var gifSaveOptions = new gifSaveOptions();
  doc.saveAs(saveFile, gifSaveOptions, true, Extension.LOWERCASE);
}

function getLayer(obj) {
  return app.activeDocument.layers.getByName(layerName(obj));
}

function getLayers(obj) {
  return app.activeDocument.layerSets.getByName(layerName(obj));
}

function updateTextLayer(obj) {
  var layer = getLayer(obj);
  obj["product"];
  obj.product;

  layer.textItem.contents = obj[layerName(obj)];
  layer.name = layerName(obj);
}

function updateSmartObject(obj) {
  var layer = getLayer(obj);

  app.activeDocument.activeLayer = layer;

  executeAction(stringIDToTypeID("placedLayerEditContents"));

  for (var ii = 0; ii < obj[layerName(obj)].length; ii++) {
    var field = obj[layerName(obj)][ii];

    runUpdate(field);
  }
  app.activeDocument.close(SaveOptions.SAVECHANGES);
}

function updateFolder(obj) {
  var fields = obj[layerName(obj)];
  var layers = getLayers(obj);

  // collect layerSets and loop throught fields search names among them

  //TODO: Get length for the right array
  for (var ii = 0; ii < layers.fields; ii++) {
    // do something
    var field = obj[layerName(obj)][ii];

    runUpdate(field);
  }
}

function updateReapeter() {
  // collect layersets and loop through them
  for (var ii = 0; ii < layers.fields; ii++) {
    // do something
    var field = obj[layerName(obj)][ii];

    runUpdate(field);
  }
}

function layerName(obj) {
  return obj.meta.split("*")[1];
}

function layerType(obj) {
  return obj.meta.split("*")[0];
}

function updateImageLayer(obj) {
  var layer = getLayer(obj);
  var doc = app.activeDocument;
  //TODO: getlayer by name
  doc.activeLayer = layer;

  if (layer.kind != "LayerKind.SMARTOBJECT") {
    alert("selected layer is not a smart object");
  } else {
    var picname = obj[layerName(obj)];

    for (var i = 0; i < state.pics.length; i++) {
      if (state.picNm[i] == picname) {
        replaceSO(state.pics[i]);
      }
    }
  }

  function replaceSO(file) {
    var idplacedLayerReplaceContents = stringIDToTypeID(
      "placedLayerReplaceContents"
    );
    var desc5 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc5.putPath(idnull, new File(file));
    executeAction(idplacedLayerReplaceContents, desc5, DialogModes.NO);
  }
}

function runUpdate(obj) {
  if ("textfield" === layerType(obj)) {
    updateTextLayer(obj);
  }

  if ("image_field" === layerType(obj)) {
    updateImageLayer(obj);
  }

  if ("folder" === layerType(obj)) {
    // Loop throught
  }

  if ("smart_object" === layerType(obj)) {
    updateSmartObject(obj);
  }
}

// TODO: Dialogues and ... error handling
// TODO: Pay attention to saving options

// get active document
// Find all tagged layers
// Take note of the layers and their types
// If it's a folder, get in there and collect tagged layers
// If it's a smart object, open it and get all tagged layers
