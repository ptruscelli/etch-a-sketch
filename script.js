

const gridContainer = document.querySelector("#gridContainer");
const tools = document.querySelector("#tools")
const clearBtn = document.querySelector("#clearBtn");
const sizeBtns = document.querySelector("#sizeBtns")


let gridWidth = 64  // Set a default value upon opening page
let currentTool = `pencil`


let mouseHold = false;
document.body.onmousedown = () => mouseHold = true;
document.body.onmouseup = () => mouseHold = false;



function changeTool(event) {
    currentTool = event.target.id;
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
            gridDiv.style.opacity = 1;
            break;

        case "eraser":
            if (mouseHold == true && opacity >= 0.2) {
                gridDiv.style.opacity = opacity - 0.2;
            }
            break; 

        case "rainbow":
            randomR = Math.floor(Math.random()*256);
            randomG = Math.floor(Math.random()*256);
            randomB = Math.floor(Math.random()*256);
            gridDiv.style.opacity = 1;
            gridDiv.style.backgroundColor = `rgb(${randomR},${randomG}, ${randomB})`;
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
            gridDiv.addEventListener("mousedown", (event) => {
                event.preventDefault();
                // stop bug where hold & drag will
                // try to pull coloured divs around like an img
            })
            rowContainer.appendChild(gridDiv);
        };
    };
}


function clearGrid() {
    gridContainer.replaceChildren();
}

tools.addEventListener("click", changeTool);

clearBtn.addEventListener("click", () => {
    clearGrid();
    createGrid(gridWidth);
})

sizeBtns.addEventListener("click", (event) => {
    clearGrid();
    let target = event.target;
    switch(target.id) {
        case "16":
            gridWidth = 16;
            break;
        case "32":
            gridWidth = 32;
            break;
        case "64":
            gridWidth = 64;
            break;
        case "100":
            gridWidth = 100;
            break;
    }
    createGrid(gridWidth);
})


createGrid(gridWidth);