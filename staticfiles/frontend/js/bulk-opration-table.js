
var DatatablesBasicBasic = {
    init: function() {
        var e;
        (e = $("#m_table_1")).DataTable({
            paging:   false,
            info:     false,
            responsive: !0,
            columnDefs: [{
                targets: '_all',
                orderable: false,
            }],

            order: true,
            searching: false,
        }),
        e.on("change", ".m-group-checkable", function() {
            var e = $(this).closest("table").find("td:first-child .m-checkable")
              , a = $(this).is(":checked");
            $(e).each(function() {
                a ? ($(this).prop("checked", !0),
                $(this).closest("tr").addClass("active")) : ($(this).prop("checked", !1),
                $(this).closest("tr").removeClass("active"))
            })
        }),
        e.on("change", "tbody tr .m-checkbox", function() {
            $(this).parents("tr").toggleClass("active")
            $('.select_all_rows').hide();
            $('#select_all').val('False');
            $('.m-group-checkable').prop("checked", !1);
        })
    }
};


jQuery(document).ready(function() {
    $('.select_all_rows').hide();
    $('#select_all').val('False');
    $('.m-group-checkable').prop("checked", !1);
    DatatablesBasicBasic.init();
});

$(document).on('click','.m-group-checkable',function () {
    if(this.checked){
        $('.m-checkable').prop("checked", 1);
            $('.select_all_rows').show();
            $('#select_current_btn').hide();
            $('#select_all_btn').show();
    }else{
        $('.m-checkable').prop("checked", !1);
        $('.select_all_rows').hide();
    }
});

$(document).on('click','#select_all_btn',function () {
    var val = $('#select_all').val();
    if (val == 'False'){
        $('#select_all').val('True');
        $('#select_all_btn').hide();
        $('#select_current_btn').show();
    }
});

$(document).on('click','#select_current_btn',function () {
    $('#select_all_btn').show();
    $('#select_current_btn').hide();
    $('#select_all').val('False');
});

$(document).on('click','#bulk-operation-order',function () {
    var url = $(this).attr('action-url');
    var select_all = $('#select_all').val();
    if(select_all == 'True'){
        console.log(select_all);
    }else{
        var checked = [];
        $.each($("input[name='order_list']:checked"), function(){            
            checked.push($(this).val());
        });
    }

});

$(document).on('click','.payment_info',function () {
     var order_id = $(this).attr('attr-id');
     var action = $(this).attr('attr-action');
     var content = $(this).attr('data-content');
     var that = this;
     if (!content){
         $.ajax({
            url: action,
            type: 'GET',
            data: {
            'order_id': order_id
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function (data) {
                $(that).parents('tbody').children('.payment_info').removeAttr('data-content');
                $(that).parents('tbody').children('.payment_info').popover('hide');
                $(that).attr('data-content', data);
                $(that).popover('show');
            }
        });
    }else{
        $(that).removeAttr('data-content');
        $(that).popover('hide');
    }
});

// $(document).on('click','.bulk-action-button',function () {
//      var order_id = $(this).attr('order-id');
//      var action = $(this).attr('action-url');
//      var batch_url = $(this).attr('batch-url');
//      $.ajax({
//         url: action,
//         type: 'POST',
//         data: {
//         'order_ids': order_id,
//         'approve_order' : '1'
//         },
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
//         },
//         success: function (data) {
//             if(data){
//                 executionAjaxLoader(data, 'approve', batch_url);
//             }
//         }
//     });
// });


function get_cookie_cname(){
    return 'bulk_sl';
}

// $('.bulk-action-button').click(function(e){
//     var action_name = $(this).attr('data-name');
//     var action_class = $(this).attr('class');
//     var action_confirm = $(this).attr('action-confirm');
//     var swal_title = $(this).attr('swal-title');
//     var swal_text = $(this).attr('swal-text');
//     var swal_confirm_button = $(this).attr('swal-confirm-button');

//     var exist_class = "export_csv";
//     var contact_group = "contact_group";
//     var import_csv = "import_csv";
//     var action_value = action_name
//     if (action_name == "export_csv" || (typeof action_class !== 'undefined' && action_class.indexOf(exist_class) != -1)){
        
//     } else if(action_name == "import_csv" || (typeof action_class !== 'undefined' && action_class.indexOf(import_csv) != -1)) {

//     } else if(action_name == "contact_group" || (typeof action_class !== 'undefined' && action_class.indexOf(contact_group) != -1)) {

//     } else {
//         e.preventDefault();
//         swal({
//             title: ((typeof swal_title !== 'undefined' && swal_title) ? swal_title : Trans.trans('Are you sure?')),
//             text: ((typeof swal_text !== 'undefined' && swal_text) ? swal_text : Trans.trans("You will not be able to recover it !")),
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonText: ((typeof swal_confirm_button !== 'undefined' && swal_confirm_button) ? swal_confirm_button : Trans.trans('Yes')),
//             cancelButtonText: ((typeof swal_cancel_button !== 'undefined' && swal_cancel_button) ? swal_cancel_button : Trans.trans('Cancel')),
//         }).then((result) => {
//             if (result.value || result === true) {
//                 if (typeof action_confirm !== 'undefined' && action_confirm == 'true') {
//                         if(typeof result.value != 'undefined' && result.value == true) {
//                             var purpose = $('<input type="hidden" name="'+action_name+'" value="'+action_name+'" />');
//                             $('#action-purpose').html(purpose);
//                             var form = $('.bulk-operation-form').eq(0)
//                             if($(this).attr('action-url')){
//                                 $.removeCookie(get_cookie_cname(), { path: '/' });
//                                 form.attr('action',$(this).attr('action-url')).submit();
//                                 return true;
//                             }
//                             //form.submit();
//                         }
                    
//                 } else {
//                     var purpose = $('<input type="hidden" name="'+action_name+'" value="'+action_name+'" />');
//                     $('#action-purpose').html(purpose);
//                     var form = $('.bulk-operation-form').eq(0)
//                     if($(this).attr('action-url')){
//                         $.removeCookie(get_cookie_cname(), { path: '/' });
//                         form.attr('action',$(this).attr('action-url')).submit();
//                         return true;
//                     }
//                     //form.submit();
//                 }
//             }
//         });
//     }
//     return true
// });


$("#select_all_btn span").click(function(){
   setCookie(get_cookie_cname(), _get_cookie_cname()+"#checked");
});
ck_value = getCookie(get_cookie_cname())

if (ck_value && ck_value == _get_cookie_cname()+"#checked"){
       $("#select_all").val("True");
       $(".bulk-checkbox").each(function(){
            $(this).prop("checked",true);
           
       });
       $(".m-group-checkable").prop("checked",true)
  
}else{
    $.removeCookie(get_cookie_cname(), { path: '/' });
}

$(".bulk-checkbox,.m-group-checkable,.select_current_btn").click(function(){
    if ($.removeCookie)
    $.removeCookie(get_cookie_cname(), { path: '/' });
});



$(document).on('click','#sidebar-order-decline',function () {
     var order_id = $(this).attr('order-id');
     var action = $(this).attr('action-url');
     var batch_url = $(this).attr('batch-url');
     $.ajax({
        url: action,
        type: 'POST',
        data: {
        'order_ids': order_id,
        'decline_order' : '1'
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: function (data) {
            if(data){
                executionAjaxLoader(data, 'decline', batch_url);
            }

        }
    });
});

