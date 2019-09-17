describe('Select a product from the product list', function() {
	
	function selectProduct(productName) {
		element.all((by.tagName('app-card'))).each(function(items) {
			
			items.element(by.css("h4.card-title a")).getText().then(function(linkText) {
				if(linkText == productName){
					items.element(by.css("div.card-footer button")).click();
				}
			})
			
		})
	}
	
	it('open the proto commerce app and navigate to shop', function() {
		
		browser.get("https://qaclickacademy.github.io/protocommerce/");
		element(by.linkText('Shop')).click();
		
	})
	
	it('Add a product to the cart', function() {
		
		selectProduct("Blackberry");
		selectProduct("Nokia Edge");
		
		element(by.partialLinkText("Checkout")).getText().then(function(text) {
			var cartNum = text.split("(");
			cartNum = cartNum[1].trim().charAt(0);
			expect(cartNum).toBe("2");
		})
		
	})
	
	it('Checkout the product added and verify total', function() {
		
		var priceTotal = 0;
		element(by.partialLinkText("Checkout")).click();
		
		element.all(by.tagName("tr")).each(function(rows) {
			console.log("Rows are: " + rows.length);
			rows.element(by.css("td:nth-child(4) strong")).getText().then(function(text) {
				var price = text.split("₹.");
				var priceNum = Number(price[1].trim());
				priceTotal = priceTotal + priceNum;
			})
		})
		
		element(by.css("h3 strong")).getText().then(function(totalText) {
			var sum = totalText.split("₹.");
			var total = Number(sum[1].trim());
			expect(total).toBe(priceTotal);
		})
		
	})
	
})