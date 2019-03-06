module.exports = {

	 sleepTime: function(time1, time2) {
     var sleep = time1 - time2;		
      if(sleep <= 0) {
        sleep = sleep + 24;
      } 
      return sleep + ":00";
	},
	
};
