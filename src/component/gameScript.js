import React, { createRef } from "react"
const BOX_SIZE = 63
const FREE_CELL = 0
const RABBIT_CELL = 1
const WOLF_CELL = 2
const HOME_CELL = 3
const BAN_CELL = 4

const gameImg = {
  [RABBIT_CELL] : {
    name: "rabbit",
    src: "img/rabbit.png",
  },

  [WOLF_CELL] : {
    name: "wolf",
    src: "img/gamewolf.png",
  },
  [BAN_CELL]:{
    name: "ban",
    src: "img/ban.png",
  },
  [HOME_CELL]:{
    name: "home",
    src: "img/home.png",
  }
}



export const gameBoardCreateScript = (select,gameBoard,matrix,gameSettings,statusGame) => {

  gameBoard.current.style.display = "flex"
  statusGame.current.style.display = "none"
const getRandomFreeCell = (length,matrix) => {
  const x = Math.floor(Math.random() * length)
  const y = Math.floor(Math.random() * length)
  if(matrix[y][x] === FREE_CELL){
    return [y,x]
  }else{
    return getRandomFreeCell(length,matrix)
  }
}

const placeCharacter = (character,amount,matrix) =>{
  for(let i = 0; i < amount; i++){
    const arr = getRandomFreeCell(matrix.length,matrix)
    const [x,y] = [arr[0], arr[1]]
    matrix[x][y] = character
  }
}

const characterAmount = (length, gameSettings) => {
  gameSettings.wolves = (length * 60) / 100
  gameSettings.bans = (length * 40) / 100
}

const setBoardSizeWidth = (length) => {
  const boxWidth = length * BOX_SIZE
  gameBoard.current.style.width = boxWidth + "px";

}








function createCell(matrix){
	gameBoard.current.innerHTML = " "
	let boardNumber = 0
	for (let i = 0; i < matrix.length; i++){
		for(let j = 0; j < matrix.length; j++){
			const div = document.createElement("div")
			div.id = `${boardNumber}`
			gameBoard.current.appendChild(div)
			boardNumber++
			if(matrix[i][j] !== 0){
				const img = document.createElement("img")
				img.src = gameImg[matrix[i][j]].src
				img.name = gameImg[matrix[i][j]].name
				div.appendChild(img)
			}
		}
	}
}




setBoardSizeWidth(matrix.length)
characterAmount(matrix.length, gameSettings)
placeCharacter(RABBIT_CELL, gameSettings.rabbit,matrix)
placeCharacter(HOME_CELL, gameSettings.home,matrix)
placeCharacter(WOLF_CELL, gameSettings.wolves,matrix)
placeCharacter(BAN_CELL,  gameSettings.bans,matrix)
createCell(matrix)

}







export const  gameStartScript = (element,select,gameBoard, matrix, h2, statusGame ) => {
  const findCharacterCoordinate = (character,matrix) => {
    const arrXY = []
    for(let i = 0; i < matrix.length; i++){
      for(let j =0; j < matrix.length; j++){
        if(matrix[i][j] === character){
          arrXY.push([i,j])
        }
      }
    }
    return arrXY
  }
  
  

  

    const searchPlaceRabbit = ([x, y],controler,matrix) => {	
      if(controler === `Up`){
        x -= 1
        if(x === -1){
          x = matrix.length - 1
        }
      }
      if(controler === `Down`){
        x += 1
        if(x > matrix.length -1){
          x = 0	
        }
      }
      if(controler === `Right`){
        y -= 1
        if(y === -1){
          y = matrix.length - 1
        }
      }
      if(controler === `Left`){
        y += 1
        if(y > matrix.length - 1){
          y = 0
        }
      }
      return [x,y]
    }

    function createCell(matrix){
      gameBoard.current.innerHTML = " "
      let boardNumber = 0
      for (let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix.length; j++){
          const div = document.createElement("div")
          div.id = `${boardNumber}`
          gameBoard.current.appendChild(div)
          boardNumber++
          if(matrix[i][j] !== 0){
            const img = document.createElement("img")
            img.src = gameImg[matrix[i][j]].src
            img.name = gameImg[matrix[i][j]].name
            div.appendChild(img)
          }
        }
      }
    }

    const objectPlace = ([x,y],[yBefore, xBefore],character,characterEqual,matrix) => {
      if(matrix[x][y] === FREE_CELL){
        matrix[yBefore][xBefore] = FREE_CELL
        matrix[x][y] = character
      }

      if(matrix[yBefore][xBefore] === RABBIT_CELL){
        if(matrix[x][y] === HOME_CELL){
          gameBoard.current.style.display = "none"
          statusGame.current.style.display = "flex"
          h2.current.innerHTML = "You Won!"
        }
      }
    
      if(matrix[x][y] === characterEqual){
        gameBoard.current.style.display = "none"
        statusGame.current.style.display = "flex"
        h2.current.innerHTML = "Game Over"
      }

    }


    const legitimCells = [FREE_CELL, RABBIT_CELL]

    const isLegitimCellForWolf = ([x, y],matrix) => {
      if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length && legitimCells.includes(matrix[x][y])) {
        return [x,y]
      }
    }


    const calcDistance = ([x1, y1]) => ([x2, y2]) =>
        Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2



    const findeH = (allDirections,matrix,[RabbitCoordX,RabbitCoordY], wolvesCoord) => {
      const legalDirections = allDirections.filter((element) => isLegitimCellForWolf(element,matrix))
      const distances = legalDirections.map((element) => calcDistance([RabbitCoordX, RabbitCoordY])(element))
      const minDistance = distances.reduce((element1, element2, i) =>  Math.min(element1,element2))
      const minDistanceIndex = distances.findIndex((element) => element === minDistance)
      return legalDirections[minDistanceIndex]
    }


    const direction = ([x,y]) => {
      return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y  - 1]
      ]
    }

    const RabbitCoordinate = findCharacterCoordinate(RABBIT_CELL,matrix)[0]
    const rabbitMove= searchPlaceRabbit(RabbitCoordinate, element,matrix)
    objectPlace(rabbitMove,RabbitCoordinate,RABBIT_CELL, WOLF_CELL, matrix)
    const wolvesCoordinate = findCharacterCoordinate(WOLF_CELL,matrix)


    wolvesCoordinate.map((el) => {
      const allDirection = direction(el, matrix.length)
      const h = findeH(allDirection,matrix,RabbitCoordinate, el)
      objectPlace(h, el,WOLF_CELL, RABBIT_CELL, matrix)
    })

    createCell(matrix)
}
