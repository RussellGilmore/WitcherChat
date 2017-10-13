angular.module('witcherApp', [])
  .service('WitcherConnectService', WitcherConnectService)
  .controller('WitcherController', ["$scope", 'WitcherConnectService', WitcherController]);

function WitcherController($scope, service) {
  var self = this;
  self.service = service;
    //self.socket = io.connect('/');

  self.handle = "";
  self.message = "";
  self.output = [];

  self.submit = function() {
    if (!self.message) {
      return;
    }
    self.service.send(self.message, self.handle);
    self.message = "";
  };

  self.service.register($scope, (newMessage) => {
    self.output.push(newMessage);
  });
}

function WitcherConnectService() {
  var self = this;
  //Ref this function
  self.socket = io.connect('/');

  self.send = function(message, handle) {
    self.socket.emit('chat', {
      message: message,
      handle: handle
    });
  };

  self.register = function($scope, cb) {
    self.socket.on('chat', function(data) {
      $scope.$apply(function() {
        var newMessage = {
          handle: data.handle,
          message: data.message
        };
        cb(newMessage);
      });
    });
  };
}
