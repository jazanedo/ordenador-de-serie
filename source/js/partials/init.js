var Init = (function(Modernizr, Buttons) {
  'use strict';


  ////////////////////////////
  //// VARIABLES PRIVADAS ////
  ////////////////////////////
  var vars = {},
    methods = {},
    place;




  ////////////////////////////
  //// VARIABLES GLOBALES ////
  ////////////////////////////
  vars = {
    isMobile: false,
    firefox: false,
    ie9: false,
    ie10: false,
    ie11: false
  };






  //////////////////////////
  //// METODOS PRIVADOS ////
  //////////////////////////







  //////////////////////////
  //// METODOS PUBLICOS ////
  //////////////////////////

  methods.ready = function() {

    //DETECCION DE NAVEGADORES Y SI ES MOBILE
    if (window.Detectizr.device.type !== 'desktop' || Modernizr.mq('(max-width: 1280px)')) {
      vars.isMobile = true;
    }
    if (window.Detectizr.browser.name === 'ie') {
      if (window.Detectizr.browser.major === '9') {
        vars.ie9 = true;
      }
      if (window.Detectizr.browser.major === '10') {
        vars.ie10 = true;
      }
      if (window.Detectizr.browser.major === '11') {
        vars.ie11 = true;
      }
      if (window.Detectizr.browser.major < 9) {
        $('.update-browser').show(0);
        $('.main').hide(0);
      }
    }




    //CARGA DE VISTAS (SOLO EN FRONTEND)
    var view = location.search;
    view = view.substring(1);
    if (view.length > 0) {
      $('.main-content').load(view + '.html', function() {

        //BOTONES Y/O EVENTOS
        Buttons.methods.btns();
      });
    }

  };



  methods.load = function() {

  };









  return {
    methods: methods,
    vars: vars
  };


})(Modernizr, Buttons);




//CUANDO HA CARGADO EL DOM
$(document).ready(Init.methods.ready);


//CUANDO HA CARGADO DOM, IMÁGENES, ETC
$(window).load(Init.methods.load);
