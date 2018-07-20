const vec3 = () => new THREE.Vector3()
const moveSpeeds = [0.3, 0.4, 0.08, 0.05, 0.2, 0.06]

 class Creature {

    constructor(position){

        //seek params
       this.maxspeed =  this.setRandomSpeed()
       this.maxforce =  0.006
       this.position = new THREE.Vector3(position.x, position.y, position.z)
       this.velocity = new THREE.Vector3(this.maxspeed, 0, 0)
       this.acceleration = new THREE.Vector3()
       this.desired = new THREE.Vector3()
       this.steer = new THREE.Vector3()
       this.target = new THREE.Vector3()

       this.radius = 10
       //Wander params
       this.wanderAngle = 0
       this.wanderDistance = 40
       this.wanderRadius = 15
       this.wanderRange = 100
      
        //geometry
       this.mesh = this.createGeometry(position.x, position.y, position.z)

       return this
    }

    
    createGeometry(posX, posY, posZ){
        //Abstracts everything that's involved with creating the creature objects
        let geometry = new THREE.SphereGeometry( 1, 20, 20 )
        let material = new THREE.MeshPhongMaterial( { color: 0x5eff40 } )
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
        //
        var center = this.velocity.clone().normalize().setLength(this.wanderDistance)
        var offset = new THREE.Vector3(1, 1, 1)
        offset.setLength(this.wanderRadius)
        offset.x = Math.sin(this.wanderAngle) * offset.length()
        offset.z = Math.cos(this.wanderAngle) * offset.length()
        offset.y = Math.sin(this.wanderAngle) * offset.length()
    
        this.wanderAngle += Math.random() * this.wanderRange - this.wanderRange * .5
        center.add(offset)
        // center.setX(0)
        this.target.copy(center)

    }

    separate(){
        //this method doesn't work perfectly, but it still creates an interesting slingshotting behavior. 
        //Getting it to work perfectly is probably just a matter of tweaking all of the numbers.
        //I adapted this from https://github.com/erosmarcon/three-steer/blob/master/js/ThreeSteer.js and 
        //https://github.com/taseenb/NOC3D-chapter6/blob/master/NOC_6_08_SeparationAndSeek/src/index.js
        
        //This method detects neighboring creatures and calculates a separating direction and force 


        let distance
        let sum = new THREE.Vector3()
        let count = 0 

        creatures.forEach(otherCreature => { //a list of all the other creatures lives in environment.js
             distance = this.position.distanceTo(otherCreature.position) //calculate the distance between you and the neighbor being evaluated
            if(distance > 0 && distance <= this.radius){
                //Since each creature has itself in the list, we ignore particles with a distance of 0 and only within a radius we set
                const diff = vec3().subVectors(this.position, otherCreature.position) // calculate the steering direction
                diff.normalize()
                diff.divideScalar(distance)
                sum.add(diff)
                count++
            }
        })

        if(count > 0){ //we only want to apply a force if there are more than none particle within the radius

            sum.normalize()
            sum.multiplyScalar(this.maxspeed)
            // Steering = Desired minus velocity //this should look similar to seek()
            this.steer.subVectors(sum, this.velocity)
            this.steer.clampScalar(-this.maxforce, this.maxforce)

            return this.steer 

        }else{//if there is nothing close by, apply no steering force 
            return new THREE.Vector3()
        }
    }

    setRandomSpeed(){
        return moveSpeeds[Math.floor(Math.random() * moveSpeeds.length)]
    }
    //these helper methods do almost exactly the same thing, but they're called in different contexts
    resetRandomSpeed(){
        this.maxspeed = moveSpeeds[Math.floor(Math.random() * moveSpeeds.length)]
    }

    applyBehavior(){

        //applyBehavior controls what the creature is doing when. The program basically only has 2 states
        //and only 3 behaviors, but could have many more in theory. This method controls the control flow of the behaviors

        if(isFleeing){
            // if the boolean flag has been flipped
            this.target.copy(this.findClosestTarget()) //find the closest target
            this.maxspeed = 5 //increase the urgency a little haha
            const seek = this.seek() // navigate to the closest target 
            this.applyForce(seek) //apply the newly calculated force and direction to the creature

        }else{
            //if not fleeing  
            const separate = this.separate(); //apply the separate behavior
            const seek = this.seek() //apply the normal wander behavior
            separate.multiplyScalar(3) // apply weights to respective behaviors giving separate priority 
            seek.multiplyScalar(1) //
            this.applyForce(separate) //apply the forces 
            this.applyForce(seek)
        }

    }

    findClosestTarget(){

        let closestTarget; 

        closestTarget = targets[0] //by default, the closest target is the first in the list. 
                                    //You need to have something to compare other targets to.

        targets.forEach(target => { //look at each target 

            if(this.position.distanceTo(target.position) < this.position.distanceTo(closestTarget.position))
            {//if the distance between you and and the target being evaluated is less than the 
             //distance between you and the last closest target found
                closestTarget = target
                //set the currently evaluated target as the new closest target
            }

        })  

        return closestTarget.position //return the position of the target so the creatures can move towards it 

    }


    seek(){
    
        // A vector pointing from the position to the target
        if(!isFleeing){
            //wander sets random target positions for the creature to move in
            this.wander()
        }

        this.desired.subVectors(this.target, this.position) //we figure out the direction we want to move in by target - current position 
        this.desired.normalize()
        this.desired.multiplyScalar(1)
    
        // // Steering = Desired velocity -  Current velocity

        this.steer.subVectors(this.desired, this.velocity) //calculates the desired steering force 
        this.steer.clampScalar(-this.maxforce, this.maxforce) //clamps by our max force we set 

       return this.steer //returns the new steering force 

    }


    draw(){

        this.mesh.position.copy(this.position) //Since the creatures are implemented in an object oriented fashion,
                                               //there is difference between the position that lives on the class and the position 
                                               //of the actual mesh. Since the position stored in the class is being updated, every frame we need to 
                                               //set the position of the mesh to the new position 

        this.mesh.position.z = -99 //something is adding values on the z axis so we clamp it
        
    }



}

