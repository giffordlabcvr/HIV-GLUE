var threshold = 75;

// get the alignments
var where_clause = "name not like '%root%'";
var alignmentArray = get_alignments(where_clause);

 // Iterate through the alignments
for(var k = 0; k < alignmentArray.length; k++) {

	// Get the reference sequence
	var alignmentData = alignmentArray[k];
	//glue.logInfo("Processing alignmentData: "+alignmentData);
	var refSeqName = alignmentData["refSequence.name"];
	var alignmentName = alignmentData["name"];
	glue.logInfo("Processing reference seq: "+refSeqName);

	// get the feature locations
	var listFeatureResult = get_refseq_feature_locations(refSeqName);

	// get sequences with above threshold coverage for each feature
    for(var j = 0; j < listFeatureResult.length; j++) {

		var featureName = listFeatureResult[j];
		glue.logInfo("Processing feature: "+featureName);
			
		// Get the members with sufficient coverage for this feature
		var sufficientCoverageMembers;
		glue.inMode("alignment/"+alignmentName+"/", function(){			
			sufficientCoverageMembers = glue.getTableColumn(glue.command(["list", "member", "-w", "fLocNotes.featureLoc.feature.name = 'Env' and fLocNotes.ref_nt_coverage_pct >= "+threshold]), "sequence.sequenceID");
		});		   
	   
		// Create the alignment name
		var refSeqNameArray = refSeqName.split("_");
		var virusSpecies = refSeqNameArray[1];
		var geneAlignmentName = "AL_"+virusSpecies+"_"+featureName;
		glue.logInfo("Creating gene alignment: "+geneAlignmentName);

		// Create the alignment in GLUE and add the members
		glue.command(["create", "alignment", geneAlignmentName, "-r", refSeqName]);
		for(var i = 0; i < sufficientCoverageMembers.length; i++) {			
			var seqID = sufficientCoverageMembers[i];			
			glue.inMode("alignment/"+alignmentName+"/", function(){			
				glue.command(["add", "member", "-w", "sequenceID = '"+seqID+"'"]);
			});		   
		}
		
		// Compute the alignment
		glue.logInfo("  Computing alignment for feature: "+featureName+" in reference "+refSeqName);
		glue.command(["compute", "alignment", alignmentName, "lentiCompoundAligner"]);
	    
   }
   
}	

//### SUBROUTINES
function get_alignments(where_clause) {

	// list the species alignments
	var listAlignmentResult = glue.command(["list", "alignment", "-w", where_clause]);

	var listResult = listAlignmentResult["listResult"];
	glue.logInfo("Processing result: "+listResult);
	var rows = listResult["row"];
	var columns = listResult["column"];
	//glue.logInfo("Processing columns: "+columns);
	//glue.logInfo("Processing rows: "+rows);

	// transform result 
	var myArray = [];
	for(var i = 0; i < rows.length; i++) {

		var myMap = {};
		var rowMap = rows[i];
		var rowArray = rowMap["value"];
		//glue.logInfo("Processing row: "+rowArray);

		for(var j = 0; j < columns.length; j++) {

			var columnName = columns[j];
			var rowValue = rowArray[j]
		
			glue.logInfo("Processing value: "+columnName+": "+rowValue);
			myMap[columnName] = rowValue;

		}
	
		myArray.push(myMap);
	}
	//glue.logInfo("Alignment result: "+myArray);

	return myArray;
}

function get_refseq_feature_locations(refSeqName) {

	// get the feature locations
	var listFeatureResult;
	glue.inMode("/reference/"+refSeqName, function() {
		listFeatureResult = glue.command(["list", "feature-location"]);
	});

	var listResult = listFeatureResult["listResult"];
	//glue.logInfo("Processing result: "+listResult);
	var rows = listResult["row"];
	var columns = listResult["column"];
	//glue.logInfo("Processing columns: "+columns);
	//glue.logInfo("Processing rows: "+rows);

	// transform result 
	var myArray = [];
	for(var i = 0; i < rows.length; i++) {

		var rowMap = rows[i];
		var rowArray = rowMap["value"];
		//glue.logInfo("Processing row: "+rowArray);

		for(var j = 0; j < columns.length; j++) {
			var name = columns[j];
			var rowValue = rowArray[j]		
			//glue.logInfo("Processing value: "+name+": "+rowValue);
			if (name == 'feature.name' && rowValue == 'gag'
			 || name == 'feature.name' && rowValue == 'pro-pol'
			 || name == 'feature.name' && rowValue == 'env'
			) {
				myArray.push(rowValue);
			}
		}	
	}

	//glue.logInfo("Array RESULT!: "+myArray);
	return myArray;
}

