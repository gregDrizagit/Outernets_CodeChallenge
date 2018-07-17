 class Creature {

    constructor(position){
        this.maxspeed =  0.03
        this.maxforce =  0.005
       this.position = new THREE.Vector3(position.x, position.y, position.z)
       this.velocity = new THREE.Vector3(this.maxspeed, 0, 0)
       this.acceleration = new THREE.Vector3()
       this.desired = new THREE.Vector3()
       this.steer = new THREE.Vector3()
       this.mesh = this.createGeometry()
       this.target = new THREE.Vector3()
      
       return this
    }

    
    createGeometry(){

        let geometry = new THREE.ConeGeometry(3, 5, 7 )
        let material = new THREE.MeshPhongMaterial( { color: 0x5eff40 } );
        let mesh = new THREE.Mesh(geometry, material)
       
        mesh.position.set(this.position.x, this.position.y, this.position.z)
        return mesh
    }


    update () {
        this.velocity.add(this.acceleration)
        this.velocity.clampScalar(-this.maxspeed, this.maxspeed)
        this.position.add(this.velocity)
        this.acceleration.multiplyScalar(0)
        // console.log(this.position)
      }

    applyForce (force) {
        this.acceleration.add(force)
      }


    swim(){

        // if (!target.x || !target.y) return
    
        // A vector pointing from the position to the target
        console.log(targetMesh)
        this.desired.subVectors(targetMesh.position, this.position)
        // // Normalize the direction and scale to max speed
        this.desired.normalize()
        this.desired.multiplyScalar(1)
    
        // // Steering = Desired minus velocity
        this.steer.subVectors(this.desired, this.velocity)
        this.steer.clampScalar(-this.maxforce, this.maxforce)
    
        // // Apply the steering force to the acceleration
        this.applyForce(this.steer)

        // this.mesh.position.z -= 0.05
          
    }

    draw(){

        this.mesh.position.copy(this.position)
    }



}

