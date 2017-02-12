/*
 * spa.shell.js
 * Shell Modules for SPA
*/
/*jslint   browser: true, continue: true, devel: true, indent: 2, maxerr: 50, newcap: true,
    nomen: true, plusplus: true, regexp: true, sloppy: true, vars: false, white: true
*/
/*global jQuery, $, spa */
spa.shell = (function() {
    //----------------- BEGIN MODULE SCOPE VARIABLES ------------------------
    var configMap = {                       // 存放静态配置值
        main_html: String()
            +  '<div class="spa-shell-head">'+
                '   <div class="spa-shell-head-logo"></div>'+
                '   <div class="spa-shell-head-acct"></div>'+
                '   <div class="spa-shell-head-search"></div>'+
                '</div>'+
                '<div class="spa-shell-main">'+
                '   <div class="spa-shell-main-nav"></div>'+
                '   <div class="spa-shell-main-content"></div>'+
                '</div>'+
                '<div class="spa-shell-foot"></div>'+
                '<div class="spa-shell-chat"></div>'+
                '<div class="spa-shell-modal"></div>',
        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_time: 1000,
        chat_retract_time: 300,
        chat_extend_title: 'Click to extend',
        chat_retract_title: 'Click to retract'
    },
    stateMap = {
        $container: null,
        is_chat_retracted: true
    },  // 存放共享动态信息
    jqueryMap = {},                          // 缓存jquery集合
    setJqueryMap, toggleChat, onClickChat, initModule;         // 之后需要赋值的变量
    //----------------- END MODULE SCOPE VARIABLES ------------------------

    //----------------- BEGIN UTILITY METHODS ------------------------
    //----------------- END UTILITY METHODS ------------------------

    //----------------- BEGIN DOM METHODS ------------------------
    //Begin DOM methods /setJqueryMap/
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat: $container.find('.spa-shell-chat')
        };
    };
    //End DOM methods /setJqueryMap/
    //Begin DOM methods /toggleChat/
    toggleChat = function( do_extend, callback ) {
        var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = !is_open && !is_closed;
        //avoid race conflict
        if( is_sliding ) { return false; }
        //Begin extend chat slider
        if( do_extend ) {
            jqueryMap.$chat.animate(
                { "height": configMap.chat_extend_height },
                configMap.chat_extend_time,
                function() {
                    jqueryMap.$chat.attr(
                        'title', configMap.chat_extend_title
                    );
                    stateMap.is_chat_retracted = false;
                    if( callback ) { callback( jqueryMap.$chat ); }
                }
            );
            return true;
        }
        //End extend chat slider
        //Begin retract chat slider
        jqueryMap.$chat.animate(
            { "height": configMap.chat_retract_height },
            configMap.chat_retract_time,
            function() {
                jqueryMap.$chat.attr(
                    'title', configMap.chat_retract_title
                );
                stateMap.is_chat_retracted = true;
                if( callback ) { callback( jqueryMap.$chat ); }
            }
        );
        //End retract chat slider
    };
    //End DOM methods /toggleChat/
    //Begin DOM methods /onClickChat/
    onClickChat = function( event ) {
        toggleChat( stateMap.is_chat_retracted );
        return false;
    };
    //End DOM methods /onClickChat/
    //----------------- END DOM METHODS ------------------------

    //----------------- BEGIN EVENT HANDLERS ------------------------
    //----------------- END EVENT HANDLERS ------------------------

    //----------------- BEGIN PUBLIC METHODS ------------------------
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat
            .attr('title', configMap.chat_retract_title)
            .click( onClickChat );
    };
    return { initModule: initModule };
    //----------------- END PUBLIC METHODS ------------------------
})();
