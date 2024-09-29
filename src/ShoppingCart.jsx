function ShoppingCart({ cart, removeFromCart, updateQuantity }) {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 100;
    const finalTotal = totalPrice + shipping;
  
    return (
      <div>
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.id}>
            <p>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
            <input type="number" value={item.quantity} min="1" onChange={(e) => updateQuantity(item.id, e.target.value)} />
          </div>
        ))}
        <h3>Total: ${finalTotal.toFixed(2)}</h3>
      </div>
    );
  }
  