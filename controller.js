"use strict";
console.log("ShroomCtrl");

var app = angular.module("ShroomApp", ['ngRoute']);
console.log("app defined", app);
app.config(function($routeProvider){
	$routeProvider.
	when('/showall', {
		templateUrl: 'partial.html',
		controller: "ShroomCtrl"
	}).
	otherwise('/');
});

app.controller("ShroomCtrl", function($scope, ShroomFactory) {
	console.log("Is it here 1");
	ShroomFactory.getShrooms()
	.then(function(itemCollection){
		$scope.shroom = itemCollection;
		console.log("shroom scope", $scope.shroom);
	});

});

app.factory("ShroomFactory", function($q, $http){
console.log("Is it here 2");
	let getShrooms = () => {
		let items = [];
		return $q ((resolve, reject)=>{
			$http.get('https://exp-proj.firebaseio.com/mushrooms.json')
			.then((itemObject) =>{
				console.log("itemObj", itemObject);
				let itemCollection = itemObject.data;
				Object.keys(itemCollection).forEach((key)=>{
					items.push(itemCollection[key]);
				})
				resolve(items);
				console.log("items", items);
				console.log("YOU GOT YOUR SHROOMS MAN!!!");
			})
			.catch((error)=>{
				reject(error);
				console.log("NO SHROOMS FOR YOU");
			});
		});
	};

	let getAShroom = () =>{
		console.log("gotAShroom");
	};
	return{getShrooms, getAShroom};
});