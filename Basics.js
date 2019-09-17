describe("Chain locators and repeaters attribute", function() {

	var value1 = 9;
	var value2 = 5;
	var result = value1 - value2;

	function Calc(value1, value2, operator) {

		// enter first value
		element(by.model("first")).sendKeys(value1);

		// enter second value
		element(by.model("second")).sendKeys(value2);

		// select operator
		selectOperator(operator);

		// click GO
		element(by.id("gobutton")).click();

	}

	// use of dropdown and attribute called tagName
	function selectOperator(operator) {

		element(by.model("operator")).all(by.tagName("option")).each(
				function(items) {

					items.getAttribute("value").then(function(value) {

						console.log("Value is: " + value);

						if (value == operator) {

							items.click();

						}
					})

				})

	}
	
	it('I am in Test Case', function() {
		
		browser.get("https://juliemr.github.io/protractor-demo/");
		
		//ng-modal can be used as by.modal() here
		element(by.model("first")).sendKeys("5");
		element(by.model("second")).sendKeys("9");
		element(by.id("gobutton")).click();
		
		//use of promise manually
		/*element(by.css("h2.ng-binding")).getText().then(function(text){
			console.log(text);
		})*/
		expect(element(by.css("h2.ng-binding")).getText()).toBe("14");

	})

	// basic concepts
	it("add two numbers", function() {

		browser.get("https://juliemr.github.io/protractor-demo/");

		Calc(9, 5, "SUBTRACTION");

		expect(element(by.css("h2.ng-binding")).getText()).toBe(
				result.toString());

	})

	// chain locators concept
	it("use of chain locators", function() {

		// using repeaters tag by.repeater("locator")
		expect(
				element(by.repeater("result in memory")).element(
						by.css("td:nth-child(3)")).getText()).toBe(
				result.toString());

	})

	// all function concept
	it("use of element.all() function", function() {

		Calc(6, 3, "MULTIPLICATION");

		Calc(8, 2, "DIVISION");

		element.all(by.repeater("result in memory")).each(function(items) {

			items.element(by.css("td:nth-child(3)")).getText().then(function(item) {

				console.log("result is: " + item);

			})

		})
	})

})