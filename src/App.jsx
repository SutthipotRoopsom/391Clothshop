import { useState } from 'react';
import { products } from './data.js';
import './App.css'; 

export default function List() {
  const [cart, setCart] = useState({});
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [notification, setNotification] = useState('');

  function addToCart(product) {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        // If product exists, increase quantity
        newCart[product.id].quantity += 1;
      } else {
        // If product doesn't exist, add it with quantity 1
        newCart[product.id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
  }

  function removeFromCart(productId) {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId]; // Remove the product from the cart
      return newCart;
    });
  }

  const totalPriceBeforeDiscount = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = discountApplied ? totalPriceBeforeDiscount * 0.1 : 0; // 10% discount
  const totalPrice = totalPriceBeforeDiscount - discount + 100; // Adding 100 THB for shipping

  const handleApplyDiscount = () => {
    if (discountCode === 'MJU') {
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  const handlePurchase = () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setNotification('Thank you for your purchase!'); // Set notification
    setCart({}); // Clear cart after purchase
    setDiscountApplied(false); // Reset discount status
    setDiscountCode(''); // Clear discount code
  };

  return (
    <article>
      <div className="cart-icon">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="cart-count">{Object.keys(cart).length}</span>
      </div>
      <h1>391 Cloth Shop</h1>
      
      <div className="cart">
        {Object.values(cart).map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.name} - {item.price.toFixed(2)} THB x {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)} className="cancel-button">Remove</button>
          </div>
        ))}
      </div>
      
      <h2>Total Price: {totalPriceBeforeDiscount.toFixed(2)} THB</h2>
      {discountApplied && (
        <p>Discount Applied: -{discount.toFixed(2)} THB</p>
      )}
      <h3>Shipping Cost: 100 THB</h3>
      <h2>Final Price: {totalPrice.toFixed(2)} THB</h2>

      <div className="discount-code">
        <input 
          type="text" 
          placeholder="Enter MJU for 10% Discount" 
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button onClick={handleApplyDiscount}>Apply</button>
      </div>

      {/* Purchase Button */}
      <button onClick={handlePurchase} className="purchase-button">Purchase</button>
      
      {/* Notification */}
      {notification && <p className="notification">{notification}</p>}
      
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <img
              src={product.imageUrl}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price.toFixed(2)} THB</p>
            <div>
              <button 
                className="add-to-cart" 
                onClick={() => addToCart(product)} // Add product to cart
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
