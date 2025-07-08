const axios = require("axios");
const mpCtrl = {}
const paymentStatusCache = new Map();

mpCtrl.getPaymentlink = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const body = {
            payer_email: "payer_email@gmail.com",
            items: [
                {
                    title: "Vasija grande",
                    description: "vasija grande medidas ....",
                    picture_url: "http://www.myapp.com/myimage.jpg",
                    category_id: "category123",
                    quantity: 1,
                    unit_price: 15000
                }
            ],
            back_urls: {
                failure: "hppt://localhost:4200/failure",
                pending: "http://localhost:4200/pending",
                success: "http://localhost:4200/success"
            }
        };
        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        return res.status(200).json(payment.data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true, msg: "Failed to create payment"
        });
    }
}

// FUNCIÓN CORREGIDA: Generar QR dinámico
mpCtrl.generateQRCode = async (req, res) => {
    try {
        const { amount, description, external_reference } = req.body;
        console.log('Datos recibidos:', { amount, description, external_reference });

        // Validar datos requeridos
        if (!amount || !description) {
            return res.status(400).json({
                error: true,
                msg: "Monto y descripción son requeridos"
            });
        }

        // Crear Checkout Preference (método recomendado para QR)
        const checkoutUrl = "https://api.mercadopago.com/checkout/preferences";
        const checkoutBody = {
            items: [
                {
                    id: external_reference || `item-${Date.now()}`, // ID único del item
                    title: description,
                    description: description,
                    quantity: 1,
                    unit_price: parseFloat(amount),
                    currency_id: "ARS"
                }
            ],
            external_reference: external_reference || `QR-${Date.now()}`,
            notification_url: `${process.env.WEBHOOK_BASE_URL}/api/mp/webhook`,
            back_urls: {
                success: `${process.env.WEBHOOK_BASE_URL}/success`,
                failure: `${process.env.WEBHOOK_BASE_URL}/failure`,
                pending: `${process.env.WEBHOOK_BASE_URL}/pending`
            },
            auto_return: "approved",
            // Configuraciones adicionales para QR
            payment_methods: {
                excluded_payment_types: [],
                excluded_payment_methods: [],
                installments: 1
            },
            payer: {
                email: "test@test.com"
            }
        };

        console.log('🔄 Creando Checkout Preference...');
        console.log('Body:', JSON.stringify(checkoutBody, null, 2));

        const checkoutResponse = await axios.post(checkoutUrl, checkoutBody, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        console.log('✅ Checkout Preference creada:', checkoutResponse.data.id);

        // Generar datos para QR
        const qrData = checkoutResponse.data.init_point;
        const sandboxLink = checkoutResponse.data.sandbox_init_point;

        return res.status(200).json({
            success: true,
            data: {
                preference_id: checkoutResponse.data.id,
                external_reference: external_reference || `QR-${Date.now()}`,
                init_point: qrData,
                sandbox_init_point: sandboxLink
            },
            qr_data: qrData, // URL que se puede convertir en QR
            message: "QR generado exitosamente"
        });

    } catch (error) {
        console.log('❌ Error generando QR:', error.response?.data || error.message);
        return res.status(500).json({
            error: true,
            msg: "Error al generar código QR",
            details: error.response?.data || error.message
        });
    }
}

// FUNCIÓN MEJORADA: Generar QR estático con POS
mpCtrl.generateStaticQR = async (req, res) => {
    try {
        const { name, category, store_id } = req.body;

        const url = "https://api.mercadopago.com/pos";
        const body = {
            name: name || "Punto de Venta Principal",
            fixed_amount: false, // Permite montos variables
            category: category || 621102, // Categoría por defecto
            external_store_id: store_id || "STORE001",
            external_id: `POS${Date.now()}`
        };

        console.log('🔄 Creando POS para QR estático...');
        console.log('Body:', JSON.stringify(body, null, 2));

        const posResponse = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        console.log('✅ POS creado exitosamente:', posResponse.data.id);

        return res.status(200).json({
            success: true,
            data: {
                pos_id: posResponse.data.id,
                external_id: posResponse.data.external_id,
                name: posResponse.data.name,
                qr_code: posResponse.data.qr.image, // URL de la imagen QR
                qr_template: posResponse.data.qr.template_document // Template del QR
            },
            message: "QR estático generado exitosamente"
        });

    } catch (error) {
        console.log('❌ Error generando QR estático:', error.response?.data || error.message);
        return res.status(500).json({
            error: true,
            msg: "Error al generar QR estático",
            details: error.response?.data || error.message
        });
    }
}

mpCtrl.listPOS = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/pos";

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return res.status(200).json({
            success: true,
            pos_list: response.data.results || response.data
        });

    } catch (error) {
        console.log('Error listando POS:', error.response?.data || error.message);
        return res.status(500).json({
            error: true,
            msg: "Error al obtener lista de POS",
            details: error.response?.data || error.message
        });
    }
}

