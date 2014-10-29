

 var my_server = 'http://tiy-atl-fe-server.herokuapp.com/collections/vicsthings';

 // updating the task when marked complete
 //deleting tasks




var ToDo = function (options) {
  options = options || {};
  this.task = options.task || '';
  this.done = 'false';
};

// Collection of ToDo's
var todo_list;

// Setup my Template
var task_template = $('#task_items').html();
var rendered = _.template(task_template);

//grabbing all todo items and showing on page

$.getJSON(my_server).done( function(data){

  todo_list = data;

  _.each(todo_list, function(item) {
    $('#todoList').append(rendered(item))
  })

})
var task, contents;
$('#sendMessage').on('submit', function (event) {
  event.preventDefault();
  var self = this;



  // Grab the task value
  contents = $('#text').val();

  // Create a new ToDo instance
  task = new ToDo({
    task: contents,
  });

//send to our server:
$.ajax({
  type:'POST',
  url: my_server,
  data: task
}).done(function(data){
  // Add to my todo_list
  todo_list.push(data);

  // Show our task on the page
  $('#todoList').append(rendered(data));

  // Reset my form
  $(self)[0].reset();

});

});




// Manage ToDo items
var todo_modifier;
$('#todoList').on('click', 'li', function (event) {
  event.preventDefault();

var myID = $(this).attr('id')
  // Find the instance of my task
  todo_modifier = _.findWhere(todo_list, { _id: myID});



  // If it's done, mark it undone, else mark it done
  if (todo_modifier.done ==='true') {
    todo_modifier.done = 'false';
    $(this).removeClass('done');
  } else {
   todo_modifier.done = 'true';
    $(this).addClass('done');
  }
$.ajax({
  type: 'PUT',
  url: my_server +"/" + todo_modifier._id,
  data: todo_modifier
})
});
