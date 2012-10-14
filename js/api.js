/* APIs */

/* Assume we have only one grid in this demo. Hence, store it in a global variable */
var $GRID;
var $MIN_BIRTHDAY = '2010/01/01';
var $ADD_MODE = true;
var $EDIT_ID = -1;

function funcDoAddOrEdit() {
    var result = DLG_ADD_EDIT.isValid();
    if ( result ) {
        //if we reach here it means Dojo validation has passed, we already got a valid format birthday. Hence we can compare two date strings.
        var birthday = dojo.byId('birthday').value;
        if ( birthday < $MIN_BIRTHDAY ) {
            //all validations have passed
            var firstName = dojo.byId('firstName').value;
            var lastName = dojo.byId('lastName').value;
            var address = dojo.byId('address').value;
            var phone = dojo.byId('phone').value;
            
            if ( $ADD_MODE ) {
                //var myNewItem = {type: "country", name: "Fill this country name"};
                //add mode
                var id = dataGetNextId();
                var newItem = {id: id, firstName: firstName, lastName: lastName, birthday: birthday, address: address, phone: phone};
                $STORE.newItem(newItem);
            } else {
                //edit mode
                var id = $EDIT_ID;
                $GRID.store.fetchItemByIdentity({
                    identity: id,
                    onItem: function(item){
                        $GRID.store.setValue(item, 'firstName', firstName);
                        $GRID.store.setValue(item, 'lastName', lastName);
                        $GRID.store.setValue(item, 'birthday', birthday);
                        $GRID.store.setValue(item, 'address', address);
                        $GRID.store.setValue(item, 'phone', phone);
                    }
                });
                $GRID.update();
            }
            //re-sort the grid to ensure item order
            $GRID.sort();
            return true;
        } else {
            alert('Birthday must be before '+$MIN_BIRTHDAY);
        }
    }
    return false;
}

function funcEditRow(id) {
    $ADD_MODE = false;
    $EDIT_ID = id;
    DLG_ADD_EDIT.reset();
    
    //first: we need to find the row's index
    var index = dataFindIndex(id);
    if ( index == -1 ) {
        //just in case
        return;
    }
    
    //populate the form with entry's value
    var firstName = $DATA.items[index].firstName;
    var lastName = $DATA.items[index].lastName;
    var birthday = $DATA.items[index].birthday;
    var address = $DATA.items[index].address;
    var phone = $DATA.items[index].phone;
    var myItem = {firstName: firstName, lastName: lastName, birthday: birthday, address: address, phone: phone};
    DLG_ADD_EDIT.attr('value', myItem);
    dojo.byId('birthday').value = birthday; // special case for DateTextBox field
        
    DLG_ADD_EDIT.show();
}


function funcAddRow() {
    $ADD_MODE = true;
    DLG_ADD_EDIT.reset();
    DLG_ADD_EDIT.show();
}

/* Internal function: display a confirmation dialog box */
function _dialogConfirm(message) {
    //TODO: implement a DOJO-style confirmation dialog in the future
    return confirm(message);
}

/* Remove selected rows */
function funcRemoveSelected() {
    var items = $GRID.selection.getSelected();
    if ( items.length == 0 ) {
        alert('There is no row selected.');
    } else {
        var answer = _dialogConfirm('Are you sure to delete selected rows?');
        if ( answer ) {
            $GRID.removeSelectedRows();
        }
    }
}

/* Remove a row specified by an id */
function funcRemoveRow(id) { 
    var answer = _dialogConfirm('Are you sure to delete the record?');
    if ( answer ) {
        /*
         * To delete a specified row:
         * - Select it with the selection
         * - Call grid's removeSelectedRows()
         */
        //first: we need to find the row's index
        var index = dataFindIndex(id);
        //second: de-select any existing selection (if any), select the new row, and delete
        if ( index != -1 ) {
            var items = $GRID.selection.getSelected();
            $GRID.selection.clear();
            $GRID.selection.select(index);
            $GRID.removeSelectedRows();
        }
    }
}
