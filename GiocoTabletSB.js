// Script.js

const numRows = 4;
const numCols = 4;
var trycount = 0;


const gameBoard =
	document.getElementById(
		"gameBoard"
	);

let board = [];
var da_rivelare = [];


function initializeBoard() {
	for (let i = 0; i < numRows; i++) {
		board[i] = [];
		for (let j = 0; j < numCols;j++) {
			board[i][j] = {
				isMine: false,
				revealed: false,
				count: 0,
			};
			da_rivelare.push(board[i][j]);
		}
	}
}


function createPopup(id){
	let popupNode = document.querySelector(id);
	//let overlay = popupNode.querySelector(".overlay");
	let esciBtn = popupNode.querySelector(".esci-btn");
	let riprovaBtn = popupNode.querySelector(".riprova-btn");
	function openPopup() {
		popupNode.classList.add("active");
	}
	function closePopup() {
		popupNode.classList.remove("active");
	}
	function riprova() {
		popupNode.classList.remove("active");
		setTimeout(function() { location.reload(); }, 500);
	}
	//overlay.addEventListener("click", closePopup);
	esciBtn.addEventListener("click", closePopup);
	riprovaBtn.addEventListener("click", riprova);
	return openPopup;
}

let popup = createPopup("#popup");

function revealCell(row, col) {
	if (
		row < 0 ||
		row >= numRows ||
		col < 0 ||
		col >= numCols ||
		board[row][col].revealed
	) {
		return;
	}

	board[row][col].revealed = true;
	trycount = trycount + 1;

	const index = da_rivelare.indexOf(board[row][col]);
	if (index > -1) {
	  da_rivelare.splice(index, 1);
	}

	renderBoard();

	if (trycount >= 8){
		
		//casella vincente compare random al termine del gioco

		let minesPlaced = 0;
		const randomElement = da_rivelare[Math.floor(Math.random() * da_rivelare.length)];
		randomElement.isMine = true;
		randomElement.revealed = true;
		renderBoard();

		popup();

		//setTimeout(function() { alert("Mi dispiace. Hai finito i tentativi."); }, 200);
		//setTimeout(function() { location.reload(); }, 250);
		/*setTimeout(function() { if(confirm("Mi dispiace. Hai finito i tentativi. Vuoi riprovare?")){
			setTimeout(function() { location.reload(); }, 250);
		}; }, 200);*/

//random vecchia
		/*let minesPlaced = 0;
		while(board[row][col].revealed){
			var row = Math.floor(
				Math.random() * numRows
			);
			var col = Math.floor(
				Math.random() * numCols
			);
		}

		board[row][col].isMine = true;
		board[row][col].revealed = true;

		if(trycount >= 8){
			//alert("Mi dispiace. Hai finito i tentativi.");
			setTimeout(function() { alert("Mi dispiace. Hai finito i tentativi."); }, 200);
			setTimeout(function() { location.reload(); }, 250);	
		}*/
	}
}


function renderBoard() {
	gameBoard.innerHTML = "";

	for (let i = 0; i < numRows; i++) {
		for (
			let j = 0;
			j < numCols;
			j++
		) {
			const cell =
				document.createElement(
					"div"
				);
			cell.className = "cell";
			if (board[i][j].revealed) {
				cell.classList.add(
					"revealed"
				);
				if (
					board[i][j].isMine
				) {
					cell.classList.add(
						"mine"
					);
					cell.textContent =
						"";
				} else if (
					board[i][j].count >
					0
				) {
					cell.textContent =
						board[i][
							j
						].count;
				}
			}
			cell.addEventListener(
				"click",
				() => revealCell(i, j)
			);
			gameBoard.appendChild(cell);
		}
		gameBoard.appendChild(
			document.createElement("br")
		);
	}
}


initializeBoard();
renderBoard();
