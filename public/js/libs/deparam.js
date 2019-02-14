/**
 * jQuery.deparam - ist das Gegenteil von  jQuery param. Erstellt aus einem URL-QueryString ein String-Objekt mit zugeordneten Wertepaaren
 * @param {string} - URL-QueryString
 * @returns {object} - String Objekt mit zugeordneten Wertepaaren.
*/
(function($){
    $.deparam = $.deparam || function(uri){
      if(uri === undefined){
        uri = window.location.search;
      }
      var queryString = {};
      uri.replace(
        new RegExp(
          "([^?=&]+)(=([^&#]*))?", "g"),
          function($0, $1, $2, $3) {
              queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
          }
        );
        return queryString;
      };
  })(jQuery);