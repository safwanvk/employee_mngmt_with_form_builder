// ###################      Quick Action Bar    ###############################
$('#close-action-bar').click(function(e){
    e.preventDefault();
    $('#action-sidebar').removeAttr('style');
    $('#action-sidebar').removeClass('m-quick-sidebar--on');
    $('body').removeClass('m-quick-sidebar--open');
    if($('.m-quick-sidebar-overlay').length) {
        $('.m-quick-sidebar-overlay').remove();
    }
    var _removeClass = $("#action-sidebar").attr('remove-class');
    if (typeof _removeClass !== typeof undefined && _removeClass !== false) {
      $('#action-sidebar').removeClass(_removeClass).removeAttr('remove-class');
    }
});

$(document).on('click','.add_form_action',function (e) {

    e.stopPropagation();
    $('#action-sidebar').css('display', 'block');
    // ('body').css('overflow: hidden');
    e.preventDefault()
    var width = $(this).attr('width-sidebar');
    var _class = $(this).attr('class-sidebar');
    var _title = $(this).attr('sidebar-title');
    if ((typeof _class == 'undefined' || _class.length == 0) && (typeof width == 'undefined' || width.length == 0)) {
        _class = 'm-quick-sidebar-w-50';
    }
    if (typeof _class !== typeof undefined && _class !== false) {
        $('#action-sidebar').addClass(_class);
        $('#action-sidebar').attr('remove-class', _class);
    }

    if (typeof width !== typeof undefined && width !== false) {
        $('#action-sidebar').attr('style', 'width: '+width+' !important;');
    }
    if (typeof _title != 'undefined' && _title.length && $('#action-sidebar').find('[data-type="sidebar-title"]').length) {
        $('#action-sidebar').find('[data-type="sidebar-title"]').html(_title);
    }
    $('#action-sidebar').addClass(' m-quick-sidebar--on');
    $('body').addClass('m-quick-sidebar--open');
    $('#action-sidebar').after('<div class="m-quick-sidebar-overlay"></div>');
    if ($('.custom-loader').length) {
        $('.custom-loader').show();
    }
    var action_url = $(this).attr('action-url');
    // var purpose = '';
    data = {}
    if ($(this).attr('action-for')){
        purpose    = $(this).attr('action-for');
        data['btn-action'] = purpose;
    }
    if ($(this).attr('attr-id')){
        attr_id    = $(this).attr('attr-id');
        data['attr_id'] = attr_id;
    }
    add_item(action_url, 'GET', data);
    var $_head_height = $('#action-sidebar').find('.m-portlet__head').height();
    var $_sidebar_height = $('#action-sidebar').height();
    if(($_sidebar_height-$_head_height) > 0) {
        $('#action-sidebar').find('.action-bar-content').css("height", ($_sidebar_height-$_head_height));
    }
});

function add_item(action_url, method, data={}) {
    //console.log("add item is working!") ;// sanity check

    $.ajax({
        url: action_url, 
        type: method,
        data: data,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            $('.custom-loader').show();
        },
        success: function (result) {
            $('.custom-loader').hide();
            $('.action-bar-content').html(result);
            //console.log($('.action-bar-content').length)
            
            //scroller init
            var t = $('.action-bar-content')[0];
            var scroll_height = mUtil.getViewPort().height - $('.action-bar-head').eq(0).outerHeight();
            var e = {'height' : scroll_height};
            mUtil.scrollerInit(t,e);


            if (typeof sidebarFunCallback === "function") {
                sidebarFunCallback(data['attr_id']);
            }
           
        },  
        // handle a non-successful response
        error: function (xhr, errmsg, err) {
            //console.log('errmsg');
            //console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

// ###################  Back Button Fuction  #############
$(document).ready(function () {
    $('button.back-button').on('click',function () {
        window.history.back();
    });
});

// ################### END Back Button Fuction  ##########


// ########################## Month Names Array ######################################
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// ########################## Month Names Array ######################################

// ########################## Month Names Array ######################################
const paymentStatus = ["Waiting", "User-Input", "User-Authorized", "Confirmed", 
    "Rejected", "Refunded", "Error"
];
// ########################## Month Names Array ######################################

// ########################## Bootstrp Switch ######################################

var BootstrapSwitch = {
    init:function(){
        $("[data-switch=true]").bootstrapSwitch()
    }
};

// jQuery(document).ready(function(){
//     BootstrapSwitch.init()
// });
// ########################## Bootstrp Switch ######################################

// ########################## Bootstrp Toggle ######################################

var BootstrapToggle = {
    init:function(){
        $("[data-toggle=true]").bootstrapToggle()
    }
};

// jQuery(document).ready(function(){
//     BootstrapToggle.init()
// });
// ########################## Bootstrp Toggle ######################################

// ########################## Global Page Filter ######################################

function _removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if(key) {
                var keyObj = key.split(",");
                $.each(keyObj, function( index, keyValue ) {
                    if (param === keyValue) {
                        params_arr.splice(i, 1);
                    }
                });
            }
        }
        if (params_arr.length) {
            rtn = rtn + "?" + params_arr.join("&");
        }
    }
    return rtn;
}

