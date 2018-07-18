 class Creature {

    constructor(position){
       this.maxspeed =  0.08
       this.maxforce =  0.005
       this.position = new THREE.Vector3(position.x, position.y, position.z)
       this.velocity = new THREE.Vector3(this.maxspeed, 0, 0)
       this.acceleration = new THREE.Vector3()
       this.desired = new THREE.Vector3()
       this.steer = new THREE.Vector3()
       this.mesh = this.createGeometry()
       this.target = new THREE.Vector3()

       this.wanderAngle = 0
       this.wanderDistance = 30;
       this.wanderRadius = 5;
       this.wanderRange = 1;
      
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

    wander () {

        var center = this.velocity.clone().normalize().setLength(this.wanderDistance);
        var offset = new THREE.Vector3(1, 1, 0);
        offset.setLength(this.wanderRadius);
        offset.x = Math.sin(this.wanderAngle) * offset.length()
        // offset.z = Math.cos(this.wanderAngle) * offset.length()
        offset.y = Math.sin(this.wanderAngle) * offset.length()
    
        this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5;
        center.add(offset)
        center.setY(0)
        this.target.copy(center)

    }


    swim(){

        // if (!target.x || !target.y) return
    
        // A vector pointing from the position to the target
        this.wander()
        this.desired.subVectors(this.target, this.position)
        this.desired.normalize()
        this.desired.multiplyScalar(1)
    
        // // Steering = Desired minus velocity
        this.steer.subVectors(this.desired, this.velocity)
        this.steer.clampScalar(-this.maxforce, this.maxforce)
    
        // // Apply the steering force to the acceleration
        this.applyForce(this.steer)

    }

    draw(){

        this.mesh.position.copy(this.position)

        this.mesh.rotation.y = Math.atan2(-this.velocity.z, this.velocity.x)
        this.mesh.rotation.z = Math.asin(this.velocity.y / this.velocity.length())
    }



}

