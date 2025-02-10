// size of matrix and lenght of a winning line
var size = 10;
var len = 5;

var p1_name = "Hráč č.1";
var p2_name = "Hráč č.2";

var p1_color = "#6F9FE5";
var p2_color = "#E56F6F";

// element we're working with
var myMatrix = document.getElementById("innerMatrix");

// size and lenght of the board
var mySize = document.getElementById("size");
var myLenght = document.getElementById("lenght");
var mySubmit = document.getElementById("submit");

// var home = 

// declaration of player turn
var turn = true;

// players' array of coordinates they clicked on
var p1 = [];
var p2 = [];

//  ________
// |-------|
// |-------|
// |-------|
// |-------|
// ‾‾‾‾‾‾‾‾
// sort from left to right starting at the top and evlauate a win
function xSortArray(array) {
    // sort array
    array.sort((a, b)=> {
        if (a.y === b.y){
            return a.x - b.x;
        } else {
            return a.y - b.y;
        }
    });

    // declaring lastX and lastY, to remember last coordinates and check
    let lastX;
    let lastY;
    let check = 1;

    // cycle through the whole array
    for(var i = 0; i < array.length; i++) {
        // if lastX and lastY weren't set yet (i == 0), set them to current coordinates
        if(i == 0) {
            lastY = array[0].y;
            lastX = array[0].x;
        }
        // if in the same row and a column + 1 compared to the last coordinates, increment check
        if(array[i].y === lastY && array[i].x === lastX+1) {
            check++;
        // else set check to 1
        } else {
            check = 1;
        }
        // if check is the leng of len, return true
        if(check === len) {
            return true;
        }
        // if in a differnet row, set lastY to current y coordinate
        if(array[i].y != lastY) {
            lastY = array[i].y;
        }
        // set lastX to current x coordinate
        lastX = array[i].x;
    }
    // if neither player won, return false
    return false;
}

//  ________
// | | | | |
// | | | | |
// | | | | |
// | | | | |
// ‾‾‾‾‾‾‾‾
// sort from top to bottom starting from the left and evlauate a win
function ySortArray(array) {
    // sort array
    array.sort((a, b)=> {
        if (a.x === b.x){
            return a.y - b.y;
        } else {
            return a.x - b.x;
        }
    });

    // declaring lastX and lastY, to remember last coordinates and check
    let lastX;
    let lastY;
    let check = 1;

    // cycle through the whole array
    for(var i = 0; i < array.length; i++) {
        // if lastX and lastY weren't set yet (i == 0), set them to current coordinates
        if(i == 0) {
            lastY = array[0].y;
            lastX = array[0].x;
        }
        // if in the same column and a row + 1 compared to the last coordinates, increment check
        if(array[i].x === lastX && array[i].y === lastY+1) {
            check++;
        // else set check to 1
        } else {
            check = 1;
        }
        // if check is the leng of len, return true
        if(check === len) {
            return true;
        }
        // if in a differnet column, set lastX to current x coordinate
        if(array[i].x != lastX) {
            lastX = array[i].x;
        }
        // set lastY to current y coordinate
        lastY = array[i].y;
    }
    // if neither player won, return false
    return false;
}

