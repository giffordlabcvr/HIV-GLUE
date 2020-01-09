//list of parent features which should be transferred - the parent of the list elements is 'whole_genome'
var nonCodingFeaturesToInherit = ["PBS", "TAR", "PSI"];


//initially remove all feature location annotations from the reference sequences with the exception of the master
//glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name != 'REF_MASTER_B_AF033819'"]);

//list all HIV-1 reference sequences
var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "name", "-w", "sequence.species_group='M' "]));



_.each(refSeqObjs, function(refSeqObj) {

	if (refSeqObj.name != 'REF_MASTER_B_AF033819') {

		for(var k = 0; k < nonCodingFeaturesToInherit.length; k++) {
			var featureID = nonCodingFeaturesToInherit[k];
			glue.logInfo(" Inheriting feature: "+featureID+" from REF_MASTER to "+refSeqObj.name);		

			glue.inMode("reference/"+refSeqObj.name, function() {
				glue.command(["inherit", "feature-location", 			
					"AL_ROOT_UNCONSTRAINED", "-l", "REF_MASTER_B_AF033819", featureID]);
			});
			
		}
	}

});


