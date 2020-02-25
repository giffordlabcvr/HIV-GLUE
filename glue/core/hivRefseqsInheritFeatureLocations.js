var refsequence = "REF_MASTER_B_AF033819";

// list of coding features to exclude
var codingFeatures = glue.tableToObjects(glue.command(["list", "feature", "-w", "featureMetatags.name='CODES_AMINO_ACIDS' and featureMetatags.value='true'", "name"]));
// list of all features
var allFeatures = glue.tableToObjects(glue.command(["list", "feature", "name"]));

var nonCoding = _.difference(allFeatures, codingFeatures);
//glue.logInfo("nonCoding", nonCoding);

//initially remove all feature location annotations from the reference sequences with the exception of the master
//glue.command(["multi-delete", "feature_location", "-w", "referenceSequence.name != 'REF_MASTER_B_AF033819'"]);

//list all HIV-1 reference sequences
var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "name", "-w", "sequence.species_group='M' "]));


// loop through reference sequences and add non-coding features
_.each(refSeqObjs, function(refSeqObj) {

	if (refSeqObj.name != 'REF_MASTER_B_AF033819') {
		
		_.each(allFeatures, function(feature){	
			var featureID = feature.name;			
			if (_.contains(_.values(codingFeatures), featureID)) {
			
				//glue.logInfo(featureID);
				
				// need to filter out coding features!
				
			} else {
			
			glue.logInfo(" Inheriting feature: "+featureID+" from REF_MASTER to "+refSeqObj.name);		

			glue.inMode("reference/"+refSeqObj.name, function() {
				glue.command(["inherit", "feature-location", "AL_ROOT_UNCONSTRAINED", "-l", refSequence, featureID]);
			
			}
				
		});			
	}
	
});


