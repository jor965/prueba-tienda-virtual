import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Order, CartItem, User } from '@/types/store';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const createOrder = async (user: User, cart: CartItem[], cartTotal: number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear una orden",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('ordenes')
        .insert([
          {
            id_usuario: user.id,
            total_orden: cartTotal,
            estado_orden: 'pendiente'
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderDetails = cart.map(item => ({
        id_orden: orderData.id_orden,
        id_producto: item.id,
        cantidad_producto: item.quantity,
        precio_unitario: item.price,
        subtotal: item.price * item.quantity
      }));

      const { error: detailsError } = await supabase
        .from('detalles_orden')
        .insert(orderDetails);

      if (detailsError) throw detailsError;

      toast({
        title: "Orden creada",
        description: "Tu orden ha sido creada exitosamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al crear la orden",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('ordenes')
        .select(`
          *,
          detalles_orden (
            *,
            productos (*)
          )
        `)
        .eq('id_usuario', userId)
        .order('fecha_orden', { ascending: false });

      if (error) throw error;

      const mappedOrders: Order[] = (data || []).map(order => ({
        id: order.id_orden,
        userId: order.id_usuario,
        total: order.total_orden,
        status: order.estado_orden,
        createdAt: order.fecha_orden,
        items: order.detalles_orden.map((detail: any) => ({
          id: detail.productos.id_producto,
          name: detail.productos.nombre_producto,
          price: detail.precio_unitario,
          description: detail.productos.descripcion_producto || '',
          image: detail.productos.imagen_producto || '',
          category: detail.productos.categoria,
          quantity: detail.cantidad_producto
        }))
      }));

      setOrders(mappedOrders);
    } catch (error: any) {
      toast({
        title: "Error al cargar órdenes",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    orders,
    createOrder,
    fetchOrders,
  };
}