(function( $ )
{
    // Function-level strict mode syntax, see https://developer.mozilla.org/en/JavaScript/Strict_mode
    "use strict";

    $.scrollbarpins = function( el, options )
    {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $( el );
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data( "scrollbarpins", base );

        base.events =
        {
            pinsClick: function()
            {
                base.$el.find("[data-scrollbarpins]").each(function(i, el)
                {
                    i = i + 1;
                    
                    $(".pin-" + i).off("click.scrollbarpins");

                    $(".pin-" + i).on("click.scrollbarpins", function()
                    {
                        $("html,body").animate(
                        {
                            scrollTop: $(el).offset().top + "px"
                        }, 500);
                    });
                });
            }
        },

        base.load =
        {
            events: function()
            {
                base.events.pinsClick();
            },
            pins: function()
            {
                var $pinsContainer = $("<ol/>").attr("id", "scrollbarPinsContainer");
                base.$el.find("[data-scrollbarpins]").each(function(i, el)
                {
                    var $el = $(el),
                        $pin = $("<li/>").addClass("pin");

                    $pin
                        .addClass("pin-" + $el.data("scrollbarpins").id)
                        .css(
                        {
                            "top": base.pin.position(i + 1, el) + "px"
                        })
                        .html($el.data("scrollbarpins").title);


                    $pinsContainer.append($pin);
                });

                $("body").append($pinsContainer);
            }
        },

        base.pin =
        {
            position: function(i, el)
            {
                var position = $(window).height() * ($(el).offset().top / $("body").height()) - i * 20;

                return position;
            }
        },

        /**
         * Merge the default options with the customized options
         */
        base.options = $.extend(
            {},
            $.scrollbarpins.defaultOptions,
            options
        );

        /**
         * Initialize the scrollbarpins (immediately invoked function)
         */
        base.init = (function()
        {
            base.load.pins();
            base.load.events();
        })();
    };

    $.scrollbarpins.defaultOptions = {};

    $.fn.scrollbarpins = function( options )
    {
        return this.each( function()
        {
            ( new $.scrollbarpins( this, options ) );
        });
    };

})(jQuery);

$(document).ready(function()
{
    $("#content").scrollbarpins();
});