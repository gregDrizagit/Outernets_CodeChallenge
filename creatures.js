const vec3 = () => new THREE.Vector3()

 class Creature {

    constructor(position){
       this.maxspeed =  0.08
       this.maxforce =  0.003
       this.position = new THREE.Vector3(position.x, position.y, position.z)
       this.velocity = new THREE.Vector3(this.maxspeed, 0, 0)
       this.acceleration = new THREE.Vector3()
       this.desired = new THREE.Vector3()
       this.steer = new THREE.Vector3()
       this.mesh = this.createGeometry(position.x, position.y, position.z)
       this.target = new THREE.Vector3()
       this.radius = 10

       this.wanderAngle = 0
       this.wanderDistance = 18;
       this.wanderRadius = 5;
       this.wanderRange = 10;
      
       return this
    }

    
    createGeometry(posX, posY, posZ){

        let geometry = new THREE.SphereGeometry( 1, 20, 20 );
        let material = new THREE.MeshPhongMaterial( { color: 0x5eff40 } );
        let mesh = new THREE.Mesh(geometry, material)
       
        mesh.position.set(posX, posY, posZ)
        return mesh
    }


    update () {
        this.velocity.add(this.acceleration)
        this.velocity.clampScalar(-this.maxspeed, this.maxspeed)
        this.position.add(this.velocity)
        this.acceleration.multiplyScalar(0)
    }

    applyForce (force) {
        this.acceleration.add(force)
    }

    wander () {

        var center = this.velocity.clone().normalize().setLength(this.wanderDistance);
        var offset = new THREE.Vector3(1, 1, 1);
        offset.setLength(this.wanderRadius);
        offset.x = Math.sin(this.wanderAngle) * offset.length()
        offset.z = Math.cos(this.wanderAngle) * offset.length()
        offset.y = Math.sin(this.wanderAngle) * offset.length()
    
        this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5;
        center.add(offset)
        center.setZ(0)
        this.target.copy(center)

    }

    separate(){
        let distance
        let sum = new THREE.Vector3()
        let count = 0; 

        creatures.forEach(otherCreature => {
             distance = this.position.distanceTo(otherCreature.position)
            if(distance > 0 && distance <= this.radius){
                const diff = vec3().subVectors(this.position, otherCreature.position)
                diff.normalize()
                diff.divideScalar(distance)
                sum.add(diff)
                count++; 
            }
        })

        if(count > 0){

            sum.normalize()
            sum.multiplyScalar(this.maxspeed)
            // Steering = Desired minus velocity
            this.steer.subVectors(sum, this.velocity)
            this.steer.clampScalar(-this.maxforce, this.maxforce)

            return this.steer 

        }else{
            return new THREE.Vector3()
        }

       
    }

    applyBehavior(){

        if(isFleeing){
            this.target.copy(targetMesh.position)
            this.maxspeed = 0.9
            const seek = this.seek()
            seek.multiplyScalar(5)
            this.applyForce(seek)

        }else{

            this.target = new THREE.Vector3()
            this.maxspeed = 0.08; 
            const separate = this.separate(); 
            const seek = this.seek()
            separate.multiplyScalar(5) // more important
            seek.multiplyScalar(0.9) 
            this.applyForce(separate)
            this.applyForce(seek)
        }

         
        
    }


    seek(){

        // if (!target.x || !target.y) return
    
        // A vector pointing from the position to the target
        if(!isFleeing){
            this.wander()
        }
        this.desired.subVectors(this.target, this.position)
        this.desired.normalize()
        this.desired.multiplyScalar(1)//1
    
        // // Steering = Desired minus velocity
        this.steer.subVectors(this.desired, this.velocity)
        this.steer.clampScalar(-this.maxforce, this.maxforce)
        // console.log(this.steer)
        // // Apply the steering force to the acceleration
       return this.steer

    }


    oscilate(){

    }

    draw(){

        this.mesh.position.copy(this.position)
        this.mesh.position.z = -99 //something is adding values on the z axis so we clamp it
        // console.log(this.mesh.position)
        // this.mesh.rotation.y = Math.atan2(-this.velocity.z, this.velocity.x)
        // this.mesh.rotation.z = Math.asin(this.velocity.y / this.velocity.length())
    }



}

