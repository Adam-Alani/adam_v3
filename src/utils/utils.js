export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
export const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + window.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + window.scrollTop + document.documentElement.scrollTop;
    }

    return { x : posx, y : posy }
};
