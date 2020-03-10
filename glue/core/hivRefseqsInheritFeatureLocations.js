var refSequence = "REF_MASTER_B_AF033819";

//var nonCoding = ["5LTR", "5R", "5U5", "TAR", "PBS", "DIS", "SD", "SL3", "PSI", "SL4", "5UTR", "TSS", "cPPT", "CTS", "RRE", "PPT", "3U3", "3R"];

// get all features annotated on the master reference
var allFeatures = [];
glue.inMode("reference/"+refSequence, function() {

	allFeatures = glue.tableToObjects(glue.command(["list", "feature-location"]));
});

// coding features to check when inheriting annotations 
var featuresToCheck = ["gag", "gag-pol", "tat", "vpr", "vif", "vpu", "nef"];


//list all HIV-1 reference sequences
var refSeqObjs = glue.tableToObjects(glue.command(["list", "reference", "name", "-w", "sequence.species_group='M' "]));


// loop through list of reference sequences and add features
_.each(refSeqObjs, function(refSeqObj) {

	if (refSeqObj.name != 'REF_MASTER_B_AF033819') {
	
		_.each(_.pairs(allFeatures), function(pair) {	
			var f = pair[1]['feature.name'];
			
			glue.logInfo("Inheriting feature: "+f+" from REF_MASTER to "+refSeqObj.name);
			glue.inMode("reference/"+ refSeqObj.name, function(){
				glue.command(["inherit", "feature-location", "AL_ROOT_UNCONSTRAINED", "-l", refSequence, f]);
					
				if (_.contains(featuresToCheck, f)){
					glue.logInfo("Checking feature:   " +f);
					glue.inMode("feature-location/"+f, function() {
						var aaRows = glue.tableToObjects(glue.command(["amino-acid"]));
						for(var i = 0; i < aaRows.length; i++) {
							var aa = aaRows[i].aminoAcid;
							// check coding region begins with start codon
							if(i == 0 && aa != "M") {
								glue.log("WARNING", "Residue "+aaRows[i].codonLabel+" of feature "+f+" on reference "+refSeqObj.name+" should be M");
							}
							// check for premature stop codons
							if(i < aaRows.length-1 && aa == "*") {
								glue.log("WARNING", "Residue "+aaRows[i].codonLabel+" of feature "+f+" on reference "+refSeqObj.name+" should not be *");
							}
							// check that last codon is a stop codon
							if(i == aaRows.length-1 && aa != "*") {
								glue.log("WARNING", "Residue "+aaRows[i].codonLabel+" of feature "+f+" on reference "+refSeqObj.name+" should be *");
							}
						}
						
					});
				}
		
			});
			
		});
	}						
});	


