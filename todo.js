window.onload = function ()
{

  /*
  *
  * First-class Trim function for strings
  */
  if(typeof(String.prototype.trim) === 'undefined')
  {
    String.prototype.trim = function() 
    {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
  };

  /*
  * submitButtonClick : 
  *
  * Takes the submitButton object and submits the form with array 
  * of list items.
  */
  function submitButtonClick(that){
      var form = that.parentNode;
      //Get List of Items
      var items = form.getElementsByTagName('LI');

      if(items !== undefined && items.length !== 0 ){
        //create hidden input object to submit as array
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        var arrayOfItems = [];
        for(var j=0;j<items.length;j++){
          var item = items[j].innerHTML;
          //Remove the html characters and x button
          arrayOfItems.push(item.replace(/<[^>]*>/g, '').replace(/x/,'').replace(/[^a-zA-Z0-9_-\s]/g,''));
        }
        hiddenInput.setAttribute('value', '['+arrayOfItems+']');
        alert(hiddenInput.getAttribute('value'));

        //make input disabled so it isn't submited
        var textInput = form.getElementsByClassName('inputText')[0];
        textInput.setAttribute('disabled','disabled');

        form.appendChild(hiddenInput);
        form.submit()
        
      }

    };

    /*
    * disableDefaultKeydownAction : 
    *
    * Disables hitting "return" from submitting form and instead
    * define the action as adding item to list.
    */
    function disableDefaultKeydownAction(event,that){
      if (event.keyCode === 13) {
        event.preventDefault();
        var parent = that.parentNode;
        parent.getElementsByClassName('todoAddButton')[0].click();
      }
    };

    /*
    * initDeleteButton : 
    *
    * Initialises and returns a delete button for each list item.
    */
    function initDeleteButton(){
        var deleteButton = document.createElement('a');
        var deleteButtonText = document.createTextNode('x');
        deleteButton.appendChild(deleteButtonText);
        deleteButton.className='hidden';
        deleteButton.id = 'todoClose';

        deleteButton.addEventListener('click',function(){
          var parentLi = this.parentNode;
          var parentUl = parentLi.parentNode;
          parentUl.removeChild(parentLi);
          var component = parentUl.parentNode.parentNode;
        
          //Check if there are no items in list and hide submit button
          if(parentUl.getElementsByTagName('li').length === 0){
            var submitButton = component.getElementsByClassName('todoSubmitButton')[0];
            submitButton.style.visibility = 'hidden';
          }

        });

        return deleteButton;
    };

  //Get all todoComponents on the page
  var components = document.getElementsByClassName('todoComponent');
  
  for(var i= 0;i<components.length;i++){

    var submitButton = components[i].getElementsByClassName('todoSubmitButton')[0];
    //Hide submit button by default per TripleLift Assignment
    submitButton.style.visibility = 'hidden';

    submitButton.addEventListener('click',function(){
      submitButtonClick(this)
    });
    
    //Disable Inputs from submitting form and add instead
    components[i].getElementsByClassName('inputText')[0].addEventListener('keypress', function(event) {
      disableDefaultKeydownAction(event,this);
    });
    
    /*
    * Add Button Logic
    */
    components[i].getElementsByClassName('todoAddButton')[0].addEventListener('click',function(){

      var parent =this.parentNode;
      var todoInput = parent.getElementsByClassName('inputText')[0];
      var todoInputText = todoInput.value;
      var submitButton = parent.getElementsByClassName('todoSubmitButton')[0];


      if(todoInputText != undefined && todoInputText.trim().length > 0 && todoInputText.match(/[^a-zA-Z0-9_-\s]/g) === null){

        //Remove red color on input box if input doesn't contain illegal characters
        todoInput.id = '';
        submitButton.style.visibility = 'visible';
        var todoList = parent.getElementsByClassName('list')[0];
        var newTodoText = document.createTextNode(todoInputText);
        var newTodo = document.createElement('LI');
        newTodo.appendChild(newTodoText);
        //Get and init delete button
        var deleteButton = initDeleteButton();
        //Add delete button to DOM
        newTodo.insertBefore(deleteButton,newTodo.firstChild);

        //Define mouseover logic for LI
        newTodo.addEventListener('mouseover',function(){
            var deleteButton = this.getElementsByTagName('a')[0];
            deleteButton.style.visibility = 'visible';
        });

        //Define mouseleave logic for LI
        newTodo.addEventListener('mouseleave',function(){

          var deleteButton = this.getElementsByTagName('a')[0];
          deleteButton.style.visibility = 'hidden';

        });
     		//append element to list
        todoList.appendChild(newTodo);
        //clear input box
        todoInput.value = '';

      }else{
        //Add red on input box if input contains illegal characters
        todoInput.id = 'illegalInput';
      }

  });
}



}

