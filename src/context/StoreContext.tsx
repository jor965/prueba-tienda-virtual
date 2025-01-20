import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import type { User, CartItem, Order } from '@/types/store';

interface StoreContextType {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  createOrder: (shippingAddress: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user, isLoading, login, logout, register } = useAuth();
  const { orders, createOrder: createOrderBase, fetchOrders: fetchOrdersBase } = useOrders();

  const createOrder = async (shippingAddress: string) => {
    if (!user) return;
    await createOrderBase(user, cart, cartTotal, shippingAddress);
    clearCart();
  };

  const fetchOrders = async () => {
    if (!user) return;
    await fetchOrdersBase(user.id);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        cart,
        orders,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        login,
        logout,
        register,
        createOrder,
        fetchOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}