<!-- This script contains an example sparql query -->


<script>
    
//prefixes for the query
        var prefixes = "\
        prefix lodcom: <http://vocab.lodcom.de/> \n\
        prefix dc: <http://purl.org/dc/elements/1.1/> \n\
        prefix geo: <http://www.opengis.net/ont/geosparql#> \n\
        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\
        prefix xsd: <http://www.w3.org/2001/XMLSchema#> \n\
        prefix sparel: <http://www.ordnancesurvey.co.uk/docs/ontologies/spatialrelations.owl/>\n";
// endpoint url
        var queryUrl = "http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=";
        var district = "aegidii";
     
     
// Function which sends the query to the triple store and stores the data as result
function queryTriplestore(query) {
	var url = queryUrl + encodeURIComponent(query);
	console.log(query, url);
	$.ajax({
		dataType: "jsonp",
		url: url,
		success: function(data){
            // do sth with the json
            sampledata = data.results.bindings[2].c.value; // here could stand any other path for the json
            console.log("This is the sample result:" + sampledata);        
        }
	});
}
// Function which builds an example query
function buildQuery() {
    var query = prefixes + "\
    SELECT DISTINCT ?b ?c ?d \n\
    WHERE { \n\
        GRAPH <http://course.introlinkeddata.org/G5> { \n\
        lodcom:"+ district +" ?b ?c. \n\
        lodcom:"+ district +" dc:coverage ?name. \n\
        ?name geo:asWKT ?d. }}";
   return query;
}



//example function for getting data
function initQuery() {
    query = buildQuery();
    queryTriplestore(query);
    
}
</script>