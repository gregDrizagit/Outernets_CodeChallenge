
let container; 
let camera, scene, renderer;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let object; 

let targets = []
let creatures = []
let numCreatures = 20
let numShelters = 2
let isFleeing = false; 
    
init();
// animate();
render(); 

function init(){

    //Init sets up the scene
    container = document.createElement('div')
    document.body.appendChild(container)

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000 )
    
    camera.position.z = 5 //position the camera above the scene. 

    scene = new THREE.Scene()
    backgroundColor = new THREE.Color('#d6d6d6')
    scene.background = backgroundColor
    //create the lights in the scene 
    let ambientLight = new THREE.AmbientLight( 0xffffff, 1 ) // soft white light
    let pointLight = new THREE.PointLight(0xffffff, 1, 100 ) 
    
    pointLight.position.set( 0, 0, -90)

    scene.add(ambientLight)
    scene.add(pointLight)

    generateShelters()
   

    for(let i = 0; i < numCreatures; i++){

        let randomX = Math.floor(Math.random() * 50) 
        let randomY = Math.floor(Math.random() * 50)
        let randomStartingPosition = new THREE.Vector3(randomX, randomY, 0)
        let newCreature = new Creature(new THREE.Vector3(randomStartingPosition.x, randomStartingPosition.y, -99))
        creatures.push(newCreature)
        scene.add(newCreature.mesh)

    }

    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    container.appendChild( renderer.domElement )

}

function generateShelters(){

    //generate Shelters creates 4 targets that the creatures will swim to when they're fleeing. 
    //THe shelters are manually placed off screen.
   
    let targetGeometry = new THREE.BoxGeometry(1, 1, 1)
    let targetMaterial = new THREE.MeshBasicMaterial( { color: 0x5ee40 } );

        
        leftTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        leftTarget.position.set(-100, 0, -99) 
        rightTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        rightTarget.position.set(100, 0, -99)
        upTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        upTarget.position.set(0, 100, -99)
        downTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        downTarget.position.set(0, -100, -99)

        targets.push(leftTarget) //we push all of the targets into a target array.
        targets.push(rightTarget)//Later when the creatures are fleeing, we will use the array to help each creature find the closest target
        targets.push(upTarget)
        targets.push(downTarget)

        for(let i = 0; i < targets.length; i++){
            scene.add(targets[i]) //add each target to the scene 
        }

}


function render() {
    //render() is the animation loop and gets called over and over again.

    requestAnimationFrame( render );
    
    if(volume > 100){ //this is where we trigger the fleeing action 
        isFleeing = true; //when the volume crosses this threshold 
        setTimeout(function(){ //after 10,000ms (10 seconds)
             isFleeing = false; //the flag is reflipped 
             for(let i = 0; i < creatures.length; i++){ //we go over each creature and reset its move speed to a random value
                 creatures[i].resetRandomSpeed()
             }
        }, 10000);

    }

    for(let i = 0; i < creatures.length; i++){ //every frame, we loop over every creature and run a few methods on each
        creatures[i].applyBehavior()//see methods for descriptions of each
        creatures[i].update()
        creatures[i].draw()
    }
    renderer.render( scene, camera );

}



