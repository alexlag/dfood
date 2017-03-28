const HOUR = 3600000;

function Cache(ttl, init) {
  this.when = 0;
  this.ttl = ttl || HOUR;
  this.data = init || {};

  this.valid = function valid() {
    return new Date() - this.when < this.ttl;
  };

  this.update = function update(data) {
    this.when = new Date();
    this.data = data;
  };
}

module.exports = Cache;
