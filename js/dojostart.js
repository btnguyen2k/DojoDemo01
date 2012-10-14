/* DOJO startup */
/*
 * Layout : multi row selections with check boxes
 * Actions: 'edit' & 'remove' in a seperated column
 */
function createGrid(store, divId) {
    /*set up layout*/
    var layout = [[
        {name: 'First Name', field: 'firstName', width: '80px'},
        {name: 'Last Name' , field: 'lastName', width: '80px'},
        {name: 'Birthday'  , field: 'birthday'},
        {name: 'Address'   , field: 'address', width: '230px'},
        {name: 'Phone'     , field: 'phone', width: 'auto'},
        {name: 'Actions'   , field: 'id', width: 'auto', formatter: function(id) {
                return '<a href="javascript:funcEditRow('+id+');">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:funcRemoveRow('+id+');">Remove</a>';
            }
        }
    ]];

    /* create a new grid: */
    $GRID = new dojox.grid.EnhancedGrid({
        id: 'grid',
        store: store,
        structure: layout,
        rowSelector: '20px',
        canSort: function(colIndex, field) {return colIndex != 7;}, //do not sort the "Actions" column
        plugins : {
            filter: {
                // Show the closeFilterbarButton at the filter bar
                closeFilterbarButton: true,
                // Set the maximum rule count to 5
                ruleCount: 5
            }, 
            indirectSelection: {headerSelector:true, width:"32px", styles:"text-align: center;"}
        }
    }, document.createElement('div'));
    
    /* append the new grid to the div */
    dojo.byId(divId).appendChild($GRID.domNode);
    
    /* render the grid */
    $GRID.startup();

    //sort the Last Name column by default
    $GRID.setSortIndex(2, true);
}
