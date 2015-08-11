app.controller('contactCtrl', function($scope, $http) {
  $scope.success = false;
  $scope.error = false;
  $scope.send = function() {

    var htmlBody = '<div>Name: ' + $scope.user.name + '</div>' +
      '<div>Email: ' + $scope.user.email + '</div>' +
      '<div>Message: ' + $scope.user.body + '</div>' +
      '<div>Date: ' + (new Date()).toString() + '</div>';

    $http({
      url: 'https://api.postmarkapp.com/email',
      method: 'POST',
      data: {
        'From': 'sun-orange@air-sandals.com',
        'To': 'joshcorich@gmail.com',
        'HtmlBody': htmlBody,
        'Subject': 'New Contact Form Submission'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': '8979603a-ec34-4ac3-9e14-d658283f486a'
      }
    }).
    success(function(data) {
      $scope.success = true;
      $scope.user = {};
    }).
    error(function(data) {
      $scope.error = true;
    });
  }
});