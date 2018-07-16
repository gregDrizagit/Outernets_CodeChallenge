 class Creature {

    constructor(){
       this.geometry = this.createGeometry()
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
        var geometry = new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );
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



        let material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        var mesh = new THREE.SkinnedMesh( geometry, material );

        mesh.add(armSkeleton.bones[0])
        mesh.bind(armSkeleton)
        console.log(mesh)
        return mesh
        // return new THREE.Mesh(mesh, material);
    }

    calculateSkinIndex(){

    }

    calculateSkinWeight(){

    }

    swim(){
        this.geometry.position.z -= 0.005;
    
    }


}

