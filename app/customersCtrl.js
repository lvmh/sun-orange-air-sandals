app.controller('customersCtrl', function($scope, $modal, $filter, Data) {
  $scope.customer = {};
  Data.get('customers').then(function(data) {
    $scope.customers = data.data;
  });
  $scope.changeCustomerStatus = function(customer) {
    customer.status = (customer.status == "Active" ? "Inactive" : "Active");
    Data.put("customers/" + customer.id, {
      status: customer.status
    });
  };
  $scope.deleteCustomer = function(customer) {
    if (confirm("Are you sure to remove the customer")) {
      Data.delete("customers/" + customer.id).then(function(result) {
        $scope.customers = _.without($scope.customers, _.findWhere($scope.customers, {
          id: customer.id
        }));
      });
    }
  };
  $scope.open = function(p, size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/customersEdit.html',
      controller: 'customerEditCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      if (selectedObject.save == "insert") {
        $scope.customers.push(selectedObject);
        $scope.customers = $filter('customerBy')($scope.customers, 'id', 'reverse');
      } else if (selectedObject.save == "update") {
        p.productid = selectedObject.productid;
        p.customerid = selectedObject.customerid;
        p.amount = selectedObject.amount;
      }
    });
  };

  $scope.columns = [{
    text: "ID",
    predicate: "id",
    sortable: true,
    dataType: "number"
  }, {
    text: "Address",
    predicate: "address",
    sortable: true
  }, {
    text: "Name",
    predicate: "name",
    sortable: true
  }, {
    text: "Phone",
    predicate: "phone",
    sortable: true
  }, {
    text: "Status",
    predicate: "status",
    sortable: true
  }, {
    text: "Action",
    predicate: "",
    sortable: false
  }];

});


app.controller('customerEditCtrl', function($scope, $modalInstance, item, Data) {

  $scope.customer = angular.copy(item);

  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  };
  $scope.title = (item.id > 0) ? 'Edit Customer' : 'Add Customer';
  $scope.buttonText = (item.id > 0) ? 'Update Customer' : 'Add New Customer';

  var original = item;
  $scope.isClean = function() {
    return angular.equals(original, $scope.customer);
  }
  $scope.saveCustomer = function(customer) {
    customer.uid = $scope.uid;
    if (customer.id > 0) {
      Data.put('customers/' + customer.id, customer).then(function(result) {
        if (result.status != 'error') {
          var x = angular.copy(customer);
          x.save = 'update';
          $modalInstance.close(x);
        } else {
          console.log(result);
        }
      });
    } else {
      customer.status = 'Active';
      Data.post('customers', customer).then(function(result) {
        if (result.status != 'error') {
          var x = angular.copy(customer);
          x.save = 'insert';
          x.id = result.data;
          $modalInstance.close(x);
        } else {
          console.log(result);
        }
      });
    }
  };
});