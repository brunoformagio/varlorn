import React from 'react';
import './App.css';
import GitHubButton from 'react-github-btn'
import playerImage from './graphics/player/vk_idle1.png'

//References
let gameArea = React.createRef()
var playerLastPos;
var gameOver;
var lastCameraPos;
var screenHeight;
var screenWidth;
var ctx;

var map1 = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ]

//Turnos
var turnoPlayer = true;

//Tamanhos e posições
var camera = {'x':1250,'y':1050};
var playerPos =  {'x':1, 'y':1};
var tileSize = 25;


const thePlayer = function(posx,posy){
  var player = new Image();
  player.src = playerImage;
  ctx.drawImage(player, posx, posy, 25, 25);
}




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {game: 1};
    this.movePlayer = this.movePlayer.bind(this);
  }

  componentDidMount() {
    this.playerAction = setInterval(
      () => this.update(),
      100
    );


  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    clearInterval(this.playerAction);
  }

    onKeyPressed(e) {
    e.preventDefault();
    this.movePlayer(e.keyCode);
  }

  //Controls

  movePlayer(key) {
    this.tempPosition();
   if(key === 68 || key === 39) {
    playerPos.x = playerPos.x+tileSize;
    camera.x = camera.x - 100;
  }
  if(key === 65|| key === 37) {
    playerPos.x = playerPos.x-tileSize;
    camera.x = camera.x + 100;
  }
  if(key === 87 || key === 38) {
    playerPos.y = playerPos.y-tileSize;
    camera.y = camera.y + 100;
  }

  if(key === 83 || key === 40) {
    playerPos.y = playerPos.y+tileSize;
    camera.y = camera.y - 100;
  }

  setTimeout(()=> {
      turnoPlayer = false;
  },200);
  }

  //Temp Positions
  tempPosition(){
    playerLastPos = {'x':playerPos.x, 'y':playerPos.y}
    lastCameraPos = {'x':camera.x, 'y':camera.y}
  }

  //Update and render game
  update() {
  ctx = gameArea.current.getContext('2d');

  //Update Camera
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  var ajustesdetelaX;
  var ajustesdetelaY;

  if(screenWidth > 1200){
  ajustesdetelaX = 0;
  ajustesdetelaY = 0;
  } else if(screenWidth > 992){
  ajustesdetelaX = -80;
  ajustesdetelaY = -20;
  } else if(screenWidth > 768){
  ajustesdetelaX = -210;
  ajustesdetelaY = -35;
  } else if(screenWidth > 420){
  ajustesdetelaX = -300;
  ajustesdetelaY = -35;
  }
  gameArea.current.style.marginLeft = camera.x+ajustesdetelaX+"px";
  gameArea.current.style.marginTop = camera.y+ajustesdetelaY+"px";

  if (gameArea.current.getContext) {

  //Clear and render map
  ctx.clearRect(0, 0, gameArea.current.width, gameArea.current.height);
  var row = -1;
  var col = -1;
  for (var i = 0; i < map1.length; i++) {
    col ++;
    if(i % 20 === 0){row++; col = 0; }
      ctx.save();
      ctx.translate(col * tileSize, row * tileSize);
      ctx.lineWidth = 0.1;
      ctx.strokeRect(0, 0, tileSize, tileSize);
      ctx.restore();
  }
  
  //Render Player
  var jogador = new thePlayer(playerPos.x,playerPos.y);

  }

  //Update Log

document.getElementById('log').innerText= "Player position: "+playerPos.x+", "+playerPos.y;

    this.setState({
      game: 1
    });
  }

  render() {
    return (
      
        <div className="App">
        <div className="container header">
          <div className="row">
            <div className="col-sm-6">
            <h1>Project Varlorn</h1>
            <h4>A roguelike game by Bruno Formagio</h4>
            </div>
            <div className="col-sm-6 text-right">
            <h5>v0.1 (11/05/19)</h5>
            <GitHubButton href="https://github.com/brunoformagio/varlorn/subscription" data-size="large" aria-label="Watch brunoformagio/varlorn on GitHub">Watch</GitHubButton>
            </div>
          </div>
        </div>
        <div id="gameArea" className="container">
          <canvas id="play"ref={gameArea} width="500" height="500" >
          </canvas>
          <div id="log">
          <h2>It is {this.state.game}.</h2>
          </div>
        </div>
        
        <div className="container journal">
          <div className="row"><h1>Dev Journal</h1></div>
          <br/>
          <div className="row item">
            <h5><b>v0.1 Initial release</b></h5>
            <p>First entry, with basic tilemap, camera controls and positions.</p>
          </div>
          <p></p>
        </div>


      </div>
      

    );
  }
}

export default App;

