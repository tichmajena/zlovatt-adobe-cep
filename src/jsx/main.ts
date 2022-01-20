// @ts-nocheck
import Config from "../config";
import Log from "./utils/log";
import explode from "./actions/explode";
import buildError from "./utils/buildError";

function runCommand() {
  Log.trace("→ runCommand");

  app.beginUndoGroup(Config.name + ": Do Something");

  let status: ESStatus;

  try {
    explode();
    status = { type: "success", msg: "Exploded successfully" };
  } catch (e) {
    status = {
      type: "error",
      msg: e.message,
      err: e.stack ? e : buildError("Uncaught error!", "main.ts", e),
    };
  } finally {
    app.endUndoGroup();
  }

  Log.trace("← runCommand");
  return JSON.stringify(status);
}

function appName() {
  return BridgeTalk.appName;
}

function alertPath(data: string) {
  alert("something");
  let pfumbata = "I'm here!" + data;
  return pfumbata;
}

function generate(path: any) {
  var strPath =
    "C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions\\muruki_ps_svelte\\presets";

  var theJSXX = File(strPath + "\\generate.jsx");
  //alert(theJSXX);
  $.evalFile(theJSXX);
}

function scrape() {
  // alert("scraping");
  var strPath =
    "C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions\\muruki_ps_svelte\\presets";
  var fields_array: object[] = [];

  var textfield = {
    field_input: "",
    field_label: "Field Label (Optional)",
    meta: "textfield",
    layer_name: "",
    is_active: true,
  };

  var so_field = {
    fields: [],
    meta: "smart_object",
    layer_name: "",
    is_active: false,
  };

  var imagefield = {
    field_input: "",
    field_label: "Field Label (Optional)",
    meta: "image_field",
    layer_name: "",
    is_active: true,
  };

  var field_folder = {
    fields: [],
    meta: "folder",
    layer_name: "",
    is_active: false,
  };

  var doc = app.activeDocument;
  var layers = doc.layers;

  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    addMainField(layer, i);
  }

  //("done! " + firidz.length);

  // var json_folder = Folder.selectDialog("Select Folder");
  // var json_file = File(json_folder + "/inputarry.json");

  // json_file.open("w");
  // json_file.write(JSON.stringify(fields_array));
  // json_file.close();

  var resObj = {
    fields: fields_array,
  };
  var firidz = JSON.stringify(resObj);

  return firidz;

  // var _json_folder = File.openDialog("Select Folder");

  function addMainField(layerObj: object, i) {
    if (layerObj.name.indexOf("m_") == 0 || layerObj.name.indexOf("m_") == 1) {
      if (layerObj.kind == "LayerKind.TEXT") {
        fields_array = [
          ...fields_array,
          {
            field_input: "",
            field_label: "Field Label (Optional)",
            meta: "textfield",
            layer_name: layerObj.name,
            is_active: true,
          },
        ];
      }

      if (
        layerObj.kind == "LayerKind.SMARTOBJECT" &&
        layerObj.name.indexOf("im_") != 0 &&
        layerObj.name.indexOf("im_") != 1
      ) {
        var newSO = { ...so_field };
        newSO.layer_name = layerObj.name;

        fields_array = [...fields_array, newSO];

        var the_doc = app.activeDocument;
        var layer_active = the_doc.layers.getByName(layerObj.name);
        the_doc.activeLayer = layer_active;

        executeAction(stringIDToTypeID("placedLayerEditContents"));
        var sub_doc = app.activeDocument;
        var so_layers = sub_doc.layers;
        for (var ii = 0; ii < so_layers.length; ii++) {
          addSubField(so_layers[ii]);
        }
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      }

      if (layerObj.kind == undefined) {
        fields_array = [
          ...fields_array,
          {
            fields: [],
            meta: "folder",
            layer_name: layerObj.name,
            is_active: false,
          },
        ];
        if (fields_array[fields_array.length - 1].layer_name === "")
          fields_array[fields_array.length - 1].layer_name = layerObj.name;
        var folder = layerObj;
        var sub_layers = folder.layers;

        for (var ii = 0; ii < sub_layers.length; ii++) {
          addSubField(sub_layers[ii]);
        }
      }
    }
  }

  function addSubField(sublayerObj: any) {
    if (
      sublayerObj.name.indexOf("m_") == 0 ||
      sublayerObj.name.indexOf("m_") == 1
    ) {
      //! If Text
      if (sublayerObj.kind == "LayerKind.TEXT") {
        fields_array[fields_array.length - 1].fields = [
          ...fields_array[fields_array.length - 1].fields,
          {
            field_input: "",
            field_label: "Field Label (Optional)",
            meta: "textfield",
            layer_name: sublayerObj.name,
            is_active: true,
          },
        ];
      }

      //* This means it's an image
      if (
        (sublayerObj.name.indexOf("im_") == 0 &&
          sublayerObj.kind == "LayerKind.SMARTOBJECT") ||
        (sublayerObj.name.indexOf("im_") == 1 &&
          sublayerObj.kind == "LayerKind.SMARTOBJECT")
      ) {
        fields_array[fields_array.length - 1].fields = [
          ...fields_array[fields_array.length - 1].fields,
          {
            field_input: "",
            field_label: "Field Label (Optional)",
            meta: "image_field",
            layer_name: sublayerObj.name,
            is_active: true,
          },
        ];
      }

      //! Real Smart Object Ignore
      if (
        sublayerObj.kind == "LayerKind.SMARTOBJECT" &&
        sublayerObj.name.indexOf("im_") != 0 &&
        sublayerObj.name.indexOf("im_") != 1
      ) {
        //TODO:
      }

      //! If Folder, ignore
      if (sublayerObj.kind == undefined) {
        //TODO:
      }
    }
  }
}

