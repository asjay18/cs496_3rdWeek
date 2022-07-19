let intro = document.querySelector('.intro')
let splash1 = document.querySelector('#imghelicopter')
let splash2 = document.querySelector('#circle')

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const restartBtn = document.querySelector('#restartBtn');
const closeBtn = document.querySelector('#closeBtn');
const modalEl = document.querySelector('#modalEl');
const bigScoreEl = document.querySelector('#bigScoreEl');
const explanation = document.querySelector('#explanation');

modalEl.style.display = 'none'

window.addEventListener('DOMContentLoaded', ()=>{
    modalEl.style.display = 'none'
    splash1.addEventListener('animationend',()=>{
        setTimeout(() => {
            intro.style.left = '-100vw'
            modalEl.style.display = 'flex'
        },500);
    })   
})

const bird_num = 5

// Matter modules
const { Render, Runner, Engine, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events, Body } = Matter

// Bird specs
const { name, posX, posY, radius, phy, grow, maxGrow } = getRandomBird()
  // get USER and HOSTNAME and TIME INFO from url
const currURL = document.URL
const USERID = getParameterByName('id',currURL)
const HOSTNAME = getParameterByName('hostname',currURL)
const TIME = parseInt(getParameterByName('time', currURL))
const jsonObj = {"userid":USERID}
//=================================================


//====================timer========================
const startTime = Date.now()

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let userInfo;
let siteList;
let ind;
fetch("http://192.249.18.156:443/info",{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObj),
}).then(response => {
    return response.json();
})  
.then(jsondata => {
    console.log(jsondata)
    userInfo = jsondata
    siteList = jsondata.sites
    console.log(siteList);
    hostnamelist = userInfo.sites.map(x => x.hostname)
    ind = hostnamelist.indexOf(HOSTNAME);
    if(ind==-1) console.log("no");
})


let shoot = true;


// characterName.textContent = name
const width = innerWidth-1
const height = innerHeight-1
// Game distribution
const gameSize = { w: innerWidth-1, h: innerHeight-1 }
const baseProps = { w: width/3.0, h: 20, posX: gameSize.w*5/6, posY: gameSize.h*3.1/4 }
const bricksProps = { w: baseProps.w / 8, h: 30, posX: baseProps.posX - baseProps.w / 2, posY: 50, cols: 5, rows: 10 }


const engine = Engine.create()

//Engine.update(new_engine, 1)
const render = Render.create({
    element: document.body,
    engine,
    options: { width: gameSize.w, height: gameSize.h, wireframes: false, 
        background: './img/background.jpg'
    }
})
engine.world.gravity.y = engine.world.gravity.y*0.8



const base = Bodies.rectangle(baseProps.posX, baseProps.posY, baseProps.w, baseProps.h, { isStatic: true })
const ground = Bodies.rectangle(posX-width/100, baseProps.posY, width/6.5, baseProps.h, { isStatic: true, render: { fillStyle: '#718B56' } })

const bricks = Composites.stack(bricksProps.posX, bricksProps.posY, bricksProps.cols, bricksProps.rows, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, bricksProps.w, bricksProps.h, {render: { fillStyle: '#964B00' }})
})
const r = 23
const d = 100;
const house = [];
var gravity = engine.world.gravity;

const cloud_bar = Bodies.rectangle(baseProps.posX-width/5, width/13-15, width/1.5, 10, { isStatic: true, density: 10, render: { fillStyle: '#2c2f58' }})
house.push(cloud_bar)

const cloud = Bodies.rectangle(baseProps.posX-width/5, width/20, 10, 10, {
    density: 0.001,
    frictionAir: 0.0,
    restitution: 0.03,       
    friction: 0.0,
    render: {
        sprite: {
            texture: './img/cloud.png',
            xScale: 0.1,
            yScale: 0.1
        }
    }
}
);

console.log("gravity");
Body.setMass(cloud, 0.1)



