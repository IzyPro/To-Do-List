document.addEventListener('DOMContentLoaded', () => {
    // button to add new item
    let addButton = document.querySelector("#add");
    // input field to add new item
    let addInput = document.querySelector("#item");

    // add the svg icons for the buttons
    let removeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>`;

    let editSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.999 15.978"><path d="M1,15.978a1,1,0,0,1-1-1.09l.379-4.17A1.975,1.975,0,0,1,.953,9.5l9-9A1.8,1.8,0,0,1,11.238,0a2.028,2.028,0,0,1,1.427.577L15.4,3.315a1.927,1.927,0,0,1,.069,2.715l-9,9a1.971,1.971,0,0,1-1.214.568l-4.17.38C1.064,15.977,1.034,15.978,1,15.978ZM7.984,5.3h0L2.367,10.918,2.1,13.874,5.08,13.6,10.68,8l-2.7-2.7Zm3.288-3.289h0L9.324,3.962l2.695,2.695,1.948-1.949L11.272,2.012Z"/></svg>';
    
    let completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;

    addButton.addEventListener("click", function() {
        // grab the value of the input tag
        let newItem = document.getElementById("item").value;
        // if the input tag is not empty then run our function to add an item
        if (newItem) {
            // this function will add a new item to the todo list
            addItemTodo(newItem);
            // reset the input after we added a new item
            document.getElementById("item").value = "";
        }
    });

    // user press enter 
    addInput.addEventListener("keypress", function(e) {
        // did the user press *enter*? if yes then continue
        if (13 === e.keyCode) {
            // grab the value of the input tag
            let newItem = document.getElementById("item").value;
            // if the input tag is not empty then run our function to add an item
            if (newItem) {
                // this function will add a new item to the todo list
                addItemTodo(newItem);
                // reset the input after we added a new item
                document.getElementById("item").value = "";
            }
        }
    });

    function addItemTodo(text) {
        // grab the `ul`
        let list = document.getElementById("todo");
        // create a `li`
        let item = document.createElement('li');
        // set the content of the `li` the same as the text parameter passed into our function from the input field
        item.innerText = text;

        //create container for our buttons remove, edit and complete
        let buttons = document.createElement('div');
        buttons.classList.add("buttons");

        // create the buttons

        let remove = document.createElement('button');
        remove.classList.add('remove');
        // add the SVG icon to the button
        remove.innerHTML = removeSVG;
        // add event listener for remove
        // this function is definedd later
        remove.addEventListener("click", removeItem);

        let complete = document.createElement('button');
        complete.classList.add('complete');
        // add the SVG icon to the button
        complete.innerHTML = completeSVG;
        // add event listener for complete
        // this function is defined later
        complete.addEventListener("click", completeItem);

        // add edit button
        let edit = document.createElement('button');
        edit.classList.add('edit');
        // add the SVG icon to the button
        edit.innerHTML = editSVG;
        // add event listener for edit
        // this function is definedd later
        edit.addEventListener("click", editItem);
        
        // append the buttons to the div
        buttons.appendChild(remove);
        buttons.appendChild(complete);
        buttons.appendChild(edit);

        // append the whole div to the li
        item.appendChild(buttons);

        // prepend the `li` to the `ul`
        list.insertBefore(item, list.childNodes[0]);
    }

    function completeItem() {
        // grab the `li` by targeting the parent of the parent of the button (button -> div -> li)
        let item = this.parentNode.parentNode;
        // grab the `ul` (li -> ul)
        let parent = item.parentNode;
        // grab the parent id
        let id = parent.id;

        // check if the item should go in the completed or if it should be re-added to todo by using a ternary operator
        let target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo");
        // remove the item to its current `ul`
        parent.removeChild(item);
        // add the item to the new `ul`
        target.insertBefore(item, target.childNodes[0]);
    }

    function editItem(){
        // grab the `li` by targeting the parent of the parent of the button (button -> div -> li)
        let item = this.parentNode.parentNode;
        //make the content editable
        item.contentEditable = true;
    }

    function removeItem() {
        // grab the `li` by targeting the parent of the parent of the button (button -> div -> li)
        let item = this.parentNode.parentNode;
        // grab the `ul` (li -> ul)
        let parent = item.parentNode;
        // remove `li` from `ul`
        parent.removeChild(item);
    }
})

//  Credits: InspiredWebDev
//           IzyPro