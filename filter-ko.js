/*
 * We use KnockOutJS to filter the tools and extensions table.
 * The Data are loaded in the index.html file which might not be the most performant
 *
 * */

function Tool(data) {
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    // ...
}

// Overall viewmodel for this screen, along with initial state
function ToolsViewModel() {
    var self = this;

    self.tools = ko.observableArray([]);

    // Load tools from server, convert to Tools instances, then populate self.tools
    $.getJSON("tools-data.js", function(allData) {
        var mappedTools = $.map(allData, function(item) { return new Tool(item) });
        self.tools(mappedTools);
    });   

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { name: "Standard (sandwich)", price: 0 },
        { name: "Premium (lobster)", price: 34.95 },
        { name: "Ultimate (whole zebra)", price: 290 }
    ];    

}

ko.applyBindings(new ToolsViewModel());

