// Script para verificar token y permisos
const axios = require('axios');
require('dotenv').config();

async function verifyToken() {
    try {
        console.log('🔍 Verificando token...');

        // Verificar información del usuario
        const userUrl = "https://api.mercadopago.com/users/me";
        const userResponse = await axios.get(userUrl, {
            headers: {
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        console.log('✅ Usuario verificado:');
        console.log('ID:', userResponse.data.id);
        console.log('Email:', userResponse.data.email);
        console.log('Nombre:', userResponse.data.first_name, userResponse.data.last_name);
        console.log('País:', userResponse.data.country_id);

        // Verificar permisos del token
        const tokenUrl = "https://api.mercadopago.com/oauth/token";
        // Esta llamada no es necesaria, pero puedes verificar creando una preference simple

        const testUrl = "https://api.mercadopago.com/checkout/preferences";
        const testBody = {
            items: [
                {
                    id: "test",
                    title: "Test Item",
                    quantity: 1,
                    unit_price: 100,
                    currency_id: "ARS"
                }
            ]
        };

        const testResponse = await axios.post(testUrl, testBody, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        console.log('✅ Token tiene permisos correctos');
        console.log('Preference ID de prueba:', testResponse.data.id);

        return true;

    } catch (error) {
        console.error('❌ Error verificando token:', error.response?.data || error.message);
        return false;
    }
}

// Ejecutar verificación
if (require.main === module) {
    verifyToken()
        .then(success => {
            if (success) {
                console.log('🎉 Token verificado exitosamente!');
            } else {
                console.log('💥 Problema con el token');
            }
            process.exit(0);
        })
        .catch(error => {
            console.error('💥 Error:', error.message);
            process.exit(1);
        });
}

module.exports = { verifyToken };