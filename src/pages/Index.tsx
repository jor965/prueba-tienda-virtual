import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/store";

const Index = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('nombre_producto');

      if (error) throw error;

      return data.map(product => ({
        id: product.id_producto,
        name: product.nombre_producto,
        price: product.precio,
        description: product.descripcion_producto || '',
        image: product.imagen_producto || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',
        category: product.categoria
      })) as Product[];
    }
  });

  if (error) {
    console.error('Error loading products:', error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bienvenido a nuestra Tienda de Refrescos
            </h1>
            <p className="text-xl md:text-2xl">
              Las mejores bebidas y snacks para todos los gustos
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : products ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : null}
          </div>
        </div>
      </main>
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Index;