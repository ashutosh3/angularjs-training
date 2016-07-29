(function(){

	'use strict';

	angular.module('books')
	.controller("bookDetailCtrl", BooksDetailCtrl);

	BooksDetailCtrl.$inject = ["$scope", "Books", "$stateParams", "$uibModal", "userService", "Inventory"];

	function BooksDetailCtrl($scope, Books, $stateParams, $uibModal, userService, Inventory){

		$scope.book = Books.getBookById($stateParams.id);

		$scope.openBookIssueModal = function(id){
			  
			  var modalInstance = $uibModal.open({
											      animation: true,
											      templateUrl: 'src/app/books/issue-book.html',
											      controller: 'IssueBookCtrl',
											      size: 'sm',
											      resolve: {
											        book: function () {
											          return $scope.book;
											        },
											        usersList: function(){
											        	return userService.fetchUsers();
											        }
											      }
											    });

		    modalInstance.result.then(function (issueObj) {
		    		//issue a book
		    		userService.issueBooksForUser(issueObj.email, issueObj.bookId);
		    		Inventory.bookIssued(bookId);
		    		
			    }, function () {
			      console.log('Modal dismissed at: ' + new Date());
			});

		}
	}

})();

