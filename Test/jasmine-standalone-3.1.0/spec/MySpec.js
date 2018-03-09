function Calculator()
{
    this.add = function(a, b) { return a+b;};
    this.minus = function(a, b) { return a-b;};
    this.multiply = function(a, b) { return a*b;};
    this.divide = function(a,b) {return a/b;} ;
}

describe("Cộng trừ", function() {
    var cal = new Calculator();

    it("Một với một là hai", function() {
        expect(2).toBe(cal.add(1,1));
    });

    it("Hai với hai là bốn", function() {
        expect(4).toBe(cal.add(2,2));
    });

    it("Năm trừ hai bằng ba", function() {
        expect(3).toBe(cal.minus(5,2));
    });

});

describe("Nhân chia", function() {
    var cal = new Calculator();

    it("Năm nhân hai bằng mười", function() {
        expect(10).toBe(cal.multiply(5,2));
    });

    it("Sáu chia hai bằng ba", function() {
        expect(3).toBe(cal.divide(6,2));
    });
});