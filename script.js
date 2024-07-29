
const gridContainer = document.querySelector("#gridContainer");
let gridWidth = 4

function createGrid(gridWidth) {
    for (let i = 0; i < gridWidth*gridWidth; i++) {
        let pixelDiv = document.createElement("div");
        pixelDiv.className = "pixelDiv";
        gridContainer.appendChild(pixelDiv);
    }
}

