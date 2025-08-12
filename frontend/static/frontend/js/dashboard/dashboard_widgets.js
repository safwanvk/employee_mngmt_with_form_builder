/*** 
 * Backoffice Dashboard Widgets 
 **/
$('li [m-menu-link-redirect="1"]').click(function() {
    //on change currency
    clearCacheAllWidget()
})
$(".ewalletFilter .filter-options li").click(function() {
    $(".ewalletFilter .filter-options ").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')
    changeEwalletWidget(send_data)
        //Show seleced text
    if (send_data.filter_val != 'refresh') {
        $(".ewalletFilter .filter-options").parent().closest('ul').find('.la-ellipsis-h').hide()
        if ($(".ewalletFilter .filter-options").parent().closest('ul').find('.select_text').length == 0)
            $(".ewalletFilter .filter-options").parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
        $(".ewalletFilter .filter-options").parent().closest('ul').find('.select_text').html($(this).find('span').html())
    }

    setTimeout(function() {
        $(".ewalletFilter .filter-options").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#teamSalesFilter li").click(function() {
    $("#teamSalesFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    changeTeamSalesWidget(send_data)
        //Show seleced text
    if (send_data.filter_val != 'refresh') {
        $("#teamSalesFilter").parent().closest('ul').find('.la-ellipsis-h').hide()
        if ($("#teamSalesFilter").parent().closest('ul').find('.select_text').length == 0)
            $("#teamSalesFilter").parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text" style="color:#fff">')
        $("#teamSalesFilter").parent().closest('ul').find('.select_text').html($(this).find('span').html())
    }
    setTimeout(function() {
        $("#teamSalesFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#commissionsFilter .filter-options li").click(function() {
    $("#commissionsFilter .filter-options li").removeClass("active")
    $(this).addClass("active")
    $("#commissionsFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    send_data.wallet = $("#comision-expens-widget #wallet-filter li.active").find('.m-nav__link-text').attr('id');
    changeCommissionsWidget(send_data)

    //Show seleced text
    if (send_data.filter_val != 'refresh') {
        $("#commissionsFilter").parent().closest('ul').find('.la-ellipsis-h').hide()
        if ($("#commissionsFilter").parent().closest('ul').find('.select_text').length == 0)
            $("#commissionsFilter").parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
        $("#commissionsFilter").parent().closest('ul').find('.select_text').html($(this).find('span').html())
    }
    setTimeout(function() {
        $("#commissionsFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#teamPerformanceFilter .filter-options li").click(function() {
    $("#teamPerformanceFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    changeTeamPerformanceWidget(send_data)
        //Show seleced text
    if (send_data.filter_val != 'refresh') {
        $("#teamPerformanceFilter").parent().closest('ul').find('.la-ellipsis-h').hide()
        if ($("#teamPerformanceFilter").parent().closest('ul').find('.select_text').length == 0)
            $("#teamPerformanceFilter").parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
        $("#teamPerformanceFilter").parent().closest('ul').find('.select_text').html($(this).find('span').html())
    }
    setTimeout(function() {
        $("#teamPerformanceFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#memberJoinMapFilter li").click(function() {
    $("#memberJoinMapFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    changememberJoinMapWidget(send_data)
    setTimeout(function() {
        $("#memberJoinMapFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#rankFilter li").click(function() {
    $("#rankFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    changeRankWidget(send_data)
    setTimeout(function() {
        $("#rankFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#corpEventsFilter li").click(function() {
    $("#corpEventsFilter").closest('.m-dropdown__wrapper').hide()
    send_data = {}
    send_data.filter_val = $(this).find('span').attr('id')
    changeCorpEventsWidget(send_data)
    setTimeout(function() {
        $("#corpEventsFilter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})
$("#newsActivitiesFilter li").click(function() {
        $("#newsActivitiesFilter").closest('.m-dropdown__wrapper').hide()
        send_data = {}
        send_data.filter_val = $(this).find('span').attr('id')
        changeNewsWidget(send_data)
        setTimeout(function() {
            $("#newsActivitiesFilter").closest('.m-dropdown__wrapper').removeAttr('style')
        }, 1000);
    })
    //Emit function to Clear all widgets cache
function clearCacheAllWidget(send_data = {}) {
    socket.emit('clearCacheAllWidget', send_data, function(data) {});
}
//Emit function to Change Ewallet filteration
function changeEwalletWidget(send_data = {}) {
    socket.emit('changeEwalletData', send_data, function(data) {});
}
//Emit function to Change Teamsales filteration
function changeTeamSalesWidget(send_data = {}) {
    socket.emit('changeTeamSalesData', send_data, function(data) {});
}
//Emit function to Change Commissions filteration
function changeCommissionsWidget(send_data = {}) {
    socket.emit('changeCommissionsData', send_data, function(data) {});
}
//Emit function to Change Team Performance filteration
function changeTeamPerformanceWidget(send_data = {}) {
    socket.emit('changeTeamPerformanceData', send_data, function(data) {});
}
//Emit function to Change Memberjoin map filteration
function changememberJoinMapWidget(send_data = {}) {
    socket.emit('changeMemberJoinMapData', send_data, function(data) {});
}
//Emit function to Change rank filteration
function changeRankWidget(send_data = {}) {
    socket.emit('changeRankData', send_data, function(data) {});
}
//Emit function to Change Events filteration
function changeCorpEventsWidget(send_data = {}) {
    socket.emit('changeEventsData', send_data, function(data) {});
}
//Emit function to Change News filteration
function changeNewsWidget(send_data = {}) {
    socket.emit('changeNewsData', send_data, function(data) {});
}

//Emit function to get announcement filteration
// function getDashAnnouncementwidget(send_data = {}) {
//     socket.emit('changeAnnoucementData', send_data, function(data) {
//     });
// }

//Widget - 1 #Ewallet
socket.on('getDashwalletwidget', function(data) {
    //Display  Total Investment amount
    if (data != undefined) {
        if (data.totalInvestments == undefined)
            $("#total_invest_amount").html(0);
        else if (data.totalInvestments)
            $("#total_invest_amount").html(data.totalInvestments);

            //Display Total Transactions
        if (data.user_total_earnings == undefined)
            $("#total_earnings").html(0);
        else if (data.user_total_earnings)
            $("#total_earnings").html(data.user_total_earnings);


        //Display commission withdrawn
        if (data.totalCommissionsWithdrawn == undefined)
            $("#commission_withdrawn").html(0);
        else if (data.totalCommissionsWithdrawn)
            $("#commission_withdrawn").html(data.totalCommissionsWithdrawn);

        if (data.profitPercentage == undefined)
            $("#profit_gen_amount").html(0);
        else {
            $("#profit_gen_amount").html(data.profitPercentage + "%");
            // profit info
            $("#profit_generated_info").html(invest_vs_earning_info__template(data))

        }


    }

});

function invest_vs_earning_info__template(data) {
    return '<ul class="m-portlet__nav pull-right">\
                <li class="m-portlet__nav-item m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push m-dropdown--open--clo" m-dropdown-toggle="hover" aria-expanded="true">\
                    <a href="#" class="m-portlet__nav-link m-portlet__nav-link--icon m-portlet__nav-link--icon-xl m-dropdown__toggle">\
                        <i class="la la-info-circle m--font-brand"></i>\
                    </a>\
                    <div class="m-dropdown__wrapper" style="z-index: 101;">\
                        <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style="left: auto; right: 44.5px;"></span>\
                        <div class="m-dropdown__inner">\
                            <div class="m-dropdown__body">\
                                <div class="m-dropdown__content">\
                                    ' + list_style__template(data) + '\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </li>\
            </ul>'
}

function list_style__template(data) {
    // data.totalInvestments
    // data.totalTransactions
    // return '\
    //     <div class="m-widget28">\
    //         <div class="m-widget28__container">\
    //             <div class="m-widget28__tab tab-content mt-0">\
    //             <div class="m-widget28__tab-container tab-pane active show">\
    //                 <div class="m-widget28__tab-items">\
    //                     <div class="m-widget28__tab-item">\
    //                         <span>Total Investments</span>\
    //                         <span style="word-break: break-all;font-size:15px;" class="m--font-danger">'+data.totalInvestments+'</span>\
    //                     </div>\
    //                     <div class="m-widget28__tab-item">\
    //                         <span>Total Earnings</span>\
    //                         <span style="word-break: break-all;font-size:15px;" class="m--font-primary">'+data.totalTransactions+'</span>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //             </div>\
    //         </div>\
    //     </div>'

    return '\
        <div class="m-widget4">\
            \
            <div class="m-widget4__item row">\
                <div class="m-widget4__info">\
                    <span class="m-widget4__title">\
                    Earnings\
                    </span><br>\
                    <span class="m-widget4__sub">\
                    Overall earning as commission\
                    </span>\
                </div>\
                <span class="m-widget4__ext__">\
                    <span class="m-widget4__number m--font-info">' + data.totalTransactions + '</span>\
                </span>\
            </div>\
            \
            <div class="m-widget4__item row">\
                <div class="m-widget4__info">\
                    <span class="m-widget4__title">\
                    Investment\
                    </span><br>\
                    <span class="m-widget4__sub">\
                    Overall investment\
                    </span>\
                </div>\
                <span class="m-widget4__ext__">\
                    <span class="m-widget4__number m--font-danger">' + data.totalInvestments + '</span>\
                </span>\
            </div>\
        </div>'
}
//Widget - 2 #TeamSales
socket.on('getDashTeamSaleswidget', function(data) {
    //Display Team Sales widget based on the plan
    if (plan_type == "BINARY") {
        getBinaryTeamSalesWidget(data)
    } else if (plan_type == "UNILEVEL" || plan_type == "MATRIX") {
        getUnilevelTeamSalesWidget(data)
    }
});

socket.on('getDashProfilewidget', function(data) {
    //Display User Profile details
    if (jQuery.isEmptyObject(data.userProfile)) {
        $("#prof_bg_image").html('<img src="'+static_url+'backoffice/img/user.jpg" width="200" class="m--img-rounded m--marginless">');
        $("#prof_avatar_image").html('<img src="'+static_url+'backoffice/img/user.jpg" width="200" class="m--img-rounded m--marginless">');
        $("#prof_name").html('...');
        $("#prof_username").html('...');
        $("#prof_joindate").html('...');
    } else if (data.userProfile) {
        // $("#prof_bg_image").html('<img src="/media/profile/profile_bg.jpg">');

        if (!data.userProfile.members[0]['profile_image']) {
            $("#prof_bg_image").html('<img src="'+static_url+'backoffice/img/user.jpg" width="200" class="m--img-rounded m--marginless">');
            $("#prof_avatar_image").html('')
        } else {
            $("#prof_bg_image").html('<img src="/afl-resizer/' + data.userProfile.members[0]['profile_image'] + '?size=0,200&crop=smart" class="m--img-rounded m--marginless">');
            $("#prof_avatar_image").html('')
        }
        $("#prof_name").html(data.userProfile.members[0]['name']);
        $("#prof_username").html(data.userProfile.members[0]['username']);

    }
});


socket.on('getDashRankOverviewwidget', function(data1) {
    topEarners();
    rankOverView();
    pckgOverview();
    recentJoins()
        //Display Top Earners
    function topEarners() {
        if (!jQuery.isEmptyObject(data1.topEarners) && data1.topEarners != undefined && !jQuery.isEmptyObject(data1.topEarners.top_earners) && data1.topEarners.top_earners != undefined) {
            $(".top_earners_div").html('<img src="'+static_url+'backoffice/img/load.gif" width="50">');
            var html = '';
            var show_all = document.location.href.includes('profile-summary')
            data1.topEarners.top_earners.forEach(function(item, k) {
                let tot_vol = (item.total_vol) ? item.total_vol : 0

                html += '<div class="m-widget32__item"><div class="m-widget32__img m-widget32__img--pic">';
                // if (item.profile_image)
                //     html += '<img src="/afl-resizer/'+ item.profile_image + '?size=55,55" alt="' + item.name + '">';
                // else
                //     html += '<img src="'+static_url+'backoffice/tree/img/no-user.png" alt="' + item.name + '">';

                html += '<img src="'+render_profile_image(item)+'" alt="' + item.is_eligible + '">';
                html += '</div><div class="m-widget32__info">';
                html += '<div class="m-widget32__title">' + item.name + '</div>';
                html += '<div class="m-widget32__sub"> ' + item.username + '</div>';
                html += '</div>'
                html += '<div class="m-widget32__ext"><span class="m-widget32__number m--font-brand">' + tot_vol + '</span>';
                html += '</div>';
                html += '</div>';


            });
            html += '<div class="text-center pt-4">';
            if(!show_all){
                html += '<a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'team-downline-detail/downline/earnings" class="btn btn-secondary m-btn m-btn--custom m-btn--label-primary m-btn--bolder">';
                html += Trans.trans('Show All');
                html += '</a>';
            }
            html += '</div>';
            $(".top_earners_div").html(html);
        } else {
            getemptyTemplate(".top_earners_div")
        }
    }
    var isDragging = false;
    $(".rank_ovrvw_menu")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.rank-content .m-widget_body-item').length == 0)
                    rankOverView();
            }
        });
    $(".rank_ovrvw_menu").click(function() {
            if ($('.rank-content .m-widget_body-item').length == 0)
                rankOverView();
        })
        //Display Rank Overview
    function rankOverView() {
        if (!jQuery.isEmptyObject(data1.rankOverview) && data1.rankOverview != undefined && !jQuery.isEmptyObject(data1.rankOverview.members) && data1.rankOverview.members != undefined) {
            $("#rank_overview").find('.rank-content').html('<img src="'+static_url+'backoffice/img/load.gif" width="50">');
            var html1 = '';
            var includeProfile = document.location.href.includes('profile-summary')
            url = "rank"
            if (!jQuery.isEmptyObject(data1.rankOverview.rank_type) && data1.rankOverview.rank_type != undefined){
                if (data1.rankOverview.rank_type == '"pay_rank"'){
                    url = "rank/overall/overall/pay_rank"
                }
            }
            data1.rankOverview.members.forEach(function(item, k) {
                let tot_vol = (item.total_vol) ? item.total_vol : 0.00
                html1 += '<div class="m-widget32__item"><div class="m-widget32__img m-widget32__img--icon">';

                if (item.image)
                    html1 += '<img src="/afl-resizer/' + item.image + '?size=55,55" alt="' + item.title + '">';
                else
                    html1 += '<img src="'+static_url+'backoffice/tree/img/r-00.png" alt="' + item.title + '">';
                // m-widget_body-item-desc
                html1 += '</div><div class="m-widget32__info">';
                if(includeProfile){
                    html1 += '<div class="m-widget32__title"><a style="cursor:auto" href = "javascript:void(0);" style="text-decoration:none;">' + item.title + '</a></div><div class="m-widget32__sub">' + Trans.trans("Downlines with this rank.") + '</div></div>';
                }else{
                    html1 += '<div class="m-widget32__title"><a href = "/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'team-downline-detail/downline/'+url+'?rank=' + item.id + '" style="text-decoration:none;">' + item.title + '</a></div><div class="m-widget32__sub">' + Trans.trans("Downlines with this rank.") + '</div></div>';
                }
                html1 += '<div class="m-widget32__ext"><span class="m-widget32__number m--font-brand">' + Math.trunc(tot_vol) + '</span>';
                html1 += '</div></a></div>';

                // $("#rank_overview").html(html1);
                $("#ranks_overview").html(html1);
            });
        } else {
            getemptyTemplate("#ranks_overview")
        }
    }
    var isDragging = false;
    $(".pckg_ovrvw_menu")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.package_overview_div .m-widget_body-item').length == 0)
                    pckgOverview();
            }
        });
    $(".pckg_ovrvw_menu").click(function() {
            if ($('.package_overview_div .m-widget_body-item').length == 0)
                pckgOverview();
        })
        //Display Package Overview
    function pckgOverview() {
        if (!jQuery.isEmptyObject(data1.pckgOverview) && data1.pckgOverview != undefined && !jQuery.isEmptyObject(data1.pckgOverview.pckg_overview) && data1.pckgOverview.pckg_overview != undefined) {
            $(".package_overview_div").html('<img src="'+static_url+'backoffice/img/load.gif" width="50">');
            var html1 = '';
            data1.pckgOverview.pckg_overview.forEach(function(item, k) {
                let tot_vol = (item.total_vol) ? item.total_vol : 0
                html1 += '<div class="m-widget32__item"><div class="m-widget32__img m-widget32__img--icon">';
                if (item.image)
                    html1 += '<img src="/afl-resizer/' + item.image + '?size=55,55&amp;crop=smart" alt="' + item.title + '">';
                else
                    html1 += '<img src="'+static_url+'backoffice/img/default-product-img.png" alt="' + item.title + '">';
                    // html1 += '<img src="/static/backoffice/tree/img/p-00.png" alt="' + item.title + '">';
                html1 += '</div><div class="m-widget32__info">';

                // changed the redirection view to none.Because the redirection view shows the current package of users.
                // html1 += '<div class="m-widget32__title"><a href = "/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'team-downline-detail/downline/package?package=' + item.pckg_id + '" style="text-decoration:none;">' + item.title + '</a></div><div class="m-widget32__sub">' + Trans.trans("Downlines with this package.") + '</div></div>';

                html1 += '<div class="m-widget32__title">' + item.title + '</div><div class="m-widget32__sub">' + Trans.trans("Downlines with this package.") + '</div></div>';
                
                html1 += '<div class="m-widget32__ext"><span class="m-widget32__number m--font-brand">' + Math.trunc(tot_vol) + '</span>';
                html1 += '</div></div>';

                //$("#rank_overview").html(html1);
                $(".package_overview_div").html(html1);
            });
        } else {
            getemptyTemplate(".package_overview_div")
        }
    }
    var isDragging = false;
    $(".recnt_joins_menu")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.recent_joinings_div .m-widget_body-item').length == 0)
                    recentJoins();
            }
        });
    $(".recnt_joins_menu").click(function() {
            if ($('.recent_joinings_div .m-widget_body-item').length == 0)
                recentJoins();
        })
        //Display New Users List
    function recentJoins() {
        var data = data1
        var show_all = document.location.href.includes('profile-summary');
        if (!jQuery.isEmptyObject(data.newUsers) && data.newUsers != undefined && !jQuery.isEmptyObject(data.newUsers.members) && data.newUsers.members != undefined) {
            $(".recent_joinings_div").html('<img src="'+static_url+'backoffice/img/load.gif" width="50">');
            var html = '';
            data.newUsers.members.forEach(function(item, k) {
                html += '<div class="m-widget32__item"><div class="m-widget32__img m-widget32__img--pic">';
                // if (item.profile_image)
                //     html += '<img src="/afl-resizer/' + item.profile_image + '?size=55,55" alt="' + item.name + '">';
                // else
                //     html += '<img src="'+static_url+'backoffice/tree/img/no-user.png" alt="' + item.name + '">';

                // html += render_profile_image(item)
                html += '<img src="'+render_profile_image(item)+'" alt="' + item.name + '">';
                html += '</div><div class="m-widget32__info">';
                html += '<div class="m-widget32__title">' + item.name + '</div>';
                if (item.created != null)
                    html += '<div class="m-widget32__sub">'+ Trans.trans("Joined") + " : "  + Trans.trans(item.created) +  Trans.trans("ago")+'</div>';
                html += '</div>'
                html += '</div>';


            });
            html += '<div class="text-center pt-4">';
            if(!show_all){
                html += '<a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'team-downline-detail/downline/joinings" class="btn btn-secondary m-btn m-btn--custom m-btn--label-primary m-btn--bolder">';
                html += Trans.trans('Show All');
                html += '</a>';
            }
            html += '</div>';
            $(".recent_joinings_div").html(html);
        } else {
            getemptyTemplate(".recent_joinings_div")
        }
    }
});

socket.on('getDashUserCommissionsWidget', function(data1) {
    //Commissions Earnings
    if (jQuery.isEmptyObject(data1.usr_comms.commissions_earn) || typeof data1.usr_comms.commissions_earn == "undefined") {
        getemptyTemplate(".earnings_div")
    } else if (data1.usr_comms.commissions_earn) {
        var html2 = '';
        var wallet = data1.wallet;
        let comm_earn = data1.usr_comms.commissions_earn
            //alert(comm_earn.length)			
        $("span[class^='comm_earn_val_']").html(0)
        html__tag = ''
        $.each(comm_earn, function(index, value) {
            var text_amount = value.total
            var category = value.formated_category

            var acronym = category.substr(0, 2);
            var short_name = acronym.toUpperCase();
            var profile_location = document.location.href.includes('profile-summary')

            html__tag += '<div class="m-widget32__item">'
            html__tag += '<div class="m-widget32__img m-widget32__label--icon">'
            html__tag += '<span class="m-widget4__label--badge bonus_name_' + index + '">' + short_name + '</span>'
            html__tag += '</div>'
            html__tag += '<div class="m-widget32__info">'
            html__tag += '<div class="m-widget32__title">' + Trans.trans(category) + '</div>'
            html__tag += '<div class="m-widget32__sub">' + Trans.trans("Commission Earnings") + '</div>'
            html__tag += '</div>'
            html__tag += '<div class="m-widget32__ext">';
            if (!profile_location) {
                html__tag += '<a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'multi-wallet-history/'+wallet+'/all/earnings?category=' + value.category + '" class="btn btn-sm btn-light--brand m-widget32__btn-number" title="' + Trans.trans("View More") + '"><span class="comm_earn_val_' + short_name + '">' + text_amount + '</span></a>'
            }else{
                html__tag += '<a style="cursor:auto" href="javascript:void(0);" class="btn btn-sm btn-light--brand m-widget32__btn-number" title="' + Trans.trans("View More") + '"><span class="comm_earn_val_' + short_name + '">' + text_amount + '</span></a>'
            }
            html__tag += '</div>'
            html__tag += '</div>'

        });
        if (html__tag != '')
            $(".earnings_div").html(html__tag)
    }

    var isDragging = false;
    $(".comm_earning_menu")
        .mousedown(function () {
            isDragging = false;
        })
        .mousemove(function () {
            isDragging = true;
        })
        .mouseup(function () {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.comm_earning_menu .m-widget_body-item').length == 0)
                    commEarnings();
            }
        });

    $(".comm_earning_menu").click(function () {
        // alert("aaa")
        // if ($('.expenses_div .m-widget_body-item').length == 0)
        commEarnings();
    })

    function commEarnings() {
        if (jQuery.isEmptyObject(data1.usr_comms.commissions_earn) || typeof data1.usr_comms.commissions_earn == "undefined") {
            getemptyTemplate(".earnings_div")
        } else if (data1.usr_comms.commissions_earn) {
            var html2 = '';
            let comm_earn = data1.usr_comms.commissions_earn
            //alert(comm_earn.length)			
            $("span[class^='comm_earn_val_']").html(0)
            html__tag = ''
            $.each(comm_earn, function (index, value) {
                var text_amount = value.total
                var category = value.formated_category

                let include_profile = document.location.href.includes('profile-summary')
                var acronym = category.substr(0, 2);
                var short_name = acronym.toUpperCase();

                html__tag += '<div class="m-widget32__item">'
                html__tag += '<div class="m-widget32__img m-widget32__label--icon">'
                html__tag += '<span class="m-widget4__label--badge bonus_name_' + index + '">' + short_name + '</span>'
                html__tag += '</div>'
                html__tag += '<div class="m-widget32__info">'
                html__tag += '<div class="m-widget32__title">' + Trans.trans(category) + '</div>'
                html__tag += '<div class="m-widget32__sub">' + Trans.trans("Commission Earnings") + '</div>'
                html__tag += '</div>'
                html__tag += '<div class="m-widget32__ext">';
                if(!include_profile){
                    html__tag += '<a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'multi-wallet-history/'+wallet+'/all/earnings?category=' + value.category + '" class="btn btn-sm btn-light--brand m-widget32__btn-number" title="' + Trans.trans("View More") + '"><span class="comm_earn_val_' + short_name + '">' + text_amount + '</span></a>'
                }else{
                    html__tag += '<a href="javascript:void(0)" style="cursor:auto" class="btn btn-sm btn-light--brand m-widget32__btn-number" title="' + Trans.trans("View More") + '"><span class="comm_earn_val_' + short_name + '">' + text_amount + '</span></a>'
                }
                html__tag += '</div>'
                html__tag += '</div>'

            });
            if (html__tag != '')
                $(".earnings_div").html(html__tag)
        }
    }


    var isDragging = false;
    $(".comm_exp_menu")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.expenses_div .m-widget_body-item').length == 0)
                    commExpense();
            }
        });
    $(".comm_exp_menu").click(function() {
            // alert("aaa")
            // if ($('.expenses_div .m-widget_body-item').length == 0)
            commExpense();
        })

    if ($(".comm_exp_menu").hasClass('active')) {
        commExpense();
    }
    
    //Commissions Expenses
    function commExpense() {
        if (!jQuery.isEmptyObject(data1.usr_expns.commissions_exp) && data1.usr_expns.commissions_exp != undefined) {
            var html2 = '';
            let comm_exp = data1.usr_expns.commissions_exp
            html__tag = ''
            $.each(comm_exp, function(index, value) {
                var text_amount = value.total
                var category = value.formated_category
                var include_profile = document.location.href.includes('profile-summary')
                var acronym = category.substr(0, 2);
                var short_name = acronym.toUpperCase();

                html__tag += '<div class="m-widget32__item">'
                html__tag += '<div class="m-widget32__img m-widget32__label--icon">'
                html__tag += '<span class="m-widget4__label--badge bonus_name_' + index + '">' + short_name + '</span>'
                html__tag += '</div>'
                html__tag += '<div class="m-widget32__info">'
                html__tag += '<div class="m-widget32__title ">' + category + '</div>'
                html__tag += '<div class="m-widget32__sub">' + Trans.trans("Expense Amount") + '</div>'
                html__tag += '</div>'
                html__tag += '<div class="m-widget32__ext">';
                if (!include_profile) {
                    html__tag += '<a href = "/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'multi-wallet-history/'+wallet+'/all/tds-other-charge?category=' + value.category + '" class="btn btn-sm btn-light--brand m-widget32__btn-number" role="button" title="' + Trans.trans("View More") + '">';
                }else{
                    html__tag += '<a href = "javascript:void(0);"  style="cursor:auto" class="btn btn-sm btn-light--brand m-widget32__btn-number" role="button" title="' + Trans.trans("View More") + '">';
                }
                html__tag += '<span class="comm_earn_val_' + short_name + '">' + text_amount + '</span>'
                html__tag += '</a>'
                html__tag += '</div>'
                html__tag += '</div>'
            });
            if (html__tag != '') {
                $(".expenses_div1").html(html__tag)
            }

        } else {
            getemptyTemplate(".expenses_div1")
        }
    }
    var isDragging = false;
    $(".wd_req_menu")
        .mousedown(function() {
            isDragging = false;
        })
        .mousemove(function() {
            isDragging = true;
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            if (wasDragging) {
                if ($('.withdrawal_reqs_div').length == 0)
                    withdrawRequest();
            }
        });
    $(".wd_req_menu").click(function() {
            // if ($('.withdrawal_reqs_div .m-widget_body-item').length == 0)
            withdrawRequest();
        })
    
    if ($(".wd_req_menu").hasClass('active')) {
        withdrawRequest();
    }

    //Withdrawal Requests
    function withdrawRequest() {
        if (!jQuery.isEmptyObject(data1.wid_reqs.withdrawals) && data1.wid_reqs.withdrawals != undefined) {
            var html2 = '';
            let wid_reqs = data1.wid_reqs.withdrawals

            $.each(wid_reqs, function(index, value) {
                let method = value.payout_method
                let methodCapitalized = method.charAt(0).toUpperCase() + method.slice(1)
                var acronym = method.substr(0, 2);
                var short_name = acronym.toUpperCase();
                let payout_status = ""
                let include_profile = document.location.href.includes('profile-summary')
                if (value.payout_status in payout_status_label) {
                    payout_status = payout_status_label[value.payout_status]
                }

                html2 += '<div class="m-widget32__item">';
                html2 += '<div class="m-widget32__img m-widget32__label--icon"><span class="m-widget4__label--badge bonus_name_' + short_name + '">' + short_name + '</span></div>';
                html2 += '<div class="m-widget32__info">';
                // html2 += '<div class="m-widget32__title text-capitalize">'+method.toUpperCase()+'</div>'
                html2 += '<div class="m-widget32__title text-capitalize">' + Trans.trans(value.category) + '</div>';
                html2 += '<div class="m-widget32__sub">';
                html2 += methodCapitalized;
                html2 += '</div>';
                html2 += '</div>';
                
                html2 += '<div class="m-widget32__badge ">';
                html2 += '<span class="m-badge m-badge--brand m-badge--wide">' + payout_status + '</span>';
                html2 += '</div>';
                html2 += '<div class="m-widget32__ext">';
                if(!include_profile){
                    html2 += '<a href = "/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'multi-wallet-history/'+wallet+'/all/payout"  style="cursor:auto" class="btn btn-sm btn-light--brand m-widget32__btn-number" role="button" title="' + Trans.trans("View More") + '">';
                }else{
                    html2 += '<a href = "javascript:void(0);" class="btn btn-sm btn-light--brand m-widget32__btn-number" role="button" title="' + Trans.trans("View More") + '">';
                }
                html2 += '<span class="comm_exp_val_'+short_name+'">' + value.total + '</span>';
                html2 += "</a>";
                html2 += '</div>';
                html2 += '</div>';
            });
            $(".withdrawal_reqs_div").html(html2);
        } else {
            getemptyTemplate(".withdrawal_reqs_div")
        }
    }
});
socket.on('getDashNewsActivitieswidget', function(data) {
    //Display News & Activities 
    news_acts = data.newsActivities.news_acts
    var news_count = 0
    if (news_acts != undefined && news_acts.length > 0) {
        news_count = Object.keys(news_acts).length;
    }
    if (!jQuery.isEmptyObject(data.newsActivities) && data.newsActivities != undefined && !jQuery.isEmptyObject(data.newsActivities.news_acts) && data.newsActivities.news_acts != undefined) {
        var html = '';
        data.newsActivities.news_acts.forEach(function(item, k) {
            html += '<div class="m-widget5__item"><div class="m-widget5__content"><div class="m-widget5__pic align-middle">';
            if (item.image)
                html += '<img class="m-widget7__img"  src="/afl-resizer/' + item.image + '?size=0,100&crop=smart" alt="' + item.title + '">';
            else
                html += '<img class="m-widget7__img" src="'+static_url+'afl_events/img/no-image.svg" alt="' + item.title + '">';
            html += '</div><div class="m-widget5__section">';
            html += '<h4 class="m-widget5__title">' + item.title + '</h4>';
            html += '<div class="m-widget5__desc">' + item.short_desc.replace(/<[^>]*>?/gm, '') + ' <a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'news/' + item.slug + '/view/">Read More</a></div>';
            html += '<div class="m-widget5__info">';
            //html+='<span class="m-widget5__author">Author:</span><span class="m-widget5__info-author m--font-info">Adviser</span>';
            html += '<span class="m-widget5__info-label">Date : </span><span class="m-widget5__info-date m--font-brand">' + item.created + '</span>';
            html += '</div></div></div></div>';

            // $("#news_activities").html(html);
        });
        /*if (news_count >= 3)
            html += '<a class="btn btn-bold btn-sm btn-font-sm btn-label-success" href="/' + language + '/' + site_prefix + 'news/">View all</a>'*/
        $("#news_activities").html(html);
    } else {
        getemptyTemplate("#news_activities")
    }
});

socket.on('getDashCorpEventswidget', function(data) {
    //Display Corporate Events
    let dataEvents = (data.corporateEvents.corp_events) ? data.corporateEvents.corp_events : ''
    let eventCal = []
    if (dataEvents != '') {
        let tempTotal = '';
        var class_name = "m-fc-event--"
        // var class_rand = ['danger m-fc-event--solid-focus', 'primary m-fc-event--light', 'warning m-fc-event--solid-primary', 'accent', 'solid-focus', 'light', 'solid-primary']
        var o = 0
        var linkIcons = {
            'Youtube': '<svg width="16" height="16" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 2.641C23.3624 2.13028 23.095 1.66414 22.7226 1.28926C22.3502 0.91439 21.8858 0.643942 21.376 0.505C19.505 1.19209e-07 12 0 12 0C12 0 4.495 1.19209e-07 2.623 0.505C2.11341 0.644186 1.64929 0.914733 1.27708 1.28958C0.904861 1.66443 0.637591 2.13044 0.502 2.641C0 4.525 0 8.455 0 8.455C0 8.455 0 12.385 0.502 14.269C0.637586 14.7797 0.904975 15.2459 1.27739 15.6207C1.64981 15.9956 2.11418 16.2661 2.624 16.405C4.495 16.91 12 16.91 12 16.91C12 16.91 19.505 16.91 21.377 16.405C21.8869 16.2662 22.3513 15.9957 22.7237 15.6208C23.0961 15.246 23.3635 14.7798 23.499 14.269C24 12.385 24 8.455 24 8.455C24 8.455 24 4.525 23.498 2.641ZM9.545 12.023V4.887L15.818 8.455L9.545 12.023Z" fill="#FF0000"/></svg>', 
            'Vimeo': '<svg width="16" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9803 4.16628C19.8928 6.19042 18.5312 8.9651 15.902 12.4852C13.1788 16.1621 10.8806 18 8.99393 18C7.81977 18 6.84561 16.8797 6.03312 14.64L4.43488 8.48114C3.83572 6.24402 3.19489 5.12372 2.50823 5.12372C2.35906 5.12372 1.83657 5.45098 0.940826 6.10376L0 4.84235C0.978952 3.94722 1.95147 3.04452 2.91748 2.13434C4.2333 0.949978 5.22162 0.329229 5.87904 0.265162C7.43486 0.109325 8.39235 1.2175 8.75151 3.58795C9.13901 6.14454 9.40901 7.73408 9.56067 8.3556C10.0098 10.4767 10.5031 11.5364 11.0406 11.5364C11.4589 11.5364 12.0872 10.8473 12.9281 9.47157C13.7647 8.09588 14.2114 7.05004 14.2714 6.33059C14.3914 5.14363 13.9422 4.54626 12.9264 4.54626C12.4481 4.54626 11.9539 4.65102 11.4456 4.88477C12.4339 1.5361 14.3072 -0.0992361 17.0804 0.00465508C19.1412 0.0566007 20.1037 1.44528 19.9912 4.15762L19.9803 4.16628Z" fill="#1AB7EA"/></svg>', 
            'Zoom': '<svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 0C14.7468 0 19 4.25323 19 9.5C19 14.7468 14.7468 19 9.5 19C4.25323 19 0 14.7468 0 9.5C0 4.25323 4.25323 0 9.5 0Z" fill="#E5E5E4"/><path d="M9.5 0.184998C14.6446 0.184998 18.815 4.35545 18.815 9.50001C18.815 14.6446 14.6446 18.815 9.5 18.815C4.35544 18.815 0.184982 14.6446 0.184982 9.50001C0.184982 4.35545 4.35558 0.184998 9.5 0.184998Z" fill="white"/><path d="M9.5 0.93222C14.2318 0.93222 18.0678 4.76816 18.0678 9.5C18.0678 14.2318 14.2318 18.0678 9.5 18.0678C4.76816 18.0678 0.93222 14.2318 0.93222 9.5C0.93222 4.76816 4.76816 0.93222 9.5 0.93222Z" fill="#4A8CFF"/><path d="M3.91028 6.81572V10.8421C3.91385 11.7526 4.65751 12.4854 5.56442 12.4816H11.4335C11.6003 12.4816 11.7345 12.3474 11.7345 12.1841V8.15779C11.731 7.2473 10.9873 6.51451 10.0805 6.51823H4.21149C4.04466 6.51823 3.91042 6.65246 3.91042 6.81572H3.91028ZM12.1081 8.38637L14.5312 6.61629C14.7416 6.44217 14.9047 6.48563 14.9047 6.80128V12.1987C14.9047 12.5578 14.7052 12.5144 14.5312 12.3837L12.1081 10.6172V8.38637Z" fill="white"/></svg>',
            'Live': '<b style="color:#f71d4e">LIVE</b>'
        }
        dataEvents.forEach(function(item) {
            let eventCalArry = [];
            eventCalArry['id'] = item.id
            eventCalArry['event_venue'] = item.event_venue
            eventCalArry['title'] = item.title
            eventCalArry['start'] = item.start_time
            eventCalArry['end'] = item.end_time
            eventCalArry['end_d'] = item.end_time
            eventCalArry['description_at'] = item.description + " at " + item.event_venue
            eventCalArry['description'] = item.description
            eventCalArry['className'] = class_name + 'primary m-fc-event--light'
            eventCalArry['is_live'] = false;
            var current_time = new Date(afl_time);
            var _startTime = new Date(item.start_time);
            var _endTime = new Date(item.end_time);
            if (item.event_type) {
                if (current_time.getTime() >= _startTime.getTime() && current_time.getTime() <= _endTime.getTime()) eventCalArry['is_live'] = true;
                if (item.link_type != 'None' && item.link_type != 'Others') {
                    eventCalArry['icon'] = linkIcons[item.link_type]
                }
                if (eventCalArry['is_live']) {
                    eventCalArry['medium'] = eventCalArry['icon'] ? eventCalArry['icon'] : '';
                    eventCalArry['icon'] = linkIcons['Live']
                    eventCalArry['color'] = '#ffd4dd'
                    eventCalArry['className'] = class_name + 'danger'
                    eventCalArry['borderColor'] = '#f95475'
                }
                if (item.external_link && item.external_link != '' && item.link_type != 'None' && eventCalArry['is_live']) eventCalArry['link_url'] = item.external_link
                if (item.external_link && item.external_link != '' && item.link_type != 'None' && !eventCalArry['is_live']) eventCalArry['external_link'] = item.external_link
            } else {
                if (current_time.getTime() >= _startTime.getTime() && current_time.getTime() <= _endTime.getTime()) {
                    eventCalArry['offline_is_live'] = true;
                    eventCalArry['icon'] = linkIcons['Live']
                    eventCalArry['color'] = '#ffd4dd'
                    eventCalArry['className'] = class_name + 'danger'
                    eventCalArry['borderColor'] = '#f95475'
                }
            }
            eventCalArry['slug'] = item.slug
            //eventCalArry['url'] = '/afl/event-detail/'+item.id+'/'
            eventCal.push(eventCalArry)
            o++
        })
    }
    //$("#m_calendar").html('<img src="/static/backoffice/img/loading.gif" height="100px" style="text-align: center" id="event_load_img">')
    $("#m_calendar").fullCalendar({
        isRTL: mUtil.isRTL(),
        header: {
            left: "",
            center: "prev,title,next",
            right: 'month',
        },
        views: {
            month: {
                titleFormat: 'MMM - YYYY',
            },
            agendaDay: {
                titleFormat: 'MMM DD, YYYY',
            },
            listWeek: {
                titleFormat: 'MMM DD',
            },
            basicDay: {
                titleFormat: 'MMM DD, YYYY',
                eventLimit: false
            },
        },
        buttonIcons: {
            month: 'svg-month-icon',
        },
        buttonText: {
            today: 'Today',
            week: 'Week',
            day: 'Day',
            list: 'List'
        },
        editable: 0,
        allDaySlot: false,
        eventLimit: true,
        navLinks: false,
        events: eventCal,
        eventLimitText: function(n) {
            return + n + ' event(s)';
        },
        timeFormat: 'hh:mma',

        eventClick: function(info, jsEvent) {
            var targetElement = jsEvent.target;
            var isExternalLink = false;
            if (targetElement.nodeName === 'BUTTON') {
                window.open(targetElement.getAttribute('href'), '_blank');
                return false;
            }
            if (targetElement.nodeName === 'A') {
                var currentHostname = window.location.hostname;
                var targetHostname = targetElement.hostname;

                if (targetHostname != '' && currentHostname !== targetHostname) {
                    isExternalLink = true;
                }
            }

            if (isExternalLink) {
                window.open(targetElement.href, '_blank');
                return false;
            }
            else if (info.link_url && !jsEvent.currentTarget.classList.contains("m-fc-day-grid-event")) {
                window.open(info.link_url, "_blank");
                return false;
            }
            location.href = '/' + language + '/' + username + '/' + geo + '/' + site_prefix + 'event/' + info.slug + '/view/';
        },
        eventLimitClick: function(cellInfo) {
            var toDate = cellInfo.date;
            if (cellInfo.date) {
                $('#m_calendar').fullCalendar('gotoDate', cellInfo.date);
                $('#m_calendar').fullCalendar('changeView', 'basicDay');
            }
        },
        eventMouseover: function(event, jsEvent) {
            if (!jsEvent.currentTarget.classList.contains("m-fc-day-grid-event")) {
                var color = {
                    true: ['#ffd4dd', '#f71d4e'],
                    false: ['#f6f7ff', '#515156']
                }
                var text = {
                    true: 'Click here to join' + ` ${event.medium ? event.medium : ''}` + ' : ' + `[${event.title}]`,
                    false: event.title
                }
                var tooltip = `
                <div class="calendarTooltip" style="background:${color[event.is_live][0]};color:${color[event.is_live][1]};">
                    <div class="tooltipArrow" style="border-top: 8px solid ${color[event.is_live][0]};"></div>
                    <div class="tooltipContent">
                    ${text[event.is_live]}
                    </div>
                </div>
                `;
                var $tool = $(tooltip).appendTo('body');
                var tooltipHeight = $tool.outerHeight();
                var tooltipWidth = $tool.outerWidth();
                $(this).mouseover(function(e) {
                    var $eventElement = $(this);
                    var eventOffset = $eventElement.offset();
                    var eventWidth = $eventElement.outerWidth();
                    var tooltipTop = eventOffset.top - tooltipHeight - 10;
                    var tooltipLeft = eventOffset.left + (eventWidth / 2) - (tooltipWidth / 2);

                    $tool.css({
                        top: tooltipTop,
                        left: tooltipLeft,
                        position: 'absolute'
                    });

                    $tool.fadeIn('1000');
                    $tool.fadeTo('10', 1.9);
                });
            }
        },
        eventMouseout: function(event, jsEvent) {
            if (!jsEvent.currentTarget.classList.contains("m-fc-day-grid-event")) {
                $(this).css('z-index', 8);
                $('.calendarTooltip').remove();
            }
        },
        eventRender: function(event, element, view) {
            element.css("padding-top", "4px");
            element.css("padding-bottom", "4px");
            $("#event_load_img").hide();
            if ($('#m_calendar').find(".fc-icon.fc-icon-svg-month-icon").length) {
                var _get_month_button = $('#m_calendar').find(".fc-icon.fc-icon-svg-month-icon");
                _get_month_button.parent('button').addClass('fc-svg-month-icon').attr('title', 'Month');
                _get_month_button.replaceWith('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="m-svg-icon"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"></rect> <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5"></rect> <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3"></path></g></svg>');
            }
            element.find(".fc-title").prepend(" | ");
            element.find(".fc-time").css("color", "#515156");
            element.find(".fc-title").css("color", "#898b96");
            if(event.is_live || event.offline_is_live){     
                element.find(".fc-time").css("color", "#f71d4e");
                element.find(".fc-title").css("color", "#ff88a1");
            }
            if(event.icon){     
                element.find(".fc-time").prepend(event.icon + "&nbsp;&nbsp;");
            }
            if (view.type !== undefined && view.type == "basicDay") {
                if (element.hasClass("fc-day-grid-event")) {
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];

                    var _startTime = new Date(event.start);
                    var day = _startTime.getUTCDate();
                    var month = _startTime.getUTCMonth();
                    var year = _startTime.getUTCFullYear();
                    var hours = _startTime.getUTCHours();
                    var minutes = _startTime.getUTCMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var _startTimeString = monthNames[month] + ' ' + day + ', ' + year + ' - ' + hours + ':' + minutes + ' ' + ampm;

                    var _endTime = new Date(event.end);
                    var day = _endTime.getUTCDate();
                    var month = _endTime.getUTCMonth();
                    var year = _endTime.getUTCFullYear();
                    var hours = _endTime.getUTCHours();
                    var minutes = _endTime.getUTCMinutes();
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var _endTimeString = monthNames[month] + ' ' + day + ', ' + year + ' - ' + hours + ':' + minutes + ' ' + ampm;

                    var icon_tag = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="m-svg-icon m-svg-icon--brand"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M10.9630156,7.5 L11.0475062,7.5 C11.3043819,7.5 11.5194647,7.69464724 11.5450248,7.95024814 L12,12.5 L15.2480695,14.3560397 C15.403857,14.4450611 15.5,14.6107328 15.5,14.7901613 L15.5,15 C15.5,15.2109164 15.3290185,15.3818979 15.1181021,15.3818979 C15.0841582,15.3818979 15.0503659,15.3773725 15.0176181,15.3684413 L10.3986612,14.1087258 C10.1672824,14.0456225 10.0132986,13.8271186 10.0316926,13.5879956 L10.4644883,7.96165175 C10.4845267,7.70115317 10.7017474,7.5 10.9630156,7.5 Z" fill="#000000"/> <path d="M7.38979581,2.8349582 C8.65216735,2.29743306 10.0413491,2 11.5,2 C17.2989899,2 22,6.70101013 22,12.5 C22,18.2989899 17.2989899,23 11.5,23 C5.70101013,23 1,18.2989899 1,12.5 C1,11.5151324 1.13559454,10.5619345 1.38913364,9.65805651 L3.31481075,10.1982117 C3.10672013,10.940064 3,11.7119264 3,12.5 C3,17.1944204 6.80557963,21 11.5,21 C16.1944204,21 20,17.1944204 20,12.5 C20,7.80557963 16.1944204,4 11.5,4 C10.54876,4 9.62236069,4.15592757 8.74872191,4.45446326 L9.93948308,5.87355717 C10.0088058,5.95617272 10.0495583,6.05898805 10.05566,6.16666224 C10.0712834,6.4423623 9.86044965,6.67852665 9.5847496,6.69415008 L4.71777931,6.96995273 C4.66931162,6.97269931 4.62070229,6.96837279 4.57348157,6.95710938 C4.30487471,6.89303938 4.13906482,6.62335149 4.20313482,6.35474463 L5.33163823,1.62361064 C5.35654118,1.51920756 5.41437908,1.4255891 5.49660017,1.35659741 C5.7081375,1.17909652 6.0235153,1.2066885 6.2010162,1.41822583 L7.38979581,2.8349582 Z" fill="#000000" opacity="0.3"/> </g></svg>';

                    var html_tag = '<div class="m-widget34">';
                    html_tag += '<div class="m-widget34__item">';
                    html_tag += '<h4 class="m-widget34__title">';
                    html_tag += event.title;
                    html_tag += '</h4>';
                    html_tag += '<div class="m-widget34__desc">';

                    if (event.description.length > 180) event.description = event.description.substring(0, 180) + "...";

                    html_tag += event.description;
                    html_tag += '</div>';

                    if (event.external_link) {
                        html_tag += '<div class="m-widget34__desc">';
                        html_tag += `<a href="${event.external_link}" target="_blank">`;
                        html_tag += event.external_link;
                        html_tag += '</a>';
                        html_tag += '</div>';
                    }

                    if (event.icon && event.medium) {
                        html_tag += '<div class="mt-2">';
                        html_tag += '<span>';
                        html_tag += event.icon;
                        html_tag += '</span>';
                        html_tag += '<span class="ml-2">';
                        html_tag += event.medium;
                        html_tag += '</span>';
                        html_tag += '<span class="ml-2">';
                        html_tag += `<button class="btn btn-brand" href="${event.link_url}">`;
                        html_tag += "Click here to join";
                        html_tag += '</button>';
                        html_tag += '</span>';
                        html_tag += '</div>';
                    } else if (event.icon) {
                        html_tag += '<div class="mt-2">';
                        html_tag += '<span>';
                        html_tag += event.icon;
                        html_tag += '</span>';
                        html_tag += '</div>';
                    }
                    
                    html_tag += '<div class="m-widget5__info-time m--font-brand">';
                    html_tag += '<span class="m-widget5__info-time-icon">';
                    html_tag += icon_tag;
                    html_tag += '</span>';
                    html_tag += '<span class="m-widget5__info-time-text">';
                    html_tag += Trans.trans('Start Date') + ': ' + _startTimeString;
                    html_tag += '</span>';

                    html_tag += ' - ';
                    html_tag += '<span class="m-widget5__info-time-icon">';
                    html_tag += icon_tag;
                    html_tag += '</span>';
                    html_tag += '<span class="m-widget5__info-time-text">';
                    html_tag += Trans.trans('End Date') + ': ' + _endTimeString;
                    html_tag += '</span>';

                    html_tag += '</div>';

                    html_tag += '</div>';
                    html_tag += '</div>';
                    element.addClass('m-fc-day-grid-event m-bg-none');
                    element.find(".fc-content").html(html_tag).addClass('m-fc-content');
                }
            }
        },
    });
});

$(".rank-top-space").show()
// if (user_grp_id != 1) {
    socket.on('getDashRankwidget', function(data1) {
        //Display Rank Overview
        var html_tag = '';
        if (!jQuery.isEmptyObject(data1) && !jQuery.isEmptyObject(data1.business) && data1.business.widget != undefined && data1.business.widget == "business_widget") {
            html_data = business_development_block(data1.business.data)
            $("#rank_main_div").attr("id", "business_dev_main_div");
            $("#business_dev_main_div").html(html_data)
        } else if (!jQuery.isEmptyObject(data1) && !jQuery.isEmptyObject(data1.rank)) {
            // if (data1.rank.currentrankcond) {
            //     var html2 = ''
            //     if (typeof data1.rank.currentrank != 'undefined' && data1.rank.currentrank != null) {
            //         html2 += '<div class="m-widget28__tab-item"><span></span><span> Current Rank : ' + data1.rank.currentrank[0].title + '</span></div>';
            //     } else {
            //         html2 += '<div class="m-widget28__tab-item"><span></span><span>Associate Criteria</span></div>';
            //     }

            //     data1.rank.currentrankcond.forEach(function(item, k) {
            //         $("#rank_desc").html(html2);
            //     });
            // }

            if (data1.rank.nextrankcond) {
                data1.rank.nextrankcond.forEach(function(item, k) {
                    var percentage = parseFloat(item.satisfied_percent);
                    percentage = (percentage > 100) ? 100 : percentage;
                    html_tag += '<div class="m-widget33__item">';
                    html_tag += '<div class="m-widget33__header">';
                    html_tag += '<div class="m-widget33__title">';
                    html_tag += Trans.trans(item.name);
                    html_tag += '</div>';
                    html_tag += '<div class="m-widget33__percentage">';
                    html_tag += (isNaN(percentage) == false ? percentage.toFixed(2) : "0.00") + '%';
                    html_tag += '</div>';
                    html_tag += '</div>';
                    html_tag += '<div class="m-widget33__progress">';
                    html_tag += '<div class="progress">';
                    html_tag += '<div class="progress-bar m--bg-brand" role="progressbar" style="width: ' + percentage + '%;" aria-valuenow="' + (isNaN(percentage) == false ? percentage.toFixed(0) : "0") + '" aria-valuemin="0" aria-valuemax="100"></div>';
                    html_tag += '</div>';
                    html_tag += '</div>';
                    html_tag += '<div class="m-widget33__info">';
                    html_tag += '<span class="m-widget33__number m--font-brand">';
                    html_tag += Trans.trans(item.achieved) + '/' + Trans.trans(item.required);
                    html_tag += '</span> ';
                    html_tag += '<span class="m-widget33__text">';
                    html_tag += Trans.trans('Achieved');
                    html_tag += '</span>';
                    html_tag += '</div>';
                    html_tag += '</div>';
                });
            }
            if ($(".m-portlet--rank-analysis").length && !jQuery.isEmptyObject(html_tag)) {
                var render_data = '<div class="m-widget33">';
                render_data += html_tag;
                render_data += '</div>';
                $(".m-portlet--rank-analysis").find('.m-portlet__data').html(render_data);
            }
        }
    });
// }

//Display Member Joinings map widget 
socket.on('getDashMapwidget', function(data1) {
    let cntry_codes = []
    let itemsArray = []
    let data = []
    let prgres_data = []
    let prgsData = []
    if (typeof data1.geozones.geozones != "undefined" && data1.geozones.geozones != null && data1.geozones.geozones.length > 0) {
        data1.geozones.geozones.forEach(function(item, k) {
            cntry_codes.push(item.country_code)
            itemsArray[item.country_code] = item.count
            data[k] = data1.geozones.geozones[k]['count']
            prgsData = []
                //prgsData['total_membs_cnt'] = data1.geozones.total_membs_cnt
            prgsData['country_id'] = item.id
            prgsData['country'] = item.country
            prgsData['count'] = item.count
            prgres_data[item.id] = prgsData
                //prgres_data.push(prgsData)
                //items.push(item)
        });
    }

    let cntry_progres_html = '';
    prgres_data.forEach(function(item, k) {
        let percent = []
        let memb_cnt = []
        let total_dwn_membs_cnt = (data1.geozones.total_dwn_membs_cnt) ? data1.geozones.total_dwn_membs_cnt : 0
            //memb_cnt[k] = item.total_membs_cnt[k]

        // percent[k] = Math.round(item.count/memb_cnt[k]*100)
        percent[k] = item.count / total_dwn_membs_cnt * 100
        cntry_progres_html += '<div class="block m-b-xs clearfix"><div class="m-b-xs clearfix pb-2">';
        cntry_progres_html += '<span class="text-muted">' + item.country + ': </span><b class="pull-right text-muted">' + percent[k].toFixed(2) + '%</b></div>';
        cntry_progres_html += '<div class="progress" style="height: 5px;">';
        cntry_progres_html += '<div class="progress-bar m--bg-brand" role="progressbar" style="width: ' + percent[k] + '%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>';
        cntry_progres_html += '</div></div>';
    })
    if(cntry_progres_html){
        $("#memb-join-progress-block").html(cntry_progres_html)
        if ($('.member-joinings-vmap-show-all').length && cntry_progres_html != '') {
            $('.member-joinings-vmap-show-all').removeClass('d-none');
        }
    }else{
         $("#memb-join-progress-block").html('<div class="h-100 m-portlet__align-center m-portlet__is-empty px-2 py-0"><div class="m-portlet__is-empty-svg mb-0"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style=" width: 65px; height: auto; margin-bottom: 15px; " viewBox="244 664.13 310 560" xml:space="preserve" class="m-svg-icon"> <g> <path class="m-svg-path--brand" opacity="0.4" fill="#000000" d="M535.537,958.817c-0.611-0.535-1.375-0.841-2.217-0.841c-0.152,0-0.344,0-0.535,0.038h-0.038 c-0.803,0.152-1.49,0.535-1.987,1.146c-0.497,0.573-0.765,1.338-0.765,2.141c0,0.114,0,0.229,0,0.344l0,0 c0.229,2.369,0.345,4.777,0.345,7.186c0,17.161-6.116,32.947-16.359,45.254c-10.243,12.27-24.576,21.022-40.973,24.156 l-2.943,0.573l1.032-2.79c1.337-3.555,1.987-7.339,1.987-11.199c0-2.676-0.344-5.389-1.032-8.064 c-0.955-3.746-2.79-8.104-6.23-12.498c-3.439-4.396-8.523-8.829-16.015-12.651l-1.605-0.803l0.918-1.529 c15.785-26.487,26.679-55.459,32.259-85.615l0.344-1.949l1.873,0.649c18.461,6.612,33.367,20.678,41.088,38.757 c0.268,0.649,0.727,1.146,1.262,1.49c0.534,0.344,1.185,0.535,1.796,0.535l0,0c0.344,0,0.727-0.039,1.07-0.191l0,0l0,0 c0.688-0.229,1.262-0.688,1.644-1.223c0.382-0.574,0.611-1.224,0.611-1.911c0-0.421-0.076-0.841-0.268-1.261 c-8.676-20.373-25.646-36.043-46.63-43.038l-1.338-0.458l0.191-1.377c1.796-12.383,2.714-24.92,2.714-37.533l0,0 c0-36.387-7.377-71.551-21.901-104.611c-14.027-31.916-34.017-60.275-59.434-84.355c-0.65-0.612-1.453-0.917-2.294-0.917 s-1.644,0.306-2.293,0.917c-30.501,28.895-53.701,64.938-67.27,104.458c-0.115,0.344-0.191,0.727-0.191,1.07 c0,0.688,0.229,1.376,0.611,1.949c0.382,0.574,0.956,0.994,1.682,1.224l0,0c0.344,0.114,0.688,0.153,1.032,0.153l0,0 c0.688,0,1.338-0.23,1.911-0.612c0.535-0.382,0.994-0.956,1.223-1.644c2.523-7.301,5.39-14.523,8.562-21.557l0.573-1.262 l1.338,0.307c16.817,3.859,34.59,5.809,52.86,5.809s36.043-1.949,52.86-5.809l1.338-0.307l0.573,1.262 c0.306,0.649,0.611,1.299,0.879,1.987c14.142,32.183,21.328,66.505,21.328,101.937c0,46.783-12.805,92.381-37.075,132.055 l-0.497,0.803h-78.813l-0.497-0.803c-24.271-39.712-37.075-85.31-37.075-132.055c0-20.104,2.37-40.057,6.994-59.396 c0.077-0.268,0.077-0.535,0.077-0.764c0-0.727-0.229-1.453-0.688-2.025c-0.42-0.574-1.032-0.994-1.796-1.186 c-0.268-0.076-0.573-0.114-0.841-0.114l0,0c-0.726,0-1.453,0.268-2.026,0.688c-0.573,0.459-0.994,1.07-1.185,1.835 c-4.778,19.875-7.186,40.361-7.186,60.963l0,0l0,0l0,0c0,12.651,0.917,25.188,2.713,37.572l0.191,1.375l-1.337,0.459 c-31.189,10.435-52.708,39.941-52.708,73.271c0,20.602,8.026,39.33,21.213,53.204s31.457,22.895,52.02,23.927l0,0 c0.076,0,0.114,0,0.191,0c0.879,0,1.72-0.344,2.332-0.955c0.382-0.383,0.65-0.842,0.841-1.377l0,0 c0.077-0.306,0.153-0.611,0.153-0.917c0-0.764-0.268-1.567-0.802-2.255c-3.517-4.434-5.39-10.091-5.39-15.824 c0-2.102,0.268-4.242,0.803-6.307c1.185-4.662,3.708-8.943,7.338-12.65c3.631-3.708,8.371-6.88,14.104-9.441l2.905-1.299 l-0.535,3.134c-0.879,5.045-1.453,10.626-1.453,16.474c0,6.383,0.688,13.072,2.408,19.875c1.72,6.804,4.472,13.722,8.638,20.448 c0.268,0.421,0.611,0.765,0.994,1.07c0.382,0.268,0.803,0.459,1.261,0.535l0,0c0.229,0.038,0.42,0.076,0.649,0.076 c1.223,0,2.332-0.688,2.905-1.758l5.427-10.129l1.185,3.899c2.867,9.593,7.759,23.009,15.021,33.749l0,0 c0.458,0.688,1.07,1.185,1.758,1.376c0.344,0.114,0.688,0.152,1.032,0.152c1.108,0,2.141-0.535,2.752-1.452 c7.262-10.74,12.192-24.194,15.06-33.825l1.185-3.899l5.351,10.015c0.229,0.458,0.573,0.841,0.956,1.146 c0.382,0.306,0.803,0.535,1.261,0.649c0.268,0.076,0.535,0.115,0.803,0.115c0.88,0,1.721-0.345,2.332-0.956 c0.19-0.191,0.344-0.382,0.459-0.611l0,0c4.204-6.766,6.956-13.684,8.676-20.486c1.72-6.804,2.408-13.569,2.408-19.914 c0-5.848-0.573-11.39-1.452-16.474l-0.536-3.134l2.905,1.3c5.733,2.561,10.473,5.733,14.104,9.44 c3.631,3.708,6.115,7.95,7.339,12.651c0.535,2.063,0.803,4.166,0.803,6.307c0,5.733-1.873,11.39-5.428,15.823 c-0.535,0.65-0.803,1.453-0.803,2.179c0,0.229,0.038,0.459,0.076,0.688c0.191,0.803,0.611,1.414,1.186,1.872 c0.573,0.459,1.299,0.727,2.025,0.727l0,0c0.038,0,0.115,0,0.153,0c19.798-1.032,37.533-9.44,50.604-22.474 c14.027-14.027,22.628-33.367,22.628-54.657l0,0l0,0l0,0c0-2.599-0.115-5.236-0.383-7.835 C536.531,960.116,536.11,959.353,535.537,958.817z M451.412,745.313c-15.709,3.439-32.221,5.16-49.229,5.16l0,0l0,0 c-16.97,0-33.481-1.721-49.19-5.16l-2.103-0.459l0.956-1.949c12.499-24.958,29.125-47.891,49.153-67.614l1.185-1.146l1.186,1.146 c20.143,19.799,36.654,42.502,49.19,67.576l0.956,1.949L451.412,745.313z M354.521,991.611 c-7.492,3.822-12.575,8.256-16.015,12.651c-3.439,4.395-5.274,8.79-6.23,12.498c-0.688,2.638-1.032,5.351-1.032,8.064 c0,3.822,0.688,7.645,1.987,11.199l1.032,2.79l-2.943-0.573c-16.397-3.134-30.73-11.887-40.973-24.156 c-10.243-12.269-16.359-28.055-16.359-45.254l0,0c0-29.927,18.958-56.491,46.707-66.467l1.873-0.688l0.344,1.949 c5.581,30.157,16.436,59.129,32.259,85.616l0.917,1.529L354.521,991.611z M431.04,1043.286l-1.376,3.173l-6.727-12.613 c-0.573-1.07-1.72-1.759-2.905-1.759l0,0c-0.152,0-0.306,0-0.497,0.039c-1.375,0.191-2.484,1.261-2.752,2.637 c0,0.039,0,0.039,0,0.076c0,0.039-0.038,0.115-0.038,0.191c-0.038,0.153-0.076,0.421-0.152,0.688 c-0.115,0.611-0.344,1.452-0.612,2.561c-0.535,2.141-1.299,5.198-2.369,8.715c-2.141,7.07-5.39,16.206-9.861,24.652l-1.49,2.79 l-1.491-2.79c-4.51-8.446-7.721-17.582-9.861-24.652c-2.14-7.071-3.172-12.078-3.172-12.231l0,0l0,0 c-0.268-1.376-1.376-2.408-2.752-2.637c-0.153-0.039-0.344-0.039-0.497-0.039c-1.223,0-2.331,0.65-2.905,1.759l0,0l-6.727,12.613 l-1.376-3.173c-4.281-9.746-5.771-19.646-5.771-28.742c0-6.345,0.726-12.27,1.758-17.544l0.268-1.376H434.9l0.268,1.376 c1.032,5.274,1.758,11.237,1.758,17.544C436.812,1023.641,435.321,1033.54,431.04,1043.286z"></path> <path class="m-svg-path--brand" opacity="0.4" fill="#000000" d="M402.222,882.221c13.721,0,26.563-5.313,36.271-15.021s15.021-22.55,15.021-36.272c0-14.142-5.733-26.945-15.021-36.233 s-22.092-15.021-36.233-15.021l0,0c-13.722,0-26.564,5.313-36.272,15.021s-15.021,22.551-15.021,36.272 c0,14.142,5.733,26.945,15.021,36.233C375.237,876.488,388.079,882.221,402.222,882.221z M370.612,799.357 c8.409-8.408,19.646-13.072,31.57-13.072l0,0l0,0l0,0c12.308,0,23.469,5.008,31.571,13.11c8.064,8.064,13.109,19.264,13.109,31.571 c0,11.925-4.662,23.162-13.071,31.57c-8.409,8.409-19.607,13.072-31.494,13.072l0,0h-0.076l0,0l0,0l0,0l0,0 c-12.308,0-23.469-5.008-31.571-13.11c-8.065-8.064-13.11-19.264-13.11-31.571C357.54,819.041,362.203,807.805,370.612,799.357z"></path> <path class="m-svg-path--brand" opacity="0.4" fill="#000000" d="M402.222,866.551c9.822,0,18.729-3.976,25.188-10.435c6.459-6.46,10.435-15.365,10.435-25.188 c0-9.822-3.976-18.729-10.435-25.188s-15.365-10.435-25.188-10.435c-9.823,0-18.729,3.976-25.188,10.435 c-6.459,6.459-10.435,15.365-10.435,25.188c0,9.823,3.976,18.729,10.435,25.188C383.493,862.575,392.398,866.551,402.222,866.551z M381.696,810.441c5.236-5.236,12.499-8.484,20.486-8.484l0,0c7.988,0,15.251,3.248,20.487,8.484s8.485,12.498,8.485,20.486l0,0 c0,7.988-3.249,15.251-8.485,20.487c-5.236,5.235-12.461,8.485-20.41,8.485l0,0h-0.077l0,0c-7.988,0-15.25-3.25-20.486-8.485 c-5.236-5.236-8.485-12.499-8.485-20.487S376.46,815.678,381.696,810.441z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M500.603,1052.039c-0.496-0.191-1.031-0.344-1.604-0.344c-0.88,0-1.644,0.268-2.332,0.726 c-0.649,0.459-1.185,1.109-1.528,1.835c-0.191,0.497-0.344,1.032-0.344,1.605c0,0.879,0.267,1.644,0.726,2.331 c0.459,0.65,1.108,1.186,1.835,1.529c0.497,0.191,1.031,0.344,1.604,0.344c0.88,0,1.644-0.268,2.332-0.726 c0.649-0.459,1.185-1.108,1.529-1.835c0.19-0.497,0.344-1.032,0.344-1.605c0-0.879-0.268-1.644-0.727-2.332 C501.979,1052.88,501.329,1052.345,500.603,1052.039z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M307.547,1052.039c-0.497-0.191-1.032-0.344-1.605-0.344c-0.879,0-1.644,0.268-2.332,0.726 c-0.65,0.459-1.185,1.109-1.529,1.835c-0.191,0.497-0.344,1.032-0.344,1.605c0,0.879,0.268,1.644,0.727,2.331 c0.458,0.65,1.108,1.186,1.834,1.529c0.497,0.191,1.032,0.344,1.644,0.344c0.879,0,1.644-0.268,2.332-0.726 c0.65-0.459,1.185-1.108,1.529-1.835c0.191-0.497,0.344-1.032,0.344-1.605c0-0.879-0.267-1.644-0.726-2.332 C308.923,1052.88,308.273,1052.345,307.547,1052.039z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M548.839,797.217c-0.383-0.573-0.956-1.031-1.605-1.299c-0.421-0.191-0.917-0.268-1.414-0.268h-9.518v-9.518 c0-0.765-0.229-1.453-0.611-2.025c-0.382-0.574-0.955-1.032-1.605-1.3c-0.421-0.191-0.917-0.268-1.414-0.268 c-0.765,0-1.452,0.229-2.025,0.611s-1.032,0.956-1.3,1.605c-0.191,0.421-0.268,0.917-0.268,1.414v9.517h-9.518 c-0.764,0-1.452,0.23-2.025,0.612s-1.032,0.956-1.3,1.604c-0.19,0.421-0.268,0.918-0.268,1.415c0,0.765,0.229,1.452,0.611,2.025 c0.383,0.573,0.956,1.032,1.605,1.3c0.421,0.191,0.918,0.268,1.414,0.268h9.518v9.518c0,0.764,0.229,1.451,0.611,2.025 c0.383,0.573,0.956,1.031,1.605,1.299c0.42,0.191,0.918,0.268,1.414,0.268c0.765,0,1.452-0.229,2.026-0.611 c0.573-0.382,1.031-0.955,1.299-1.605c0.191-0.42,0.268-0.917,0.268-1.414v-9.518h9.518c0.765,0,1.452-0.229,2.025-0.611 c0.573-0.382,1.032-0.955,1.3-1.605c0.191-0.42,0.268-0.916,0.268-1.414C549.45,798.479,549.221,797.79,548.839,797.217z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M269.478,865.251c0.191-0.421,0.268-0.917,0.268-1.414v-9.517h9.517c0.765,0,1.453-0.229,2.026-0.611 c0.573-0.383,1.032-0.956,1.3-1.605c0.191-0.422,0.267-0.918,0.267-1.415c0-0.765-0.229-1.452-0.611-2.025s-0.956-1.032-1.605-1.3 c-0.42-0.191-0.917-0.268-1.414-0.268h-9.44v-9.517c0-0.765-0.229-1.452-0.612-2.026c-0.382-0.572-0.956-1.031-1.605-1.299 c-0.42-0.191-0.917-0.268-1.414-0.268c-0.764,0-1.452,0.229-2.026,0.611c-0.573,0.383-1.032,0.955-1.299,1.605 c-0.191,0.42-0.268,0.917-0.268,1.414v9.518h-9.517c-0.765,0-1.452,0.229-2.026,0.611c-0.573,0.382-1.032,0.955-1.299,1.605 c-0.191,0.42-0.268,0.917-0.268,1.414c0,0.764,0.229,1.452,0.612,2.025c0.382,0.573,0.955,1.031,1.605,1.3 c0.42,0.19,0.917,0.267,1.414,0.267h9.517v9.518c0,0.765,0.229,1.452,0.612,2.025c0.382,0.574,0.956,1.032,1.605,1.3 c0.42,0.191,0.917,0.268,1.414,0.268c0.764,0,1.452-0.229,2.026-0.611C268.752,866.475,269.211,865.9,269.478,865.251z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M479.734,1074.513L479.734,1074.513c-0.765-0.611-1.682-0.917-2.6-0.917c-0.611,0-1.223,0.153-1.796,0.383 c-0.573,0.268-1.07,0.649-1.491,1.146c-9.784,12.192-18.116,29.086-24.576,47.7c-6.497,18.614-11.122,38.909-13.836,57.943 c-1.796,12.689-2.714,24.806-2.714,35.47v0.458c0,0.88,0.268,1.645,0.727,2.332c0.458,0.65,1.108,1.185,1.835,1.529 c0.496,0.19,1.031,0.344,1.604,0.344c0.88,0,1.644-0.268,2.332-0.727c0.649-0.458,1.185-1.108,1.528-1.834 c0.191-0.497,0.345-1.032,0.345-1.605v-0.459c0-16.091,2.063-34.819,5.886-53.624c3.86-18.806,9.479-37.61,16.741-53.893 c4.815-10.855,10.357-20.563,16.626-28.398c0.611-0.765,0.917-1.682,0.917-2.6c0-0.611-0.152-1.223-0.382-1.796 C480.613,1075.431,480.231,1074.934,479.734,1074.513z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M347.335,1103.905c-5.237-11.543-11.314-21.9-18.041-30.118c-0.421-0.497-0.917-0.879-1.453-1.146 s-1.146-0.382-1.758-0.382l0,0c-0.956,0-1.834,0.305-2.637,0.955c-0.497,0.42-0.879,0.917-1.146,1.452s-0.382,1.146-0.382,1.758 c0,0.956,0.306,1.835,0.956,2.638c4.816,5.925,9.25,12.919,13.225,20.64c4.013,7.759,7.568,16.244,10.74,25.188 c6.307,17.849,10.931,37.418,13.607,56.07c1.796,12.422,2.752,24.462,2.752,35.316v0.459c0,0.879,0.268,1.644,0.726,2.331 c0.458,0.65,1.108,1.186,1.834,1.529c0.497,0.19,1.032,0.344,1.605,0.344c0.879,0,1.644-0.268,2.332-0.727 c0.649-0.458,1.185-1.108,1.529-1.834c0.191-0.497,0.344-1.032,0.344-1.605v-0.459c0-16.091-2.102-35.546-6.153-55.268 C361.248,1141.248,355.209,1121.22,347.335,1103.905z"></path> <path class="m-svg-path--dark" opacity="0.3" fill="#000000" d="M404.477,1103.638c-0.688-0.459-1.453-0.726-2.332-0.726c-0.573,0-1.108,0.114-1.605,0.344 c-0.726,0.306-1.375,0.841-1.834,1.528c-0.458,0.688-0.726,1.453-0.726,2.332v20.524v40.133v18.308c0,0.88,0.268,1.644,0.726,2.332 c0.459,0.649,1.109,1.185,1.834,1.528c0.497,0.229,1.032,0.345,1.605,0.345c0.879,0,1.644-0.268,2.332-0.727 c0.649-0.458,1.185-1.108,1.528-1.835c0.191-0.496,0.344-1.031,0.344-1.604v-18.385v-40.133v-20.524 c0-0.573-0.114-1.108-0.344-1.605C405.661,1104.708,405.126,1104.059,404.477,1103.638z"></path> </g> </svg> <div>No reports available now.</div></div></div>')
    }

    if ($('#vmap').length) {

        $('#vmap').vectorMap({
            map: 'world_en',
            backgroundColor: '#fff',
            borderColor: '#FFFFFF',
            color: '#bac2ea',
            hoverOpacity: 0.5,
            selectedColor: '#5d78ff',
            enableZoom: true,
            showTooltip: true,
            scaleColors: ['#C8EEFF', '#006491'],
            values: data,
            normalizeFunction: 'polynomial',
            selectedRegions: cntry_codes,
            onLabelShow: function(event, label, code) {
                code = code.toUpperCase();
                if (itemsArray[code]) {
                    label.html('<strong>' + label.text() + '</strong><br />' + 'Joinings (<b>' + itemsArray[code] + '</b>)<br />');
                }
            }
        });
    }
});
$(document).on('click', '.add_form_action', function() {
    var action_url = $(this).attr('action-url');
    // var purpose = '';
    data = {}
    if ($(this).attr('action-for')) {
        purpose = $(this).attr('action-for');
        data['btn-action'] = purpose;
    }
    if ($(this).attr('attr-id')) {
        attr_id = $(this).attr('attr-id');
        data['attr_id'] = attr_id;
    }
    add_item(action_url, 'GET', data);
});

function add_item(action_url, method, data = {}) {
    $.ajax({
        url: action_url,
        type: method,
        data: data,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: function(result) {
            $('.action-bar-content').html(result);
            //scroller init
            var t = $('.action-bar-content')[0];
            var scroll_height = mUtil.getViewPort().height - $('.action-bar-head').eq(0).outerHeight();
            var e = { 'height': scroll_height };
            mUtil.scrollerInit(t, e);
            if (typeof sidebarFunCallback === "function") {
                sidebarFunCallback(data['attr_id']);
            }
        },
        // handle a non-successful response
        error: function(xhr, errmsg, err) {}
    });
}
$(document).ready(function() {
    //$('[data-toggle="tooltip"]').tooltip();
    $('.fa-info-circle').tooltip({
        trigger: 'click',
        placement: 'bottom'
    });
    $(".referal-link-input").hide()
    $(".btn-referal-link").click(function() {
        $(".referal-link-input").toggle('slow')
    })
});

function setTooltip(message) {
    $('.fa-info-circle').tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip() {
    setTimeout(function() {
        $('.fa-info-circle').tooltip('hide');
    }, 1000);
}
// Clipboard
var clipboard = new Clipboard('.fa-info-circle');
clipboard.on('success', function(e) {
    setTooltip('Copied!');
    hideTooltip();
});
clipboard.on('error', function(e) {
    setTooltip('Failed!');
    hideTooltip();
});

function CopyToClipboard(containerid) {
    $(".copy-link-button").popover('show');
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");

    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        // alert("Copied the link: "+ range); 
    }
    setTimeout(function() {
        $(".copy-link-button").popover('hide');
    }, 3000);
}

function multiwallet_data_filter(object, li__object, wallet_object, send_data) {
    object.closest('.m-dropdown__wrapper').hide()

    socket.emit("change_multi_wallet_filter", send_data, function(err, amount) {
        if (err == null) {
            wallet_object.find('.wallet-amount').html(amount)
        }
    })

    //Show seleced text
    if (send_data.filter_val != 'refresh') {
        object.parent().closest('ul').find('.la-ellipsis-h').hide()
        if (object.parent().closest('ul').find('.select_text').length == 0)
            object.parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
        object.parent().closest('ul').find('.select_text').html(li__object.find('span').html())
    }

    setTimeout(function() {
        object.closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
}

/***
 * -------------------------------------------------------------------------------
 * Get dashbaord multi wallet widget
 * -------------------------------------------------------------------------------
 */
$(document).ready(function() {

    $(".trading-wallet-filter .filter-options li").click(function() {
        send_data = {}
        send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')
        send_data.wallet_type = "trading_wallet"

        multiwallet_data_filter(
            $(".trading-wallet-filter .filter-options "),
            $(this),
            $('#dashboard_wallet1'),
            send_data
        )
    })

    $(".commission-wallet-filter .filter-options li").click(function() {
        send_data = {}
        send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')
        send_data.wallet_type = "commission_wallet"

        multiwallet_data_filter(
            $(".commission-wallet-filter .filter-options "),
            $(this),
            $('#dashboard_wallet2'),
            send_data
        )
    })

    $(".withdrawal-wallet-filter .filter-options li").click(function() {
        send_data = {}
        send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')
        send_data.wallet_type = "withdrawal_wallet"

        multiwallet_data_filter(
            $(".withdrawal-wallet-filter .filter-options "),
            $(this),
            $('#dashboard_wallet1'),
            send_data
        )
    })

    $(".teamsales_data_filter .filter-options li").click(function() {
        let li__object = $(".teamsales_data_filter .filter-options li")
        let filter_object = $(".teamsales_data_filter .filter-options")

        filter_object.closest('.m-dropdown__wrapper').hide()
        send_data = {}
        send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')

        changeTeamSalesWidget(send_data)
            //Show seleced text
        if (send_data.filter_val != 'refresh') {
            filter_object.parent().closest('ul').find('.la-ellipsis-h').hide()
            if (filter_object.parent().closest('ul').find('.select_text').length == 0)
                filter_object.parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
            filter_object.parent().closest('ul').find('.select_text').html($(this).find('span').html())
        }

        setTimeout(function() {
            filter_object.closest('.m-dropdown__wrapper').removeAttr('style')
        }, 1000);
    })

    //ss-changes for dashboard
    $(".withdrawal_data_filter .filter-options li").click(function() {
        let li__object = $(".withdrawal_data_filter .filter-options li")
        let filter_object = $(".withdrawal_data_filter .filter-options")

        filter_object.closest('.m-dropdown__wrapper').hide()
        send_data = {}
        send_data.filter_val = $(this).find('.m-nav__link-text').attr('id')
        changeEwalletWidget(send_data)
            //Show seleced text
        if (send_data.filter_val != 'refresh') {
            filter_object.parent().closest('ul').find('.la-ellipsis-h').hide()
            if (filter_object.parent().closest('ul').find('.select_text').length == 0)
                filter_object.parent().closest('ul').find('.la-ellipsis-h').after('<span class="select_text">')
            filter_object.parent().closest('ul').find('.select_text').html($(this).find('span').html())
        }

        setTimeout(function() {
            filter_object.closest('.m-dropdown__wrapper').removeAttr('style')
        }, 1000);
    })
    //ss-changes ned

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

        // update lifetime earnigs
        // $('.life-time-earnings--value').html( "$" + total__earnings )
        // update_earnings_progressbar()
    })

    socket.on('getUserPackageData', function(packageInformations) {
        if (packageInformations.current_package != undefined) {
            let html = '';
            let current_package = packageInformations.current_package
            html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="#" title="Current Package">';
            html += '<div class="m-portlet__body">';
            html += '<div class="m-iconbox__body">';
            html += '<div class="m-iconbox__icon align-self-center">';
            html += '<img src="/afl-resizer/' + current_package.image + '?size=50,50" alt="Current Package">'
            html += "</div>";
            html += '<div class="m-iconbox__desc align-self-center">';
            html += '<div class="m-iconbox__title">' + Trans.trans(current_package.title) + '</div>';
            html += '<div class="m-iconbox__content">' + Trans.trans("Current Package") + '</div>';
            html += '</div>';
            html += "</div>";
            html += "</div>";
            html += "</a>";
            $("#user-widget-3").html(html);
        }

        if (packageInformations.next_package != undefined) {
            let html = '';
            let next_package = packageInformations.next_package
            html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="#" title="Next Package">';
            html += '<div class="m-portlet__body">';
            html += '<div class="m-iconbox__body">';
            html += '<div class="m-iconbox__icon align-self-center">';
            html += '<img src="/afl-resizer/' + next_package.image + '?size=50,50" alt="Next Package">'
            html += "</div>";
            html += '<div class="m-iconbox__desc align-self-center">';
            html += '<div class="m-iconbox__title">' + Trans.trans(next_package.title) + '</div>';
            html += '<div class="m-iconbox__content">' + Trans.trans("Next Package") + '</div>';
            html += '</div>';
            html += "</div>";
            html += "</div>";
            html += "</a>";
            $("#user-widget-4").html(html);
        }
    });

    socket.on('getUserEarningsWidgetData', function(informations) {
        let total_earnings = 0
        let maximum_earnings = 0
        if (informations["total_earnings"] != undefined)
            total_earnings = informations["total_earnings"]

        if (informations["maximum_earnings"] != undefined)
            maximum_earnings = informations["maximum_earnings"]

        let percentage = 0
        if (maximum_earnings != 0) {
            percentage = ((total_earnings / maximum_earnings) * 100)
        }

        if (percentage != 0 && percentage < 1)
            percentage = 1

        if (percentage > 100)
            percentage = 100

        percentage = Math.floor(percentage)

        let html__tag = ''
        html__tag += '<div class="progress">\
										<div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: ' + percentage + '%;">\
											<span>' + percentage + '%</span>\
										</div>\
									</div>'
        $('.earnings-progress-bar').html(html__tag)
            // <span class="progress-indicator">$'+total_earnings+' / $'+maximum_earnings + '</span>\
            // 

        //update the reward
        if (informations["rank_reward"] != undefined)
            $(".dashboard-reward-title").html(informations["rank_reward"])

    })

    socket.on('getUserDailyProfitWidgetData', function(informations) {
        let html__tag = ''

        html__tag += '<div class="position-relative daily-profit-progressbar">\
															<div class="progress">\
																	<div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width:0%;">\
																			<span>0%</span>\
																	</div>\
																	<span class="progress-indicator"> 0 Days / 0 Days</span>\
															</div>\
													</div>\
													<span class="p-b-6 daily-profit-main-text" >\
															<h6>Daily Profit </h6>\
													</span>'

        if (typeof informations['latest'] != "undefined" && informations['latest'] != '') {
            html__tag = ''
            items = informations['latest']
            maximum_days = items["max_df"]
            days_paid = items['max_df'] - items["validity"]
            validity = items["validity"]
            title = items["title"]

            progress = (days_paid / maximum_days) * 100
            if (progress != 0 && progress < 1)
                progress = 1

            if (progress > 100)
                progress = 100

            progress = parseInt(progress)

            html__tag += '<div class="position-relative daily-profit-progressbar">\
															<div class="progress">\
																	<div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width:' + progress + '%;">\
																			<span>' + progress + ' %</span>\
																	</div>\
															</div>\
													</div>\
													<div class="p-b-6 daily-profit-main-text d-flex justify-content-between m--margin-bottom-25 mt-2">\
															<div class="daily-profit-title h6">Daily Profit - ' + title + '</div>\
                                                            <div class="daily-profit-value">' + days_paid + ' Days /' + maximum_days + ' days</div>\
													</div>'


        }
        $('.daily-profit-progressbar-wrapper').html(html__tag)

        if (typeof informations['others'] != "undefined" && informations['others'] != '') {
            if (!jQuery.isEmptyObject(informations['others'])) {
                html__tag = ''
                informations['others'].forEach(function(items, k) {

                    maximum_days = items["max_df"]
                    days_paid = items['max_df'] - items["validity"]
                    validity = items["validity"]
                    title = items["title"]

                    progress = (days_paid / maximum_days) * 100
                    if (progress != 0 && progress < 1)
                        progress = 1

                    if (progress > 100)
                        progress = 100

                    progress = parseInt(progress)
                    html__tag += '<li class="m-nav__item mt-3">\
																<div class="m-alert m-alert--outline alert alert-warning alert-dismissible fade show" role="alert">\
																<div class="m-widget24__stats m--font-metal text-center m--font-boldest"><b>' + title + '</b></div>\
																	<div class="m-widget4 m-widget4--progress">\
																		<div class="m-widget4__item p-2" style="width:100%;">\
																			<div class="m-widget4__progress p-0">\
																				<div class="m-widget4__progress-wrapper">\
																					<span class="m-widget17__progress-number">' + progress + '%</span>\
																					<span class="m-widget17__progress-label m--font-metal">' + days_paid + ' Days /' + maximum_days + ' Days</span>\
																				</div>\
																				<div class="progress">\
																						<div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: ' + progress + '%;"></div>\
																					</div>\
																			</div>\
																		</div>\
																	</div>\
																</div>\
															</li>'
                })
                $('.multiple-daily-profit-bar').html(html__tag)
            }
        } else {
            $('.daily-profit-filter-wrapper').remove()
        }
    })

    socket.on('getUserLifeTimeEarnings', function(lifetimeEarnings) {
        $('.life-time-earnings--value').html("$" + lifetimeEarnings)
    })
});





/**
 * ----------------------------------------------------------------------
 * Theme dashboard commission earnings
 * ----------------------------------------------------------------------
 */
function _theme_earnings_widget(value) {
    var text_amount = value.total
    var category = value.category

    var acronym = category.substr(0, 2);
    var short_name = acronym.toUpperCase();

    let html__tag = ''
    html__tag += '<div class="m-widget4">'
    html__tag += '<div class="m-widget4__item">'

    html__tag += '<div class="m-widget4__ext">'
    html__tag += '<span class="m-type m--bg-brand"><span class="m--font-light">' + short_name + '</span></span>'
    html__tag += '</div>'

    html__tag += '<div class="m-widget4__info">'
    html__tag += '<span class="m-widget4__text">' + category + '</span>'
    html__tag += '<span class="m-widget4__text pull-right transaction-amount"><h5 class="m-section__heading">' + text_amount + '</h5></span>'
    html__tag += '</div>'

    html__tag += '<div class="m-widget4__ext">'
    html__tag += '<span class="m-widget4__number m--font-info">'
    html__tag += '<button type="button" class="btn btn-brand m-btn m-btn--custom" disabled="disabled">More</button>'
    html__tag += '</span>'
    html__tag += '</div>'

    html__tag += '</div>'
    html__tag += '</div>'

    return html__tag
}


// socket.on('getTodoListWidget', function (data1) {
//     if (data1.todolist != undefined) {
//         var inner_html = ''
//         if (data1.todolist.profit != 0) {
//             // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Choose Profit Type</span></a>';
//             $(".profit-typ-item").attr("href","#");
//             $(".profit-typ-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
//         }

//         if (data1.todolist.wallet != 0) {
//             // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Update Wallet Address</span></a>';
//             // $(".profit-typ-item").attr("href","#");
//             $(".wallet-address-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
//         }
//         if (data1.todolist.phone != 0) {
//             // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Update Contact Number</span></a>';
//             $(".contact-number-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
//         }

//         if (data1.todolist.phone == 0 || data1.todolist.profit == 0 || data1.todolist.wallet == 0) {
//             // $('.todo-list-actions').html(inner_html)
//             $('.profit-typ-item').closest('.m-topbar__quick-actions').addClass("m-dropdown--open")
//         }
//     }
// });


$(document).ready(function() {

    socket.emit('getTodoList', function(data) {

    });

    socket.on('getTodoListWidget', function(data1) {
        if (data1.todolist != undefined) {
            var inner_html = ''
            if (data1.todolist.profit != 0) {
                // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Choose Profit Type</span></a>';
                $(".profit-typ-item").attr("href", "#");
                $(".profit-typ-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
            }

            if (data1.todolist.wallet != 0) {
                // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Update Wallet Address</span></a>';
                // $(".profit-typ-item").attr("href","#");
                $(".wallet-address-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
            }
            if (data1.todolist.phone != 0) {
                // inner_html += '<a href="#" class="m-nav-grid__item"><i class="m-nav-grid__icon  flaticon-suitcase"></i><span class="m-nav-grid__text text-primary">Update Contact Number</span></a>';
                $(".contact-number-item").append('<span class="todo-finished"><i class="fa fa-check" aria-hidden="true"></i></span>');
            }

            if (data1.todolist.phone == 0 || data1.todolist.profit == 0 || data1.todolist.wallet == 0) {
                // $('.todo-list-actions').html(inner_html)
                // $('.profit-typ-item').closest('.m-topbar__quick-actions').addClass("m-dropdown--open")
                $('.todolist-profit-type').find(".m--hide").removeClass('m--hide')
            }
        }
    });
});
/*   
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          Announcement widget-begin
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/
// Announcement_Display_Function();

// function Announcement_Display_Function() {
//     socket.on('getDashAnnouncementwidget', function(data) {
//         //Display Announcement
//         if (jQuery.isEmptyObject(data.announcements_notpopup) && jQuery.isEmptyObject(data.common_announce_key)) {
//             $("#announce").remove();
//             $(".carousel-data-not-popup").remove();
//             $(".announce_container ").remove();
//         }
//         if (jQuery.isEmptyObject(data.announcements_popup)) {
//             $("#announce-form").remove();
//         }
//         if (data.announcements_notpopup || data.common_announce_key) {
//             let carousel__li = ''
//             let carousel__item = ''
//             let carousel__icon = ''
//             let html__tag = ''
//             var flag = false;
//             data.announcements_notpopup.forEach(function(item, k) {
//                 carousel__li += '<li data-target="#carouselIndicator" style="bottom:3px;background-color:#999;" data-slide-to="' + k + '"></li>';
//                 if (k == 0) {
//                     carousel__item += '<div class="carousel-item active" style="min-height: 310px;padding: 40px;">';
//                     flag = true;
//                 } else {
//                     carousel__item += '<div class="carousel-item" style="min-height: 310px;padding: 40px;">';
//                 }
//                 carousel__item += '<div><h5>' + item.subject;
//                 carousel__item += '<button type="button" class="close Close_Btn " data-att-item="' + item.id + '">&times;</button></h5></div>';
//                 carousel__item += '<div class="col-sm-12  pt-4 p-0">';
//                 if (item.image) {
//                     carousel__item += '<div class="col-sm-2 float-left p-0"><img src="/afl-resizer/' + item.image + '?size=180,180&crop=smart" alt="First slide"></div>';
//                     carousel__item += '<div class="col-sm-10 float-left pl-5 text-justify"><p>' + item.message + '</p></div><div class="col-sm-10 float-left p-0 text-center"><p>' + item.created + '</p>';
//                     if (item.call_to_action) {
//                         carousel__item += '<a href="' + item.call_to_action + '" target="_blank"><button type="button"  style="border-radius:25px;" class=" btn btn-danger" data-att-item="' + item.id + '" data-action-url="' + item.call_to_action + '" >Proceed</button></a></div>';
//                     } else {
//                         carousel__item += '<button type="button"  style="border-radius:25px;" class="Close_Btn btn btn-danger" data-att-item="' + item.id + '" >Mark as Read</button></div>';
//                     }
//                 } else {
//                     carousel__item += '<div class="col-sm-12 float-left p-0 text-center"><p>' + item.message + '</p><br><p>' + item.created + '</p>';

//                     if (item.call_to_action) {
//                         carousel__item += '<a href="' + item.call_to_action + '" target="_blank"><button type="button"  style="border-radius:25px;" class=" btn btn-danger" data-att-item="' + item.id + '" data-action-url="' + item.call_to_action + '" >Proceed</button></a></div>';
//                     } else {
//                         carousel__item += '<button type="button"  style="border-radius:25px;" class="Close_Btn btn btn-danger" data-att-item="' + item.id + '" >Mark as Read</button></div>';
//                     }
//                 }
//                 carousel__item += '</div></div>'
//                 carousel__icon += '<a class="carousel-control-prev" id="next_icon" href="#carouselIndicator" role="button"  style="width:40px;min-height: 310px;" data-slide="prev" >\
//       <i class="fa fa-3x fa-angle-left font " ></i><span class="sr-only">Previous</span></a>\
//       <a class="carousel-control-next" href="#carouselIndicator" id="next_icon" role="button" style="width:40px;min-height: 310px;" data-slide="next" >\
//       <i  class="fa fa-3x fa-angle-right font "></i><span class="sr-only">Next</span></a>';
//                 html__tag = '<ol class="carousel-indicators" style="top: 240px;">' + carousel__li + '</ol><div class="carousel-inner">' + carousel__item + '</div>' + carousel__icon + '';
//             });
//             //             data.common_announce_key.forEach(function(item, k) {
//             //                 if (item == "PROFILE_NOT_UPDATED") {
//             //                     if (flag == true) {
//             //                         carousel__item += '<div class="carousel-item" style="min-height: 310px;">';
//             //                     } else {
//             //                         carousel__item += '<div class="carousel-item active" style="min-height: 310px;">';
//             //                         flag = true;
//             //                     }
//             //                     carousel__li += '<li data-target="#carouselIndicator" style="background-color:#999;" data-slide-to="' + k + '"></li>';
//             //                     carousel__item += Common_Announcements("Complete User Profile", "Please complete the user profiles. Do you want to update your profile now?", "/user/manage-profile/")
//             //                     carousel__item += '</div>'
//             //                 } else if (item == "USER_EXPIRED") {
//             //                     if (flag == true) {
//             //                         carousel__item += '<div class="carousel-item" style="min-height: 310px;">';
//             //                     } else {
//             //                         carousel__item += '<div class="carousel-item active" style="min-height: 310px;">';
//             //                         flag = true;
//             //                     }
//             //                     carousel__li += '<li data-target="#carouselIndicator" style="background-color:#999;" data-slide-to="' + k + '"></li>';
//             //                     carousel__item += Common_Announcements("Session Will Expire Soon", "Your session will expire in 10 days. Do you want to extend the session?", "/afl/genealogy-tree/")
//             //                     carousel__item += '</div>'
//             //                 } else if (item == "KYC_NOT_UPDATED") {
//             //                     if (flag == true) {
//             //                         carousel__item += '<div class="carousel-item" style="min-height: 310px;">';
//             //                     } else {
//             //                         carousel__item += '<div class="carousel-item active" style="min-height: 310px;">';
//             //                         flag = true;
//             //                     }
//             //                     carousel__li += '<li data-target="#carouselIndicator" style="background-color:#999;" data-slide-to="' + k + '"></li>';
//             //                     carousel__item += Common_Announcements("Update KYC Details", "Please update your kyc details.Do you want to update your Kyc now?", "/user/documents/")
//             //                     carousel__item += '</div>'
//             //                 } else if (item == "PAYOUT_NOT_UPDATED") {
//             //                     if (flag == true) {
//             //                         carousel__item += '<div class="carousel-item " style="min-height: 310px;">';
//             //                     } else {
//             //                         carousel__item += '<div class="carousel-item active" style="min-height: 310px;">';
//             //                         flag = true;
//             //                     }
//             //                     carousel__li += '<li data-target="#carouselIndicator" style="background-color:#999;" data-slide-to="' + k + '"></li>';
//             //                     carousel__item += Common_Announcements("Complete Payment Preferences", "Please complete the payment preference", "/afl/payout-payment-methods")
//             //                     carousel__item += '</div>'
//             //                 }
//             //                 carousel__icon = '<a class="carousel-control-prev" id="next_icon" href="#carouselIndicator" role="button"  style="width:40px;min-height: 250px;" data-slide="prev" >\
//             // <i class="fa fa-3x fa-angle-left font " ></i><span class="sr-only">Previous</span></a>\
//             // <a class="carousel-control-next" href="#carouselIndicator" id="next_icon" role="button" style="width:40px;min-height: 150px;" data-slide="next" >\
//             // <i  class="fa fa-3x fa-angle-right font "></i><span class="sr-only">Next</span></a>';
//             //                 html__tag = '<ol class="carousel-indicators">' + carousel__li + '</ol><div class="carousel-inner active">' + carousel__item + '</div>' + carousel__icon + '';
//             //             });
//             $(".carousel-data-not-popup").html(html__tag);
//         }
//         if (data.announcements_popup) {
//             let carousel__li__popup = ''
//             let carousel__item__popup = ''
//             let carousel__icon__popup = ''
//             let html__tag__popup = ''
//             let i = 0;
//             data.announcements_popup.forEach(function(item, k) {
//                 i++;
//                 carousel__li__popup += '<li data-target="#carouselIndicators" data-slide-to="' + k + '" style="background-color:#999;"></li>';
//                 if (k == 0) {
//                     carousel__item__popup += '<div class="carousel-item active">';
//                 } else {
//                     carousel__item__popup += '<div class="carousel-item">';
//                 }
//                 carousel__item__popup += '<div ><h5>' + item.subject;
//                 carousel__item__popup += '<button type="button" class="close Close_Btn" id="close_btn_id"  data-index="' + k + '" data-att-item="' + item.id + '" >&times;</button></h5></div>';
//                 carousel__item__popup += '<div class="col-sm-12  p-0 text-center">';
//                 if (item.image) {
//                     carousel__item__popup += '<img src="/afl-resizer/' + item.image + '?size=160,160&crop=smart" alt="First slide">';
//                     carousel__item__popup += '<div class="col-sm-12 p-0 pt-3 text-justify"><p>' + item.message + '</p></div><div class="col-sm-12 p-0 text-center"><p>' + item.created + '</p>';
//                     if (item.call_to_action) {
//                         carousel__item__popup += '<a href="' + item.call_to_action + '" target="_blank"><button type="button"  style="border-radius:25px;" class=" btn btn-danger" data-att-item="' + item.id + '" data-action-url="' + item.call_to_action + '" >Proceed</button></a></div>';
//                     } else {
//                         carousel__item__popup += '<button type="button"  style="border-radius:25px;" class="Close_Btn btn btn-danger"  data-att-item="' + item.id + '" >Mark as Read</button></div>';
//                     }
//                 } else {
//                     carousel__item__popup += '<div class="col-sm-12 float-left  text-justify" style="padding:50px 0 10px 0;"><p>' + item.message + '</p></div><div class="col-sm-12   text-center" ><p>' + item.created + '</p>';
//                     if (item.call_to_action) {
//                         carousel__item__popup += '<a href="' + item.call_to_action + '" target="_blank"><button type="button"  style="border-radius:25px;" class=" btn btn-danger" data-att-item="' + item.id + '" data-action-url="' + item.call_to_action + '" >Proceed</button></a></div>';
//                     } else {
//                         carousel__item__popup += '<button type="button"  style="border-radius:25px;" class="Close_Btn btn btn-danger" data-att-item="' + item.id + '" >Mark as Read</button></div>';
//                     }
//                 }
//                 carousel__item__popup += '</div></div>'
//                 carousel__icon__popup += '<a class="carousel-control-prev" id="next_icon" href="#carouselIndicators" role="button"  style="width:40px;min-height: 550px;" data-slide="prev" >\
//         <i class="fa fa-3x fa-angle-left font " ></i><span class="sr-only">Previous</span></a>\
//         <a class="carousel-control-next" href="#carouselIndicators" id="next_icon" role="button" style="width:40px;min-height: 550px;" data-slide="next" >\
//         <i class="fa fa-3x fa-angle-right font "></i><span class="sr-only">Next</span></a>';
//             });
//             if (i == 0) {
//                 $('#announce-form').modal('hide');
//                 $('.modal-backdrop').addClass("d-none")
//             }
//             html__tag__popup = '<ol class="carousel-indicators" style="top:490px;position: relative;">' + carousel__li__popup + '</ol><div class="carousel-inner">' + carousel__item__popup + '</div>' + carousel__icon__popup + '';
//             if ($('#announce-form').length) {
//                 $(".carousel-data-popup").html(html__tag__popup);
//                 $('#announce-form').modal('show');
//             } else {
//                 $('#announce-form').modal('hide');
//                 $('.modal-backdrop').addClass("d-none")
//             }
//         }
//     });

// }
// -------Onclick Event Close Btn-----------
// $(document).on('click', '.Close_Btn', function() {
//     swal({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, close it!'
//     }).then((result) => {
//         if (result.value) {
//             var announce_id = $(this).attr('data-att-item');
//             add_user_view_histroy('POST', announce_id);
//         }
//     });
// });

// function add_user_view_histroy(method, announce_id = {}) {
//     var action_url = $('.announcement-close-url').val();
//     var user_id = $('.announcement-user-id').val();
//     $.ajax({
//         url: action_url,
//         type: method,
//         data: { 'announce_id': announce_id, 'user_id': user_id },
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
//         },
//         success: function(result) {
//             getDashAnnouncementwidget();
//         },
//         error: function(data3) {
//             alert("Error" + data3);
//         }
//     });
// }

// ----Common Announcements alerts programmatically --------
// function Common_Announcements(subject, message, call_to_action) {
//     let carousel__item = '<div class="p-5"><h5>' + subject;
//     carousel__item += '</h5>';
//     carousel__item += '<div class="col-sm-12  p-5 text-center"><p>' + message + '</p>';
//     carousel__item += '<a href="' + call_to_action + '" target="_blank"><button type="button"  style="border-radius:25px;" class=" btn btn-danger" >Proceed</button></a></div></div>';
//     return carousel__item
// }

function getWalletTemplate(wallet, data, url) {
    let html_data = '';
    let method_prefix = {}
    let show_all = document.location.href.includes('profile-summary')
    method_prefix = { 'USD': 'usd_svg', 'BTC': 'btc_svg', 'ETH': 'eth_svg', 'EUR': 'eur_svg' }
    html_data += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded ' + data.extra_class[0] + '">';
    html_data += '<div class="m-portlet__body">'
    html_data += '<div class="m-widget31">'
    html_data += '<div class="m-widget31-head">'
    html_data += '<div class="m-widget31__icon">'
    if (window[method_prefix[data.currency]] != undefined)
        html_data += window[method_prefix[data.currency]](data.extra_class[1])
    html_data += '</div>'
    if(!show_all){
        html_data += '<div class="m-widget31__links text-right">'
        html_data += '<a href="/' + language + '/' + username + '/' + geo + "/" + site_prefix + url + '" class="btn btn-sm ' + data.extra_class[2] + ' m-widget31__btn-sm">'
        html_data += Trans.trans('Show All')
        html_data += '</a>'
        html_data += '</div>'
    }
    html_data += '</div>'
    html_data += '<div class="m-widget31__body">'
    html_data += '<div class="m-widget31__title">' + data.amount + '</div>'
    html_data += '<div class="m-widget31__desc">' + Trans.trans(multiwallet_names[wallet]) + '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div >'

    return html_data

}

function usd_svg(color_class) {
    let html_data = ''
    html_data += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="m-svg-icon ' + color_class + '">'
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
    html_data += '<rect x="0" y="0" width="24" height="24" />'
    html_data += '<rect fill="#000000" opacity="0.3" x="11.5" y="2" width="2" height="4" rx="1" />'
    html_data += '<rect fill="#000000" opacity="0.3" x="11.5" y="16" width="2" height="5" rx="1" />'
    html_data += '<path d="M15.493,8.044 C15.2143319,7.68933156 14.8501689,7.40750104 14.4005,7.1985 C13.9508311,6.98949895 13.5170021,6.885 13.099,6.885 C12.8836656,6.885 12.6651678,6.90399981 12.4435,6.942 C12.2218322,6.98000019 12.0223342,7.05283279 11.845,7.1605 C11.6676658,7.2681672 11.5188339,7.40749914 11.3985,7.5785 C11.2781661,7.74950085 11.218,7.96799867 11.218,8.234 C11.218,8.46200114 11.2654995,8.65199924 11.3605,8.804 C11.4555005,8.95600076 11.5948324,9.08899943 11.7785,9.203 C11.9621676,9.31700057 12.1806654,9.42149952 12.434,9.5165 C12.6873346,9.61150047 12.9723317,9.70966616 13.289,9.811 C13.7450023,9.96300076 14.2199975,10.1308324 14.714,10.3145 C15.2080025,10.4981676 15.6576646,10.7419985 16.063,11.046 C16.4683354,11.3500015 16.8039987,11.7268311 17.07,12.1765 C17.3360013,12.6261689 17.469,13.1866633 17.469,13.858 C17.469,14.6306705 17.3265014,15.2988305 17.0415,15.8625 C16.7564986,16.4261695 16.3733357,16.8916648 15.892,17.259 C15.4106643,17.6263352 14.8596698,17.8986658 14.239,18.076 C13.6183302,18.2533342 12.97867,18.342 12.32,18.342 C11.3573285,18.342 10.4263378,18.1741683 9.527,17.8385 C8.62766217,17.5028317 7.88033631,17.0246698 7.285,16.404 L9.413,14.238 C9.74233498,14.6433354 10.176164,14.9821653 10.7145,15.2545 C11.252836,15.5268347 11.7879973,15.663 12.32,15.663 C12.5606679,15.663 12.7949989,15.6376669 13.023,15.587 C13.2510011,15.5363331 13.4504991,15.4540006 13.6215,15.34 C13.7925009,15.2259994 13.9286662,15.0740009 14.03,14.884 C14.1313338,14.693999 14.182,14.4660013 14.182,14.2 C14.182,13.9466654 14.1186673,13.7313342 13.992,13.554 C13.8653327,13.3766658 13.6848345,13.2151674 13.4505,13.0695 C13.2161655,12.9238326 12.9248351,12.7908339 12.5765,12.6705 C12.2281649,12.5501661 11.8323355,12.420334 11.389,12.281 C10.9583312,12.141666 10.5371687,11.9770009 10.1255,11.787 C9.71383127,11.596999 9.34650161,11.3531682 9.0235,11.0555 C8.70049838,10.7578318 8.44083431,10.3968355 8.2445,9.9725 C8.04816568,9.54816454 7.95,9.03200304 7.95,8.424 C7.95,7.67666293 8.10199848,7.03700266 8.406,6.505 C8.71000152,5.97299734 9.10899753,5.53600171 9.603,5.194 C10.0970025,4.85199829 10.6543302,4.60183412 11.275,4.4435 C11.8956698,4.28516587 12.5226635,4.206 13.156,4.206 C13.9160038,4.206 14.6918294,4.34533194 15.4835,4.624 C16.2751706,4.90266806 16.9686637,5.31433061 17.564,5.859 L15.493,8.044 Z" fill="#000000" />'
    html_data += '</g>'
    html_data += '</svg>'
    return html_data
}

function btc_svg(color_class) {
    let html_data = ''
    html_data += '<svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" class="m-svg-icon ' + color_class + '" >';
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
    html_data += '<rect x="0" y="0" width="24" height="24" />';
    html_data += '<rect fill="#000000" opacity="0.3" x="11" y="2" width="2" height="5" rx="1" />';
    html_data += '<rect fill="#000000" opacity="0.3" x="11" y="16" width="2" height="5" rx="1" />';
    html_data += '<path d="M17.875,14.086 C17.875,14.8206703 17.7293348,15.4381642 17.438,15.9385 C17.1466652,16.4388358 16.7603357,16.8409985 16.279,17.145 C15.7976643,17.4490015 15.2498364,17.6674993 14.6355,17.8005 C14.0211636,17.9335007 13.3910032,18 12.745,18 L7,18 L7,4.548 L12.745,4.548 C13.2643359,4.548 13.7963306,4.60183279 14.341,4.7095 C14.8856694,4.8171672 15.3796644,5.00083204 15.823,5.2605 C16.2663356,5.52016796 16.6273319,5.87166445 16.906,6.315 C17.1846681,6.75833555 17.324,7.32199658 17.324,8.006 C17.324,8.75333707 17.1213354,9.3708309 16.716,9.8585 C16.3106646,10.3461691 15.77867,10.6976656 15.12,10.913 C15.5000019,11.0143337 15.8578317,11.1314991 16.1935,11.3025 C16.5291683,11.4735009 16.8204988,11.6919987 17.0675,11.958 C17.3145012,12.2240013 17.5108326,12.5343316 17.6565,12.889 C17.8021674,13.2436684 17.875,13.6426645 17.875,14.086 Z M14.189,8.443 C14.189,7.98699772 14.0148351,7.65450105 13.6665,7.4455 C13.3181649,7.23649896 12.8020034,7.132 12.118,7.132 L10.522,7.132 L10.522,9.906 L12.27,9.906 C12.878003,9.906 13.3498317,9.78250124 13.6855,9.5355 C14.0211683,9.28849877 14.189,8.92433574 14.189,8.443 Z M14.626,13.782 C14.626,13.2246639 14.4170021,12.8383344 13.999,12.623 C13.5809979,12.4076656 13.0236701,12.3 12.327,12.3 L10.522,12.3 L10.522,15.378 L12.346,15.378 C12.5993346,15.378 12.8621653,15.3558336 13.1345,15.3115 C13.4068347,15.2671664 13.6538322,15.1880006 13.8755,15.074 C14.0971678,14.9599994 14.277666,14.798501 14.417,14.5895 C14.556334,14.380499 14.626,14.111335 14.626,13.782 Z" fill="#000000" />';
    html_data += '</g>';
    html_data += '</svg >';
    return html_data
}

function eth_svg(color_class) {
    let html_data = ''
    html_data += '<svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" class="m-svg-icon ' + color_class + '" >';
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
    html_data += '<rect x="0" y="0" width="24" height="24" />';
    html_data += '<path d="M4.3618034,10.2763932 L4.8618034,9.2763932 C4.94649941,9.10700119 5.11963097,9 5.30901699,9 L15.190983,9 C15.4671254,9 15.690983,9.22385763 15.690983,9.5 C15.690983,9.57762255 15.6729105,9.65417908 15.6381966,9.7236068 L15.1381966,10.7236068 C15.0535006,10.8929988 14.880369,11 14.690983,11 L4.80901699,11 C4.53287462,11 4.30901699,10.7761424 4.30901699,10.5 C4.30901699,10.4223775 4.32708954,10.3458209 4.3618034,10.2763932 Z M14.6381966,13.7236068 L14.1381966,14.7236068 C14.0535006,14.8929988 13.880369,15 13.690983,15 L4.80901699,15 C4.53287462,15 4.30901699,14.7761424 4.30901699,14.5 C4.30901699,14.4223775 4.32708954,14.3458209 4.3618034,14.2763932 L4.8618034,13.2763932 C4.94649941,13.1070012 5.11963097,13 5.30901699,13 L14.190983,13 C14.4671254,13 14.690983,13.2238576 14.690983,13.5 C14.690983,13.5776225 14.6729105,13.6541791 14.6381966,13.7236068 Z" fill="#000000" opacity="0.3" />';
    html_data += '<path d="M17.369,7.618 C16.976998,7.08599734 16.4660031,6.69750122 15.836,6.4525 C15.2059968,6.20749878 14.590003,6.085 13.988,6.085 C13.2179962,6.085 12.5180032,6.2249986 11.888,6.505 C11.2579969,6.7850014 10.7155023,7.16999755 10.2605,7.66 C9.80549773,8.15000245 9.45550123,8.72399671 9.2105,9.382 C8.96549878,10.0400033 8.843,10.7539961 8.843,11.524 C8.843,12.3360041 8.96199881,13.0779966 9.2,13.75 C9.43800119,14.4220034 9.7774978,14.9994976 10.2185,15.4825 C10.6595022,15.9655024 11.1879969,16.3399987 11.804,16.606 C12.4200031,16.8720013 13.1129962,17.005 13.883,17.005 C14.681004,17.005 15.3879969,16.8475016 16.004,16.5325 C16.6200031,16.2174984 17.1169981,15.8010026 17.495,15.283 L19.616,16.774 C18.9579967,17.6000041 18.1530048,18.2404977 17.201,18.6955 C16.2489952,19.1505023 15.1360064,19.378 13.862,19.378 C12.6999942,19.378 11.6325049,19.1855019 10.6595,18.8005 C9.68649514,18.4154981 8.8500035,17.8765035 8.15,17.1835 C7.4499965,16.4904965 6.90400196,15.6645048 6.512,14.7055 C6.11999804,13.7464952 5.924,12.6860058 5.924,11.524 C5.924,10.333994 6.13049794,9.25950479 6.5435,8.3005 C6.95650207,7.34149521 7.5234964,6.52600336 8.2445,5.854 C8.96550361,5.18199664 9.8159951,4.66400182 10.796,4.3 C11.7760049,3.93599818 12.8399943,3.754 13.988,3.754 C14.4640024,3.754 14.9609974,3.79949954 15.479,3.8905 C15.9970026,3.98150045 16.4939976,4.12149906 16.97,4.3105 C17.4460024,4.49950095 17.8939979,4.7339986 18.314,5.014 C18.7340021,5.2940014 19.0909985,5.62999804 19.385,6.022 L17.369,7.618 Z" fill="#000000" />';
    html_data += '</g>';
    html_data += '</svg >';
    return html_data
}

function eur_svg(color_class) {
    let html_data = ''
    html_data += '<svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="m-svg-icon ' + color_class + '" >';
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
    html_data += '<rect x="0" y="0" width="24" height="24" />'
    html_data += '<path d="M4.3618034,10.2763932 L4.8618034,9.2763932 C4.94649941,9.10700119 5.11963097,9 5.30901699,9 L15.190983,9 C15.4671254,9 15.690983,9.22385763 15.690983,9.5 C15.690983,9.57762255 15.6729105,9.65417908 15.6381966,9.7236068 L15.1381966,10.7236068 C15.0535006,10.8929988 14.880369,11 14.690983,11 L4.80901699,11 C4.53287462,11 4.30901699,10.7761424 4.30901699,10.5 C4.30901699,10.4223775 4.32708954,10.3458209 4.3618034,10.2763932 Z M14.6381966,13.7236068 L14.1381966,14.7236068 C14.0535006,14.8929988 13.880369,15 13.690983,15 L4.80901699,15 C4.53287462,15 4.30901699,14.7761424 4.30901699,14.5 C4.30901699,14.4223775 4.32708954,14.3458209 4.3618034,14.2763932 L4.8618034,13.2763932 C4.94649941,13.1070012 5.11963097,13 5.30901699,13 L14.190983,13 C14.4671254,13 14.690983,13.2238576 14.690983,13.5 C14.690983,13.5776225 14.6729105,13.6541791 14.6381966,13.7236068 Z" fill="#000000" opacity="0.3" />';
    html_data += '<path d="M17.369,7.618 C16.976998,7.08599734 16.4660031,6.69750122 15.836,6.4525 C15.2059968,6.20749878 14.590003,6.085 13.988,6.085 C13.2179962,6.085 12.5180032,6.2249986 11.888,6.505 C11.2579969,6.7850014 10.7155023,7.16999755 10.2605,7.66 C9.80549773,8.15000245 9.45550123,8.72399671 9.2105,9.382 C8.96549878,10.0400033 8.843,10.7539961 8.843,11.524 C8.843,12.3360041 8.96199881,13.0779966 9.2,13.75 C9.43800119,14.4220034 9.7774978,14.9994976 10.2185,15.4825 C10.6595022,15.9655024 11.1879969,16.3399987 11.804,16.606 C12.4200031,16.8720013 13.1129962,17.005 13.883,17.005 C14.681004,17.005 15.3879969,16.8475016 16.004,16.5325 C16.6200031,16.2174984 17.1169981,15.8010026 17.495,15.283 L19.616,16.774 C18.9579967,17.6000041 18.1530048,18.2404977 17.201,18.6955 C16.2489952,19.1505023 15.1360064,19.378 13.862,19.378 C12.6999942,19.378 11.6325049,19.1855019 10.6595,18.8005 C9.68649514,18.4154981 8.8500035,17.8765035 8.15,17.1835 C7.4499965,16.4904965 6.90400196,15.6645048 6.512,14.7055 C6.11999804,13.7464952 5.924,12.6860058 5.924,11.524 C5.924,10.333994 6.13049794,9.25950479 6.5435,8.3005 C6.95650207,7.34149521 7.5234964,6.52600336 8.2445,5.854 C8.96550361,5.18199664 9.8159951,4.66400182 10.796,4.3 C11.7760049,3.93599818 12.8399943,3.754 13.988,3.754 C14.4640024,3.754 14.9609974,3.79949954 15.479,3.8905 C15.9970026,3.98150045 16.4939976,4.12149906 16.97,4.3105 C17.4460024,4.49950095 17.8939979,4.7339986 18.314,5.014 C18.7340021,5.2940014 19.0909985,5.62999804 19.385,6.022 L17.369,7.618 Z" fill="#000000" />';
    html_data += '</g>';
    html_data += '</svg>';
    return html_data
}

function getRankTemplate(data, description, url) {
    let html = ""
    if (data.rank != undefined) {
        let item = data.rank
        let highest_rank = data.next_rank
        if (description == "Current Rank" && highest_rank == 0 && item.title != 'Active'){
           var  label = "flaticon-alert-2 text-info pl-4"
        }
        else{
            label = ""
        }
        let include_profile = document.location.href.includes('profile-summary')
        if (item != undefined) {
            if (url != ""){
                if(!include_profile){
                    html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + url + '" title="Current Rank">';
                }else{
                    html += '<span class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" title="Current Rank">';
                }
            }else{
                html += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" style:"text_decoration:none;" title="Current Rank">';
            }
            html += '<div class="m-portlet__body">';
            html += '<div class="m-iconbox__body">';
            html += '<div class="m-iconbox__icon align-self-center">';
            // html += '<img src="' + item.image + '?size=50,50" alt="Current Rank">'
            html += `<img src=" ${item.image}" alt="${Trans.trans('Current Rank')}">`
            html += "</div>";
            html += '<div class="m-iconbox__desc align-self-center">';
            html += '<div class="m-iconbox__title">' + Trans.trans(item.title) + '</div>';
            html += '<div class="m-iconbox__content">' + Trans.trans(description) + '</div>';
            html += '</div>';
            if (!highest_rank) {
                html += '<i data-toggle="m-tooltip" data-placement="top" title="" data-html="true" class='+label+' data-content="You have achieved the top rank." data-original-title=""></i>';
            }
            html += "</div>";
            html += "</div>";
            html += "</div>";
            return html
        }
    }
}

function getActiveDaysTemplate(data) {
    let html = ""
    if (data.days != undefined) {
        html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="javascript:void(0);" title="Member Since">';
        html += '<div class="m-portlet__body">';
        html += '<div class="m-iconbox__body">';
        html += '<div class="m-iconbox__icon align-self-center">';
        html += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 24 24" version="1.1" class="m-svg-icon m-svg-icon--brand">';
        html += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
        html += '<rect x="0" y="0" width="24" height="24" />';
        html += '<path d="M12,22 C7.02943725,22 3,17.9705627 3,13 C3,8.02943725 7.02943725,4 12,4 C16.9705627,4 21,8.02943725 21,13 C21,17.9705627 16.9705627,22 12,22 Z" fill="#000000" opacity="0.3" />';
        html += '<path d="M11.9630156,7.5 L12.0475062,7.5 C12.3043819,7.5 12.5194647,7.69464724 12.5450248,7.95024814 L13,12.5 L16.2480695,14.3560397 C16.403857,14.4450611 16.5,14.6107328 16.5,14.7901613 L16.5,15 C16.5,15.2109164 16.3290185,15.3818979 16.1181021,15.3818979 C16.0841582,15.3818979 16.0503659,15.3773725 16.0176181,15.3684413 L11.3986612,14.1087258 C11.1672824,14.0456225 11.0132986,13.8271186 11.0316926,13.5879956 L11.4644883,7.96165175 C11.4845267,7.70115317 11.7017474,7.5 11.9630156,7.5 Z" fill="#000000" />';
        html += '</g>';
        html += '</svg>';
        html += "</div>";
        html += '<div class="m-iconbox__desc align-self-center">';
        html += '<div class="m-iconbox__title">' + data.days + Trans.trans(" Days") + '</div>';
        html += '<div class="m-iconbox__content">' + Trans.trans("Member Since") + '</div>';
        html += '</div>';
        html += "</div>";
        html += "</div>";
        html += "</a>";
        return html
    }
}

function getPackageTemplate(data, description, url) {
    let html = ""
    if (data != undefined) {
        let user_package = {}
        let user_package_title = ""
        let highest_pack = false
        if (data.widget == "current_package"){
            if (data.current_package['next_cron_date']!= "Unlimited"){
                var display_data = new Date(data.current_package['next_cron_date']).toLocaleDateString();
            }else{
               var display_data = "Unlimited"
            }
        }


        if (data.widget == "current_package"){
            user_package = data.current_package
            user_package_title = "Current Package"
            if (user_package.highest_package){
                highest_pack = true
            }
        }else if (data.widget == "next_package"){
            user_package = data.next_package
            user_package_title = "Next Package"
        }
        if (user_package != undefined) {
            if(typeof profile == 'undefined'){
                html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + url + '" title="'+ user_package_title +'">';
            }else{
                html += '<a style="cursor:auto;" class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="javascript:void(0);" title="'+ user_package_title +'">';
            }
            html += '<div class="m-portlet__body">';
            html += '<div class="m-iconbox__body">';
            html += '<div class="m-iconbox__icon align-self-center">';
            html += '<img src="' + user_package.image + '?size=50,50" alt="'+ user_package_title +'">'
            html += "</div>";
            html += '<div class="m-iconbox__desc align-self-center">';
            html += '<div class="m-iconbox__title">' + Trans.trans(user_package.title) + '</div>';
            html += '<div class="m-iconbox__content">' + Trans.trans(description) + '</div>';
            if (data.widget == "current_package"){
                if (data.is_eligible != undefined && data.is_eligible == '0'){
                    html = html.replace('<div class="m-iconbox__content">' + Trans.trans(description) + '</div>', '');
                    html += `<div class="m-iconbox__description text-danger" style="font-size:16px; text-align:center; font-weight:bold;">${Trans.trans("Proceed to Renew")} </div>`;
                }else{
                    html += `<div class="m-iconbox__description text-danger" style="font-size:16px">${Trans.trans("Valid Upto")} : ${display_data} </div>`;
                }
            }
            html += '</div>';
            if (highest_pack){
                html += '<i data-toggle="m-tooltip" data-placement="top" title="" data-html="true" class="flaticon-alert-2 text-info pl-4" data-content="You have the highest package" data-original-title=""></i>';
            }
            html += "</div>";
            html += "</div>";
            html += "</a>";
            return html
        }
    }
}

function getRefmembersTemplate(data, url) {
    let html = ""
    let profilePage = false
    profilePage = document.location.href.includes('profile-summary')
    if (data != undefined) {
        if(profilePage) {
            html += '<a style="cursor:auto" class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="javascript:void(0);" title="Refered members">';
        }else{
            html += '<a class="m-portlet m-portlet--height-fluid m-portlet--rounded m-iconbox m-iconbox--animate-slow" href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + url + '" title="Refered members">';
        }
        html += '<div class="m-portlet__body">';
        html += '<div class="m-iconbox__body">';
        html += '<div class="m-iconbox__icon align-self-center">';
        html += '<svg version = "1.1" id = "Layer_1" xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" x = "0px" y = "0px" width = "24px" height = "24px" viewBox = "0 0 24 24" enable - background="new 0 0 24 24" xml: space = "preserve" >';
        html += '<g id="Stockholm-icons-_x2F_-Communication-_x2F_-Group">';
        html += '<polygon id="Shape" fill="none" points="0,0 24,0 24,24 0,24 	" />';
        html += '<path id="Combined-Shape" opacity="0.3" fill="#5D78FF" enable-background="new    " d="M18,14c-1.656,0-3-1.344-3-3 c0-1.657,1.344-3,3-3s3,1.343,3,3C21,12.656,19.656,14,18,14z M9,11c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S11.209,11,9,11z"/>';
        html += '<path id="Combined-Shape_1_" fill="#5D78FF" d="M17.602,15c3.406,0.038,6.188,1.76,6.396,5.4c0.009,0.146,0,0.6-0.542,0.6H19.6 C19.6,18.749,18.856,16.672,17.602,15z M0,20.199C0.388,15.427,4.262,13,8.983,13c4.788,0,8.722,2.293,9.015,7.2 c0.012,0.195,0,0.8-0.752,0.8c-3.705,0-9.211,0-16.519,0C0.477,21-0.021,20.459,0,20.199z"/>';
        html += '</g>';
        html += '</svg >';

        // html += '<img src="/media/dashboard/referral-member.svg" alt="Referal Members">'
        html += "</div>";
        html += '<div class="m-iconbox__desc align-self-center">';
        html += '<div class="m-iconbox__title text-center">' + data.ref_members.count + '</div>';
        html += '<div class="m-iconbox__content">' + Trans.trans("Referred Members") + '</div>';
        html += '</div>';
        html += "</div>";
        html += "</div>";
        html += "</a>";
    }
    return html
}

function activeEpinCountTemplate(data, url) {
    let html_data = '';
    html_data += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded ' + data.extra_class[0] + '">';
    html_data += '<div class="m-portlet__body">'
    html_data += '<div class="m-widget31">'
    html_data += '<div class="m-widget31-head">'
    html_data += '<div class="m-widget31__icon">'
    html_data += '<svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" class="m-svg-icon ' + data.extra_class[1] + '" >'
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
    html_data += '<rect x="0" y="0" width="24" height="24" />'
    html_data += '<rect fill="#000000" opacity="0.3" x="2" y="5" width="20" height="14" rx="2" />'
    html_data += '<rect fill="#000000" x="2" y="8" width="20" height="3" />'
    html_data += '<rect fill="#000000" opacity="0.3" x="16" y="14" width="4" height="2" rx="1" />'
    html_data += '</g>'
    html_data += '</svg >'
    html_data += '</div>'
    html_data += '<div class="m-widget31__links text-right">'
    html_data += '<a href="/' + language + '/' + username + '/' + geo + '/' + site_prefix + url + '" class="btn btn-sm ' + data.extra_class[2] + ' m-widget31__btn-sm">'
    html_data += Trans.trans('Show All')
    html_data += '</a>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '<div class="m-widget31__body">'
    html_data += '<div class="m-widget31__title">' + data.count + '</div>'
    html_data += '<div class="m-widget31__desc">' + Trans.trans("Prepaid Cards") + '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div >'

    return html_data
}

function leadsAndContactsTemplate(data, url) {
    let html_data = '';
    html_data += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded ' + data.extra_class[0] + '">';
    html_data += '<div class="m-portlet__body">'
    html_data += '<div class="m-widget31">'
    html_data += '<div class="m-widget31-head">'
    html_data += '<div class="m-widget31__icon">'
    html_data += '<svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" class="m-svg-icon ' + data.extra_class[1] + '" >'
    html_data += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
    html_data += '<rect x="0" y="0" width="24" height="24" />'
    html_data += '<path d="M18,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,19 C23,20.6568542 21.6568542,22 20,22 L18,22 L18,2 Z" fill="#000000" opacity="0.3" />'
    html_data += '<path d="M5,2 L17,2 C18.6568542,2 20,3.34314575 20,5 L20,19 C20,20.6568542 18.6568542,22 17,22 L5,22 C4.44771525,22 4,21.5522847 4,21 L4,3 C4,2.44771525 4.44771525,2 5,2 Z M12,11 C13.1045695,11 14,10.1045695 14,9 C14,7.8954305 13.1045695,7 12,7 C10.8954305,7 10,7.8954305 10,9 C10,10.1045695 10.8954305,11 12,11 Z M7.00036205,16.4995035 C6.98863236,16.6619875 7.26484009,17 7.4041679,17 C11.463736,17 14.5228466,17 16.5815,17 C16.9988413,17 17.0053266,16.6221713 16.9988413,16.5 C16.8360465,13.4332455 14.6506758,12 11.9907452,12 C9.36772908,12 7.21569918,13.5165724 7.00036205,16.4995035 Z" fill="#000000" />'
    html_data += '</g>'
    html_data += '</svg >'
    html_data += '</div>'
    html_data += '<div class="m-widget31__links text-right">'
    html_data += '<a href="/' + language + '/' + username + '/' + geo + "/" + site_prefix + url + '" class="btn btn-sm ' + data.extra_class[2] + ' m-widget31__btn-sm">'
    html_data += Trans.trans('Show All')
    html_data += '</a>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '<div class="m-widget31__body">'
    html_data += '<div class="m-widget31__title">' + data.count + '</div>'
    html_data += '<div class="m-widget31__desc">' + Trans.trans("Leads and Contacts") + '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div >'

    return html_data
}

function studayMaterialsTemplate(data, url) {
    let html_data = '';
    html_data += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded ' + data.extra_class[0] + '">';
    html_data += '<div class="m-portlet__body">'
    html_data += '<div class="m-widget31">'
    html_data += '<div class="m-widget31-head">'
    html_data += '<div class="m-widget31__icon">'
    html_data += '<svg version = "1.1" xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" enable - background="new 0 0 24 24" xml: space = "preserve" class="m-svg-icon ' + data.extra_class[1] + '" >'
    html_data += '<g id="Stockholm-icons-_x2F_-Media-_x2F_-Media-library1">'
    html_data += '<rect id="bound" fill="none" width="24" height="24" />'
    html_data += '<path enable-background="new    " d="M20,9H4c-1.104,0-2,0.896-2,2v9c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2v-9C22,9.896,21.104,9,20,9z M15.991,15.304l-3.3,4.948c-0.139,0.208-0.373,0.334-0.623,0.334c-0.414,0-0.75-0.336-0.75-0.75v-2.974H8.631c-0.147,0-0.292-0.043-0.416-0.125c-0.344-0.23-0.438-0.696-0.207-1.041l3.299-4.948c0.139-0.209,0.373-0.334,0.624-0.334c0.415,0,0.75,0.335,0.75,0.75v2.974h2.687c0.148,0,0.293,0.043,0.416,0.125C16.128,14.493,16.221,14.958,15.991,15.304z"/>'
    html_data += '<path id="Rectangle-116-Copy" opacity="0.3" enable-background="new    " d="M5.5,5h13C18.776,5,19,5.224,19,5.5v1C19,6.776,18.776,7,18.5,7h-13C5.224,7,5,6.776,5,6.5v-1C5,5.224,5.224,5,5.5,5z"/>'
    html_data += '<path id="Rectangle-116-Copy-2" opacity="0.3" enable-background="new    " d="M7.5,1h9C16.776,1,17,1.224,17,1.5v1C17,2.776,16.776,3,16.5,3h-9C7.224,3,7,2.776,7,2.5v-1C7,1.224,7.224,1,7.5,1z"/>'
    html_data += '</g>'
    html_data += '</svg >'
    html_data += '</div>'
    html_data += '<div class="m-widget31__links text-right">'
    html_data += '<a href="/' + language + '/' + username + '/' + geo + "/" + url + '" class="btn btn-sm ' + data.extra_class[2] + ' m-widget31__btn-sm">'
    html_data += Trans.trans('Show All')
    html_data += '</a>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '<div class="m-widget31__body">'
    html_data += '<div class="m-widget31__title">' + data.count + '</div>'
    html_data += '<div class="m-widget31__desc">' + Trans.trans("Study Materials") + '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div>'
    html_data += '</div >'

    return html_data
}

function business_development_block(data) {
    
    var html = ""
    html += '<div class="m-portlet m-portlet--height-fluid m-portlet--rounded">';
    html += '<div class="m-portlet__head">';
    html += '<div class="m-portlet__head-caption">';
    html += '<div class="m-portlet__head-title">';
    html += '<h3 class="m-portlet__head-text">' + Trans.trans("Business Development") + '</h3>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="m-portlet__body m-portlet__body--no-bottom-padding m-portlet__body--no-top-padding dahboard-business-dev-wrapper">';
    html += '<div class="m-portlet-fit--sides">';
    html += '<div class="p-4">';
    html += '<div class="m-widget4">';
    html += '<div class="m-widget4__item">';
    html += '<div class="m-widget4__img m-widget4__svg--icon">';
    html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" xml:space="preserve" class="m-svg-icon m-svg-icon--brand"><g><path d="M5.997,20.056c-1.354,0-2.697-0.264-3.952-0.779c-0.683-0.327-1.074-0.714-1.074-1.063c0-0.827,2.071-1.746,4.902-1.83v0.604c0,1.329,1.876,2.186,4.096,2.508c-1.137,0.369-2.325,0.559-3.518,0.559H6.281C6.187,20.056,6.092,20.056,5.997,20.056 M17.55,20.054c-1.195,0-2.382-0.189-3.519-0.559c2.219-0.322,4.096-1.177,4.096-2.508v-0.604c2.831,0.084,4.901,1.003,4.901,1.83c0,0.35-0.391,0.736-1.073,1.063c-1.255,0.516-2.598,0.779-3.952,0.779c-0.095,0-0.19,0-0.284-0.002H17.55 M12,11.474h-0.038c-0.787,0-1.572,0.066-2.348,0.198c-0.223,0.039-0.372,0.25-0.333,0.474c0.035,0.198,0.208,0.336,0.402,0.336l0.07-0.006c0.729-0.121,1.469-0.185,2.208-0.185H12c3.039,0,5.311,0.97,5.311,1.838c0,0.35-0.392,0.734-1.074,1.063c-1.256,0.516-2.597,0.779-3.952,0.779c-0.095,0-0.19-0.002-0.284-0.004c-0.094,0.002-0.189,0.004-0.284,0.004c-1.354,0-2.697-0.264-3.953-0.779c-0.682-0.329-1.074-0.714-1.074-1.063c0-0.367,0.445-0.785,1.19-1.113c0.137-0.057,0.231-0.183,0.249-0.331c0.017-0.146-0.047-0.29-0.167-0.377L7.722,12.23L7.55,12.269c-1.083,0.475-1.678,1.139-1.678,1.86v1.437c-2.844,0.081-5.719,1.002-5.719,2.647v2.861c0,1.724,3.157,2.653,6.127,2.653c2.334,0,4.777-0.576,5.719-1.659c0.942,1.083,3.385,1.659,5.719,1.659c2.971,0,6.127-0.93,6.127-2.653v-2.861c0-1.646-2.874-2.566-5.719-2.647v-1.437C18.127,12.404,14.97,11.474,12,11.474" fill="#000000" opacity="0.3" /><path d="M16.84,6.086c-0.127-0.305-0.424-0.503-0.754-0.503h-0.817V1.499c0-0.678-0.55-1.226-1.226-1.226H9.958c-0.574,0-1.056,0.395-1.189,0.928C8.745,1.295,8.732,1.395,8.732,1.499v4.084H7.915c-0.33,0-0.628,0.2-0.755,0.503C7.034,6.392,7.104,6.744,7.337,6.977l4.085,4.085c0.318,0.319,0.836,0.319,1.154,0l4.085-4.085C16.896,6.744,16.966,6.392,16.84,6.086z" fill="#000000" /></g></svg>';
    html += '</div>';
    html += '<div class="m-widget4__info">';
    html += '<span class="m-widget4__title">';
    html += Trans.trans("Prepaid Coupons");
    html += '</span><br>';
    html += '<span class="m-widget4__sub">';
    html += Trans.trans("Total active coupons.");
    html += '</span>';
    html += '</div>';
    html += '<span class="m-widget4__ext">';
    html += '<span class="m-widget4__number m--font-brand" id="active_epin_count">' + data.epin_count.count + '</span>';
    html += '</span>';
    html += '</div>';

    html += '<div class="m-widget4__item">';
    html += '<div class="m-widget4__img m-widget4__svg--icon">';
    html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" xml:space="preserve"  class="m-svg-icon m-svg-icon--success"> <g><path d="M20.75,5.062L20.75,5.062c0.964,0,1.744,0.781,1.744,1.744v15.112c0,0.963-0.78,1.743-1.744,1.743c-0.962,0-1.743-0.78-1.743-1.743V6.806C19.007,5.843,19.788,5.062,20.75,5.062z" fill="#000000" /><path d="M14.938,10.875c-0.963,0-1.744,0.781-1.744,1.744v9.3c0,0.963,0.781,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-9.3C16.683,11.655,15.9,10.875,14.938,10.875" opacity="0.3" fill="#000000" /><path d="M9.125,13.199c-0.962,0-1.744,0.781-1.744,1.745v6.974c0,0.963,0.782,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-6.974C10.869,13.98,10.087,13.199,9.125,13.199" opacity="0.3" fill="#000000" /><path d="M3.313,15.524L3.313,15.524c0.964,0,1.744,0.78,1.744,1.743v4.65c0,0.963-0.78,1.743-1.744,1.743c-0.963,0-1.744-0.78-1.744-1.743v-4.65C1.569,16.305,2.351,15.524,3.313,15.524z" fill="#000000" /><path d="M21.883,0.339h-2.69c-0.11,0-0.209,0.065-0.252,0.167L19.001,0.8l0.974,0.974l-7.472,7.473l-3.82-3.818c-0.205-0.204-0.536-0.204-0.74,0l-6.284,6.283c-0.204,0.204-0.204,0.54,0,0.743c0.102,0.099,0.237,0.151,0.371,0.151s0.267-0.053,0.371-0.151L8.313,6.54l3.818,3.82c0.204,0.204,0.535,0.204,0.74,0l7.844-7.846l0.977,0.976l0.192,0.08l0.1-0.023c0.104-0.041,0.168-0.139,0.168-0.248v-2.69C22.149,0.461,22.031,0.339,21.883,0.339z" fill="#000000" /></g></svg>';
    html += '</div>';
    html += '<div class="m-widget4__info">';
    html += '<span class="m-widget4__title">';
    html += Trans.trans("Leads and Contacts");
    html += '</span><br>';
    html += '<span class="m-widget4__sub">';
    html += Trans.trans("Leads, Contacts etc.");
    html += '</span>';
    html += '</div>';
    html += '<span class="m-widget4__ext">';
    html += '<span class="m-widget4__number m--font-success" id="leads_and_countact_count">' + data.leads_and_contacts.count + '</span>';
    html += '</span>';
    html += '</div>';

    // html += '<div class="m-widget4__item">';
    // html += '<div class="m-widget4__img m-widget4__svg--icon">';
    // html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" xml:space="preserve"  class="m-svg-icon m-svg-icon--success"> <g><path d="M20.75,5.062L20.75,5.062c0.964,0,1.744,0.781,1.744,1.744v15.112c0,0.963-0.78,1.743-1.744,1.743c-0.962,0-1.743-0.78-1.743-1.743V6.806C19.007,5.843,19.788,5.062,20.75,5.062z" fill="#000000" /><path d="M14.938,10.875c-0.963,0-1.744,0.781-1.744,1.744v9.3c0,0.963,0.781,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-9.3C16.683,11.655,15.9,10.875,14.938,10.875" opacity="0.3" fill="#000000" /><path d="M9.125,13.199c-0.962,0-1.744,0.781-1.744,1.745v6.974c0,0.963,0.782,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-6.974C10.869,13.98,10.087,13.199,9.125,13.199" opacity="0.3" fill="#000000" /><path d="M3.313,15.524L3.313,15.524c0.964,0,1.744,0.78,1.744,1.743v4.65c0,0.963-0.78,1.743-1.744,1.743c-0.963,0-1.744-0.78-1.744-1.743v-4.65C1.569,16.305,2.351,15.524,3.313,15.524z" fill="#000000" /><path d="M21.883,0.339h-2.69c-0.11,0-0.209,0.065-0.252,0.167L19.001,0.8l0.974,0.974l-7.472,7.473l-3.82-3.818c-0.205-0.204-0.536-0.204-0.74,0l-6.284,6.283c-0.204,0.204-0.204,0.54,0,0.743c0.102,0.099,0.237,0.151,0.371,0.151s0.267-0.053,0.371-0.151L8.313,6.54l3.818,3.82c0.204,0.204,0.535,0.204,0.74,0l7.844-7.846l0.977,0.976l0.192,0.08l0.1-0.023c0.104-0.041,0.168-0.139,0.168-0.248v-2.69C22.149,0.461,22.031,0.339,21.883,0.339z" fill="#000000" /></g></svg>';
    // html += '</div>';
    // html += '<div class="m-widget4__info">';
    // html += '<span class="m-widget4__title">';
    // html += Trans.trans("Training Materials");
    // html += '</span><br>';
    // html += '<span class="m-widget4__sub">';
    // html += Trans.trans("Total Training Materials.");
    // html += '</span>';
    // html += '</div>';
    // html += '<span class="m-widget4__ext">';
    // html += '<span class="m-widget4__number m--font-success" id="study_material_count">' + data.study_materials.count + '</span>';
    // html += '</span>';
    // html += '</div>';

    html += '<div class="m-widget4__item">';
    html += '<div class="m-widget4__img m-widget4__svg--icon">';
    html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" xml:space="preserve" class="m-svg-icon m-svg-icon--danger"> <g><path d="M20.935,2.073H3.065c-1.642,0-2.979,1.336-2.979,2.978v3.971C0.087,10.664,1.423,12,3.065,12h1.57v-1.985h-1.57c-0.547,0-0.993-0.446-0.993-0.993V5.051c0-0.547,0.446-0.993,0.993-0.993h17.869c0.548,0,0.993,0.446,0.993,0.993v3.971c0,0.547-0.445,0.993-0.993,0.993h-1.57V12h1.57c1.642,0,2.978-1.336,2.978-2.979V5.051C23.912,3.409,22.576,2.073,20.935,2.073z" fill="#000000" /><path d="M19.942,6.044h-1.985H6.044H4.058c-0.548,0-0.993,0.444-0.993,0.992c0,0.548,0.445,0.993,0.993,0.993h0.993h0V12v8.934c0,0.55,0.445,0.994,0.993,0.994h11.913c0.548,0,0.992-0.444,0.992-0.994V12v-1.985V8.029h0.993c0.548,0,0.992-0.444,0.992-0.993C20.935,6.488,20.49,6.044,19.942,6.044z M11.956,16.585c-1.446,0-2.618-1.173-2.618-2.617c0-1.446,1.172-2.619,2.618-2.619c1.445,0,2.618,1.173,2.618,2.619C14.574,15.412,13.401,16.585,11.956,16.585z" opacity="0.3" fill="#000000" /><circle cx="11.956" cy="13.968" r="1.31" opacity="0.3" fill="#000000" /></g></svg>';
    html += '</div>';
    html += '<div class="m-widget4__info">';
    html += '<span class="m-widget4__title">';
    html += Trans.trans("Landing Pages");
    html += '</span><br>';
    html += '<span class="m-widget4__sub">';
    html += Trans.trans("Total Active Landing Pages.");
    html += '</span>';
    html += '</div>';
    html += '<span class="m-widget4__ext">';
    html += '<span class="m-widget4__number m--font-danger" id="landing_page_count">' + data.landing_page.count + '</span>';
    html += '</span>';
    html += '</div>';

    if (data.course && data.course !=undefined){
        html += '<div class="m-widget4__item">';
        html += '<div class="m-widget4__img m-widget4__svg--icon">';
        html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" xml:space="preserve"  class="m-svg-icon m-svg-icon--success"> <g><path d="M20.75,5.062L20.75,5.062c0.964,0,1.744,0.781,1.744,1.744v15.112c0,0.963-0.78,1.743-1.744,1.743c-0.962,0-1.743-0.78-1.743-1.743V6.806C19.007,5.843,19.788,5.062,20.75,5.062z" fill="#000000" /><path d="M14.938,10.875c-0.963,0-1.744,0.781-1.744,1.744v9.3c0,0.963,0.781,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-9.3C16.683,11.655,15.9,10.875,14.938,10.875" opacity="0.3" fill="#000000" /><path d="M9.125,13.199c-0.962,0-1.744,0.781-1.744,1.745v6.974c0,0.963,0.782,1.743,1.744,1.743c0.962,0,1.744-0.78,1.744-1.743v-6.974C10.869,13.98,10.087,13.199,9.125,13.199" opacity="0.3" fill="#000000" /><path d="M3.313,15.524L3.313,15.524c0.964,0,1.744,0.78,1.744,1.743v4.65c0,0.963-0.78,1.743-1.744,1.743c-0.963,0-1.744-0.78-1.744-1.743v-4.65C1.569,16.305,2.351,15.524,3.313,15.524z" fill="#000000" /><path d="M21.883,0.339h-2.69c-0.11,0-0.209,0.065-0.252,0.167L19.001,0.8l0.974,0.974l-7.472,7.473l-3.82-3.818c-0.205-0.204-0.536-0.204-0.74,0l-6.284,6.283c-0.204,0.204-0.204,0.54,0,0.743c0.102,0.099,0.237,0.151,0.371,0.151s0.267-0.053,0.371-0.151L8.313,6.54l3.818,3.82c0.204,0.204,0.535,0.204,0.74,0l7.844-7.846l0.977,0.976l0.192,0.08l0.1-0.023c0.104-0.041,0.168-0.139,0.168-0.248v-2.69C22.149,0.461,22.031,0.339,21.883,0.339z" fill="#000000" /></g></svg>';
        html += '</div>';
        html += '<div class="m-widget4__info">';
        html += '<span class="m-widget4__title">';
        html += Trans.trans("Available Courses");
        html += '</span><br>';
        html += '<span class="m-widget4__sub">';
        html += Trans.trans("Available Courses.");
        html += '</span>';
        html += '</div>';
        html += '<span class="m-widget4__ext">';
        html += '<span class="m-widget4__number m--font-success" id="cource_count">' + data.course.count + '</span>';
        html += '</span>';
        html += '</div>';
    
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}

function make_list(string, seperator = ','){
    if(string && ! Array.isArray(string) && string != ""){
        return string.split(seperator);
    }
    return string
 }

function businessReprtTemplate(key,data,index){
    let period = $("#admin-filter-period .active").attr("id");
    period = period == undefined ? "overall" : period;
    period = period.replace('_', '-');

    let enrolment_order_revenue_category_filter_query = '?category=ENROLLMENT SALE'
    if (key == 'enrolment_order_revenue') {
        enrollment_order_types = eval(_enrollment_order_types)
        let category_filter = {
            'ENROLLMENT': 'ENROLLMENT SALE',
            'UPGRADE': 'PACKAGE UPGRADE SALE',
            'RENEWAL': 'RENEWAL SALE',
            'FUND_DEPOSIT': ['FUND DEPOSIT', 'FUND DEPOSIT CHARGE']
        }

        // Create an array to store the categories based on enrollment_order_types
        const categories = enrollment_order_types.map(type => category_filter[type]);

        // Create the query string
        const queryString = categories
            .flatMap(category => {
                if (Array.isArray(category)) {
                    return category.map(subCategory => `category=${subCategory}`);
                } else {
                    return `category=${category}`;
                }
            })
            .join('&');
        
        if (queryString) {
            enrolment_order_revenue_category_filter_query = `?${queryString}`;
        }
    }

    widget_data = {
        "active_distributors" : {
            "title" : Trans.trans("Distributors"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "manage-members/"+period+"?status=active",
        },
        "commerce_orders_count" : {
            "title" : Trans.trans("Product Orders"),
            "class" : [],
            // "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "order-status-summary/"+period,
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "commerce-dashboard/"
        },
        "commerce_orders_revenue" : {
            "title" : Trans.trans("Product Revenue"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "business-transactions/sales/"+period+"?category=SALE&status=fulfilled",
        },
        "customer_count" : {
            "title" : Trans.trans("Customers"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "manage-customer/",
        },
        "enrolment_order_count" : {
            "title" : Trans.trans("Enrollment Orders"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "mlm-order-status-summary/"+period+"?order_type=ENROLLMENT",
        },
        "enrolment_order_revenue" : {
            "title" : Trans.trans("Enrollment Revenue"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "business-transactions/sales/"+period+enrolment_order_revenue_category_filter_query,
        },
        "customer_member_ratio" : {
            "title" : Trans.trans("Distributor : Customer"),
            "class" : [],
            'tooltip' : Trans.trans("The more customers, the healthier the business. Like 1:2 means that for each distributor, there are two customers."),
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "distributor-customer-summary/"+period,
        },
        "enrolment_auto_ship_count" : {
            "title" : Trans.trans("Active Subscriptions"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "subscriptionsplan-payments-user-conf/"+period+"?status=active",
        },
        "commerce_auto_ship_count" : {
            "title" : Trans.trans("Autoship Orders"),
            "class" : [],
            "url" : language + '/' + username + '/' + geo + '/' +site_prefix + "subscriptions-payments-user-conf/"+period+"?status=active",
        },
        "commerce_sales_percentage" : {
            "title" : Trans.trans("Product Sales"),
            "class" : [],

        },
    }

    class_arr = ["m--font-brand","m--font-danger","m--font-success","m--font-accent","m--font-info","m--font-warning","m--font-success","m--font-danger","m--font-primary"]

    html = '<div class="m-widget1__item">';
        html += '<div class="row m-row--no-padding align-items-center">';
            html += '<div class="col">';
                html += '<h3 class="m-widget1__title">'+widget_data[key]["title"]+'</h3>';
                if (typeof widget_data[key]["description"] != 'undefined' && widget_data[key]["description"]) {
                    html += '<span class="m-widget1__desc">'+widget_data[key]["description"]+'</span>';
                }
            html += '</div>';
            html += '<div class="col m--align-right">';
                if (widget_data[key]["url"] != undefined){
                    html += '<a href="/'+widget_data[key]["url"]+'" class="'+class_arr[index]+' text-decoration-none">';
                        html += '<span class="m-widget1__number '+class_arr[index]+'">'+data["result"]+'</span>';
                    html += '</a>';
                }else{
                    html += '<span class="m-widget1__number '+class_arr[index]+'">'+data["result"]+'</span>';

                }
                if (typeof widget_data[key]["tooltip"] != 'undefined' && widget_data[key]["tooltip"]) {
                    html += '<a href="#" data-toggle="m-tooltip" data-content="'+widget_data[key]["tooltip"]+'" class="m--margin-left-5 text-decoration-none">';
                    html += '<i class="fa fa-info-circle"></i>';
                    html += '</a>';
                }
            html += '</div>';
        html += '</div>';
    html += '</div>';

    if (index<3){
        div_id=index+1;
    }else {
        div_id = (index%3)+1;
    }
    // div_id = parseInt((index/3) + 1)
    $("#businessReportWidget"+div_id+ " .business-report-loader-block").remove()
    $("#businessReportWidget"+div_id).append(html)

}

function getWidgetData(key,data,...args) {
    let html = '';
    if(data.widget != undefined && data.widget != key){
        key = data.widget
    }

    if (data != undefined && key != undefined) {
        switch (key) {
            case 'wallet1':
                url = 'multi-wallet-history/wallet1/all'
                html = getWalletTemplate('wallet1', data, url)
                break;
            case 'wallet2':
                url = 'multi-wallet-history/wallet2/all'
                html = getWalletTemplate('wallet2', data, url)
                break;
            case 'wallet3':
                url = 'multi-wallet-history/wallet3/all'
                html = getWalletTemplate('wallet3', data, url)
                break;
            case 'wallet4':
                url = 'multi-wallet-history/wallet4/all'
                html = getWalletTemplate("wallet4", data, url)
                break;
            case 'current_rank':
                url = "member-rank-history"                                 //if no redirction is needed,leave value as ""
                html = getRankTemplate(data, "Current Rank", url)
                break;
            case 'next_rank':
                // url = "member-rank-history"
                url = ""                                                     //if no redirction is needed,leave value as "" 
                html = getRankTemplate(data, "Next Rank", url)
                break;
            case 'current_pay_rank':
                url = "member-rank-history"                                  //if no redirction is needed,leave value as ""
                html = getRankTemplate(data, "Current Rank", url)
                break;
            case 'next_pay_rank':
                // url = "member-rank-history"
                url = ""                                                    //if no redirction is needed,leave value as ""
                html = getRankTemplate(data, "Next Rank", url)
                break;    
            case 'current_package':
                if (data.is_eligible != undefined && data.is_eligible == '0'){
                    url = 'package-renewal/'
                }else{
                    url = 'history/user/package-upgrade/'
                }
                html = getPackageTemplate(data, "Current Package", url)
                break;
            case 'next_package':
                url = 'upgrade-package/'
                html = getPackageTemplate(data, "Next Package", url)
                break;

            case 'refered_members':
                url = "team-downline-detail/referal/joinings"
                html = getRefmembersTemplate(data, url)
                break;

            case 'active_days':
                html = getActiveDaysTemplate(data)
                break;

            case 'epin_count':
                url = 'afl/manage-epin/'
                html = activeEpinCountTemplate(data, url)
                break;

            case 'leads_and_contacts':
                url = 'promotional-tools/overview'
                html = leadsAndContactsTemplate(data, url)
                break;

            case 'study_materials':
                url = 'education-platform/available/course'
                html = studayMaterialsTemplate(data, url)
                break;

            case "active_distributors":
            case "commerce_orders_count":
            case "commerce_orders_revenue":
            case "customer_count":
            case "enrolment_order_count":
            case "enrolment_order_revenue":
            case "customer_member_ratio":
            case "enrolment_auto_ship_count":
            case "commerce_auto_ship_count":
            case "commerce_sales_percentage":
                let index = 0
                if (!isNaN(args[0]))
                    index = parseInt(args[0])
                
                businessReprtTemplate(key,data,index)
                break;

        }
    }
    return html
}

socket.on('getUserPackageWidget1', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            html = getWidgetData(key,data[key])
        }
        $("#user-widget-3").html(html)
    }
});

socket.on('getUserPackageWidget2', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            html = getWidgetData(key,data[key])
        }
        $("#user-widget-4").html(html)
    }
});

socket.on('getDashRankwidget1', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            html = getWidgetData(key,data[key])
        }
        $("#user-widget-1").html(html)
    }
});

socket.on('getDashRankwidget2', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            html = getWidgetData(key,data[key])
        }
        $("#user-widget-2").html(html)
    }
});

socket.on('getMultiWalletWidgetData-wallet1', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            data[key].extra_class = ['m-portlet--border-bottom-brand', 'm-svg-icon--brand', 'btn-light--brand']
            html = getWidgetData(key,data[key])
        }
        $("#walletWidget1").html(html)
    }
});

socket.on('getMultiWalletWidgetData-wallet2', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            data[key].extra_class = ['m-portlet--border-bottom-warning', 'm-svg-icon--warning', 'btn-light--warning']
            html = getWidgetData(key,data[key])
        }
        $("#walletWidget2").html(html)
    }
});

socket.on('getMultiWalletWidgetData-wallet3', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            data[key].extra_class = ['m-portlet--border-bottom-success', 'm-svg-icon--success', 'btn-light--success']
            html = getWidgetData(key,data[key])
        }
        $("#walletWidget3").html(html)
    }
});

socket.on('getMultiWalletWidgetData-wallet4', function(data) {
    if (data != undefined) {
        let html = '';
        for (key in data) {
            data[key].extra_class = ['m-portlet--border-bottom-danger', 'm-svg-icon--danger', 'btn-light--danger']
            html = getWidgetData(key,data[key])
        }
        $("#walletWidget4").html(html)
    }
});

function getBinaryTeamSalesWidget(data) {
    if (jQuery.isEmptyObject(data.totalTeamSales)) {
        $("#teamsales_left").html(0);
        $("#teamsales_right").html(0);
    } else if (data.totalTeamSales) {
        if (data.totalTeamSales.members[0]['formated_left_total'] == null) {
            $("#teamsales_left").html(0);
        } else {
            $("#teamsales_left").html(data.totalTeamSales.members[0]['formated_left_total']);
        }
        if (data.totalTeamSales.members[0]['formated_right_total'] == null) {
            $("#teamsales_right").html(0);
        } else {
            $("#teamsales_right").html(data.totalTeamSales.members[0]['formated_right_total']);
        }
    }
    //Display Team Sales Left /Right Carry
    if (jQuery.isEmptyObject(data.totalLeftRightCarry)) {
        $("#teamsales_left_carry").html(0);
        $("#teamsales_right_carry").html(0);
    } else if (data.totalLeftRightCarry) {
        if (data.totalLeftRightCarry.members[0]['formated_left_carry'] == null) {
            $("#teamsales_left_carry").html(0);
        } else {
            $("#teamsales_left_carry").html(data.totalLeftRightCarry.members[0]['formated_left_carry']);
        }
        if (data.totalLeftRightCarry.members[0]['formated_right_carry'] == null) {
            $("#teamsales_right_carry").html(0);
        } else {
            $("#teamsales_right_carry").html(data.totalLeftRightCarry.members[0]['formated_right_carry']);
        }
    }
    var e = function() {
        if (0 != $("#m_chart_personal_income_quater_1").length) {
            left_sale = data.totalTeamSales.members[0]['left_total']
            right_sale = data.totalTeamSales.members[0]['right_total']
            left_color = "#0e2484"
            right_color = "#ffb822"

            if(typeof left_sale != 'undefined' && typeof left_sale == 'string') {
                left_sale = parseFloat(left_sale);
            }
            if(typeof right_sale != 'undefined' && typeof right_sale == 'string') {
                right_sale = parseFloat(right_sale);
            }

            // if (left_sale == "0" && right_sale == "0") {
            //     left_sale = 100
            //     left_color = "#657dff"
            // }

            var m_chart_personal_income_options = {
                chart: {
                    renderTo: 'm_chart_personal_income_quater_1',
                    backgroundColor: null,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: 195,
                },
                credits:{
                    enabled:false
                },
                tooltip: {
                    formatter: function() {
                        return  this.point.name + ': <b>' + Highcharts.numberFormat(this.percentage, 2) + '%</b>';
                    }
                },
                accessibility: {
                    point: {
                      valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        borderColor: null,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                          enabled: false
                        },
                        showInLegend: true
                    }
                },
                title:{
                    text:null,
                },
                legend: {
                    enabled: true
                },
                series : [{
                  name: 'Sales',
                  colorByPoint: true,
                  innerSize:"50%",
                    data: [{
                        name: Trans.trans('Left Sales'),
                        y: left_sale,
                        color: left_color,
                    }, {
                        name: Trans.trans('Right Sales'),
                        y: right_sale,
                        color: right_color,
                    }]
                }]
            };
            var e = new Highcharts.Chart(m_chart_personal_income_options);
        }
    };
    e()
}

// Unilevel Sale widget - /* BASE-UPDATE10 */
function getUnilevelTeamSalesWidget(data) {
    // for team sales updation
    if (jQuery.isEmptyObject(data.totalTeamSales)) {
        $("#total_teamsales").html(0);
    } else if (data.totalTeamSales && data.totalTeamSales.members) {
        $("#total_teamsales").html(data.totalTeamSales.members[0]['formated_total']);
    }else{
        $("#total_teamsales").html(0);
    }

    // for personal sales updation
    if (jQuery.isEmptyObject(data.totalPersonalVol)) {
        $("#personal_sales").html(0);
    } else if (data.totalPersonalVol && data.totalPersonalVol.members) {
        $("#personal_sales").html(data.totalPersonalVol.members[0]['formated_total']);
    }else{
        $("#personal_sales").html(0);
    }

    if (jQuery.isEmptyObject(data.ReferralMembers)) {
        $("#direct_referal_count").html(0);
        // $("#direct_active_referal_count").html(0);
    } 
    else if (data.ReferralMembers) {
        var total_count = 0;
        var total_active_count = 0;
        data.ReferralMembers.members.forEach(function(items, k) {
            total_count = total_count + parseInt(items['count']);
            if (items['is_eligible'] == '1') {
                if (items['count'] != null) {
                    total_active_count = total_active_count + parseInt(items['count']);
                }
            }
        });
        $("#direct_referal_count").html(total_count);
        // $("#direct_active_referal_count").html(total_active_count);
    }
    //DOWNLINE COUNT WIDGET
    if (jQuery.isEmptyObject(data.DownlineMembersCount)) {
        $("#downline_members_count").html(0);
    } 
    else if (data.DownlineMembersCount) {
        var total_downline_count = data.DownlineMembersCount
        $("#downline_members_count").html(total_downline_count);
    }
    //DOWNLINE COUNT WIDGET


    var e = function() {
        if (0 != $("#m_chart_personal_income_quater_1").length) {
            if (data.SalesData != undefined && !jQuery.isEmptyObject(data.SalesData.members)) {

                var arr_personal_gv_sale = [0];
                // var arr_personal_sale = [0];
                data.SalesData.members.forEach(function(item, k) {
                    if (item != null) {
                        arr_personal_gv_sale.push(parseFloat(item));
                    }
                });

                Highcharts.chart('m_chart_personal_income_quater_1', {
                    chart: {
                        backgroundColor: "rgba(0,0,0,0)",
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false,
                    },
                    legend: {
                        enabled: false,
                    },
                    colors : ['#ffbf00'],
                    xAxis: {
                        visible: false,
                    },
                    yAxis: {
                        labels: {
                            style: {
                                color: '#FFFFFF',
                            },
                        },
                        gridLineWidth: 0,
                        title: false,
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '{series.name} : {point.y}'
                    },
                    series: [{
                        name : Trans.trans('Team Sales'),
                        data : arr_personal_gv_sale,
                    }]
                });
            }
        }
    };
    e()
}


// Business Development Widget - /* BASE-UPDATE9 */
function changeBusinessDevelopmentWidget(send_data = {}) {
    socket.emit('changeBusinessDevelopmentData', send_data, function(data) {});
}
socket.on('getBusinessDevelopmentWidget', function(data) {
    if (data != undefined) {
        // Epin count
        if (data.epin_count == undefined || data.epin_count.count == undefined)
            $("#active_epin_count").html(0);
        else if (data.epin_count.count)
            $("#active_epin_count").html(data.epin_count.count);

        // Leads and contact count
        if (data.leads_count == undefined || data.leads_count.count == undefined)
            $("#leads_and_countact_count").html(0);
        else if (data.leads_count.count)
            $("#leads_and_countact_count").html(data.leads_count.count);

        // Leads and contact count
        if (data.study_material_count == undefined || data.study_material_count.count == undefined)
            $("#study_material_count").html(0);
        else if (data.study_material_count.count)
            $("#study_material_count").html(data.study_material_count.count);

        // landing page count
        if (data.landing_page == undefined || data.landing_page.count == undefined)
            $("#landing_page_count").html(0);
        else if (data.landing_page.count)
            $("#landing_page_count").html(data.landing_page.count);

        // cource count
        if (data.landing_page == undefined || data.landing_page.count == undefined)
            $("#cource_count").html(0);
        else if (data.landing_page.count)
            $("#cource_count").html(data.landing_page.count);
    }
});

function getemptyTemplate(element) {
    $(element).html(empty_data);
}

(function(r, d, s) {
    r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
        var js, sjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(p.id)) { return; }
        js = d.createElement(s);
        js.id = p.id;
        js.src = p.scriptToLoad;
        js.onload = p.callback
        sjs.parentNode.insertBefore(js, sjs);
    };
    var p = {
        scriptToLoad: 'https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js',
        id: 'skype_web_sdk'
    };
    r.loadSkypeWebSdkAsync(p);
})(window, document, 'script');


$("#comision-expens-widget #wallet-filter li").click(function () {
    $("#comision-expens-widget #wallet-filter li").removeClass("active")
    $(this).addClass("active")
    send_data = {}
    send_data.wallet = $(this).find('.m-nav__link-text').attr('id');
    WALLET = send_data.wallet;
    send_data.filter_val = $("#commissionsFilter .filter-options li.active").find('.m-nav__link-text').attr('id');
    changeCommissionsWidget(send_data)
    var label = $(this).find('.m-nav__link-text').html()
    $(".earnings-title-append").html(label)

    $('.comm_earning_menu').click();

    // var active_tab = $('.commission-wrapper-block .nav-tabs li').find('.active')
    // active_tab.removeClass('active');
    // $('.comm_earning_menu').addClass('active');

    // var actve_data = $(active_tab).attr("href");
    // $(actve_data).hide();
    // var req_tab = $('.comm_earning_menu').attr("href");
    // $(req_tab).show();

    setTimeout(function () {
        $("#comision-expens-widget #wallet-filter").closest('.m-dropdown__wrapper').removeAttr('style')
    }, 1000);
})


$(document).ready(function () {
    $('.dashboard-filter-block .filter-options li').click(function () {
        var new_label = $(this).find(".m-nav__link-text").text();
        $(this).parents(".dashboard-filter-block").find(".filter-title-value").text(new_label)
    });
});

socket.on('getBusinessReports', function(data) {
    if (data != undefined){
        index = 0
        div_id = parseInt((index/3) + 1)
        $("#businessReportWidget1 .m-widget1__item").remove()
        $("#businessReportWidget2 .m-widget1__item").remove()
        $("#businessReportWidget3 .m-widget1__item").remove()
        for (key in data) {
            html_data = getWidgetData(key,data[key],index)
            index++
        }
    }
});

// Sso Enable Button Functions
// $(document).ready(function() {
//     function getSsoBtn(){	
//         socket.emit('getDashboardSsoBtn',{}, function (data) {
//             // console.log("dataaaaa", data);		
//         })
//         socket.on('pushDashboardSsoBtnData', function (data) {
//             if(data){
//                 if(!$('#sso_login_li').hasClass('appended')){
//                     var btn = '<div class="m-menu__link " id="sso_login"> <span class="m-menu__link-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" class="m-aside-menu--svg-blue m-svg-icon" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512"> <g> <path d="M255.77,253.63H23.26c-14.29,0-21-6.75-21-21.12,0-19.46,0-58.39,0-58.39L115.25,31H404.5L509.75,172.32s0,41.15,0,61.73c0,12.43-7.23,19.56-19.76,19.57Zm-66.55-18c0-23.19,0-46,0-68.74a126.3,126.3,0,0,1,.66-12.75c2.13-20.59,8.15-40.21,15.47-59.43,5.83-15.31,12.39-30.35,18.77-45.85-11,0-21.86-.11-32.74.13-1.38,0-3.19,1.62-4,3-18.36,30.41-30.2,63.22-32.52,98.68-1.71,26.22-.95,52.61-1.28,78.93,0,2,0,3.94,0,6.06ZM296.29,48.89c.84,2,1.48,3.45,2.1,5,6,14.49,12.44,28.85,18.05,43.5,10.48,27.37,16.76,55.51,15.36,85.15-.75,16.1-.14,32.26-.12,48.39,0,1.6.17,3.19.24,4.59h36.4c-1.08-31.84-.84-63.4-3.59-94.71-2.8-31.89-14.67-61.35-31.25-88.76-.81-1.35-2.61-3-4-3C318.6,48.78,307.71,48.89,296.29,48.89Z" fill="#000000"/><path d="M42.32,249.76H469.67v2.29c0,58.59.11,117.18-.07,175.77-.07,24.55-16.14,45-39.87,51.31a53,53,0,0,1-13.15,1.77c-31.89.14-63.79.08-95.68.08h-2.58c0-2.18,0-4,0-5.78,0-30.77.22-61.55-.06-92.33-.34-35.88-29.31-63.28-65.09-62-31.91,1.11-58.8,27.84-59.32,59.91-.51,31.14-.15,62.3-.17,93.45v6.45c-1.54.12-2.95.32-4.35.32q-45.9,0-91.8,0C65.58,480.9,42.38,457.85,42.34,426,42.26,367.46,42.32,308.88,42.32,249.76Z" fill="#000000" opacity="0.3"/></g></svg> </span> <span class="m-menu__link-text">'+Trans.trans("Store Dashboard")+'</span> </div>';

//                     $('#sso_login_li').append(btn).addClass('appended');
//                 }
//             }
//         });
//     }
//     socket.on('connected', function () {
//         if($("#sso_login_li").length){
//             getSsoBtn();
//         }   
//     });
// });
// Sso Button Functions
// if($("#sso_login_li").length){
//     $(document).on('click', '#sso_login', function(e){ 
//         var service = $("#sso_login_li").attr('service');
//         var url = $("#sso_login_li").attr('req_url');
//         var csrftoken = getCookie("csrftoken");
//         console.log("service - ", service);
//         console.log("url - ", url);
//         console.log("csrftoken - ", csrftoken);
//         if(service && url && csrftoken){
//             $.ajax({
//                 type: 'PUT',
//                 url: url,
//                 data: {'service' : service},
//                 headers: { 'X-METHODOVERRIDE': 'PUT' },
//                 beforeSend: function(xhr) {
//                     xhr.setRequestHeader("X-CSRFToken", csrftoken);
//                 },
//                 success: function (data) {
//                     if(data.data.fn && data.data.fn == "login" ){
//                         window.open(data.data.url, '_self');
//                     }else{
//                         window.open(data.data.url, '_blank');
//                     }
//                 },
//                 error:function(data){
//                     toastr.error('Something went wrong,try again.', 'Error');
//                 }
//             });
//         }else{
//             toastr.error('Something went wrong,try again.', 'Error');
//         }
//     })
// }
