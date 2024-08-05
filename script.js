

const gridContainer = document.querySelector("#gridContainer");
const sizeBtns = document.querySelector("#sizeBtns");
const toolBtns = document.querySelector("#toolBtns")
const clearBtn = document.querySelector("#clearBtn");
const sizes = sizeBtns.querySelectorAll("button.button");
const tools = toolBtns.querySelectorAll("button.button");
const pencil = document.querySelector("#pencil");


// Default values upon loading page
let gridWidth = 64  
let currentTool = `pencil`
const clickEvent = new Event("click");

let mouseHold = false;
document.body.onmousedown = () => mouseHold = true;
document.body.onmouseup = () => mouseHold = false;


function clearGrid() {
    gridContainer.replaceChildren();
}


function changeTool(event) {
    currentTool = event.target.id;
}


function focusBtn (event) {
    if (event.target.type == "submit") {
        if (event.target.id == "rainbow") {
            tools.forEach((element) => {
                element.className = "button";
            });
            event.target.className = "rainbow";
        } else if (event.currentTarget.id == "sizeBtns") {
            sizes.forEach((element) => {
                element.className = "button";
            });
            event.target.className = "btnSelect";
        } else if (event.currentTarget.id == "toolBtns") {
            tools.forEach((element) => {
                element.className = "button";
            });
            event.target.className = "btnSelect";
        }
    }
}



function draw(event) {
    let gridDiv = event.target;
    let opacity = parseFloat(gridDiv.style.opacity);

    switch(currentTool) {

        case "pencil": 
            if (opacity <= 0.8) {
                gridDiv.style.opacity = opacity + 0.2;
            }
            break;

        case "pen":
            gridDiv.style.backgroundColor = "black";
            gridDiv.style.opacity = 1;
            break;

        case "eraser":
            if (mouseHold == true && opacity >= 0.2) {
                gridDiv.style.opacity = opacity - 0.2;
            }
            break; 

        case "rainbow":
            randomHue = Math.floor(Math.random() * (361));
            gridDiv.style.opacity = 1;
            gridDiv.style.backgroundColor = `hsl(${randomHue},100%, 60%)`;
            break;
            
    }
}


function createGrid(gridWidth) {

    for (let i = 0; i < gridWidth; i++) {

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("rowContainer");
        gridContainer.appendChild(rowContainer);

        for (let j = 0; j < gridWidth; j++) {

            const gridDiv = document.createElement("div");
            gridDiv.classList.add("gridDiv");
            gridDiv.style.opacity = "0"
            gridDiv.addEventListener("mouseover", draw);
            gridDiv.addEventListener("mousedown", () => {
                // enables eraser to be clickable not just mouseover
                let opacity = parseFloat(gridDiv.style.opacity);
                if (currentTool == "eraser" && opacity >= 0.2) {
                    gridDiv.style.opacity = opacity - 0.2;
                };
            });
            gridDiv.addEventListener("mousedown", (event) => {
                event.preventDefault();
                // stop bug where hold & drag will occasionally
                // try to pull grid divs around like an img
            });
            rowContainer.appendChild(gridDiv);
        };
    };
}




toolBtns.addEventListener("click", changeTool);
toolBtns.addEventListener("click", focusBtn);
sizeBtns.addEventListener("click", focusBtn);

clearBtn.addEventListener("click", () => {
    clearGrid();
    createGrid(gridWidth);
})

sizeBtns.addEventListener("click", (event) => {
    clearGrid();
    gridWidth = parseInt(event.target.id);
    createGrid(gridWidth);
})

window.addEventListener("load", () => {
    pencil.className = "btnSelect";
    createGrid(gridWidth);
});