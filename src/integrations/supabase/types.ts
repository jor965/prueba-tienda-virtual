export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_respuestas: {
        Row: {
          clave: string
          id_respuesta: string
          pregunta: string
          respuesta: string
        }
        Insert: {
          clave: string
          id_respuesta?: string
          pregunta: string
          respuesta: string
        }
        Update: {
          clave?: string
          id_respuesta?: string
          pregunta?: string
          respuesta?: string
        }
        Relationships: []
      }
      comentarios: {
        Row: {
          comentario: string | null
          fecha_comentario: string | null
          id_comentario: string
          id_producto: string | null
          id_usuario: string | null
          valoracion: number | null
        }
        Insert: {
          comentario?: string | null
          fecha_comentario?: string | null
          id_comentario?: string
          id_producto?: string | null
          id_usuario?: string | null
          valoracion?: number | null
        }
        Update: {
          comentario?: string | null
          fecha_comentario?: string | null
          id_comentario?: string
          id_producto?: string | null
          id_usuario?: string | null
          valoracion?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
          {
            foreignKeyName: "comentarios_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      detalles_orden: {
        Row: {
          cantidad_producto: number
          id_detalle: string
          id_orden: string | null
          id_producto: string | null
          precio_unitario: number
          subtotal: number
        }
        Insert: {
          cantidad_producto: number
          id_detalle?: string
          id_orden?: string | null
          id_producto?: string | null
          precio_unitario: number
          subtotal: number
        }
        Update: {
          cantidad_producto?: number
          id_detalle?: string
          id_orden?: string | null
          id_producto?: string | null
          precio_unitario?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "detalles_orden_id_orden_fkey"
            columns: ["id_orden"]
            isOneToOne: false
            referencedRelation: "ordenes"
            referencedColumns: ["id_orden"]
          },
          {
            foreignKeyName: "detalles_orden_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id_producto"]
          },
        ]
      }
      ordenes: {
        Row: {
          direccion_envio: string | null
          estado_orden: string | null
          fecha_orden: string | null
          id_orden: string
          id_usuario: string | null
          metodo_pago: string | null
          total_orden: number
        }
        Insert: {
          direccion_envio?: string | null
          estado_orden?: string | null
          fecha_orden?: string | null
          id_orden?: string
          id_usuario?: string | null
          metodo_pago?: string | null
          total_orden: number
        }
        Update: {
          direccion_envio?: string | null
          estado_orden?: string | null
          fecha_orden?: string | null
          id_orden?: string
          id_usuario?: string | null
          metodo_pago?: string | null
          total_orden?: number
        }
        Relationships: [
          {
            foreignKeyName: "ordenes_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      productos: {
        Row: {
          cantidad_disponible: number
          categoria: string
          descripcion_producto: string | null
          fecha_agregado: string | null
          id_producto: string
          imagen_producto: string | null
          nombre_producto: string
          precio: number
        }
        Insert: {
          cantidad_disponible?: number
          categoria: string
          descripcion_producto?: string | null
          fecha_agregado?: string | null
          id_producto?: string
          imagen_producto?: string | null
          nombre_producto: string
          precio: number
        }
        Update: {
          cantidad_disponible?: number
          categoria?: string
          descripcion_producto?: string | null
          fecha_agregado?: string | null
          id_producto?: string
          imagen_producto?: string | null
          nombre_producto?: string
          precio?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          direccion: string | null
          email: string
          fecha_registro: string | null
          id_usuario: string
          nombre_usuario: string
          telefono: string | null
          tipo_usuario: string | null
        }
        Insert: {
          direccion?: string | null
          email: string
          fecha_registro?: string | null
          id_usuario?: string
          nombre_usuario: string
          telefono?: string | null
          tipo_usuario?: string | null
        }
        Update: {
          direccion?: string | null
          email?: string
          fecha_registro?: string | null
          id_usuario?: string
          nombre_usuario?: string
          telefono?: string | null
          tipo_usuario?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
