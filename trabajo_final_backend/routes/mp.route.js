const express = require('express');
const router = express.Router();
const mpCtrl = require('../controllers/mp.controller');

/*
    #swagger.path = '/api/usuarios/{id}'
    #swagger.tags = ['Pagos Únicos']
    #swagger.summary = 'Crear un link de pago único'
    #swagger.description = 'Genera una preferencia de pago simple para un producto específico y devuelve el link de checkout de Mercado Pago. Ideal para pagos de un solo producto.'
    #swagger.parameters['amount'] = {
        in: 'query',
        description: 'Monto del pago (opcional, usa valor por defecto si no se especifica)',
        required: false,
        type: 'number',
        example: 15000
    }
    #swagger.parameters['title'] = {
        in: 'query',
        description: 'Título del producto (opcional)',
        required: false,
        type: 'string',
        example: 'Vasija grande'
    }
    #swagger.responses[200] = {
        description: 'Link de pago generado exitosamente',
        schema: { $ref: '#/definitions/PaymentLinkResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error al crear el link de pago',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.get('/payment-link', mpCtrl.getPaymentlink);

/*  #swagger.tags = ['Pagos QR Dinámico']
    #swagger.summary = 'Generar un código QR dinámico'
    #swagger.description = 'Crea una preferencia de pago en Mercado Pago y devuelve la URL que puede ser convertida en código QR. Este QR es específico para un monto y descripción determinados. Una vez pagado, el QR no puede ser reutilizado.'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Datos necesarios para generar el QR dinámico',
        required: true,
        schema: { $ref: '#/definitions/GenerateQRRequest' }
    }
    #swagger.responses[200] = {
        description: 'QR dinámico generado exitosamente',
        schema: { $ref: '#/definitions/GenerateQRResponse' }
    }
    #swagger.responses[400] = {
        description: 'Datos inválidos - monto y descripción son requeridos',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error interno al generar el QR',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.post('/generate-qr', mpCtrl.generateQRCode);

/*  #swagger.tags = ['Pagos QR Dinámico']
    #swagger.summary = 'Verificar el estado de un pago QR'
    #swagger.description = 'Consulta el estado actual de un pago utilizando la referencia externa proporcionada al generar el QR. Este endpoint puede ser utilizado para hacer polling (consultas periódicas) desde el frontend para verificar si un pago fue completado.'
    #swagger.parameters['external_reference'] = {
        in: 'path',
        description: 'Referencia externa única del pago generada al crear el QR',
        required: true,
        type: 'string',
        example: 'VENTA-12345'
    }
    #swagger.responses[200] = {
        description: 'Estado del pago consultado exitosamente',
        schema: { $ref: '#/definitions/PaymentStatusResponse' }
    }
    #swagger.responses[404] = {
        description: 'Pago no encontrado con la referencia externa proporcionada',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error al consultar el estado del pago',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.get('/check-status/:external_reference', mpCtrl.checkQRPaymentStatus);

/*  #swagger.tags = ['Pagos QR Estático']
    #swagger.summary = 'Generar un QR estático (Punto de Venta)'
    #swagger.description = 'Crea un Punto de Venta (POS) en Mercado Pago que genera un código QR reutilizable. A diferencia del QR dinámico, este QR puede ser usado múltiples veces para diferentes montos. El cliente escanea el QR e ingresa el monto a pagar.'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Configuración del Punto de Venta',
        required: false,
        schema: { $ref: '#/definitions/GenerateStaticQRRequest' }
    }
    #swagger.responses[200] = {
        description: 'QR estático generado exitosamente',
        schema: { $ref: '#/definitions/GenerateStaticQRResponse' }
    }
    #swagger.responses[400] = {
        description: 'Error en los datos proporcionados',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error al crear el Punto de Venta',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.post('/generate-static-qr', mpCtrl.generateStaticQR);
/*  #swagger.tags = ['Pagos QR Estático']
    #swagger.summary = 'Listar todos los Puntos de Venta (POS)'
    #swagger.description = 'Obtiene una lista completa de todos los Puntos de Venta (POS) creados en la cuenta de Mercado Pago. Incluye información sobre los códigos QR estáticos disponibles.'
    #swagger.responses[200] = {
        description: 'Lista de POS obtenida exitosamente',
        schema: { $ref: '#/definitions/ListPOSResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener la lista de POS',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.get('/list-pos', mpCtrl.listPOS);

/*  #swagger.tags = ['Suscripciones']
    #swagger.summary = 'Crear un link de suscripción recurrente'
    #swagger.description = 'Genera un plan de suscripción recurrente en Mercado Pago y devuelve el link de checkout. Permite cobrar automáticamente de forma periódica (mensual, semanal, etc.).'
    #swagger.parameters['amount'] = {
        in: 'query',
        description: 'Monto de la suscripción (opcional, usa valor por defecto)',
        required: false,
        type: 'number',
        example: 10000
    }
    #swagger.parameters['frequency'] = {
        in: 'query',
        description: 'Frecuencia de cobro (opcional)',
        required: false,
        type: 'integer',
        example: 1
    }
    #swagger.parameters['frequency_type'] = {
        in: 'query',
        description: 'Tipo de frecuencia (opcional)',
        required: false,
        type: 'string',
        enum: ['days', 'weeks', 'months'],
        example: 'months'
    }
    #swagger.responses[200] = {
        description: 'Link de suscripción generado exitosamente',
        schema: { $ref: '#/definitions/SubscriptionLinkResponse' }
    }
    #swagger.responses[400] = {
        description: 'Parámetros de suscripción inválidos',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Error al crear la suscripción',
        schema: { $ref: '#/definitions/ErrorResponse' }
    }
*/
router.get('/subscription-link', mpCtrl.getSubscriptionLink);

/*  #swagger.tags = ['Webhooks']
    #swagger.summary = 'Recibir notificaciones de Mercado Pago'
    #swagger.description = 'Endpoint que recibe notificaciones automáticas de Mercado Pago sobre cambios en el estado de pagos, órdenes y suscripciones. Este endpoint SIEMPRE debe responder con status 200 OK para confirmar la recepción de la notificación, independientemente del procesamiento interno.'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Notificación enviada automáticamente por Mercado Pago',
        required: true,
        schema: { $ref: '#/definitions/WebhookNotification' }
    }
    #swagger.responses[200] = {
        description: 'Notificación recibida y procesada correctamente',
        schema: {
            type: 'string',
            example: 'OK'
        }
    }
*/
router.post('/webhook', mpCtrl.webhook);

module.exports = router;