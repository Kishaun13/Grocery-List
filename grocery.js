var itemList = [];
var displayList = [];
// we start by creating 2 empty arrays which our list will be stored


// This function creates a list of all the items in the database and stores it in the itemList array 
// so that it can be used in the drawList function. inputValue is the name of the item to be added to the list.
// if the input value is empty, the alert message is displayed and the list is cleared.
// else it pushes an unpurchased item to the itemList array.
function addItemsToList() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("Please add grocery items to your list!");
    } else {
        itemList.push({name: inputValue, purchased: false});
    }
    document.getElementById("myInput").value = "";
    filter('all');
}

// This function draw list works by first clearing the unordered list
// with id "myUL" It irritates over the display list array and creates a list for the objects in the array
// if an item is clicked on purchased(crossed out) it adds a purchase class to the item It also gives each item an 
//onclick attribute that  calls the togglePurchased function with its index as a parameter.
function drawList() {
    document.getElementById("myUL").innerHTML = '';
    for(var i=0; i<displayList.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(displayList[i].name));
        li.setAttribute('onclick', 'togglePurchased('+i+')');
        if(displayList[i].purchased) {
            li.classList.add('purchased');
        }
        document.getElementById("myUL").appendChild(li);
    }
}

//This function finds the index number of an item in the itemList array and toggles the purchased status in the 2nd line
// and matches the index number of the item in the itemList array to the display list array.
//The function then calls the drawList function to update the list.
function togglePurchased(i) {
    var index = itemList.indexOf(displayList[i]);
    itemList[index].purchased = !itemList[index].purchased;
    drawList();
}

//This function works by clearing the display list array then adds items
//from the list items array based on condition parameter
// which can be 3 things
// all, unpurchased or purchased then it calls the drawlist function to update the list
function filter(condition) {
    displayList = [];
    for(var i=0; i<itemList.length; i++) {
        if(condition === 'all' || (condition === 'purchased' && itemList[i].purchased) || (condition === 'unpurchased' && !itemList[i].purchased)) {
            displayList.push(itemList[i]);
        }
    }
    drawList();
}
//This function clearList clears both the itemList and the displayList arrays and calls the drawList function 
//to update the list.
function clearList() {
   itemList = [];
   displayList = [];
    drawList();
}
function clearPurchased() {
    for(var i=0; i<itemList.length; i++) {
        if(itemList[i].purchased) {
            itemList.splice(i, 1);
            i--;
        }
    }
    filter('all');
}
function clearUnpurchased() {
    for(var i=0; i<itemList.length; i++) {
        if(!itemList[i].purchased) {
            itemList.splice(i, 1);
            i--;
        }
    }
    filter('all');
}
