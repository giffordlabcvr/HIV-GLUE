var refSequence = "REF_MASTER_B_AF033819";

// list of coding features to exclude
var nonCoding = ["5LTR", "5R", "5U5", "TAR", "PBS", "DIS", "SD", "SL3", "PSI", "SL4", "5UTR", "TSS", "cPPT", "CTS", "RRE", "PPT", "3U3", "3R"];


//list all HIV-1 reference sequences
var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "name", "-w", "sequence.species_group='M' "]));

// loop through reference sequences and add non-coding features
_.each(refSeqObjs, function(refSeqObj) {

	if (refSeqObj.name != 'REF_MASTER_B_AF033819') {
	
		_.each(nonCoding, function(feature){	
		
			glue.logInfo(" Inheriting feature: "+feature+" from REF_MASTER to "+refSeqObj.name);	
			glue.inMode("reference/"+ refSeqObj.name, function(){
				glue.command(["inherit", "feature-location", "AL_ROOT_UNCONSTRAINED", "-l", refSequence, feature]);
			});
		});	
	}						
});	


