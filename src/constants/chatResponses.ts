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
    answer: "Para realizar una compra, añade los productos al carrito, proporciona tu dirección de envío y procede al pago. Si necesitas ayuda, puedo guiarte en el proceso."
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
    answer: "El costo de envío depende de tu ubicación. Asegúrate de ingresar tu dirección completa durante el proceso de compra para calcular el costo exacto."
  },
  "direccion": {
    question: "¿Cómo ingreso mi dirección de envío?",
    answer: "Durante el proceso de compra, podrás ingresar tu dirección de envío completa. Asegúrate de incluir calle, número, ciudad y código postal para garantizar una entrega exitosa."
  },
  "tiempo": {
    question: "¿Cuánto tiempo tarda el envío?",
    answer: "El tiempo de envío varía según tu ubicación. En general, los pedidos nacionales tardan entre 3 y 7 días hábiles una vez confirmada la dirección de envío."
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
  },
  "gracias": {
    question: "Gracias por tu ayuda",
    answer: "¡Ha sido un placer ayudarte! Si necesitas cualquier otra cosa, no dudes en preguntarme. ¡Que tengas un excelente día!"
  },
  "adios": {
    question: "Adiós",
    answer: "¡Gracias por tu visita! Espero haber sido de ayuda. ¡Vuelve pronto!"
  },
  "chao": {
    question: "Chao",
    answer: "¡Hasta pronto! Recuerda que estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día!"
  }
};