//  ______
// |\\   |
// |\\\  |
// | \\\ |
// |  \\\|
// ‾‾‾‾‾‾
// function to cycle through left to bottom diagonals to evaluate a win
function sortDiagLeftToBottom(array) {
    // iX and iY are starting positions
    let iX = 0;
    let iY = size-len;
    // x and y cycle through coordinates
    let x = iX;
    let y = iY;
    // check will check if a coordinate was found in players' arrays
    let check = false;
    // cnt counts clicked elements in a row diagonally 
    let cnt = 1;
    // lastX and lastY remember last found coordinates
    let lastX;
    let lastY;
    // cycle through minimum ammount cycles (it's useless to cycle through diagonals shorter than 'len')
    for(let i = 0; i < 2*(size-len)+1; i++) {
        // cycle until x or y reaches end of matrix
        while(y != size && x != size) {
            // check if x and y can be found in array
            for(let j = 0; j < array.length; j++) {
                if(array[j].x === x && array[j].y === y) {
                    check = true;
                    break;
                }
            }
            // increment cnt if coordinates were found and lastX and lastY are 1 less than current coordinates
            if(check === true && lastX === x-1 && lastY === y-1) {
                cnt++;
            } else {
                // else set cnt to 1
                cnt = 1;
            }
            // if number of clicked elements is greater than or equal to 'len' return true
            if(cnt >= len) {
                return true;
            }
            // if current coordinates were found, set lastX and lastY to those coordinates
            if(check === true) {
                lastX = x;
                lastY = y;
            } 
            // set check to false and increment x and y
            check = false
            x++; y++;
        }
        // if starting position iX is smaller than size-len, increment it
        if(x === size) { iX++; }
        // set x to starting position
        x = iX;
        // decrement starting position iY if iY is greater than 0
        if(iY > 0) { iY--; }
        // set y to starting position
        y = iY;
    }
    // if number of clicked elements was smaller than 'len' return false
    return false;
}

//  _______
// |   ///|
// |  /// |
// | ///  |
// |///   |
// ‾‾‾‾‾‾‾
// function to cycle through left to top diagonals to evaluate a win
function sortDiagLeftToTop(array) {
    // iX and iY are starting positions
    let iX = 0;
    let iY = len-1;
    // x and y cycle through coordinates
    let x = iX;
    let y = iY;
    // check will check if a coordinate was found in players' arrays
    let check = false;
    // cnt counts clicked elements in a row diagonally
    let cnt = 1;
    // lastX and lastY remember last found coordinates
    let lastX;
    let lastY;
    // cycle through minimum ammount cycles (it's useless to cycle through diagonals shorter than 'len')
    for(let i = 0; i < 2*(size-len)+1; i++) {
        // cycle until x or y reaches end of matrix
        while(y != -1 && x != size) {
            // check if x and y can be found in array
            for(let j = 0; j < array.length; j++) {
                if(array[j].x === x && array[j].y === y) {
                    check = true;
                    break;
                }
            }
            // increment cnt if coordinates were found and lastX is 1 less and lastY is 1 greater than current coordinates
            if(check === true && lastX === x-1 && lastY === y+1) {
                cnt++;
            } else {
                // else set cnt to 1
                cnt = 1;
            }
            // if number of clicked elements is greater than or equal to 'len' return true
            if(cnt >= len) {
                return true;
            }
            // if current coordinates were found, set lastX and lastY to those coordinates
            if(check === true) {
                lastX = x;
                lastY = y;
            } 
            // set check to false and increment x and decrement y
            check = false;
            x++; y--;
        }
        // if starting position iX is smaller than size-len, increment it
        if(x === size) { iX++; }
        // set x to starting position
        x = iX; 
        // increment starting position iY if iY is smaller than size-1
        if(iY < size-1) { iY++; }
        // set y to starting position
        y = iY;
    }
    // if number of clicked elements was smaller than 'len' return false
    return false;
}

// add 'a' element's id to a player's array of clicked squares 
function idArray(id) {
    if(turn === false) {
        p1.push({'x': parseInt(id), 'y': Number(id.slice(id.indexOf("-")+1,id.length))});
    } else {
        p2.push({'x': parseInt(id), 'y': Number(id.slice(id.indexOf("-")+1,id.length))});
    }
    return;
}

