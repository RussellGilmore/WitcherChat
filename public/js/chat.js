angular.module('witcherApp', [])
  .controller('WitcherController', ["$scope", WitcherController]);

function WitcherController($scope) {
  var self = this;

  self.socket = io.connect('/');

  self.handle = "";
  self.message = "";
  self.output = [];

  self.submit = function() {
    if (!self.message) {
      return;
    }
    self.socket.emit('chat', {
      message: self.message,
      handle: self.handle
    });
    self.message = "";
  };

  self.socket.on('chat', function(data) {
    $scope.$apply(function($scope) {
      var newMessage = {
        handle: data.handle,
        message: data.message
      };
      self.output.push(newMessage);
    });
  });
}
