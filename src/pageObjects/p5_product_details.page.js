class ProductDetailsPage {
    get productName() { return $('h1[data-test="product-name"]') }
    get productPrice() { return $('span[aria-label="unit-price"]') }
    get productDescription() { return $('#description') }






}

export default new ProductDetailsPage();