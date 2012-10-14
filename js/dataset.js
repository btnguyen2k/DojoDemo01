/* Data for the demo */
var $DATA = {
    identifier: 'id',
    items: [
        { id: 1, firstName: "Thanh", lastName: "Nguyen", birthday: "1981/03/01", address: "12 Tran Thien Chanh, 7000, Hochiminh", phone: "0909.210.868" },
        { id: 2, firstName: "Facano", lastName: "Guilizzoni", birthday: "1970/07/08", address: "2 Peldi Street, 55510 New York", phone: "0901.123.456" },
        { id: 3, firstName: "Roger", lastName: "Greedy", birthday: "1975/03/18", address: "132/1 Bloomer Streer, 55530 New York", phone: "0912.345.678" },
        { id: 4, firstName: "Peter", lastName: "Park", birthday: "1988/12/12", address: "6/12 Cumming Street, 3055 Melbourne", phone: "0412.012.034" }
    ]
};
var $STORE = new dojo.data.ItemFileWriteStore({data: $DATA});
var $NEXT_ROW_ID = $DATA.items.length;

function dataGetNextId() {
    $NEXT_ROW_ID++;
    return $NEXT_ROW_ID;
}

function dataFindIndex(id) {
    var i;
    for ( i = 0; i < $DATA.items.length; i++ ) {
        if ( id == $DATA.items[i].id ) {
            return i;
        }
    }
    return -1;
}