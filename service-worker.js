self.addEventListener('notificationclick', function(event) {
  event.notification.close();
});