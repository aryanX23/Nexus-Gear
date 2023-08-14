// ProductDetailPage.js
import React, { useEffect, useState, useParams } from 'react';

const ProductDetailPage = ({ match }) => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulating fetching product data from an API based on the 'match.params.productId'
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/products/${match.params.productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [match.params.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.imageUrl} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">Price: ${product.price}</p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Product Reviews</h3>
        <ul className="mt-4">
          {product.reviews.map((review, index) => (
            <li key={index} className="border-t border-gray-300 pt-4">
              <p className="text-lg font-semibold">{review.author}</p>
              <p className="text-gray-600 mt-1">{review.comment}</p>
              <p className="text-lg font-semibold mt-1">Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailPage;
