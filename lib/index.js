function Star (country, domSelector, openFunction, closeFunction, exclusiveCloseFunction) {

  this.domSelector = domSelector;
  this.target = undefined;
  this.states = {
    open: false
  };

  // add star to country list
  this.country = country;
  country.stars.push(this);
  
  this.actions = {
    // actions can take a call back, so functions must also take a callback
    open: function(cb) {
      // set state
      this.states.open = true;
      this.country.topStar = this;
      this.country.stars.forEach(function (v) {
        // close everything else in the list
        if (v !== this) {
          if (v.states.open) {
            // set state to false; this can be used by any view logic
            v.states.open = false;
            // call the star exclusive close function
            v.actions.exclusiveClose();
          } 
        }
      }.bind(this));

      // calls the open function; if false is returned, cancel the opening
      if (openFunction.call(this, cb) === false) {
        this.actions.exclusiveClose();
      }

    }.bind(this),
    close: function (cb) {
      // set state
      this.states.open = false;

      // calls this close function
      closeFunction.call(this, cb);
    }.bind(this),
    // function called when closing all other fifty
    exlusiveClose: function () {
      this.getTarget().hide();
    }.bind(this)
  };
}

Star.prototype.getTarget = function(){
  if(this.target){
    return this.target;
  }
  // set and return the target
  this.target = $(this.domSelector);
  return this.target;
};

function Country () {
  this.stars = [];
  this.topStar;
}