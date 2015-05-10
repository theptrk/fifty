function Fifty (country, domSelector, openFunction, closeFunction) {

  this.domSelector = domSelector;
  this.target = undefined;
  this._states = {
    open: false
  };

  // add fifty to country list
  this.exclusiveList = country;
  country.push(this);
  
  this.actions = {
    // actions can take a call back, so functions must also take a callback
    open: function(cb) {
      // set state
      this._states.open = true;
      this.exclusiveList.forEach(function (v) {
        // close everything else in the list
        if (v !== this) {
          if (v._states.open) {
            // call the fifty exclusive close function
            v.actions.exlusiveClose();
          } 
        }
      }.bind(this));

      // calls the open function
      openFunction.call(null, cb);

    }.bind(this),
    close: function (cb) {
      // set state
      this._states.open = false;

      // calls this close function
      closeFunction.call(null, cb);
    }.bind(this),
    // function called when closing all other fifty
    exlusiveClose: function () {
      this.getTarget().hide();
    }.bind(this)
  };
}

Fifty.prototype.getTarget = function(){
  if(this.target){
    return this.target;
  }
  else {
    this.target = $(this.domSelector);
    return this.target;
  }
};