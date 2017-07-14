const MayBe = function(val) {
    this.value = val
}

MayBe.of = function(val) {
    return new MayBe(val)
}

// Checks first if value is null or undefined
MayBe.prototype.isNothing = function() {
    return (this.value === null || this.value === undefined)
}

// After check, it maps
MayBe.prototype.map = function(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}

export { MayBe }