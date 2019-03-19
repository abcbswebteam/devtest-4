angular.module("todoApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "TodoListController as todoList",
                templateUrl: "/app/templates/list.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    })
    .controller("TodoListController", function () {
        var todoList = this;

        angular.element("#todoText").trigger('focus');

        var todoText = "";
        todoList.todos = [
            { text: "learn AngularJS", done: true },
            { text: "build an AngularJS app", done: false }];

        todoList.addTodo = function () {
            todoText = todoList.todoText;
            console.log('new value is ' + todoText);
            if (todoText !== undefined && todoText !== null) {
                todoList.todos.push({ text: todoList.todoText, done: false });
                todoList.todoText = "";
                todoList.todoText = undefined;
                angular.element("#todoText").trigger('focus');
            }
        };

        todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function () {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
        
    });