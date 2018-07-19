
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
    container = document.createElement('div')
    document.body.appendChild(container)

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    camera.position.z = 5;

    scene = new THREE.Scene();
    backgroundColor = new THREE.Color('#d6d6d6')
    scene.background = backgroundColor
    let ambientLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
    let pointLight = new THREE.PointLight(0xffffff, 1, 100 ); 
    let plane = new THREE.PlaneBufferGeometry( 50, 50, 100, 100 );
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        transparent: true
      })
    let planeMesh = new THREE.Mesh(plane, planeMaterial)

    planeMesh.position.set(0, 0, -100)
    pointLight.position.set( 0, 0, -90 );



    // scene.add(planeMesh)
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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    container.appendChild( renderer.domElement )

}

function generateShelters(){

    let windowArea = new THREE.Vector3()
   
    let targetGeometry = new THREE.BoxGeometry(1, 1, 1)
    let targetMaterial = new THREE.MeshPhongMaterial( { color: 0x5ee40 } );

        
        leftTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        leftTarget.position.set(-100, 0, -99)
        rightTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        rightTarget.position.set(100, 0, -99)
        upTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        upTarget.position.set(0, 100, -99)
        downTarget = new THREE.Mesh(targetGeometry, targetMaterial)
        downTarget.position.set(0, -100, -99)

        targets.push(leftTarget)
        targets.push(rightTarget)
        targets.push(upTarget)
        targets.push(downTarget)


        for(let i = 0; i < targets.length; i++){
            scene.add(targets[i])

        }

}


function render() {
    requestAnimationFrame( render );
    
    if(volume > 100){
        isFleeing = true; 
        setTimeout(function(){ 
             isFleeing = false;
             for(let i = 0; i < creatures.length; i++){
                 creatures[i].resetRandomSpeed()
             }
        }, 10000);

    }

    for(let i = 0; i < creatures.length; i++){
        creatures[i].applyBehavior()
        creatures[i].update()
        creatures[i].draw()
    }
    renderer.render( scene, camera );

}



