module.exports = {
	import moment from "moment";

	 sleepTime: function(time1, time2) {
		var sleep = moment(time1).subtract(time2, "hours").format("LT");
     		return sleep;
	},
	
};
