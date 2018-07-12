var refsequence = "REF_MASTER_NC_001802";
var alignment = "AL_G";
var source1 = "ncbi-refseqs";
var source2 = "ncbi-refseqs";
var sequenceID1 = "AF061642";
var sequenceID2 = "AF061640";

function compareMembers(feature){

	var labelledCodons;
	var tableObjs = [];

	glue.inMode("reference/"+refsequence+"/feature-location/"+feature, function(){
		labelledCodons = glue.getTableColumn(glue.command(["list", "labeled-codon"]), "codonLabel");
		
	});


	var results1 = getAminoAcids(alignment,source1,sequenceID1,refsequence,feature);
	var results2 = getAminoAcids(alignment,source2,sequenceID2,refsequence,feature);



	_.each(labelledCodons,function(codonLabel){
		
		var resultObj1 = results1[codonLabel];
		var resultObj2 = results2[codonLabel];
		if(resultObj1.aminoAcid != resultObj2.aminoAcid) {
			tableObjs.push({
				codonLabel:codonLabel,
				residue1:resultObj1.aminoAcid,
				residue2:resultObj2.aminoAcid
				
			});
		}
		
	});

	return tableObjs;
};




function getAminoAcids(alignment, source, sequenceID, refsequence, feature) {
	
	var resultMap = {};
	glue.inMode("alignment/"+alignment+"/member/"+source+"/"+sequenceID, function(){
		var resultList = glue.tableToObjects(glue.command(["amino-acid", "-r", refsequence, "-f", feature]));		
		_.each(resultList,function(resultObj){
			resultMap[resultObj.codonLabel] = resultObj;
		});
	});
	
	return resultMap;
}