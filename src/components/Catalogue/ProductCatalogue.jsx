import React from 'react';
import "./ProductCatalogue.css";
import products from "./ProductDetails"; // Importing the products array

// ProductCatalog: Contains a grid of multiple ProductTiles
class ProductCatalog extends React.Component {
    // Creates a ProductTile object to be rendered
    renderTile = (current_item) => {
        return <ProductTile product={current_item}></ProductTile>;
    }

    // Iterates through the product list and calls the renderTile
    // method to create the ProductTile object
    render() {
        let tiles = [];
        for (let i = 0; i < this.props.products.length; i++) {
            const current_item = this.props.products[i];
            tiles.push(this.renderTile(current_item));
        }
        return (
            <div id="product-catalog">
                {tiles}
            </div>
        );
    }
}

// ProductTile: A Bulma box containing information about a specific product
class ProductTile extends React.Component {
    // Renders the ProductTile with Product Information
    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={this.props.product.image} alt="Placeholder image"></img>
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title product-title">{this.props.product.name}</p>
                    <div className="content">
                        {this.props.product.short_description}
                        <br></br>
                    </div>
                    <a className="button is-primary" href={"product.html?id=" + this.props.product.id.toString()} target="_blank">
                        <strong>More Details</strong>
                    </a>
                </div>
            </div>
        )
    }
}

const ProductCatalogue = () => {
    
    return (
        <div className="dark:bg-dark bg-secondary-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 mt-14 rounded-t-3xl">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif py-32"
            >
              Catalogue
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
                        data-aos="fade-up"
                        data-aos-delay={product.aosDelay} // Assuming aosDelay is a property of each product
                    >
                        <div className="grid place-items-center">
                            <img src={product.image} alt="Product Image" className="w-24 h-24" />
                        </div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p>{product.short_description}</p>
                        <button className="button is-primary bg-transparent">
                            <strong>View Details</strong>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCatalogue;
