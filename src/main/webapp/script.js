var app = angular.module('myApp', []);
app.controller('todoCtrl', function($scope, $http) {
    $scope.categories = [];
    $scope.tasks = [];
    $scope.pickedCategory = null;
    // Get list category from back-end
    $http.get('http://localhost:8080/todolist/webresources/entity.category')
    .success(function success(data){
        $scope.categories = data;
    })
    .error(function error(err){
        console.log(err);
    });
    $scope.addCategory = function(){
        if($scope.newCategory == null){
            return;
        }
        var newCat = new Object();
        newCat.name = $scope.newCategory;
        $http.post('http://localhost:8080/todolist/webresources/entity.category', JSON.stringify(newCat))
        .success(function (){
            console.log("success");
            // Get list category from back-end
            $http.get('http://localhost:8080/todolist/webresources/entity.category')
            .success(function success(data){
                    $scope.categories = data;
            })
            .error(function error(err){
                    console.log(err);
            });
        })
        .error(function (err){
            console.log("fail");
            console.log(err);
        });
        $scope.newCategory = null;
    }

    $scope.chooseCategory = function(category){
        $scope.pickedCategory = category;
        $http.get('http://localhost:8080/todolist/webresources/entity.category/listitem/' + category.id)
        .success(function success(data){
            $scope.tasks = data;
            console.log($scope.tasks);
        })
        .error(function error(err){
            console.log(err);
            console.log("error");
        });
    }

    $scope.addTask = function(){
        if($scope.title == null || $scope.description == null){
            return;
        }
        var task = new Object();
        task.title = $scope.title;
        task.description = $scope.description;
        task.createdAt = new Date();
        task.category = $scope.pickedCategory;
        $http.post('http://localhost:8080/todolist/webresources/entity.todoitem', JSON.stringify(task))
        .success(function (){
            console.log("success");
            $http.get('http://localhost:8080/todolist/webresources/entity.category/listitem/' + $scope.pickedCategory.id)
            .success(function success(data){
                $scope.tasks = data;
                console.log($scope.tasks);
            })
            .error(function error(err){
                console.log(err);
                console.log("error");
            });
        })
        .error(function (err){
            console.log("fail");
            console.log(err);
        });
    }


});