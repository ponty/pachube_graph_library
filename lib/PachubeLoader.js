var PachubeLoader = new function() {
  var self = this;
  this.callbackCounter = 0;

  var loadScript = function(file, callback){
    if(file.split('.').pop() == 'js'){
      var elem=document.createElement('script');
      elem.type = "text/javascript";
      if (elem.readyState) { // IE
        elem.onreadystatechange = function(){
          if (elem.readyState == "loaded" ||
              elem.readyState == "complete"){
            elem.onreadystatechange = null;
            callback();
          }
        };
      } else { // Others
        elem.onload = function(){callback();};
      }
      elem.src = file;
      document.getElementsByTagName("head")[0].appendChild(elem);
    }
  };

  var loadScripts = function(files, callback){
    callbackCounter = files.length;
    for (file in files){
      loadScript(files[file], function(){
        if(--callbackCounter == 0){
          callback();
        }
      });
    }
  };

  // use our version of the lib instead of the global version 
  //var root = 'http://beta.apps.pachube.com/embeddable_graphs'
  var root = '.'
	  
  var jquery_core   = ['http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'];
  var jquery_files  = [root+'/vendor/jquery-ui-1.8.5.core.min.js',
                       root+'/vendor/jquery.flot.js',
                       root+'/vendor/date_parse.js'];
  var pachube_api   = [root+'/lib/PachubeAPI.js'];
  var pachube_graph = [root+'/lib/PachubeGraph.js'];

  this.load = function(){
    loadScripts(jquery_core, function(){
      loadScripts(jquery_files, function(){
        loadScripts(pachube_api, function(){
          loadScripts(pachube_graph, function() {
            var divs = $('.pachube-graph');
            if (divs != []) { divs.pachubeGraph(); }
          });
        });
      });
    });
    return true;
  };
}

PachubeLoader.load();
