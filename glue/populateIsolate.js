var loadResult;
glue.inMode("module/hivTabularUtility", function() {
	loadResult = glue.command(["load-tabular", "tabular/transmission-pairs/iyer/iyer_isolate.txt"], 
			{convertTableToObjects:true});
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(isolateObj) {
	glue.command(["create", "custom-table-row", "dr_isolate", isolateObj.id]);

	glue.inMode("custom-table-row/dr_isolate/"+isolateObj.id, function() {
	
		glue.command(["set", "field", "patient_id", isolateObj.patient_id]);
		glue.command(["set", "field", "sample_date", isolateObj.sample_date]);
		glue.command(["set", "field", "seq_type", isolateObj.seq_type]);

	});
});
