const minLeft = -50;
const maxLeft = window.innerWidth + 50;
const minTop = -50;
const maxTop = window.innerHeight + 50;
const centreLeft = window.innerWidth / 2 - 25;
const centreTop = window.innerHeight / 2 - 25;
let circleCount = 0;

let arena = document.getElementById('arena');

let createCircleInterval = setInterval(() => {
    let element = document.createElement('div');
    element.dataset.circle = circleCount;
    arena.appendChild(element);
    animate(element);
    circleCount++;
}, 2000)

function animate(circle) {
    let edge = parseInt(Math.random() * 20) % 4;
    let top = null, left = null, x1 = null, y1 = null;
    switch(edge) {
        case 0:
            top = y1 = minTop;
            left = x1 = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft);
            break;
        case 1:
            top = y1 = Math.floor(Math.random() * (maxTop - minTop) + minTop);
            left = x1 = maxLeft;
            break;
        case 2:
            top = y1 = maxTop;
            left = x1 = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft);
            break;
        case 3:
            top = y1 = Math.floor(Math.random() * (maxTop - minTop) + minTop);
            left = x1 = minLeft;
            break;
    }

    let interval = setInterval(() => {
        switch(edge) {
            case 0: 
                // if(top >= centreTop) {
                if(checkBreach(left, top)) {
                    clearInterval(interval);
                    setTimeout(() => {
                        circle.remove();
                    }, 50);
                }
                else {
                    top++;
                    left = getX(x1, y1, top); 
                    circle.style.top = `${top}px`;
                    circle.style.left = `${left}px`;
                }
                break;
            case 1:
                if(checkBreach(left, top)) {
                    clearInterval(interval);
                    setTimeout(() => {
                        circle.remove();
                    }, 50);
                }
                else {
                    left--;
                    top = getY(x1, y1, left); 
                    circle.style.top = `${top}px`;
                    circle.style.left = `${left}px`;
                }
                break;
            case 2:
                if(checkBreach(left, top)) {
                    clearInterval(interval);
                    setTimeout(() => {
                        circle.remove();
                    }, 50);
                }
                else {
                    top--;
                    left = getX(x1, y1, top); 
                    circle.style.top = `${top}px`;
                    circle.style.left = `${left}px`;
                }
                break;
            case 3:
                if(checkBreach(left, top)) {
                    clearInterval(interval);
                    setTimeout(() => {
                        circle.remove();
                    }, 50);
                }
                else {
                    left++;
                    top = getY(x1, y1, left);
                    circle.style.top = `${top}px`;
                    circle.style.left = `${left}px`;
                }
                break;
        }
    }, 1 + Math.random() * 9)

    circle.addEventListener('click', () => {
        clearInterval(interval);
        circle.remove();
    })
}

function getX(x1, y1, currentY) {
    let slope = (centreLeft - x1) / (centreTop - y1);
    return slope * (currentY - y1) + x1;
}

function getY(x1, y1, currentX) {
    let slope = (centreTop - y1) / (centreLeft - x1);
    return slope * (currentX - x1) + y1;
}

function checkBreach(currentX, currentY) {
    let distanceFromCentre = Math.sqrt(Math.pow(currentX - centreLeft, 2) + Math.pow(currentY - centreTop, 2));
    return distanceFromCentre - 25 <= 75;
}
