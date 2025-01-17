import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Product } from "@/context/StoreContext";

const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299.99,
    description: "Potente laptop para profesionales",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Laptop Gaming",
    price: 1499.99,
    description: "Laptop gaming de alto rendimiento",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Business",
    price: 999.99,
    description: "Laptop perfecta para negocios",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Laptop Developer",
    price: 1199.99,
    description: "Laptop ideal para desarrolladores",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Electronics",
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
              Bienvenido a TiendaOnline
            </h1>
            <p className="text-xl md:text-2xl">
              Descubre nuestra selección de productos de alta calidad
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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