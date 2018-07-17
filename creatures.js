 class Creature {

    constructor(position){
       this.position = new THREE.Vector3(position.x, position.y, position.z)
       this.velocity = new THREE.Vector3(0, 0, 0)
       this.acceleration = new THREE.Vector3()
       this.desired = new THREE.Vector3()
       this.steer = new THREE.Vector3()
       this.mesh = this.createGeometry()

       return this
    }


    createGeometry(){

        let geometry = new THREE.ConeGeometry(3, 5, 7 )
        let material = new THREE.MeshPhongMaterial( { color: 0x5eff40 } );
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = this.position.x
        mesh.position.y = this.position.y
        mesh.position.z = this.position.z

        return mesh
    }

    applyForce (force) {
        this.acceleration.add(force)
      }


    swim(){

        // if (!target.x || !target.y) return
    
        // A vector pointing from the position to the target
        // this.desired.subVectors(target, this.position)
    
        // // Normalize the direction and scale to max speed
        // this.desired.normalize()
        // this.desired.multiplyScalar(1)
    
        // // Steering = Desired minus velocity
        // this.steer.subVectors(this.desired, this.velocity)
        // this.steer.clampScalar(-this.maxforce, this.maxforce)
    
        // // Apply the steering force to the acceleration
        // this.applyForce(this.steer)

        this.mesh.position.z -= 0.05
          
    }

    flee(){

    }


}

