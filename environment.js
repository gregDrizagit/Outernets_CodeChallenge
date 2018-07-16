
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

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    camera.position.z = 5;

    scene = new THREE.Scene();
    backgroundColor = new THREE.Color('#ffffff')
    scene.background = backgroundColor
    var light = new THREE.DirectionalLight( 0x404040 ); // soft white light
    scene.add(light)

    

    creature = new Creature();

    scene.add(creature.geometry)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );


}


function render() {
    requestAnimationFrame( render );

     creature.swim()

    renderer.render( scene, camera );

}
