/*
 * We use KnockOutJS to filter the tools and extensions table.
 * The Data are loaded in the index.html file which might not be the most performing
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
    // This data is static.
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
        self.tools.sort(function (left, right) { return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1) });
    });




    // The category selector can be bookmarked
    var path = decodeURI(location.hash.substr(1).split('?')[0]);
    self.CategoriesSelected = path.length > 3  ? ko.observableArray([path]) : ko.observableArray([]);
    self.selectedAllCategory = ko.pureComputed({
        read: function () {
            console.log("Read ... Filter: " + self.CategoriesSelected.slice(0));
            return self.CategoriesSelected().length === self.categories().length;
        },
        write: function (value) {
            self.CategoriesSelected(value ? self.categories.slice(0) : []);
        }
    });


    // The Theme selector
    self.ThemesSelected = ko.observableArray([]);
    self.selectedAllTheme = ko.pureComputed({
        read: function () {
            console.log("Read ... Filter: " + self.ThemesSelected.slice(0));
            return self.ThemesSelected().length === self.themes().length;
        },
        write: function (value) {
            self.ThemesSelected(value ? self.themes.slice(0) : []);
        }
    });

    self.ObsoleteSelected = ko.observable(false);


    // The Language selector
    self.LanguagesSelected = ko.observableArray([]);
    self.selectedAllLanguages = ko.pureComputed({
        read: function () {
            console.log("Read ... Filter: " + self.LanguagesSelected.slice(0));
            return self.LanguagesSelected().length === self.languages().length;
        },
        write: function (value) {
            self.LanguagesSelected(value ? self.languages.slice(0) : []);
        }
    });

    // The printed tool list:
    self.filteredTools = ko.computed(
        function() {
            return self.tools().filter(
                function (tool) {
                    var isCategoryIn = (self.CategoriesSelected().length == 0) ||  self.CategoriesSelected().includes(tool.category) ;
                    var isThemeIn = (self.ThemesSelected().length == 0) ||  self.ThemesSelected().some(function (elem) { return tool.theme.includes(elem)} );
                    var isLanguageIn = (self.LanguagesSelected().length == 0) ||  self.LanguagesSelected().some(function (elem) { return tool.language.includes(elem)} );
                    return (!tool.obsolete || self.ObsoleteSelected()) && isCategoryIn && isThemeIn && isLanguageIn;
                } );
        }
    );

}
ko.options.deferUpdates = true;
ko.applyBindings(new ToolsViewModel());

