 class Creature {

    constructor(){
       let geometry = new THREE.SphereGeometry( 1, 32, 32 )
       let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
       this.obj = new THREE.Mesh(geometry,material); 
       return this
    }

     swim(){
        this.obj.position.z -= 0.005;
    }


}

