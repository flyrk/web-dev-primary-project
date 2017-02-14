/*
 * spa.chat.js
 * Chat Modules for SPA
*/
/*jslint   browser: true, continue: true, devel: true, indent: 2, maxerr: 50, newcap: true,
    nomen: true, plusplus: true, regexp: true, sloppy: true, vars: false, white: true
*/
/*global jQuery, $, spa */
spa.chat = (function () {
    //----------------- BEGIN MODULE SCOPE VARIABLES ------------------------
    var configMap = {                       // 存放静态配置值
        main_html: String()
            +  '<div style="padding: 1em; color: #fff;">'+
                     'Say Hello to chat!'+
                '</div>',
        settable_map: {}
    },
    stateMap = {
        $container: null
    },  // 存放共享动态信息
    jqueryMap = {},                          // 缓存jquery集合
    setJqueryMap, configModule, initModule;         // 之后需要赋值的变量
    //----------------- END MODULE SCOPE VARIABLES ------------------------

    //----------------- BEGIN UTILITY METHODS ------------------------
    //----------------- END UTILITY METHODS ------------------------

    //----------------- BEGIN DOM METHODS ------------------------
    //Begin DOM methods /setJqueryMap/
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container
        };
    };
    //End DOM methods /setJqueryMap/
    //----------------- END DOM METHODS ------------------------

    //----------------- BEGIN EVENT HANDLERS ------------------------
    //----------------- END EVENT HANDLERS ------------------------

    //----------------- BEGIN PUBLIC METHODS ------------------------
    // Begin public method /configModule/
    // Example   : spa.chat.configModule( { slider_open_em: 18 } );
    // Purpose    : Configure the module prior to initialization
    // Arguments:
    //      *  set_chat_anchor - a callback to modify the URI anchor to indicate
    //          opend or closed state. This callback must return false if the requested
    //          state cannot be met
    //      *  chat_model - the chat model object provides methods to interact
    //          with our instant messaging
    //      *  people_model - the people model object which provides methods
    //          to manage the list of people the model maintains
    //      *  slider_* settings. All these are optional scalars.
    //          See mapConfig.settable_map for a full list
    //          Example: slider_open_em is the open height in em's
    // Actions    :
    //      The internal configuration data structure (configMap) is
    //      updated with provided arguments. No other actions are taken.
    // Returns   : true
    // Throws   : JavaScript error object and stack trace on unacceptable
    //                  or missing arguments
    //
    configModule = function ( input_map ) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };
    //End public method /configModule/
    //Begin public method /initModule/
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        return true;
    };
    //End public method /initModule/
    return {
        configModule: configModule,
        initModule: initModule
    };
    //----------------- END PUBLIC METHODS ------------------------
})();
