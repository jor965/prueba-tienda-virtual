import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Product } from "@/context/StoreContext";

const products: Product[] = [
  {
    id: 1,
    name: "Gaseosa Cola 2L",
    price: 6500,
    description: "Refrescante gaseosa sabor cola en botella familiar",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
    category: "Bebidas",
  },
  {
    id: 2,
    name: "Snacks Variados Pack",
    price: 12000,
    description: "Paquete surtido de snacks salados y dulces",
    image: "https://images.unsplash.com/photo-1621447504864-d8686f215c04",
    category: "Snacks",
  },
  {
    id: 3,
    name: "Jugo Natural 1L",
    price: 8500,
    description: "Jugo 100% natural de naranja recién exprimida",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    category: "Bebidas",
  },
  {
    id: 4,
    name: "Galletas Surtidas",
    price: 4500,
    description: "Selección de galletas dulces y saladas",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
    category: "Snacks",
  },
  {
    id: 5,
    name: "Agua Mineral 1.5L",
    price: 3500,
    description: "Agua mineral natural sin gas",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30",
    category: "Bebidas",
  },
  {
    id: 6,
    name: "Papas Fritas",
    price: 2500,
    description: "Crujientes papas fritas sabor original",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b",
    category: "Snacks",
  },
];

const Index = () => {
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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Index;