function AngularSocketBinder($scope, broker, socketBase) {
	var stompClient = null;
	thisObject = this;

	var indexOf = function(data, id) {
		for (var i = 0; i < data.length; i++)
			if (data[i].id === id)
				return i;
		return -1;
	}

	var actionForVerb = function(verb, message, action) {
		if (message.headers.verb && message.headers.verb === verb) {
			action(message.data, message);
		}
	}

	this.data = [];
	var socket = new SockJS(broker);
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		stompClient.subscribe(socketBase, function(message) {
			actionForVerb('create', message, function() {
				thisObject.data.push(JSON.parse(message.body));
			});
			actionForVerb('update', message, function() {
				var item = JSON.parse(message.body);
				var index = indexOf(thisObject.data, item.id);
				thisObject.data[index] = item;
			});
			actionForVerb('delete', message, function() {
				var item = JSON.parse(message.body);
				var index = indexOf(thisObject.data, item.id);
				thisObject.data.splice(index, 1);
			});
			$scope.$apply();
		});
	});
}