// function to evaluate a win
function calcWin() {
    let array;
    // set array to player's array depending on turn
    if(turn === false) {
        array = p1
    } else {
        array = p2
    }
    // call sorting functions to evaluate a win
    if(sortDiagLeftToBottom(array) === true || sortDiagLeftToTop(array) === true || xSortArray(array) === true || ySortArray(array) === true) {
        // prohibit clicking on or hovering over the board
        myMatrix.style.pointerEvents = "none";
        // announce winner
        if(turn === false) {
            alert("Vyhrál " + p1_name + "!");
            addWinner(p1_name, p2_name, Date.now());
        } else {
            alert("Vyhrál " + p2_name + "!");
            addWinner(p2_name, p1_name, Date.now());
        }
    }

    return;
}

// creating the board
function createCells() {
    myMatrix.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    myMatrix.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    
    // creating a size*size sized board
    for(var i = 0; i < size; i++) {
        for(var j = 0; j < size; j++) {
            // each 'a' element has a uniqe id consisting coordinates
            let newA = document.createElement("a");
            newA.id = j.toString() + "-" + i.toString();
            newA.href = "#";
            // append child
            myMatrix.appendChild(newA,myMatrix);
            // if clicked, do certain things
            newA.addEventListener("click", function() {
                console.log(getComputedStyle(newA).backgroundColor)
                // if it hasn't been clicked yet, set a color according to turn
                if (getComputedStyle(newA).backgroundColor != hexToRGB(p1_color) && getComputedStyle(newA).backgroundColor != hexToRGB(p2_color)) {
                    if(turn === true) {
                        newA.style.backgroundColor = p1_color;
                        turn = false;
                    } else {
                        newA.style.backgroundColor = p2_color;
                        turn = true;
                    }
                    // call function idArray
                    idArray(newA.id);
                    // check if either of the players won
                    calcWin();
                }
            });
            // change color of an 'a' element according to turn on mouseover
            newA.addEventListener("mouseover", function() {
                if (getComputedStyle(newA).backgroundColor != hexToRGB(p1_color) && getComputedStyle(newA).backgroundColor != hexToRGB(p2_color)) {
                    if(turn === true) {
                        newA.style.backgroundColor = desaturateHex(p1_color, 0.5);
                    } else {
                        newA.style.backgroundColor = desaturateHex(p2_color, 0.5);
                    }
                }
            });
            // change color of 'a' element to transparent on mouseout
            newA.addEventListener("mouseout", function() {
                if (getComputedStyle(newA).backgroundColor != hexToRGB(p1_color) && getComputedStyle(newA).backgroundColor != hexToRGB(p2_color)) {
                    newA.style.backgroundColor = "white";
                }
            });
        }
    }
    return;
}

function addWinner(winner, loser, timestamp)
{
    let date = new Date(timestamp);
    let dateString = date.toLocaleString();

    let history = document.getElementById("history");

    let wnr =      `<ion-card id="` + timestamp + `">
                        <ion-item>
                            <ion-card-header>
                                <ion-card-title><span class="winner">` + winner + `</span></ion-card-title>
                                <ion-card-subtitle>vs. <span class="loser">` + loser + `</span></ion-card-subtitle>
                            </ion-card-header>
                        </ion-item>
                        <ion-card-content>
                            <!-- <ion-item></ion-item> -->
                            <ion-item>
                                <ion-label>
                                    <span>` + dateString + `</span>
                                    <ion-button onclick="deleteGame(` + timestamp + `)">
                                            <ion-icon name="trash" slot="icon-only"></ion-icon>
                                    </ion-button>
                                </ion-label>
                            </ion-item>
                        </ion-card-content>
                    </ion-card>`;

    history.innerHTML = wnr + history.innerHTML;

    let data = winner + "-" + loser

    localStorage.setItem(timestamp, data)
}

