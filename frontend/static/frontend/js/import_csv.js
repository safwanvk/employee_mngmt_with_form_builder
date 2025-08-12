
$('.import_csv').click(function(e){
    console.log('import_csv.js')
    $('#import-csv').modal('show');
    var action_name = $(this).attr('data-name');
    var action_value = action_name
    if ($(this).attrExist('data-value')) {
        if ($(this).attr('data-value') !=""){
        action_value = $(this).attr('data-value')
        }
    }
   
    var purpose = $('<input type="hidden" name="'+action_name+'" value="'+action_value+'" />');
    $('#action-purpose').html(purpose);
});


function hide_import_model(){
    $('#import-csv').modal('hide');
}