house.push(cloud);
Body.setVelocity( cloud, {x: 1, y:0});
setInterval(() => {
    if(cloud.position.x>width/2){
        Body.setVelocity( cloud, {x: -1, y:0});
    }
    else if(cloud.position.x<baseProps.posX-width/5-width/3.4){
        Body.setVelocity( cloud, {x: 1, y:0});
    }
}, 100)

const car_house = Composites.stack(bricksProps.posX+width/100, baseProps.posY-height/6, 1, 3, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, 40, 130/3, {render: { fillStyle: '#826A5F' , strokeStyle: '#625149', lineWidth: 3}})
})
house.push(car_house);

const wall_base = Bodies.rectangle(baseProps.posX-width/3.5, baseProps.posY, width/8, baseProps.h, { isStatic: true })
house.push(wall_base);

const wall = Composites.stack(baseProps.posX-width/3, baseProps.posY-height*2.3/5, 4, 4, 0, 0, (x, y, xi, yi) => {
    if(xi==0||xi==3||yi==3) return Bodies.rectangle(x, y, 40, 80, {density: 0.1, render: { fillStyle: '#808080',  strokeStyle: 'black', lineWidth: 3}});
    else return Bodies.rectangle(x, y, 40, 80, {density: 0.001, render: { fillStyle: '#aad6e9',  strokeStyle: 'black', lineWidth: 3, 
    sprite: {
        texture: './img/window.png',
        xScale: 0.13,
        yScale: 0.13
    }  
  }})});
house.push(wall);

const layer2_m = Composites.stack(bricksProps.posX+width/5.5, baseProps.posY-height*1.77/5, 1, 5, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, 40, height/30, {render: { fillStyle: '#826A5F' , strokeStyle: '#625149', lineWidth: 3}})});
house.push(layer2_m);
const left_house = Bodies.rectangle(bricksProps.posX+200, baseProps.posY-20, 40, height/5, {density: 1});
const right_house = Bodies.rectangle(baseProps.posX+width/3, baseProps.posY-20, 40, height/5, {density: 1});
const middle_house = Bodies.rectangle(bricksProps.posX+350, baseProps.posY-20, 40, height/5, {density: 1});
const layer = Bodies.rectangle(bricksProps.posX+400, baseProps.posY-height/5+10, baseProps.w*1.3, 10, {isStatic:true, density: 10,render: { fillStyle: '#826A5F' }});

const layer2 = Bodies.rectangle(bricksProps.posX+width/5.5+17, baseProps.posY-height*2/5+20, baseProps.w-150, 10, {isStatic:true, density: 10, render: { fillStyle: '#826A5F' }});
const layer2_l = Composites.stack(bricksProps.posX+width/20+35, baseProps.posY-height*1.77/5, 1, 5, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, 40, height/30, {render: { fillStyle: '#826A5F' , strokeStyle: '#625149', lineWidth: 3}})});
const layer2_r = Bodies.rectangle(bricksProps.posX+baseProps.w-50, baseProps.posY-height*1.5/5+20, 40, height/5.2, {isStatic:true, density: 1000, render: { fillStyle: '#826A5F' }});

Composite.add(engine.world, [left_house, right_house, middle_house, layer, layer, layer2, layer2_l, layer2_r])
house.forEach((l)=>{
    Composite.add(engine.world, [l]);
})

