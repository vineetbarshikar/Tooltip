let Tooltip = (function() {
    'use strict';

    //
    // Variables
    //
    let publicAPIs = {};
    const positions = {
        top: "top",
        right: "right",
        bottom: "bottom",
        left: "left"
    };

    const defaultOptions = {
        position: positions.top,
        border: "2px solid black",
        borderRadius: 5,
        backgroundColor: "lightBlue",
        maxWidth: 200,
        font: "700 0.8em 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        color: "black",
        zIndex: 999,
        margin: 25
    };

    let elem, data, options, parentElem, tooltipDiv, tooltipSpan, tooltipFrag, tooltipX, tooltipY;
  
    //
    // Methods
    //
  
    /**
     * Private methods
     */
    let validate = function (e, d, o) {
        elem = e;
        data = d;
        options = o;

        if (!elem || typeof elem !== 'string' || !document.querySelector(elem))
            throw new Error("Invalid element");

        if (!data || typeof data !== 'string')
            throw new Error("Invalid text");

        parentElem = document.querySelector(elem);
    }

    let mergeOptions = function() {
        options = Object.assign(defaultOptions, options);
    }

    let draw = function() {
        tooltipFrag = document.createDocumentFragment();

        tooltipDiv = document.createElement("div");
        tooltipDiv.classList.add("tooltip-div");

        tooltipSpan = document.createElement("span");
        tooltipSpan.classList.add("tooltip-span");
        tooltipSpan.innerText = data;

        tooltipDiv.append(tooltipSpan);
        tooltipFrag.append(tooltipDiv);
        document.body.append(tooltipFrag);
    }

    let applyPosition = function () {
        const {x,y,height,width} = parentElem.getBoundingClientRect();
        let fragHeight = tooltipDiv.style.height,
            fragWidth = tooltipDiv.style.width;

        if (options.position === positions.bottom) {
            tooltipX = x;
            tooltipY = y + options.margin + fragHeight;
        } else if (options.position === positions.right) {
            tooltipX = x + width + options.margin;
            tooltipY = y;
        } else if (options.position === positions.top) {
            tooltipX = x;
            tooltipY = y - (height + options.margin);
        } else if (options.position === positions.left) {
            tooltipX = x - (options.margin + fragWidth);
            tooltipY = y;
        }
    }

    let applyStyle = function() {
        tooltipDiv.style.border = options.border;
        tooltipDiv.style.borderRadius = options.borderRadius + "px";
        tooltipDiv.style.backgroundColor = options.backgroundColor;
        tooltipDiv.style.maxWidth = options.maxWidth + "px";
        tooltipDiv.style.font = options.font;
        tooltipDiv.style.color = options.color;
        tooltipDiv.style.zIndex = options.zIndex;
        tooltipDiv.style.top = tooltipY + "px";
        tooltipDiv.style.left = tooltipX + "px";

        // default styles
        tooltipDiv.style.width = "auto";
        tooltipDiv.style.height ="auto";
        tooltipDiv.style.display = "none";
        tooltipDiv.style.position = "absolute";
        tooltipSpan.style.padding = "10px";
        tooltipSpan.style.wordWrap = "break-word";
    };

    let initEventHandlers = function() {
        parentElem.addEventListener("mouseover", function(event) {
            tooltipDiv.style.display = "flex";
        });

        parentElem.addEventListener("mouseout", function(event) {
            tooltipDiv.style.display = "none";
        });
    }
  
    /**
     * Public methods
     */
    publicAPIs.init = function (elem, data, options = {}) {
        validate(elem, data, options); // Validate arguments  
        mergeOptions(); // Get default options and merge with user provided options
        draw(); // Draw tooltip fragment
        applyPosition(); // Get new x,y coordinates
        applyStyle(); // Apply new styles
        initEventHandlers(); // Initialize new event handlers
    };

    publicAPIs.destroy = function() {

    }
  
  
    //
    // Return the Public APIs
    //
    return publicAPIs;
})();