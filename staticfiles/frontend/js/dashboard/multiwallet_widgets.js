/***
 * -------------------------------------------------------------------------------
 * Get dashbaord multi wallet widget
 * -------------------------------------------------------------------------------
 */


socket.on('getMultiWalletWidgetData', function(multiwallet_data) {

    let total__earnings = 0
    if (typeof multiwallet_data.commission_wallet != undefined) {
        let data = multiwallet_data.commission_wallet
        let object = $('#dashboard_wallet2')

        object.find('.wallet-header').html(data.header)
        object.find('.wallet-amount').html(data.amount_formated)
        object.find('.wallet-description').html(data.title)

    }

    if (typeof multiwallet_data.trading_wallet != undefined) {
        let data = multiwallet_data.trading_wallet
        let object = $('#dashboard_wallet3')

        object.find('.wallet-header').html(data.header)
        object.find('.wallet-amount').html(data.amount_formated)
        object.find('.wallet-description').html(data.title)

        total__earnings += parseFloat(data.amount)
    }

    if (typeof multiwallet_data.withdrawal_wallet != undefined) {
        let data = multiwallet_data.withdrawal_wallet
        let object = $('.dashboard_wallet1')

        // object.find('.wallet-header').html(data.header)
        object.find('.wallet-amount').html(data.amount_formated)
            // object.find('.wallet-description').html(data.title)

        total__earnings += parseFloat(data.amount)

        //     $("#total_earnings").html(data.amount_formated);
    }

})

socket.on('getHoldingWalletWidgetData', function(multiwallet_data) {

    let total__earnings = 0
    if (typeof multiwallet_data.commission_wallet != undefined) {
        let data = multiwallet_data.commission_wallet
        console.log("")
        let object = $('#dashboard_wallet2')

        // object.find('.wallet-header').html(data.header)
        object.find('.holding-amount').html(data.amount_formated)
            // object.find('.wallet-description').html(data.title)

    }

    if (typeof multiwallet_data.trading_wallet != undefined) {
        let data = multiwallet_data.trading_wallet
        let object = $('#dashboard_wallet3')

        // object.find('.wallet-header').html(data.header)
        object.find('.holding-amount').html(data.amount_formated)
            // object.find('.wallet-description').html(data.title)

        total__earnings += parseFloat(data.amount)
    }

    if (typeof multiwallet_data.withdrawal_wallet != undefined) {
        let data = multiwallet_data.withdrawal_wallet
        let object = $('.dashboard_wallet1')

        // object.find('.wallet-header').html(data.header)
        object.find('.holding-amount').html(data.amount_formated)
            // object.find('.wallet-description').html(data.title)

        total__earnings += parseFloat(data.amount)

        //     $("#total_earnings").html(data.amount_formated);
    }

    // update lifetime ea;ressbar()
})

/******* Holding data ends here*************/