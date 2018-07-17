 class Creature {

    constructor(){
       this.mesh = this.createGeometry()
       return this
    }


    createGeometry(){

        // let geometry = new THREE.SphereGeometry( 1, 32, 32 )


        var bones = [];

        var shoulder = new THREE.Bone();
        var elbow = new THREE.Bone();
        var hand = new THREE.Bone();

        shoulder.add( elbow );
        elbow.add( hand );

        bones.push( shoulder );
        bones.push( elbow );
        bones.push( hand );

        shoulder.position.y = -5;
        elbow.position.y = 0;
        hand.position.y = 5;

        var armSkeleton = new THREE.Skeleton( bones );
        var geometry = new THREE.CylinderGeometry( 1, 1, 1, 1, 15, 5, 30 );
        let geometry = new THREE.BoxGeometry(1,1,1)
        console.log(armSkeleton)
        // for ( var i = 0; i < geometry.vertices.length; i ++ ) {

        //     var skinIndex = calculateSkinIndex( geometry.vertices, i );
        //     var skinWeight = calculateSkinWeight( geometry.vertices, i );

        //     

        // }

        // geometry.vertices.forEach(vert => {
        //     console.log(vert)
        //     geometry.skinIndices.push( new THREE.Vector4( skinIndex, skinIndex + 1, 0, 0 ) );
        //     geometry.skinWeights.push( new THREE.Vector4( 1 - skinWeight, skinWeight, 0, 0 ) );
        // })



        let material = new THREE.MeshPhongMaterial( { color: 0x5eff40 } );
        // var mesh = new THREE.SkinnedMesh( geometry, material );
        let mesh = new THREE.Mesh(geometry, material)

        // mesh.add(armSkeleton.bones[0])
        // mesh.bind(armSkeleton)
        console.log(mesh)
        return mesh
        // return new THREE.Mesh(mesh, material);
    }

    calculateSkinIndex(){

    }

    calculateSkinWeight(){

    }

    swim(){
        // this.mesh.position.z -= 0.005;
        this.mesh.rotation.x += 0.005; 
        this.mesh.rotation.y += 0.005; 

    
    }


}