const pc = Bodies.circle(bricksProps.posX+width/4.4, baseProps.posY-height*1.8/5, r, {
    density: 0.0005,
    frictionAir: 0.06,
    restitution: 0.3,       
    friction: 0.01,
    render: {
        sprite: {
            texture: './img/pc.PNG',
            xScale: 0.12,
            yScale: 0.12
        }
    }
});
const slingshot = Bodies.circle(posX, posY, r, {
    density: 0.0005,
    frictionAir: 0.06,
    restitution: 0.3,       
    friction: 0.01,
    isStatic: true,
    density: 0.0000000001,

    render: {
        sprite: {
            texture: './img/slingshot.png',
            xScale: 0.2,
            yScale: 0.2
        }
    }
});
const floor = Bodies.circle(posX, posY+100, r, {
    density: 0.0005,
    frictionAir: 0.06,
    restitution: 0.3,       
    friction: 0.01,
    isStatic: true,

    render: {
        sprite: {
            texture: './img/floor.png',
            xScale: 0.5,
            yScale: 0.5
        }
    }
});
slingshot.position.x+=20;
slingshot.position.y-=20;
var birds = [];
var shooters = [];
let line = posX;
for(var i=0; i<bird_num; i++) {
    var bird = getRandomBird();
    var rad = bird.radius;
    var physics = bird.physics;
    console.log(physics.grow)
    line=line-rad;
    if(i==0) birds.push(Bodies.circle(posX, posY, rad, physics))
    else birds.push(Bodies.circle(line, baseProps.posY-50, rad, physics))
}

let shooter = Constraint.create({
pointA: { x: posX, y: posY},

bodyB: birds[0]

})
shooters.push(shooter);

// birds.forEach((bird, index) => {
//     let shooter = Constraint.create({
//     pointA: { x: posX-index * 100, y: (index==0)?(posY-index * 100):baseProps.posY+10 },

//     bodyB: bird
    
//     })
//     shooters.push(shooter);
// })


let mouse = Mouse.create(render.canvas)
let mouseContraint = MouseConstraint.create(engine, { mouse })

