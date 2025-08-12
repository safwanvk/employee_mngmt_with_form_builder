(function ($) {
  if ($('.datetime_picker').length) {
    var d = new Date();
    $('.datetime_picker').datetimepicker({
      format: "yyyy-m-d",
      orientation: "bottom left",
      autoclose: true,
      endDate: new Date(d),
    });
  }

  if ($('.date_picker').length) {
    var d = new Date();
    $('.date_picker').datetimepicker({
      orientation: "bottom left",
      autoclose: true,
      // endDate: new Date(d),

    });
  }

  // if ($('.dateofbirth__datetime_picker').length) {
  //   var min_age = 18;
  //   if (typeof USER_MIN_AGE != "undefined") {
  //     min_age = USER_MIN_AGE;
  //   }
  //   var d = new Date();
  //   d.setFullYear(d.getFullYear() - min_age);
  //   $('.dateofbirth__datetime_picker').datepicker({
  //     autoclose: true,
  //     format: "yyyy-mm-dd",
  //     startDate: new Date(1910, 1, 1),
  //     endDate: new Date(d),
  //     yearRange: '1910:2030',
  //     orientation: "bottom left",
  //     beforeShow: function (input) {
  //       $(input).datepicker("widget").addClass('d-none');
  //     },
  //   });
  //   $('.prev i').removeClass();
  //   $('.prev i').addClass("fa fa-angle-left");
  //   $('.next i').removeClass();
  //   $('.next i').addClass("fa fa-angle-right");
  //   $('.dateofbirth__datetime_picker').on('change', function () {
  //     if ($(this).hasClass("is-invalid")) {
  //       $(this).removeClass('is-invalid')
  //     }
  //     if (!$(this).hasClass("is-valid")) {
  //       $(this).addClass('is-valid')
  //     }
  //   })

  // }
  if ($(".click-link-see").length) {
    $(".click-link-see").on('click', function () {
      var id = $(this).attr('eid');
      if ($('#' + id).length) {
        $($('#' + id)).removeClass('d-none');
        $(this).remove();
      }
    });
  }
})(jQuery);


function copy(that, num) {
  $(that).popover('show');
  var inp = document.createElement('input');
  document.body.appendChild(inp)
  var asd = document.getElementById("text-to-copy-" + num);
  inp.value = asd.textContent
  inp.select();
  document.execCommand('copy', false);
  inp.remove();
  setTimeout(function () {
    $(that).popover('hide');
  }, 3000);
  // var x = document.getElementById("snackbar")
  // x.className = "show";
  // setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


//Get attributes

    ; (function ($) {
  //http://jsfiddle.net/3KFYf/33/
  $.fn.getDataAttributes = function (name, convert_upper = true) {
    function humanize(str) {
      var frags = str.split('_');
      for (i = 1; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join('');
    }
    var data = {};
    [].forEach.call($(this)[0].attributes, function (attr) {
      attr.name.replace(name, '')
      // var pattern = new RegExp(name);

      if (RegExp(name).test(attr.name)) {
        if (convert_upper == true) {
          data[humanize(attr.name.replace(name + '-', ''))] = attr.value;
        } else {
          data[attr.name.replace(name + '-', '')] = attr.value;
        }
      }
    });
    return data;
  };

})(jQuery);

// filter Regular expression
(function ($) {
  //https://jsfiddle.net/emkey08/tvx5e7q3
  $.fn.inputFilter = function (inputFilter) {

    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

; (function ($) {
  //http://jsfiddle.net/3KFYf/33/
  $.fn.UnderScoreToUpperCase = function (str) {
          var frags = str.split('_');
          for (i = 0; i < frags.length; i++) {
          frags[i] = ((i==0) ? '':' ') + frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
          }
          this.html(frags.join(''))
      }
})(jQuery);


//dashboard header Profile dropdown height issue

if ($('#m_header #m_header_topbar .m-topbar__user-profile .m-dropdown__wrapper').length) {
  offheight = 15;
  if($("#m_header .m-stack__item.m-brand:visible").length){
      var offheight = offheight + $("#m_header .m-stack__item.m-brand").outerHeight();
  }
  var profileheight = $("#m_header #m_header_topbar .m-topbar__user-profile").outerHeight() + offheight;
  if(profileheight){
      $('#m_header #m_header_topbar .m-topbar__user-profile .m-dropdown__wrapper').css({'max-height':'calc(100vh - '+profileheight+'px)','overflow-y':'auto','height':'auto'});
  }
}

// Gender based Profile Image Rendering
function render_profile_image(item) {
  ImgUrl='backoffice/tree/img/no-user.png';
  gender = 'na'
  // alert(gender_active)
  userimages = {
    'm':''+static_url+'backoffice/tree/img/user-male.png',
    'f': ''+static_url+'backoffice/tree/img/user-female.png',
    'na': ''+static_url+'backoffice/tree/img/no-user.png',

    'm_active':''+static_url+'backoffice/tree/img/user-male.png',
    'f_active':''+static_url+'backoffice/tree/img/user-female.png',
    'na_active':''+static_url+'backoffice/tree/img/active.png',

    'm_inactive':''+static_url+'backoffice/tree/img/user-male-inactive.png',
    'f_inactive':''+static_url+'backoffice/tree/img/user-female-inactive.png',
    'na_inactive':''+static_url+'backoffice/tree/img/inactive.png',

    'm_blocked':''+static_url+'backoffice/tree/img/user-male-blocked.png',
    'f_blocked':''+static_url+'backoffice/tree/img/user-female-blocked.png',
    'na_blocked':''+static_url+'backoffice/tree/img/blocked-user.png',

    }
  
    

  if (gender_active!="False" && item.gender ) {
    gender = item.gender
  }
  
  if(item.is_active){
    if(!item.is_eligible){
      ImgUrl = userimages[gender+'_inactive'];
    }else if (item.profile_image){
      ImgUrl = ''+MEDIA_URL+ item.profile_image + '';
    }
    else{
      ImgUrl = userimages[gender+'_active'];
    }
  }else{
    ImgUrl = userimages[gender+'_blocked'];
  }
  return ImgUrl
}