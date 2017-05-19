require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css");

let CodeMirror = require('codemirror');
let Mousetrap  = require('mousetrap');


let ExeLEngine = {
  init: function() {
    //Set the local scope vars
    this.previewContainer = document.getElementById("exel__container_frame");
    this.previewFrame     = document.getElementById('exel__preview_frame');
    this.htmlFrame = CodeMirror.fromTextArea(
      document.getElementById('html_frame__textarea'), {
        lineNumbers: true,
        mode: 'htmlmixed'
      });
    this.cssFrame = CodeMirror.fromTextArea(
      document.getElementById('css_frame__textarea'), 
      {
        lineNumbers: true,
        mode: 'css'
      });
    this.jsFrame = CodeMirror.fromTextArea(
      document.getElementById('javascript_frame__textarea'),
      {
        lineNumbers: true,
        mode: 'javascript'
      });
  },
  previewUpdate: function() {
    //Have to do a full reset of the iframe
    //since it still contains the local scope 
    //of variables and prevents the recreations
    
    console.log(this.jsFrame);
    this.previewFrame.outerHTML = "";
    delete this.previewFrame;


    //The html content of the frame, very clean and 
    //simple...
    let content = "";
    content += "<html>";
    content += "<head>";
    content += "<style>";
    content +=  this.cssFrame.doc.getValue();
    content += "</style>";
    content += "</head>";
    content += "<body>";
    content +=   this.htmlFrame.doc.getValue();
    content += "</body>";
    content += "<script>";
    content +=   "" + this.jsFrame.doc.getValue() + "";
    content += "</script>";
    content += "</html>";

    //Create the new iframe and appended onto the
    //preview frame container
    this.previewFrame = document.createElement('iframe');
    this.previewFrame.setAttribute("id", "exel__preview_frame");
    this.previewContainer.appendChild(this.previewFrame);

    var previewWindow = this.previewFrame.contentWindow;
    
    //Open, clear the frame(optional) and write the 
    //preview content
    previewWindow.document.open();
    previewWindow.document.write(content);
  }
};

ExeLEngineUtils = {
  addClasses(element, classes) {
    classes.forEach(function(item) {
      element.classList.add(item);
    });
  }
}

ExeLEngineTextEditor = {
  editorElement: null,
  init: function(id) {
    this.editorElement = document.createElement('div');
    this.editorElement.id = id;
    ExeLEngineUtils.addClasses(this.editorElement, ['ExeL__text_editor']);
  },
  appendTo: function(element) {
    element.appendChild();
  }

};

function main() {
  ExeLEngine.init();
 
  console.log(Mousetrap);
  Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
    ExeLEngine.previewUpdate();
  });

  let updateButton = document.getElementById("exel__update_button");
  updateButton.addEventListener("click", function(event){
    ExeLEngine.previewUpdate();
  });
}
main();
