/*
 * We use KnockOutJS to filter the tools and extensions table.
 * The Data are loaded in the index.html file which might not be the most performant
 *
 * */

function Tool(data) {
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    this.url = data.url;
    this.url_src = data.url_src;
    this.license = data.license;
    this.author = data.author;
    this.compatibility = data.compatibility;
    this.language = data.language;
    this.obsolete = data.obsolete;
    this.theme = data.theme;
    this.last_update = data.last_update;
    this.verified = data.verified;
}

// Overall viewmodel for this screen, along with initial state
function ToolsViewModel() {
    var self = this;

    self.tools = ko.observableArray([]);
    self.categories = ko.observableArray([]);
    self.themes = ko.observableArray([]);
    self.languages = ko.observableArray([]);

    // Load tools from server, convert to Tools instances, then populate the data for templates
    $.getJSON("tools-data.js", function(allData) {
        var mappedTools = $.map(allData, function(item) { return new Tool(item) });

        var uniqueCategory = {};
        var uniqueTheme = {};
        var uniqueLanguage = {};
        for( var i in mappedTools ){
            if( typeof(uniqueCategory[mappedTools[i].category]) == "undefined"){
                self.categories.push(mappedTools[i].category);
            }
            uniqueCategory[mappedTools[i].category] = 0;
            for (var j in mappedTools[i].theme) {
                if (typeof(uniqueTheme[mappedTools[i].theme[j]]) == "undefined") {
                    self.themes.push(mappedTools[i].theme[j]);
                }
                uniqueTheme[mappedTools[i].theme[j]] = 0;
            }
            for (var j in mappedTools[i].language) {
                if (typeof(uniqueLanguage[mappedTools[i].language[j]]) == "undefined") {
                    self.languages.push(mappedTools[i].language[j]);
                }
                uniqueLanguage[mappedTools[i].language[j]] = 0;
            }
        }
        self.tools(mappedTools);

    });

    self.filteredTools = ko.pureComputed(
        function() {
            self.tools.remove( function (item) { return item.obsolete; } );  //filter(function());
            self.tools.sort(function (left, right) { return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1) });
            return self.tools();

        }
    );


    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { name: "Standard (sandwich)", price: 0 },
        { name: "Premium (lobster)", price: 34.95 },
        { name: "Ultimate (whole zebra)", price: 290 }
    ];    

}

ko.applyBindings(new ToolsViewModel());

