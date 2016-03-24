# taskwarrior-site-test

A table filter experimentation for TaskWarrior web site.  
The goal is to improve the http://taskwarrior.org/tools/ list.
See: http://brunovernay.github.io/taskwarrior-site-test/ (can even bookmark categories:  [Front Ends](http://brunovernay.github.io/taskwarrior-site-test/#Front Ends))

Depending on the branch: 

* GitHub rely on the branch name `gh-pages` to publish the site! (Currently it is merged from `kojs`)
* in branch `filter-js` I motsly used this example: http://jiren.github.io/filter.js/, but it does not seem very popular/supported/known. _Abandonned_
* in branch `ang2` I look at Angular2, but it is too big and invasive for this use case. _Abandonned_
* in branch `kojs`, I use http://KnockOutJS.com/ which looks good and well suited for the job. (beware all dev occurs in `gh-pages` currently)

Official TaskWarrior site Git: https://git.tasktools.org/projects/ST/repos/tt.org/browse/html

I started scraping the HTML data to fill the JSON file  and maybe to add free search: https://github.com/BrunoVernay/tw-html-parse


See some other JS solutions:

* https://scotch.io/tutorials/sort-and-filter-a-table-using-angular
* https://github.com/aldeed/meteor-tabular
* https://atmospherejs.com/aldeed/tabular
* http://jquery-datatables.meteor.com/
* https://github.com/summitroute/react-structured-filter
* 
