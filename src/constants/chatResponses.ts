export interface FAQResponse {
  question: string;
  answer: string;
}

export interface FAQResponses {
  [key: string]: FAQResponse;
}

export const FAQ_RESPONSES: FAQResponses = {
  "compra": {
    question: "¿Cómo puedo realizar una compra?",
    answer: "Para realizar una compra, solo tienes que añadir los productos que te interesan al carrito de compras y luego proceder a la caja. Si necesitas ayuda, puedo guiarte en el proceso."
  },
  "productos": {
    question: "¿Dónde puedo encontrar información sobre los productos?",
    answer: "Cada producto tiene una descripción detallada en su página. Si deseas saber más sobre características, precios o disponibilidad, solo pregúntame por el producto específico."
  },
  "pago": {
    question: "¿Cuáles son las opciones de pago disponibles?",
    answer: "Aceptamos varias opciones de pago, incluyendo tarjetas de crédito/débito, PayPal, y pagos a través de plataformas seguras."
  },
  "envio": {
    question: "¿Cuál es el costo de envío?",
    answer: "El costo de envío depende de tu ubicación y del peso de los productos. Puedes ver el costo exacto antes de finalizar tu compra."
  },
  "tiempo": {
    question: "¿Cuánto tiempo tarda el envío?",
    answer: "El tiempo de envío varía según tu ubicación. En general, los pedidos nacionales tardan entre 3 y 7 días hábiles."
  },
  "devolucion": {
    question: "¿Puedo hacer una devolución?",
    answer: "Sí, ofrecemos una política de devoluciones dentro de 30 días después de recibir tu pedido. Asegúrate de que el producto esté en su estado original."
  },
  "stock": {
    question: "¿Tienen productos en stock?",
    answer: "Para verificar la disponibilidad de un producto, puedes ver su estado en la tienda. Si no está disponible, te puedo avisar cuando vuelva a estar en stock."
  },
  "carrito": {
    question: "¿Cómo reviso mi carrito de compras?",
    answer: "Puedes revisar tu carrito haciendo clic en el icono del carrito en la parte superior derecha de la página. Podrás modificar cantidades o eliminar productos."
  },
  "descuento": {
    question: "¿Hay algún código de descuento que pueda usar?",
    answer: "Si tienes un código de descuento, puedes introducirlo durante el proceso de pago. Si no tienes uno, puedo ofrecerte algunas promociones actuales."
  }
};