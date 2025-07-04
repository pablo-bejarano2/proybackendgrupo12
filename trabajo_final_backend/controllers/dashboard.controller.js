const Usuario = require('../models/usuario.js');
const Pedido = require('../models/pedido.js');
const Cupon = require('../models/cupon.js');
const dashboardCtrl = {};

dashboardCtrl.usuariosPorDia = async (req, res) => {
  try {
    const dias = 7;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const haceNDias = new Date(hoy);
    haceNDias.setDate(hoy.getDate() - (dias - 1));

    const resultados = await Usuario.aggregate([
      {
        $match: {
          createdAt: { $gte: haceNDias, $lte: hoy }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Creamos un array con ceros si hay días sin registros
    const conteoCompleto = [];
    for (let i = 0; i < dias; i++) {
      const fecha = new Date(haceNDias);
      fecha.setDate(haceNDias.getDate() + i);
      const clave = fecha.toISOString().split('T')[0];

      const registro = resultados.find(r => r._id === clave);
      conteoCompleto.push(registro ? registro.total : 0);
    }

    res.json(conteoCompleto);
  } catch (error) {
    console.error("Error en usuariosPorDia:", error);
    res.status(500).json({ message: "Error al obtener usuarios por día" });
  }
};
dashboardCtrl.pedidosPorDia = async (req, res) => {
  try {
    const dias = 7;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const haceNDias = new Date(hoy);
    haceNDias.setDate(hoy.getDate() - (dias - 1));

    const resultados = await Pedido.aggregate([
      {
        $match: {
          createdAt: { $gte: haceNDias, $lte: hoy }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const conteoCompleto = [];
    for (let i = 0; i < dias; i++) {
      const fecha = new Date(haceNDias);
      fecha.setDate(haceNDias.getDate() + i);
      const clave = fecha.toISOString().split('T')[0];

      const registro = resultados.find(r => r._id === clave);
      conteoCompleto.push(registro ? registro.total : 0);
    }

    res.json(conteoCompleto);
  } catch (error) {
    console.error("Error en pedidosPorDia:", error);
    res.status(500).json({ message: "Error al obtener pedidos por día" });
  }
};

dashboardCtrl.dineroPorPedido = async (req, res) => {
  try {
    const pedidos = await Pedido.find({}, { total: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .limit(4);

    const montos = pedidos.map(p => p.total).reverse();
    res.json(montos);
  } catch (error) {
    console.error("Error en dineroPorPedido:", error);
    res.status(500).json({ message: "Error al obtener montos de pedidos" });
  }
};
dashboardCtrl.cuponesUsados = async (req, res) => {
  try {
    const cupones = await Cupon.aggregate([
      {
        $group: {
          _id: "$nombre", 
          totalUsos: {
            $sum: {
              $subtract: ["$usosMaximos", "$usosRestantes"]
            }
          }
        }
      }
    ]);

    const labels = cupones.map(c => c._id);        
    const data = cupones.map(c => c.totalUsos);    // total de usos acumulados

    res.json({ labels, data });
  } catch (error) {
    console.error("Error al obtener cupones usados:", error);
    res.status(500).json({ message: "Error al obtener datos de cupones usados" });
  }
};

module.exports = dashboardCtrl;