function ruka(proj: any) {
  var state = {
    currentLayer: undefined,
    currentLayers: undefined,
  };

  try {
    app.activeDocument.suspendHistory("Test", "main()");
  } catch (e) {
    alert(e);
  }

  function main() {
    // alert("kuruka");
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

    // // JSON_GROUP
    // // ==========
    // var json_group = dialog.add("group", undefined, { name: "json_group" });
    // json_group.preferredSize.width = 218;
    // json_group.orientation = "row";
    // json_group.alignChildren = ["left", "center"];
    // json_group.spacing = 10;
    // json_group.margins = 0;

    // // JSON_PANEL
    // // ==========
    // var json_panel = json_group.add("panel", undefined, undefined, {
    //   name: "json_panel",
    // });
    // json_panel.text = "Choose JSON file";
    // json_panel.orientation = "row";
    // json_panel.alignChildren = ["left", "top"];
    // json_panel.spacing = 10;
    // json_panel.margins = 10;

    // var btn_select_json = json_panel.add("button", undefined, undefined, {
    //   name: "btn_select_json",
    // });
    // btn_select_json.text = "Select JSON file";
    // var jsonFile = "";
    // btn_select_json.onClick = function () {
    //   // body
    //   jsonFile = File.openDialog("Select the JSON", "*.json");
    // };

    // var json_path = json_panel.add("statictext", undefined, undefined, {
    //   name: "json_path",
    // });
    // json_path.text = jsonFile;

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

    // FILENAME_PANEL
    // ==============
    var filename_panel = dialog.add("panel", undefined, undefined, {
      name: "filename_panel",
    });
    filename_panel.text = "Save Files As";
    filename_panel.preferredSize.width = 200;
    filename_panel.orientation = "column";
    filename_panel.alignChildren = ["left", "top"];
    filename_panel.spacing = 10;
    filename_panel.margins = 10;

    // FILENAME_GROUP
    // ==============
    var filename_group = filename_panel.add("group", undefined, {
      name: "filename_group",
    });
    filename_group.orientation = "row";
    filename_group.alignChildren = ["left", "center"];
    filename_group.spacing = 10;
    filename_group.margins = 0;

    var filename_text = filename_group.add(
      'edittext {properties: {name: "filename_text"}}'
    );
    filename_text.text = proj.title;
    if (proj.title == "") {
      filename_text.text = "Enter file name";
    }

    filename_text.preferredSize.width = 111;

    var filename_n_of_n = filename_group.add(
      "statictext",
      undefined,
      undefined,
      { name: "filename_n_of_n" }
    );
    filename_n_of_n.text = "_1_of_" + proj.artworks.length;

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

    var button1 = group2.add("button", undefined, undefined, {
      name: "button1",
    });
    button1.text = "OK";

    var button2 = group2.add("button", undefined, undefined, {
      name: "button2",
    });
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

    state.filename = filename_text.text;

    // alert(format_yangu);
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
    var postObj = proj.artworks;
    var artworkArry = postObj;
    state.currentLayers = app.activeDocument.layers;
    for (var i = 0; i < artworkArry.length; i++) {
      var fieldArry = artworkArry[i];

      for (var ii = 0; ii < fieldArry.length; ii++) {
        runUpdate(fieldArry[ii]);
      }
      // Create quotes_flyer and give a number
      var numbering = i + 1;

      //save("post_" + numbering, folderPath, format_yangu );
      save(
        state.filename + "_" + numbering + "_of_" + artworkArry.length,
        folderPath,
        format_yangu
      );
    }

    alert("Done!");

    //var _location = Folder.openDialog("Your Files");
  }

  // function loadJson(jsonFile) {
  //   jsonFile.open("r");
  //   var str = jsonFile.read();
  //   jsonFile.close();

  //   return JSON.parse(str);
  // }

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
    return state.currentLayers.getByName(layerName(obj));
  }

  function getLayers(obj) {
    return app.activeDocument.layerSets.getByName(layerName(obj)).layers;
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
      updateFolder(obj);
    }

    if ("smart_object" === layerType(obj)) {
      updateSmartObject(obj);
    }
  }

  function updateTextLayer(obj) {
    state.currentLayer = getLayer(obj);

    var kind = state.currentLayer.kind;
    state.currentLayer.textItem.contents = obj[layerName(obj)];
    state.currentLayer.name = layerName(obj);
  }

  function updateSmartObject(obj) {
    state.currentLayer = getLayer(obj);

    app.activeDocument.activeLayer = state.currentLayer;

    executeAction(stringIDToTypeID("placedLayerEditContents"));

    state.currentLayers = app.activeDocument.layers;

    for (var ii = 0; ii < obj[layerName(obj)].length; ii++) {
      var field = obj[layerName(obj)][ii];

      runUpdate(field);
    }
    app.activeDocument.close(SaveOptions.SAVECHANGES);
    state.currentLayers = app.activeDocument.layers;
  }

  function updateFolder(obj) {
    // alert("found folder");

    //var fields = obj[layerName(obj)];
    state.currentLayers = getLayers(obj);

    // collect layerSets and loop throught fields search names among them

    for (var ii = 0; ii < obj[layerName(obj)].length; ii++) {
      //! loop through the object, in this case we have one
      //! So we are looping once
      //! How are layers grabbed?
      //! By name. We grab it in thin air and inject the change
      //! It's var layer = chakuti, layer.text = "This"
      //* so now we want to search for a matching layer name in the layer set
      //* Grab it, and pin it to the ceiling
      //* Then rise up and inject our change
      //? How does runUpdate know whether to get from state or from dom?
      //* We switch the context. We never loop the DOM directly
      //* At first we make the dom the currentLayers
      //* updateFolder switches that context
      //* When done, he hands back the context to the Dom
      //* So, layer is got from CurrentLayers
      //* No more thin air grabbings

      var field = obj[layerName(obj)][ii];

      runUpdate(field);
    }
    state.currentLayers = app.activeDocument.layers;
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

    doc.activeLayer = layer;

    if (layer.kind != "LayerKind.SMARTOBJECT") {
      //  alert("selected layer is not a smart object");
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

  // TODO: Dialogues and ... error handling
  // TODO: Pay attention to saving options

  // get active document
  // Find all tagged layers
  // Take note of the layers and their types
  // If it's a folder, get in there and collect tagged layers
  // If it's a smart object, open it and get all tagged layers
}

$.global[Config.id] = {
  runCommand,
  appName,
  alertPath,
  generate,
  scrape,
  ruka,
};
