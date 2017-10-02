var loadResult;
glue.inMode("module/hivTabularUtility", function() {
	loadResult = glue.command(["load-tabular", "tabular/toy_isolate.txt"], 
			{convertTableToObjects:true});
	// glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(isolateObj) {
	glue.command(["create", "custom-table-row", "dr_isolate", isolateObj.id]);
	glue.inMode("custom-table-row/dr_isolate/"+isolateObj.id, function() {
		glue.command(["set", "field", "sex", isolateObj.sex]);
		glue.command(["set", "field", "country", isolateObj.country]);
	});
});