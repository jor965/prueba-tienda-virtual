export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          id_producto: string
          nombre_producto: string
          descripcion_producto: string | null
          categoria: string
          precio: number
          cantidad_disponible: number
          imagen_producto: string | null
          fecha_agregado: string
        }
        Insert: {
          id_producto?: string
          nombre_producto: string
          descripcion_producto?: string | null
          categoria: string
          precio: number
          cantidad_disponible?: number
          imagen_producto?: string | null
          fecha_agregado?: string
        }
        Update: {
          id_producto?: string
          nombre_producto?: string
          descripcion_producto?: string | null
          categoria?: string
          precio?: number
          cantidad_disponible?: number
          imagen_producto?: string | null
          fecha_agregado?: string
        }
      }
      usuarios: {
        Row: {
          id_usuario: string
          nombre_usuario: string
          email: string
          telefono: string | null
          direccion: string | null
          fecha_registro: string
          tipo_usuario: string
        }
        Insert: {
          id_usuario?: string
          nombre_usuario: string
          email: string
          telefono?: string | null
          direccion?: string | null
          fecha_registro?: string
          tipo_usuario?: string
        }
        Update: {
          id_usuario?: string
          nombre_usuario?: string
          email?: string
          telefono?: string | null
          direccion?: string | null
          fecha_registro?: string
          tipo_usuario?: string
        }
      }
    }
  }
}