app.controller('ordersCtrl', function($scope, $modal, $filter, Data) {
  $scope.order = {};
  Data.get('orders').then(function(data) {
    $scope.orders = data.data;
  });
  $scope.changeOrderStatus = function(order) {
    order.status = (order.status == "Active" ? "Inactive" : "Active");
    Data.put("orders/" + order.id, {
      status: order.status
    });
  };
  $scope.deleteOrder = function(order) {
    if (confirm("Are you sure to remove the order")) {
      Data.delete("orders/" + order.id).then(function(result) {
        $scope.orders = _.without($scope.orders, _.findWhere($scope.orders, {
          id: order.id
        }));
      });
    }
  };
  $scope.open = function(p, size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/ordersEdit.html',
      controller: 'orderEditCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      if (selectedObject.save == "insert") {
        $scope.orders.push(selectedObject);
        $scope.orders = $filter('orderBy')($scope.orders, 'id', 'reverse');
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
    text: "Product",
    predicate: "productid",
    sortable: true
  }, {
    text: "Customer",
    predicate: "customerid",
    sortable: true
  }, {
    text: "Amount",
    predicate: "amount",
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


app.controller('orderEditCtrl', function($scope, $modalInstance, item, Data) {

  $scope.order = angular.copy(item);

  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  };
  $scope.title = (item.id > 0) ? 'Edit Order' : 'Add Order';
  $scope.buttonText = (item.id > 0) ? 'Update Order' : 'Add New Order';

  var original = item;
  $scope.isClean = function() {
    return angular.equals(original, $scope.order);
  }
  $scope.saveOrder = function(order) {
    order.uid = $scope.uid;
    if (order.id > 0) {
      Data.put('orders/' + order.id, order).then(function(result) {
        if (result.status != 'error') {
          var x = angular.copy(order);
          x.save = 'update';
          $modalInstance.close(x);
        } else {
          console.log(result);
        }
      });
    } else {
      order.status = 'Active';
      Data.post('orders', order).then(function(result) {
        if (result.status != 'error') {
          var x = angular.copy(order);
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