function reset()
{
    p1_name = document.getElementById("inpt1").value
    p2_name = document.getElementById("inpt2").value

    if(p1_name == "" || p2_name == "")
    {
        alert("Vyplňte jména!")
        return
    }

    p1 = [];
    p2 = [];
    myMatrix.innerHTML = '';
    turn = true;

    len = document.getElementById("len_range").value
    size = document.getElementById("size_range").value

    p1_color = document.getElementById("clr1").value
    p2_color = document.getElementById("clr2").value

    const tabs = document.querySelector('#myTabs');
    tabs.select("home");

    document.getElementsByTagName("ion-tab-button")[0].disabled = "false"

    myMatrix.style.pointerEvents = "auto";
    adjustSquare();
    createCells();
}


function adjustSquare() {
    let header = document.getElementById("header");
    let nav = document.getElementById("nav");

    let vh = window.innerHeight - header.getBoundingClientRect().height - nav.getBoundingClientRect().height;
    let vw = window.innerWidth;

    console.log("content vyska: " + vh);
    console.log("content sirka: " + vw);

    if(vh == 0 || vw == 0){
        console.log("0!!!!!!!!");
        return;
    }

    let matrix = document.getElementById("matrix");

    if(vh > vw) 
    {
        matrix.style.width = "90vw";
        matrix.style.height = "90vw";

    }
    else
    {
        matrix.style.height = "78vh";
        matrix.style.width = "78vh";
    }

    console.log("innerHeight = " + matrix.getBoundingClientRect().height);
    console.log("innerWidth = " + matrix.getBoundingClientRect().width);
}

function hexToRGB(hex) {
    // Odstraní znak #, pokud je přítomen
    hex = hex.replace(/^#/, '');

    // Převede hexadecimální hodnotu na celočíselný RGB
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Vrací RGB hodnotu jako řetězec
    return `rgb(${r}, ${g}, ${b})`;
}

function desaturateHex(hex, percent) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Převod RGB na HSL
    let hsl = rgbToHSL(r, g, b);
    let h = hsl[0], s = hsl[1], l = hsl[2];

    // Snížení sytosti
    s *= (1 - percent);

    // Převod zpět na RGB
    let rgb = hslToRGB(h, s, l);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];

    // Konvertuje zpět na hexadecimální formát
    return `#${(r.toString(16).padStart(2, '0'))}${(g.toString(16).padStart(2, '0'))}${(b.toString(16).padStart(2, '0'))}`;
}

function rgbToHSL(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRGB(h, s, l){
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function deleteGame(id)
{
    let history = document.getElementById("history")
    let game = document.getElementById(id)
    history.removeChild(game)
    localStorage.removeItem(id)
}

function init()
{

    const homeNav = document.querySelector('#home-nav');
    const homePage = document.querySelector('#home-page');
    homeNav.root = homePage;

    const radioNav = document.querySelector('#radio-nav');
    const radioPage = document.querySelector('#radio-page');
    radioNav.root = radioPage;

    const libraryNav = document.querySelector('#library-nav');
    const libraryPage = document.querySelector('#library-page');
    libraryNav.root = libraryPage;

    var size_range = document.getElementById("size_range");
    var size_label = document.getElementById("size_label");

    size_range.value = 10
    size_range.addEventListener('ionChange', () => {
        console.log(size_range.value)
        size_label.innerText = "Velikost herního pole je " + size_range.value
        if(size_range.value < len_range.value)
        {
            len_range.value = size_range.value
            len_label.innerText = "Výherní délka je " + len_range.value
        }
    });

    var len_range = document.getElementById("len_range");
    var len_label = document.getElementById("len_label");
    len_range.value = 5
    len_range.addEventListener('ionChange', () => {
        console.log(len_range.value)
        len_label.innerText = "Výherní délka je " + len_range.value
        if(len_range.value > size_range.value)
        {
            size_range.value = len_range.value
            size_label.innerText = "Velikost herního pole je " + size_range.value
        }
    });
}

createCells();
init();
//resetEventListener();




window.addEventListener('resize', adjustSquare);

// window.addEventListener('load', adjustSquare);
window.onload = function() {
    setTimeout(adjustSquare, 100); // Adjust the delay as necessary
};