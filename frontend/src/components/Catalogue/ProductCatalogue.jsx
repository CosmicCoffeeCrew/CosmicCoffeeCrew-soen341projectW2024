import PropTypes from 'prop-types';
import "./ProductCatalogue.css";
import products from "./ProductDetails"; // Importing the products array

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
                        className="card relative text-center group p-4 sm:py-16 hover:bg-primary duration-300 text-white hover:text-black rounded-lg overflow-hidden"
                        data-aos="fade-up"
                        data-aos-delay={product.aosDelay}
                    >
                        {/* Full cover background image */}
                        <img 
                            src={product.image} 
                            alt="Product Image" 
                            className="w-full h-full object-cover absolute inset-0 z-0"
                        />
                        {/* Content overlay */}
                        <div className="w-full h-full relative z-10 flex flex-col justify-between p-4">
                            {/* Pink box for car name */}
                            <div className=" text-xl font-bold p-2">
                                {product.name}
                            </div>
                            {/* Blue box for description */}
                            <div className=" flex-1 flex items-center justify-center p-2">
                                <p>{product.short_description}</p>
                            </div>
                            {/* Orange box for 'View Details' button */}
                            <div className="bg-orange-500">
                                <button className="button is-primary w-full h-full">
                                    <strong>View Details</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Prop types for the products array
ProductCatalogue.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            short_description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            aosDelay: PropTypes.string // Add any other props used in your products here
        })
    ).isRequired
};

export default ProductCatalogue;



// // export default ProductCatalogue;
// import React from 'react';
// import PropTypes from 'prop-types';
// import "./ProductCatalogue.css";
// import products from "./ProductDetails"; // Importing the products array

// // ProductCatalog: Contains a grid of multiple ProductTiles
// class ProductCatalog extends React.Component {
//     renderTile = (current_item) => {
//         return <ProductTile product={current_item} key={current_item.id}></ProductTile>;
//     }

//     render() {
//         let tiles = [];
//         for (let i = 0; i < this.props.products.length; i++) {
//             const current_item = this.props.products[i];
//             tiles.push(this.renderTile(current_item));
//         }
//         return (
//             <div id="product-catalog">
//                 {tiles}
//             </div>
//         );
//     }
// }

// // Add prop type validation for 'products'
// ProductCatalog.propTypes = {
//     products: PropTypes.array.isRequired
// };

// // ProductTile: A Bulma box containing information about a specific product
// class ProductTile extends React.Component {
//     render() {
//         const { product } = this.props;
//         return (
//             <div className="card">
//                 <div className="card-image">
//                     <figure className="image is-4by3">
//                         <img src={product.image} alt="Product Image" />
//                     </figure>
//                 </div>
//                 <div className="card-content">
//                     <p className="title product-title">{product.name}</p>
//                     <div className="content">
//                         {product.short_description}
//                         <br />
//                     </div>
//                     {/* Add rel="noreferrer" to mitigate security risk */}
//                     <a href={"product.html?id=" + product.id.toString()} target="_blank" rel="noreferrer" className="button is-primary">
//                         <strong>More Details</strong>
//                     </a>
//                 </div>
//             </div>
//         )
//     }
// }

// // Add prop type validation for 'product'
// ProductTile.propTypes = {
//     product: PropTypes.shape({
//         image: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         short_description: PropTypes.string.isRequired,
//         id: PropTypes.number.isRequired
//     }).isRequired
// };

// // Define ProductCatalogue component (without class definition)
// const ProductCatalogue = () => {
//     return (
//         <div className="dark:bg-dark bg-secondary-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 mt-14 rounded-t-3xl">
//             <h1
//               data-aos="fade-up"
//               className="text-3xl font-semibold text-center sm:text-4xl font-serif py-32"
//             >
//               Catalogue
//             </h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {products.map(product => (
//                     <div
//                         key={product.id}
//                         className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
//                         data-aos="fade-up"
//                         data-aos-delay={product.aosDelay}
//                     >
//                         <div className="grid place-items-center">
//                             <img src={product.image} alt="Product Image" className="w-24 h-24" />
//                         </div>
//                         <h1 className="text-2xl font-bold">{product.name}</h1>
//                         <p>{product.short_description}</p>
//                         <button className="button is-primary bg-transparent">
//                             <strong>View Details</strong>
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ProductCatalogue;
