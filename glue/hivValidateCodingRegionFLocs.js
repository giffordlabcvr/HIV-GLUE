

var fLocObjs = glue.tableToObjects(glue.command(["list", "feature-location", "-w", "feature.featureMetatags.name = 'CODES_AMINO_ACIDS'"]));

_.each(fLocObjs, function(fLocObj) {
	glue.logInfo("validating coding feature-location", fLocObj);
	glue.inMode("reference/"+fLocObj["referenceSequence.name"]+"/feature-location/"+fLocObj["feature.name"], function() {
		glue.command(["validate"]);
	});
});