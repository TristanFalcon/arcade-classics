
import Canvas from '../scripts/modules/canvas.js';
import Snake from '../scripts/modules/snake.js';
import Food from '../scripts/modules/food.js';

/**
* This is the app.js file, this file takes and runs all 
* code from the .js files under modules/
*
* @author Tristan Falcon
**/

const element = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const snake = new Snake(ctx, element);
const canvas = new Canvas(ctx, element);
const food = new Food(ctx, element);

canvas.drawCanvas();
snake.drawSnake();
food.randomCoordinate();
food.setFoodLocation();
food.drawFood();
var foodX = food.getFoodX();
var foodY = food.getFoodY();
var parts = snake.getSnakeLocation();
canvas.isFoodOnSnake(parts, foodX, foodY);





