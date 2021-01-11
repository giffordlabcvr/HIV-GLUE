var features = [ "gag", "pro-pol", "vif", "tat", "rev", "vpu", "vpr", "env", "nef" ];

var refseqs = get_refseq_ids('ncbi-refseqs');

// Iterate through features
for(var i = 0; i < refseqs.length; i++) {

	var refseq_id = refseqs[i];

	// Iterate through features
	for(var k = 0; k < features.length; k++) {

		var featureID = features[k];
		glue.logInfo(" Refseq "+refseq_id+" feature "+featureID);		
		glue.inMode("reference/"+refseq_id+"/feature-location/"+featureID, function() {
			var my_segments = glue.getTableColumn(glue.command(["list","segment"]), "refStart");
		});	
			
	}			
			
}			


//  project hiv reference REF_HIV-1M_C_JN188292 feature-location gag list segment

// Get refseq IDs 
function get_refseq_ids(source) {
	glue.logInfo("Getting references");
	var my_refseq_ids = glue.getTableColumn(glue.command(["list","reference","-w", "sequence.source.name = '"+source+"'"]), "name");
	return my_refseq_ids;
}
