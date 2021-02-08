// ==UserScript==
// @name         Remove onCopy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  remove event listeners from edit field
// @author       You
// @match        https://lunis.liber.se/lr/lektion/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    function clearEventListeners(element)
    {
        if(element.children != null)
        {
            console.log(element.class + " has children");
            for (const idx in element.children) {
                if (Object.hasOwnProperty.call(element.children, idx)) {
                    const child = element.children[idx];
                    clearEventListeners(child);
                }
            }
        }

        console.log("Remove listeners for" + element);
        // element.oncopy = undefined;
        // element.onpaste = undefined;
        // element.ondrag = undefined;
        // element.oncontextmenu = undefined;
        // element.onselectstart = undefined;
        try{
            recreateNode(element, true)
            //element.removeAttribute("oncontextmenu");
            //element.removeAttribute("onclick");
        } catch{
        }
    }

    function recreateNode(el, withChildren)
    {
        console.log("el is" + el);
        if(el == null){
            return;
        }

        if (withChildren) {
            el.parentNode.replaceChild(el.cloneNode(true), el);
        }
        else {
            var newEl = el.cloneNode(false);
            while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
            el.parentNode.replaceChild(newEl, el);
        }
    }

    function start(){
        var para = $(".paragraph")[0];
        if(para === undefined) {
            setTimeout(start, 100);
        }
        else {
            console.log("Element is found");
            recreateNode(para, true)
        }
    }

    //setTimeout(start, 100);
    start();
})();
