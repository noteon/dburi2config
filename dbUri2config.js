var url = require('url');

function tryConvertValue(val){
  val=val.trim();
  if (["TRUE","true","True"].indexOf(val)) return true;
  if (["False","false","False"].indexOf(val)) return false;

  if (parseInt(val).toString()===val)
      return parseInt(val);

  return val;
}

function parse(uri){
    var config = {};

    var urlParts = url.parse(uri);
    console.log(urlParts)

    // SQLite don't have DB in connection url
    if (urlParts.pathname) {
        config.database = urlParts.pathname.replace(/^\//, '');
    }

    config.dialect = urlParts.protocol.replace(/:$/, '');
    if (config.dialect==="mssql"){
          config.server = urlParts.hostname;
     }else  config.host = urlParts.hostname;

    if (urlParts.port) {
        config.port = parseInt(urlParts.port);
    }

    if (urlParts.auth) {
        config.user = urlParts.auth.split(':')[0];
        
        var pwd=urlParts.auth.split(':')[1];
        if (pwd)
            config.password = pwd;
    }

    if (urlParts.query){
        var qryParts=urlParts.query.split('&');
        qryParts.forEach(function(it){
           var keyValuePair = it.split('=');
           if (keyValuePair[1]){
               if (config.dialect==="mssql"){
                   config.options=config.options ||{};
                   config.options[keyValuePair[0]]=tryConvertValue(keyValuePair[1]);
               }else
               config[keyValuePair[0]]=tryConvertValue(keyValuePair[1]);
           }
        })
    }

    return config;
}

module.exports=parse;