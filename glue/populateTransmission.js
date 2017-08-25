var loadResult;
glue.inMode("module/hivTabularUtility", function() {
	loadResult = glue.command(["load-tabular", "tabular/toy_transmission.txt"], 
			{convertTableToObjects:true});
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(transObj) {
	var id = transObj.donor+"_"+transObj.recipient;
	glue.command(["create", "custom-table-row", "dr_transmission", id]);
	glue.inMode("custom-table-row/dr_transmission/"+id, function() {
		glue.command(["set", "link-target", "donor", "custom-table-row/dr_patient/"+transObj.donor]);
		glue.command(["set", "link-target", "recipient", "custom-table-row/dr_patient/"+transObj.recipient]);
	});
});

