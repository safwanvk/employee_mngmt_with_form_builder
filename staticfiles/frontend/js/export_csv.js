$('[data-name="export_csv"]').click(function(e){
    
       $('#export-csv').modal('show');
       var action_name = $(this).attr('data-name');
       var purpose = $('<input type="hidden" name="'+action_name+'" value="'+action_name+'" />');
       $('#action-purpose').html(purpose);
});

function hide_export_model(){
    $('#export-csv').modal('hide');
}

$('.export_csv').click(function(e){
    $('#export-csv').modal('show');
    var action_name = $(this).attr('data-name');
    var action_value = action_name
    if ($(this).attrExist('data-value')) {
        if ($(this).attr('data-value') !=""){
        action_value = $(this).attr('data-value')
        }
    }
    if ($(this).attrExist('filename')){
        var currentmoment = ''
        if ($(this).attrExist('showdatetime')){
            currentmoment = moment().format('Do-dddd-MM-YY-h:mm:ss a')
        }
        $('input[name="csv_file"]').val($(this).attr('filename')+'-'+currentmoment )
        
        
        
    }
    var purpose = $('<input type="hidden" name="'+action_name+'" value="'+action_value+'" />');
    $('#action-purpose').html(purpose);
});