if($('.m-badge-icon').length) {
    $('[attr-key]').on('click', function () {
        var key = $(this).attr('attr-key');
        if(key) {
            var currant_url = window.location.href;
            var _url = _removeParam(key,currant_url);
            if(_url) {
               window.location.href = _url;
            }
        }
    });
}
// ########################## Global Page Filter ######################################


// ################################################################
// ################# 		Cookie Function	    ###################
// ################################################################
function setCookie(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}
// ################################################################
// ################# 		Cookie Function	    ###################
// ################################################################


function executionAjaxLoader(task_id, purpose, batch_url=''){
    if(task_id){
        var bacthstop = 0;
        $.ajax({
            url:batch_url,
            type: 'POST',
            data: {
                task_id: task_id,
                message: '0',
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function(result) {
                //console.log(result)
                if (result.progress == null || result.progress == undefined) {
                    bacthstop = 1;
                    $('.circular-progress-container').show();
                        $('.circular-progress-container .circular-progress').attr('data-percentage', 100);
                        $('.circular-progress-container .percentage-value').html(100);
                    
                   } else {
                        $('.circular-progress-container').show();
                        $('.circular-progress-container .circular-progress').attr('data-percentage', 30);
                        $('.circular-progress-container .percentage-value').html(30);
                   };
                }
        });

        var refreshIntervalId = setInterval(function() {
        
        if(bacthstop == 1){
            clearInterval(refreshIntervalId);
            $('.circular-progress-container').hide();
            if(purpose == 'decline'){
                 location.reload();
            }
          }else{
            executionAjaxLoader(task_id);
          }
        },500);
    }
}

jQuery(document).ready(function(){
    if($('.form-eps-group').length) {
        $('.form-eps-group').each(function() {
        if($(this).children('input').length && $(this).children('input').val()) {
         $(this).addClass('open');
        }
        if($(this).children('select').length && $(this).children('select').val()) {
         $(this).addClass('open');
        }
        });
        $('.form-eps-group input,.form-eps-group select').on('change keyup', function() {
            if($(this).val()){
         $(this).parents('.form-eps-group').addClass('open');
        } else {
        $(this).parents('.form-eps-group').removeClass('open');
        }
        });
    }
});


$(document).ready(function() {
    var pathname = window.location.pathname;
    if($('.nav li a[href="'+ pathname +'"]').length){
        $('.nav li a[href="'+ pathname +'"]').parents('li').addClass('active');
    }
});


//---------------------------------------------------------------
// TFA Changes
//---------------------------------------------------------------
if ($("#id_generator-token")){
    $("#id_generator-token").addClass('form-control');
    $("button[name='wizard_goto_step']").click(function(){
        $("#id_generator-token").removeAttr("required");
    })
}

// $(document).ready(function() {
    
//     $(jQuery("body").find("[button-js]")).each(
//         function() { // use . for class selectors
            
//             button_js(this); // pass this from here
//           }
//     );
// });
// function button_js(obj){
//     $(obj).click(function (e) {
//         e.preventDefault();
//         alert('gffgfgfg');
//         obj_type = $(obj).attr('type');
        
//         if(obj_type == "submit"){
//             alert(obj_type+'fdfdfd')
//             $(obj).submit();
//         }
//         //$(obj).prop("disabled", true);
//         // var btnhtml = $(obj).html();
//         // var loading = $(obj).data('loading-text');
//         // $(obj).html(loading);
//         // setTimeout(function () {
            
//         //        // $(obj).prop("disabled", false);
//         //         $(obj).html(btnhtml);
//         //       }, 5000);
            
//     });
// }
(function ($) {
    //https://stackoverflow.com/questions/38009009/jquery-how-to-add-spinner-to-input-type-button
    $.fn.buttonLoader = function (action) {
        var self = $(this);
       
        //start loading animation
        if (action == 'start') {
            if ($(self).attr("disabled") == "disabled") {
                e.preventDefault();
            }
            //disable buttons when loading state
            $('.has-spinner').attr("disabled", "disabled");
            $(self).attr('data-btn-text', $(self).text());
            text = $(self).attr('data-btn-text');
            //binding spinner element to button and changing button text
            $(self).html('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span> '+text);
            $(self).addClass('active');
        }
        //stop loading animation
        if (action == 'stop') {
            $(self).html($(self).attr('data-btn-text'));
            $(self).removeClass('active');
            //enable buttons after finish loading
            $('.has-spinner').removeAttr("disabled");
        }
    }
   
})(jQuery);

function SanitizeHtml(input){
    input = '"'+input+'"'
    var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                     replace(/<[\/\!]*?[^<>]*?>/gi, '').
                     replace(/<style[^>]*?>.*?<\/style>/gi, '').
                     replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '').
                     replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '').
                     replace(/^"|"$/g, '');
    return output;
}


