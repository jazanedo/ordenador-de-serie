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

    /* **************************************************************************************************************
    INICIO CODIGO
    ************************************************************************************************************** */

    // Init Isotope
    var $grid = $("#contentOrderingLib").isotope({
      itemSelector: ".number",
      layoutMode: 'fitRows',
      getSortData: {
        category: "[data-number] parseInt"
      },
      sortBy : 'category'
    });


    // Clic para agregar número, validado para que el número no se repita y para que no se agregue vacío
    $("#btnAddNumber").on("click", function(){

      var tmp_val = $("#txtAddNumber").val();
      var tmp_bool = false;
      var item = '<span class="number" data-number="'+tmp_val+'">'+tmp_val+'</span>';
      var $item_grid = $('<span class="number" data-number="'+tmp_val+'">'+tmp_val+'</span>');

      $("#contentOrdering .number").each(function(index){
        
        if($(this).attr("data-number") == tmp_val){
          
          tmp_bool = true;
          return false;
        
        }else{
          
          tmp_bool = false;
        }

      });

      if(tmp_bool === false && tmp_val){

        $(".msg-error").removeClass("view-error");
        // Agregar elemento a lista 1
        $("#contentOrdering").append(item);
        // Agregar elemento a lista 2
        $grid.append($item_grid).isotope('appended', $item_grid);

        $("#txtAddNumber").val("").focus();
      
      }else{

        $(".msg-error").addClass("view-error");
        $("#txtAddNumber").focus();
      
      }

    });


    // Ordenamiento ascendente por progragación
    $("#btnSortAsc").on("click", function(){

      var wrapper = $("#contentOrdering");

      wrapper.find(".number").sort(function (a, b) {
          return +a.dataset.number - +b.dataset.number;
      }).appendTo(wrapper);

    });


    // Ordenamiento ascendente con librería
    $("#btnSortAscLib").on("click", function(){

      $grid.isotope({ sortBy: 'number' });

    });

    /* **************************************************************************************************************
    FIN CODIGO
    ************************************************************************************************************** */


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
