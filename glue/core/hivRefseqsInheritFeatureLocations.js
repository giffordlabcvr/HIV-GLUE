//initially remove all feature location annotations from the reference sequences with the exception of the master
glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name != 'REF_MASTER_B_AF033819'"]);

//list all HIV-1 reference sequences
var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "name", "-w", "sequence.species='HIV-1'"]));


//list of parent features which should be transferred - the parent of the list elements is 'whole_genome'
var codingFeaturesToCheck = ["MA", "CA", "NC"];


_.each(refSeqObjs, function(refSeqObj) {

	if (refSeqObj.name != 'REF_MASTER_B_AF033819') {

		glue.inMode("reference/"+refSeqObj.name, function() {
			glue.command(["inherit", "feature-location", 
				"--recursive", "--spanGaps", 
				"AL_REF_HIV-1_UNCONSTRAINED", "--relRefName", "REF_MASTER_B_AF033819", "p6"]);
		});
	}

});


//perform checks to ensure feature inheritance worked correctly
// check aa translation of coding features for 'M' & '*'