function CopyToClipboard2(obj,containerid) {

    $(obj).popover('show');
	if (document.selection) { 
		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(containerid));
		range.select().createTextRange();
		document.execCommand("copy"); 

	} else if (window.getSelection) {
		var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges(); 
		window.getSelection().addRange(range);
		document.execCommand("copy");
		// alert("Copied the link: "+ range); 
    }
    setTimeout(function() {
        $(obj).popover('hide');
    }, 3000);
}

//auto locate default tab
(function ($) {
    url_tabs()
})(jQuery);
function url_tabs(){
    var url = document.location.toString();

    if (url.match('#')) {
        var e = $('.m-nav__item a[data-tab-target="#' + url.split('#')[1] + '"]')
        , a = e.closest('[data-tabs="true"]')
        , n = $(a.data("tabs-contents"))
        , o = $(e.data("tab-target"));
        a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"),
        e.addClass("m-tabs__item--active"),
        n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"),
        o.addClass("m-tabs-content__item--active")
    } 
}


$(document).on('click', '.btn-dbcx', function(){
    $(this).hide();
})

$(".limitIntegerOnly").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    var self = $(this);
    if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
    }

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) ) {
        return false;
    }
});

$(".limitDecimalOnly").keypress(function (e) {
    var self = $(this);
    if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
    }
    if ((e.which != 46 || self.val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

$(document.body).on('hidden.bs.modal', function () {
  if($('.modal').length) {
    if($('.modal').hasClass('show')) {
      $(this).addClass("modal-open");
    }
  }
});

$(function() {  
   
    // Here you register for the event and do whatever you need to do.
    
    $(document).find("[price-widget-js]").each(function () {
        price_widget(this)
    });
    

});
$(document).arrive("[price-widget-js]", function() {
    price_widget(this)
});

$(document).leave("[price-widget-js]", function() {
    
	$(document).unbindArrive($(this)); 
});

function price_widget(obj){
    var changer= $(obj).attr('price-widget-changer')
    var target= $(obj).attr('price-widget-target')
    var obj_id = $(obj).attr('id');
    var pricewidget_input = obj_id.replace(changer, target)
    console.log('**********price-widget-data****888',$(obj).attr('price-widget-data'))
    var pricewidget_data= JSON.parse($(obj).attr('price-widget-data'));
    console.log('**********price-widget-dataf****888',pricewidget_data)
    function set_price_widget(val){
        $.each(pricewidget_data, function (key, value) {
            if(key == val){
                $('#'+pricewidget_input).closest('.input-group').find('.text-prepend').html(value.symbol)
            }
         });
    }
    set_price_widget($(obj).val())
    $(obj).change(function () {
        var optionSelected = $(obj).find("option:selected");
        set_price_widget(optionSelected.val())
    });
    

}

function checkAttrExist(obj,attr){
    if (typeof obj.attr(attr) !== 'undefined' && obj.attr(attr) !== false) {
        return true
    }
    return false
}

(function ($) {
    $.fn.attrExist = function (attr) {
        var self = $(this);
        if (typeof self.attr(attr) !== 'undefined' && self.attr(attr) !== false) {
            return true
        }
        return false
    }
   
})(jQuery);