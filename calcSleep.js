exports.sleepTime = function(i, j) {
	var time = i - j;
  if (time <= 0) {
    time = 24 + time;
  }
  var sleep = time + ":00";
  return sleep;
};