// FUNCIÓN MEJORADA: Verificar estado de pago QR
mpCtrl.checkQRPaymentStatus = async (req, res) => {
    try {
        const { external_reference } = req.params;
        console.log('🔍 Verificando estado de pago para:', external_reference);

        // Buscar por external_reference en payments
        const paymentsUrl = `https://api.mercadopago.com/v1/payments/search?external_reference=${external_reference}`;

        const paymentsResponse = await axios.get(paymentsUrl, {
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        if (paymentStatusCache.has(external_reference)) {
            const cachedPayment = paymentStatusCache.get(external_reference);
            console.log('✅ Estado encontrado en caché:', cachedPayment.status);

            // Si ya está aprobado, lo borramos del caché para no acumular memoria
            if (cachedPayment.status === 'approved') {
                paymentStatusCache.delete(external_reference);
            }

            return res.status(200).json({
                success: true,
                payment_status: cachedPayment.status,
                ...cachedPayment.data // Devolvemos toda la data del pago
            });
        }

        console.log('📊 Respuesta de payments:', paymentsResponse.data);

        if (paymentsResponse.data.results && paymentsResponse.data.results.length > 0) {
            const payment = paymentsResponse.data.results[0];
            console.log('✅ Pago encontrado:', payment.status);

            return res.status(200).json({
                success: true,
                payment_status: payment.status,
                payment_id: payment.id,
                amount: payment.transaction_amount,
                currency: payment.currency_id,
                payment_method: payment.payment_method_id,
                date_created: payment.date_created,
                external_reference: payment.external_reference
            });
        }

        // Si no se encuentra en payments, buscar en merchant_orders
        const merchantOrderUrl = `https://api.mercadopago.com/merchant_orders/search?external_reference=${external_reference}`;

        const merchantResponse = await axios.get(merchantOrderUrl, {
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        if (merchantResponse.data.elements && merchantResponse.data.elements.length > 0) {
            const order = merchantResponse.data.elements[0];
            const payments = order.payments;

            if (payments && payments.length > 0) {
                const payment = payments[0];
                return res.status(200).json({
                    success: true,
                    payment_status: payment.status,
                    payment_id: payment.id,
                    amount: payment.transaction_amount,
                    order_id: order.id,
                    external_reference: order.external_reference
                });
            }
        }

        console.log('⏳ Pago aún pendiente');
        return res.status(200).json({
            success: true,
            payment_status: "pending",
            message: "Pago aún no procesado"
        });

    } catch (error) {
        console.log('❌ Error verificando estado:', error.response?.data || error.message);
        return res.status(500).json({
            error: true,
            msg: "Error al verificar estado del pago",
            details: error.response?.data || error.message
        });
    }
}

mpCtrl.webhook = async (req, res) => {
    try {
        console.log('🔔 Webhook recibido:', JSON.stringify(req.body, null, 2));
        console.log('🔔 Headers:', JSON.stringify(req.headers, null, 2));

        const { action, data, type } = req.body;

        // Manejar diferentes tipos de notificaciones
        if (action === 'payment.created' || action === 'payment.updated' || type === 'payment') {
            const paymentId = data.id || data;

            console.log('💳 Payment ID recibido:', paymentId);

            // Consultar detalles del pago
            const paymentUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;

            console.log('🔍 Consultando payment en:', paymentUrl);

            const paymentResponse = await axios.get(paymentUrl, {
                headers: {
                    "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });


            const payment = paymentResponse.data;
            if (payment.external_reference && payment.status) {
                console.log(`💾 Guardando en caché: ${payment.external_reference} -> ${payment.status}`);
                // Guardamos el estado del pago asociado a nuestra referencia externa.
                paymentStatusCache.set(payment.external_reference, {
                    status: payment.status,
                    data: payment // Guardamos todo el objeto por si lo necesitamos
                });
            }
            console.log('📊 Payment status:', payment.status);
            console.log('🔗 External reference:', payment.external_reference);
            console.log('💰 Amount:', payment.transaction_amount);

            // Procesar notificación según el estado
            if (payment.status === 'approved') {
                console.log('✅ Pago aprobado:', payment.external_reference);
                // Aquí puedes actualizar tu base de datos, enviar emails, etc.
            } else if (payment.status === 'rejected') {
                console.log('❌ Pago rechazado:', payment.external_reference);
            } else if (payment.status === 'pending') {
                console.log('⏳ Pago pendiente:', payment.external_reference);
            }
        }

        // Manejar notificaciones de merchant_order
        if (action === 'merchant_order' || type === 'merchant_order') {
            const orderId = data.id || data;
            console.log('📦 Merchant Order ID recibido:', orderId);

            const orderUrl = `https://api.mercadopago.com/merchant_orders/${orderId}`;
            const orderResponse = await axios.get(orderUrl, {
                headers: {
                    "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });

            const order = orderResponse.data;
            console.log('📊 Order status:', order.status);
            console.log('🔗 External reference:', order.external_reference);
        }

        // IMPORTANTE: Siempre responder 200 OK
        res.status(200).send('OK');

    } catch (error) {
        console.error('❌ Error procesando webhook:', error.response?.data || error.message);
        // Aún así, responder 200 para que MP no siga reenviando
        res.status(200).send('OK');
    }
}

mpCtrl.getSubscriptionLink = async (req, res) => {
    try {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason: "Suscripción de ejemplo",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10000,
                currency_id: "ARS"
            },
            back_url: "http://localhost:4200/returnpath",
            payer_email: "payer_email@gmail.com@google.com"
        };
        const subscription = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        return res.status(200).json(subscription.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true, msg: "Failed to create subscription"
        });
    }
}

module.exports = mpCtrl;