function getDistance(x, y) { 
	var xDiff = x.position.x - y.position.x; 
	var yDiff = x.position.y - y.position.y;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

let isFiring = false
let n = 0;
console.log(birds[1]);

Events.on(mouseContraint, 'enddrag', () => {isFiring = true;
    /*const new_engine = Engine.create()
    Runner.run(new_engine)
    const runner = Matter.Runner.create();
    const new_render = Matter.Render.create({
      element: el,
      new_engine,
      options: {height: 180, width: 400, wireframes: false}
    });
    Runner.start(runner, new_engine);*/
     // World.clear(world);
    //Engine.clear(engine);
    //Render.stop(render);
        // Runner.stop(runner);
    //render.canvas.remove();
  
    // render.canvas = null;
        // render.context = null;
        // render.textures = {};
    Events.on(mouseContraint, 'mousedown', (event) => {
        console.log("mousedown");
        var factor = birds[n].factor==undefined?1:birds[n].factor;
        Body.setVelocity( birds[n], {x: birds[n].velocity.x*factor , y: birds[n].velocity.y});
        //let twins = Matter.C.clone(birds[n]);
        //Body.set(twins, "position", { x: posX, y: posY });
        //if(birds[n].position.x>width/3) Composite.add(engine.world, [twins]);
    });
    setTimeout(
        () => {
            if(n==bird_num && bigScoreEl.textContent != '잠금 해제 완료'){
                bigScoreEl.textContent = '실패했습니다'
                explanation.innerHTML = '지금이라도 포기하고 돌아가시는 게 어떨까요?'
                modalEl.style.display = 'flex'
                restartBtn.style.display = 'block'
                startGameBtn.style.display = 'none'
            }
            if(!shoot){
                n++     
                Body.set(birds[n], "position", { x: posX, y: posY });
                console.log(birds[n]);
                console.log('Hello after 4 seconds');
                shoot = true;
                shooter = Constraint.create({
                pointA: { x: posX, y: posY},
                    
                bodyB: birds[n]
                
                })
                shooters.push(shooter);
                isFiring = false;
                Composite.add(engine.world, [shooter])
            }
          

        },
        4 * 1000
    );})
    let currTime;
    function timeout(){
        currTime = Date.now()
        let diff = currTime - startTime
        if(TIME - diff <= 0){
            return true
        }
        return false
    }
Events.on(engine, 'afterUpdate', () => {
    let bird = birds[n]
    currTime = Date.now()

    // ================================================
     // timeout
     if(timeout()){
        alert("제한시간 5분이 초과되었습니다. 게임이 종료됩니다. 내일 다시 시도하세요!")
        document.location.href=`http://${HOSTNAME}`
    }
    if (isFiring) {
        console.log(shoot);

        shoot = false;
        Composite.remove(engine.world, shooter, true)
        setTimeout(()=>{
            var grow = bird.grow;
        var maxGrow = bird.maxGrow;
        if (grow && bird.render.sprite.xScale < maxGrow) {
            console.log(bird);
            console.log(bird.circleRadius*bird.grow);
            bird.render.sprite.xScale = bird.render.sprite.xScale * grow;
            bird.render.sprite.yScale = bird.render.sprite.yScale * grow;
            Body.setMass(bird, 100);
        }
        }, 1000 * 0.4)
        
        
        console.log(n);
    }
    if(getDistance(bird, pc)-pc.circleRadius-bird.circleRadius<1)  {

        // World.clear(world);
        // Engine.clear(engine);
        // Render.stop(render);
        // Runner.stop(runner);
        // render.canvas.remove();
        // render.canvas = null;
        // render.context = null;
        // render.textures = {};
        const new_engine = Engine.create()
        render.engine = new_engine
        render.options.background = './img/background_0101.png'
      
            //Composite.remove(engine.world, [base, mouseContraint, pc, ground, shooter], true)
        const ball = Bodies.circle(width/5, height/2, 10, {
            density: 0.0005,
            frictionAir: 0.00,
            restitution: 0.3,       
            friction: 0.01,
            render: {
                fillStyle: 'white'
            }
        });
        const cpu = Bodies.circle(width*4.26/5, height/2, 50, {
            density: 0.0005,
            frictionAir: 0.00,
            restitution: 0.3,       
            friction: 0.01,
            isStatic: true,
            render: {
                
                sprite: {
                    texture: './img/cpu.png',
                    xScale: 0.18,
                    yScale: 0.18
                }
                
            }
        });
        Composite.add(new_engine.world, [ball, cpu]);
        Runner.run(new_engine);
        new_engine.gravity.y=0
        Body.setVelocity( ball, {x: 0, y:0});
        
        userInfo.sites[ind].isbroken=1;
        fetch("http://192.249.18.156:443/infochange", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"userid":USERID, "data":userInfo}),
        }).then(res=>res.json()).then(console.log())
        
        setInterval(
            () => {
                Body.applyForce(ball, ball.position, {
                    x: 0.0001, 
                    y: 0
                    });
                console.log(getDistance(ball, cpu)-cpu.circleRadius-ball.circleRadius);
                if(getDistance(ball, cpu)-cpu.circleRadius-ball.circleRadius<0){
                    Body.setVelocity( ball, {x: 0, y:0});
                    bigScoreEl.textContent = '잠금 해제 완료'
                    explanation.innerHTML = '부품을 다시 찾았습니다!'
                    modalEl.style.display = 'flex'        
                    restartBtn.style.display = 'none'
                    startGameBtn.style.display = 'none'
                    closeBtn.style.display = 'block'
                }
            },
            1 * 100
        )}
        
        //document.location.href=`http://${HOSTNAME}`
    

       
        // render.options.background = './img/background_0101.jpg'
   
        //closeBtn.style.display = 'block'
        //modify
        //userInfo.sites[ind].isbroken=1;
     
    //score.textContent = bricks.bodies.filter(elm => elm.position.y > gameSize.h).length
})
Composite.add(engine.world, [base, mouseContraint, pc, ground, shooter])

birds.forEach((bird, index)=>{
    Composite.add(engine.world, [bird])
})

Runner.run(engine)
Render.run(render)

restartBtn.style.display = 'none'
startGameBtn.addEventListener('click', () => {
    //init()
    //animate();
    //spqwnEnemies();
    modalEl.style.display = 'none'
})




var audio = document.querySelector('audio');
if (audio) {
    window.addEventListener('keydown', function (event) {
      var key = event.which || event.keyCode;
      if (key === 32) { // spacebar
        // eat the spacebar, so it does not scroll the page
        event.preventDefault();
        audio.paused ? audio.play() : audio.pause();
      }
    });
  }