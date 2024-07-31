
const gridContainer = document.querySelector("#gridContainer");

let gridWidth = 64

function createGrid(gridWidth) {

    for (let i = 0; i < gridWidth; i++) {

        const rowContainer = document.createElement("div");
        rowContainer.classList.add("rowContainer");
        gridContainer.appendChild(rowContainer);

        for (let j = 0; j < gridWidth; j++) {

            const gridDiv = document.createElement("div");
            gridDiv.classList.add("gridDiv");
            gridDiv.style.opacity = "0"

            gridDiv.addEventListener("mouseover", () => {
                opacity = parseFloat(gridDiv.style.opacity);
                if (opacity <= 0.8) {
                    gridDiv.style.opacity = opacity + 0.2;
                };
                
            });

            rowContainer.appendChild(gridDiv);
        };
    };
}

createGrid(gridWidth);

function clearGrid() {
    gridContainer.replaceChildren();
}

document.querySelector("#buttons").addEventListener("click", (event) => {
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
        case "clearBtn":
            break;
            
    }
    createGrid(gridWidth);
})



/*
let isDrawing = false;
document.body.onmousedown = () => {
    isDrawing = true;
};
document.body.onmouseup = () => {
    isDrawing = false;
};
*/


// TO TRY: 
// event listener for hovering.
    // if mousedown == true, then change colour of div
    // but if mouseup == true, then do nothing 
    // should act like pencil being pressed down on paper?
