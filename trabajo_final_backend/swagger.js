const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-commerce - Oversizex',
        description: 'Documentación completa para la API de e-commerce con integración de Mercado Pago para pagos, gestión de productos, usuarios y pedidos.',
        version: '1.0.0',
        contact: {
            name: 'Equipo de Desarrollo',
            email: 'dev@tuempresa.com'
        }
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { name: 'Pagos QR Dinámico', description: 'Endpoints para QR dinámico usando Checkout Preferences de Mercado Pago.' },
        { name: 'Pagos QR Estático', description: 'Endpoints para Puntos de Venta (POS) con QR reutilizable.' },
        { name: 'Pagos Únicos', description: 'Endpoints para generar links de pago simple.' },
        { name: 'Suscripciones', description: 'Endpoints para la gestión de suscripciones recurrentes.' },
        { name: 'Webhooks', description: 'Endpoint para recibir notificaciones de Mercado Pago.' },
        { name: 'Categorías', description: 'Gestión de categorías de productos.' },
        { name: 'Productos', description: 'Gestión de productos del catálogo.' },
        { name: 'Usuarios', description: 'Gestión de usuarios y autenticación.' },
        { name: 'Pedidos', description: 'Gestión de pedidos y órdenes.' },
        { name: 'Direcciones', description: 'Gestión de direcciones de entrega.' },
        { name: 'Cupones', description: 'Gestión de cupones y descuentos.' },
        { name: 'Items Pedido', description: 'Gestión de items dentro de los pedidos.' }
    ],
    definitions: {
        // === MODELOS DE MERCADO PAGO ===
        GenerateQRRequest: {
            type: 'object',
            required: ['amount', 'description'],
            properties: {
                amount: {
                    type: 'number',
                    description: 'Monto del pago en la moneda local',
                    example: 15000
                },
                description: {
                    type: 'string',
                    description: 'Descripción del producto o servicio',
                    example: 'Vasija grande cerámica'
                },
                external_reference: {
                    type: 'string',
                    description: 'Referencia externa para identificar el pago',
                    example: 'VENTA-12345'
                }
            }
        },
        GenerateQRResponse: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true
                },
                data: {
                    type: 'object',
                    properties: {
                        preference_id: {
                            type: 'string',
                            example: '1234567890-abcd-1234-abcd-123456789012'
                        },
                        external_reference: {
                            type: 'string',
                            example: 'VENTA-12345'
                        },
                        init_point: {
                            type: 'string',
                            example: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890-abcd-1234-abcd-123456789012'
                        },
                        sandbox_init_point: {
                            type: 'string',
                            example: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890-abcd-1234-abcd-123456789012'
                        }
                    }
                },
                qr_data: {
                    type: 'string',
                    description: 'URL que se puede convertir en código QR',
                    example: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890-abcd-1234-abcd-123456789012'
                },
                message: {
                    type: 'string',
                    example: 'QR generado exitosamente'
                }
            }
        },
        PaymentStatusResponse: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true
                },
                payment_status: {
                    type: 'string',
                    enum: ['pending', 'approved', 'rejected', 'cancelled'],
                    example: 'approved'
                },
                payment_id: {
                    type: 'string',
                    example: '1234567890'
                },
                amount: {
                    type: 'number',
                    example: 15000
                },
                currency: {
                    type: 'string',
                    example: 'ARS'
                },
                payment_method: {
                    type: 'string',
                    example: 'account_money'
                },
                date_created: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-01-15T10:30:00.000Z'
                },
                external_reference: {
                    type: 'string',
                    example: 'VENTA-12345'
                }
            }
        },
        GenerateStaticQRRequest: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Nombre del punto de venta',
                    example: 'Caja Principal'
                },
                category: {
                    type: 'number',
                    description: 'Categoría del negocio (MCC)',
                    example: 621102
                },
                store_id: {
                    type: 'string',
                    description: 'ID de la tienda',
                    example: 'STORE001'
                }
            }
        },
        GenerateStaticQRResponse: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true
                },
                data: {
                    type: 'object',
                    properties: {
                        pos_id: {
                            type: 'string',
                            example: 'POS123456789'
                        },
                        external_id: {
                            type: 'string',
                            example: 'POS-1642234567890'
                        },
                        name: {
                            type: 'string',
                            example: 'Caja Principal'
                        },
                        qr_code: {
                            type: 'string',
                            description: 'URL de la imagen del código QR',
                            example: 'https://www.mercadopago.com/instore/merchant/qr/1234567890/image'
                        },
                        qr_template: {
                            type: 'string',
                            description: 'Template del código QR',
                            example: 'https://www.mercadopago.com/instore/merchant/qr/1234567890/template'
                        }
                    }
                },
                message: {
                    type: 'string',
                    example: 'QR estático generado exitosamente'
                }
            }
        },
        ListPOSResponse: {
            type: 'object',
            properties: {
                success: {
                    type: 'boolean',
                    example: true
                },
                pos_list: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                example: 'POS123456789'
                            },
                            name: {
                                type: 'string',
                                example: 'Caja Principal'
                            },
                            external_id: {
                                type: 'string',
                                example: 'POS-1642234567890'
                            },
                            category: {
                                type: 'number',
                                example: 621102
                            },
                            external_store_id: {
                                type: 'string',
                                example: 'STORE001'
                            },
                            fixed_amount: {
                                type: 'boolean',
                                example: false
                            },
                            qr: {
                                type: 'object',
                                properties: {
                                    image: {
                                        type: 'string',
                                        example: 'https://www.mercadopago.com/instore/merchant/qr/1234567890/image'
                                    },
                                    template_document: {
                                        type: 'string',
                                        example: 'https://www.mercadopago.com/instore/merchant/qr/1234567890/template'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        PaymentLinkResponse: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: '1234567890-abcd-1234-abcd-123456789012'
                },
                init_point: {
                    type: 'string',
                    example: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890-abcd-1234-abcd-123456789012'
                },
                sandbox_init_point: {
                    type: 'string',
                    example: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890-abcd-1234-abcd-123456789012'
                },
                collector_id: {
                    type: 'number',
                    example: 123456789
                },
                operation_type: {
                    type: 'string',
                    example: 'regular_payment'
                },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                example: 'item-1'
                            },
                            title: {
                                type: 'string',
                                example: 'Vasija grande'
                            },
                            description: {
                                type: 'string',
                                example: 'vasija grande medidas ....'
                            },
                            quantity: {
                                type: 'number',
                                example: 1
                            },
                            unit_price: {
                                type: 'number',
                                example: 15000
                            }
                        }
                    }
                }
            }
        },
        SubscriptionLinkResponse: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'SUB123456789'
                },
                init_point: {
                    type: 'string',
                    example: 'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_id=SUB123456789'
                },
                sandbox_init_point: {
                    type: 'string',
                    example: 'https://sandbox.mercadopago.com.ar/subscriptions/checkout?preapproval_id=SUB123456789'
                },
                reason: {
                    type: 'string',
                    example: 'Suscripción de ejemplo'
                },
                auto_recurring: {
                    type: 'object',
                    properties: {
                        frequency: {
                            type: 'number',
                            example: 1
                        },
                        frequency_type: {
                            type: 'string',
                            example: 'months'
                        },
                        transaction_amount: {
                            type: 'number',
                            example: 10000
                        },
                        currency_id: {
                            type: 'string',
                            example: 'ARS'
                        }
                    }
                }
            }
        },
        WebhookNotification: {
            type: 'object',
            properties: {
                action: {
                    type: 'string',
                    enum: ['payment.created', 'payment.updated', 'merchant_order'],
                    example: 'payment.created'
                },
                api_version: {
                    type: 'string',
                    example: 'v1'
                },
                data: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '1234567890'
                        }
                    }
                },
                date_created: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-01-15T10:30:00.000Z'
                },
                id: {
                    type: 'number',
                    example: 123456789
                },
                live_mode: {
                    type: 'boolean',
                    example: false
                },
                type: {
                    type: 'string',
                    enum: ['payment', 'merchant_order'],
                    example: 'payment'
                },
                user_id: {
                    type: 'string',
                    example: '123456789'
                }
            }
        },
        ErrorResponse: {
            type: 'object',
            properties: {
                error: {
                    type: 'boolean',
                    example: true
                },
                msg: {
                    type: 'string',
                    example: 'Error description'
                },
                details: {
                    type: 'string',
                    description: 'Detalles adicionales del error'
                }
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './routes/mp.route.js',
    './routes/categoria.route.js',
    './routes/producto.route.js',
    './routes/usuario.route.js',
    './routes/pedido.route.js',
    './routes/direccion.route.js',
    './routes/cupon.route.js',
    './routes/itemPedido.route.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`✅ Documentación generada en ${outputFile}`);
    console.log(`📖 Accede a la documentación en: http://localhost:3000/api-docs`);
});