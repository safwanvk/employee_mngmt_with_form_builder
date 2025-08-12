
$(function () {
    var d = new Date();
    var minAge = 13
    //d.setFullYear(d.getFullYear() - parseInt("{{settings.USER_MIN_AGE}}"));
    d.setFullYear(d.getFullYear() - parseInt(minAge));
    $('.dateofbirth__datetime_picker').datepicker({
        todayHighlight:false,
        format: 'yyyy-mm-dd',
        endDate: new Date(d),
        autoclose: true,
        clearBtn: true,
        orientation: "auto",
        startDate: new Date(1880, 01, 01, 0, 0, 0, 0)
    });
    $('.prev i').removeClass();
    $('.prev i').addClass("fa fa-angle-left");
    $('.next i').removeClass();
    $('.next i').addClass("fa fa-angle-right");
    $('.dateofbirth__datetime_picker').on('change', function(){
        if($(this).val()){
            if (new Date(d) < new Date($(this).val())) {
                $(this).parent().find('.invalid-feedback').remove()
               errorDiv = $('<div class="invalid-feedback"></div>');
               errorDiv.append("Your age should be greater than "+minAge);
               $(this).after(errorDiv);
               $(this).removeClass("is-valid");
               $(this).addClass("is-invalid");
           }else{
               if ($(this).hasClass("is-invalid")) {
                   $(this).removeClass('is-invalid');
               }
               $(this).addClass("is-valid");
           }
           
        }else{
            if ($(this).hasClass("is-valid")) {
                $(this).removeClass('is-valid')
            }
            if ($(this).hasClass("is-invalid")) {
                    $(this).removeClass('is-invalid');
            }
        }
    })
});