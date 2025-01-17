import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Navigation() {
  const { cart } = useStore();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            TiendaOnline
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contacto
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-primary transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}