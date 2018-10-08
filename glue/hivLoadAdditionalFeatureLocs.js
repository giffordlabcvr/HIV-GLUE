var refObjs;
var features = ["gag", "pol", "env", "vif", "vpu", "nef"];

glue.inMode("module/hivTabularUtility", function() {
	refObjs = glue.tableToObjects(glue.command(["load-tabular", "tabular/hiv-reference-feature-locs.txt"]));
});

_.each(refObjs, function(refObj) {
	var referenceName = refObj.refName;
	var sourceName;
	var sequenceID;
	glue.inMode("/reference/"+referenceName, function() {
		var showSeqResult = glue.command(["show", "sequence"]).showSequenceResult;
		sourceName = showSeqResult["sequence.source.name"];
		sequenceID = showSeqResult["sequence.sequenceID"];
	});
	var seqLength;
	glue.inMode("/sequence/"+sourceName+"/"+sequenceID, function() {
		seqLength = glue.command(["show", "length"]).lengthResult.length;
	});
	glue.inMode("/reference/"+referenceName, function() {
		glue.command(["add", "feature-location", "whole_genome"]);
		glue.inMode("/feature-location/whole_genome", function() {
			glue.command(["add", "segment", 1, seqLength]);
		});
		_.each(features, function(featureName) {
			var bits = refObj[featureName].split("..");
			glue.command(["add", "feature-location", featureName]);
			glue.inMode("/feature-location/"+featureName, function() {
				glue.command(["add", "segment", bits[0], bits[1]]);
			});
		});
	});
	
	
});