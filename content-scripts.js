/*---------------------------------------------------------------
>>> HID control prevention
-----------------------------------------------------------------
1.0 Function
2.0 Keyboard
3.0 Mouse
4.0 Touch
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 FUNCTION
---------------------------------------------------------------*/

function prevent(event) {
    event.stopPropagation();
}


/*---------------------------------------------------------------
2.0 KEYBOARD
---------------------------------------------------------------*/

window.addEventListener('keydown', prevent, true);
window.addEventListener('keypress', prevent, true);
window.addEventListener('keyup', prevent, true);


/*---------------------------------------------------------------
3.0 MOUSE
---------------------------------------------------------------*/

window.addEventListener('click', prevent, true);
window.addEventListener('contextmenu', prevent, true);
window.addEventListener('dbclick', prevent, true);
window.addEventListener('mousedown', prevent, true);
window.addEventListener('mousemove', prevent, true);
window.addEventListener('mouseup', prevent, true);
window.addEventListener('select', prevent, true);
window.addEventListener('wheel', prevent, true);


/*---------------------------------------------------------------
4.0 TOUCH
---------------------------------------------------------------*/

window.addEventListener('touchend', prevent, true);
window.addEventListener('touchmove', prevent, true);
window.addEventListener('touchstart', prevent, true);
