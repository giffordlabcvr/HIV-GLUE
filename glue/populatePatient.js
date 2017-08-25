var loadResult;
glue.inMode("module/hivTabularUtility", function() {
	loadResult = glue.command(["load-tabular", "tabular/toy_patient.txt"], 
			{convertTableToObjects:true});
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(patientObj) {
	glue.command(["create", "custom-table-row", "dr_patient", patientObj.id]);
	glue.inMode("custom-table-row/dr_patient/"+patientObj.id, function() {
		glue.command(["set", "field", "sex", patientObj.sex]);
		glue.command(["set", "field", "country", patientObj.country]);
	});
});