-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Productos
CREATE TABLE productos (
    id_producto UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion_producto TEXT,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad_disponible INTEGER NOT NULL DEFAULT 0,
    imagen_producto TEXT,
    fecha_agregado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Usuarios
CREATE TABLE usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario VARCHAR(20) DEFAULT 'cliente'
);

-- Órdenes
CREATE TABLE ordenes (
    id_orden UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    fecha_orden TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_orden DECIMAL(10,2) NOT NULL,
    estado_orden VARCHAR(20) DEFAULT 'pendiente',
    metodo_pago VARCHAR(50)
);

-- Detalles de la Orden
CREATE TABLE detalles_orden (
    id_detalle UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_orden UUID REFERENCES ordenes(id_orden),
    id_producto UUID REFERENCES productos(id_producto),
    cantidad_producto INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

-- Comentarios y Valoraciones
CREATE TABLE comentarios (
    id_comentario UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_producto UUID REFERENCES productos(id_producto),
    id_usuario UUID REFERENCES usuarios(id_usuario),
    comentario TEXT,
    valoracion INTEGER CHECK (valoracion >= 1 AND valoracion <= 5),
    fecha_comentario TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo para productos
INSERT INTO productos (nombre_producto, descripcion_producto, categoria, precio, cantidad_disponible, imagen_producto) VALUES
('Coca-Cola 2L', 'Refresco carbonatado sabor cola', 'Bebidas', 6500, 100, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97'),
('Pepsi 2L', 'Refresco carbonatado sabor cola', 'Bebidas', 6000, 80, 'https://images.unsplash.com/photo-1629203851265-d928f87639c2'),
('Doritos Nacho', 'Tortillas de maíz con sabor a queso', 'Snacks', 4500, 150, 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca'),
('Papas Lay''s Clásicas', 'Papas fritas sabor original', 'Snacks', 4000, 120, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b'),
('Sprite 1.5L', 'Refresco carbonatado sabor limón', 'Bebidas', 5500, 90, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3');

-- Insertar datos de ejemplo para usuarios
INSERT INTO usuarios (nombre_usuario, email, telefono, direccion, tipo_usuario) VALUES
('Juan Pérez', 'juan@example.com', '3001234567', 'Calle 123 #45-67', 'cliente'),
('María García', 'maria@example.com', '3109876543', 'Carrera 78 #90-12', 'cliente'),
('Admin Usuario', 'admin@store.com', '3205555555', 'Avenida Principal #1-23', 'administrador');

-- Insertar datos de ejemplo para órdenes
INSERT INTO ordenes (id_usuario, total_orden, estado_orden, metodo_pago)
SELECT 
    id_usuario,
    25000,
    'entregado',
    'tarjeta'
FROM usuarios
WHERE email = 'juan@example.com'
LIMIT 1;

-- Insertar datos de ejemplo para comentarios
INSERT INTO comentarios (id_producto, id_usuario, comentario, valoracion)
SELECT 
    p.id_producto,
    u.id_usuario,
    'Excelente producto, muy refrescante',
    5
FROM productos p, usuarios u
WHERE p.nombre_producto = 'Coca-Cola 2L'
AND u.email = 'juan@example.com'
LIMIT 1;

-- Configurar políticas de seguridad (RLS)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE detalles_orden ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;

-- Políticas para productos (todos pueden ver, solo admin puede modificar)
CREATE POLICY "Productos visibles para todos" ON productos
    FOR SELECT USING (true);

CREATE POLICY "Solo admin puede modificar productos" ON productos
    FOR ALL USING (
        auth.uid() IN (
            SELECT id_usuario::text FROM usuarios WHERE tipo_usuario = 'administrador'
        )
    );

-- Política para usuarios (cada usuario ve solo su información)
CREATE POLICY "Usuarios ven su propia información" ON usuarios
    FOR SELECT USING (
        auth.uid() = id_usuario::text
        OR auth.uid() IN (
            SELECT id_usuario::text FROM usuarios WHERE tipo_usuario = 'administrador'
        )
    );

-- Política para órdenes (usuarios ven sus propias órdenes)
CREATE POLICY "Usuarios ven sus propias órdenes" ON ordenes
    FOR SELECT USING (
        auth.uid() = id_usuario::text
        OR auth.uid() IN (
            SELECT id_usuario::text FROM usuarios WHERE tipo_usuario = 'administrador'
        )
    );