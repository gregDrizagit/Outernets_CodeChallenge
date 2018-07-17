
let container; 
let camera, scene, renderer;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let object; 
    
init();
// animate();
render(); 

function init(){
    container = document.createElement('div')
    document.body.appendChild(container)

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    camera.position.z = 5;

    scene = new THREE.Scene();
    // backgroundColor = new THREE.Color('#000000')
    // scene.background = backgroundColor
    let ambientLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
    let pointLight = new THREE.PointLight(0xffffff, 1, 100 ); 
    pointLight.position.set( 0, 0, 5 );

    scene.add(ambientLight)
    scene.add(pointLight)

    

    creature = new Creature();

    scene.add(creature.mesh)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    container.appendChild( renderer.domElement );


}

function render() {
    requestAnimationFrame( render );
    

    if(volume > 100){
        console.log(alert("You scared the fish"))
    }
    creature.swim()
    renderer.render( scene, camera );

}



