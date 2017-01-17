/////////////////////
//// INIT MODULE ////
/////////////////////
var InitModule = (function(Modernizr) {
  'use strict';


  ////////////////////////////
  //// VARIABLES PRIVADAS ////
  ////////////////////////////
  var vars = {},
    methods = {},
    viewToLoad = location.search.substring(1),
    mobileDetection,
    browserDetection;




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
  mobileDetection = function () {
    if (window.Detectizr.device.type !== 'desktop' || Modernizr.mq('(max-width: 1200px)')) {
      vars.isMobile = true;
    } else {
      vars.isMobile = false;
    }
  };


  browserDetection = function () {
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
  };






  //////////////////////////
  //// METODOS PUBLICOS ////
  //////////////////////////

  methods.ready = function() {

    //DETECTAR SI ES MOBILE
    mobileDetection();

    //DETECTAR NAVEGADORES
    browserDetection();


    //CARGA DE VISTAS (SOLO EN FRONTEND)
    if (viewToLoad.length > 0) {
      $('.main-content').load(viewToLoad + '.html', function() {
        //INICIAR
        methods.init();
      });
    } else {
      //INICIAR
      methods.init();
    }
  };


  methods.init = function() {
    //BOTONES
    methods.eventsList();

    //IMPEDIR EFECTO ROLLOVER EN MÓVILES
    if (vars.isMobile) {
      $('.hover').removeClass('hover');
    }

    $("#btnAddNumber").on("click", function(){

      var tmp_val = $("#txtAddNumber").val();
      var tmp_bool = false;
      
      console.log($('.content-ordering .number[data-number="'+tmp_val+'"]'))

      $(".content-ordering .number").each(function(index){

        // console.log( index + ": " + $( this ).attr("data-number") );
        
        if($(this).attr("data-number") == tmp_val){
          
          tmp_bool = true;
          return false;
        
        }else{
          
          tmp_bool = false;
        }

      });

      if(tmp_bool == false && tmp_val){

        $(".msg-error").removeClass("view-error");
        $(".content-ordering").append('<span class="number" data-number="'+tmp_val+'">'+tmp_val+'</span>');
        $("#txtAddNumber").val("").focus();
      
      }else{

        $(".msg-error").addClass("view-error");
        $("#txtAddNumber").focus();
      }



    });


    $("#btnSortAsc").on("click", function(){

      var wrapper = $(".content-ordering");

      wrapper.find(".number").sort(function (a, b) {
          return +a.dataset.number - +b.dataset.number;
      })
      .appendTo(wrapper);

    });

  };


  methods.eventsList = function() {
    //FUNCIONES QUE SE DEBEN EJECUTAR EN EL RESIZE
    $(window).on('resize', methods.resizeActions);
  };


  methods.resizeActions = function() {
    mobileDetection();

    browserDetection();
  };






  return {
    methods: methods,
    vars: vars
  };


})(Modernizr);





//CUANDO HA CARGADO EL DOM
$(document).ready(InitModule.methods.ready);
