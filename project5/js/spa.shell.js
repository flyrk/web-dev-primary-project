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
        anchor_schema_map: {
            chat : { opened: true, closed: true }
        },
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
                '<div class="spa-shell-modal"></div>',
        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_time: 1000,
        chat_retract_time: 300,
        chat_extend_title: 'Click to extend',
        chat_retract_title: 'Click to retract'
    },
    stateMap = {
        anchor_map: {}
    },  // 存放共享动态信息
    jqueryMap = {},                          // 缓存jquery集合
    setJqueryMap, copyAnchorMap,
    changeAnchorPart, onHashChange, setChatAnchor, initModule;         // 之后需要赋值的变量
    //----------------- END MODULE SCOPE VARIABLES ------------------------

    //----------------- BEGIN UTILITY METHODS ------------------------
    // 返回保存的anchor_map的拷贝值
    copyAnchorMap = function() {
        return $.extend( true, {}, stateMap.anchor_map );
    };
    // Begin callback method /setChatAnchor/
    // Example     : setChatAnchor( 'closed' );
    // Purpose     : Change the chat component of the anchor
    // Arguments :
    //      *  position_type - may be 'closed' or 'opened'
    // Action       :
    //      Changes the URI anchor parameter 'chat' to the requested
    //      value if possible.
    // Returns     :
    //      *  true  - requested anchor part was updated
    //      * false - requested anchor part was not updated
    // Throws     : none
    //

    // End callback method /setChatAnchor/
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

    // Begin DOM methods /changeAnchorPart/
    // Purpose     : Change part of the URI anchor component
    // Arguments :
    //       * arg_map - The map describing what part of the URI anchor
    //          we want changed.
    // Returns     :
    //       * true  - the Anchor portion of the URI was updated
    //       * false - the Anchor portion of the URI could not be updated
    // Actions     :
    //       The current anchor rep stored in stateMap.anchor_map.
    //       See uriAnchor for a discussion of encoding
    //       This method
    //           * Creates a copy of this map using copyAnchorMap().
    //           * Modifies the key-values using arg_map.
    //           * Manages the distinction between independent and
    //              dependent values in the encoding.
    //           * Attempts to change the URI using uriAnchor
    //           * Returns true on success, and false on failure.
    //
    changeAnchorPart = function( arg_map ) {
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;
        //Begin merge changes into anchor map
        KEYVAL:
        for ( key_name in  arg_map ) {
            if( arg_map.hasOwnProperty( key_name ) ) {
                // skip dependent keys during iteration
                if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }
                // update independent key value
                anchor_map_revise[key_name] = arg_map[key_name];
                // update matching dependent key
                key_name_dep = '_' + key_name;
                if ( arg_map[key_name_dep] ) {
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                } else {
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }
        //End merge changes into anchor map
        //Begin attempt to update URI; revert it if not successful
        try {
            $.uriAnchor.setAnchor( anchor_map_revise );
        } catch ( error ) {
            // replace URI with existing state
            $.uriAnchor.setAnchor( anchor_map, null, true );
            bool_return = false;
        }
        //End updating URI
        return bool_return;
    };
    // End DOM methods /changeAnchorPart/
    //----------------- END DOM METHODS ------------------------

    //----------------- BEGIN EVENT HANDLERS ------------------------
    // Begin event handler /onHashChange/
    // Purpose     : Handles the hashchange event
    // Arguments :
    //       * event - jQuery event object
    // Setting       : none
    // Returns     : false
    // Actions     :
    //       * Parses the URI anchor component
    //       * Compares proposed application state with current
    //       * Adjust the application only where proposed state
    //          differs from existing and is allowed by anchor schema
    //
    onHashChange = function ( event ) {
        var
            anchor_map_previous = copyAnchorMap(),
            anchor_map_proposed,
            is_ok = true,
            _s_chat_previous, _s_chat_proposed, s_chat_proposed;
        // attempt to parse anchor
        try {
            anchor_map_proposed = $.uriAnchor.makeAnchorMap();
        } catch ( error ) {
            $.uriAnchor.setAnchor( anchor_map_previous, null, true );
            return false;
        }
        stateMap.anchor_map = anchor_map_proposed;
        // convenience vars
        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;
        //Begin adjust chat component if changed
        if ( !anchor_map_previous || _s_chat_previous !== _s_chat_proposed ) {
            s_chat_proposed = anchor_map_proposed.chat;
            switch (s_chat_proposed) {
                case 'opened':
                    is_ok = spa.chat.setSliderPosition( 'opened' );
                    break;
                case 'closed':
                    is_ok = spa.chat.setSliderPosition( 'closed' );
                    break;
                default:
                    spa.chat.setSliderPosition( 'closed' );
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
            }
        }
        //End adjust chat component if changed
        //Begin revert anchor if slider change denied
        if ( !is_ok ) {
            if ( anchor_map_previous ) {
                $.uriAnchor.setAnchor( anchor_map_previous, null, true );
                stateMap.anchor_map = anchor_map_previous;
            } else {
                delete anchor_map_proposed.chat;
                $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
            }
        }
        //End revert anchor if slider change denied
        return false;
    };
    // End event handler /onHashChange/
    //----------------- END EVENT HANDLERS ------------------------

    //-------------------- BEGIN CALLBACK -------------------------------
    // Begin callback method /setChatAnchor/
    // Example      : setChatAnchor( 'closed' );
    // Purpose      : Change the chat component of the anchor
    // Arguments  :
    //       * position_type - may be 'closed' or 'opened'
    // Actions       :
    //       Changes the URI anchor parameter 'chat' to the requested value if possible
    // Returns      :
    //       * true  - requested anchor part was updated
    //       * false - requested anchor part was not updated
    // Throws      : none
    //
    setChatAnchor = function ( position_type ) {
        return changeAnchorPart( {chat: position_type} );
    }
    // End callback method /setChatAnchor/
    //-------------------- END CALLBACK -------------------------------

    //----------------- BEGIN PUBLIC METHODS ------------------------
    // Begin public method /initModule/
    // Example      : spa.shell.initModule( $('#app_div_id') );
    // Purpose      :
    //      Directs the Shell to offer its capability to the user
    // Arguments  :
    //      * $container (exmaple: $('#app_div_id'))
    //         A jQuery collection that should represent a single DOM container
    // Actions      :
    //      Populates $container with the shell of the UI and
    //      then configures and initializes feature modules.
    //      The Shell is also responsible for browser-wide issues
    //      such as URI anchor and cookie management.
    // Returns      : none
    // Throws      : none
    //
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        //configure uriAnchor to use schema
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });
        //configure and initialize feature Modules
        spa.chat.configModule({
            set_chat_anchor: setChatAnchor,
            chat_model: spa.model.chat,
            people_model: spa.model.people
        });
        spa.chat.initModule( jqueryMap.$container );
        //绑定hashchange事件并立即触发它，这样模块在初始加载时就会处理书签
        $( window )
            .bind( 'hashchange', onHashChange )
            .trigger( 'hashchange' );
    };
    // End public method /initModule/
    return { initModule: initModule };
    //----------------- END PUBLIC METHODS ------------------------
})();
