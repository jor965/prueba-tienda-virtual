import { Product } from "@/types/store";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 animate-fadeIn">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Button onClick={handleAddToCart}>Agregar al carrito</Button>
        </div>
      </div>
    </div>
  );
}