const pool = require('../credentials/config');
const format = require('pg-format');

const obtenerJoyas = async ({ limits = 2, page = 1, order_by = "id_ASC" }) => {
    if (limits <= 0 || isNaN(limits)) {
        throw new Error("El numero de pagina no puede ser menor o igual a 0.");
    }
    const offset = (page - 1) * limits;
    const [campo, direccion] = order_by.split("_");

    const consulta = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, offset)
    const { rows: joyas } = await pool.query(consulta);
    return joyas;

}

const Hateos = parameter => {
    const results = parameter.map(params => (
        {
            href: `http://localhost:3000/joya/${params.id}`,
            name: params.nombre,
            category: params.categoria,
            metal: params.metal,
            price: params.precio,
            stock: params.stock
        }
    ))

    let count = 0
    results.map(cantidad => count += cantidad.stock)

    const totalJoyas = results.length;
    const stockTotal = count;
    const HATEOS = {
        totalJoyas,
        stockTotal,
        results
    }
    return HATEOS;
}

const foundJoya = async (id) => {
    const command = 'SELECT * FROM inventario WHERE id = $1;'
    const value = [id];
    const { rows: joya } = await pool.query(command, value);
    return joya;
}

const filterJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
    if (precio_min && isNaN(precio_min) || precio_max && isNaN(precio_max))
        throw new Error('Por favor, introduzca un valor numerico.')

    const tipos = ['collar', 'aros', 'anillo']
    const metalTipo = ['oro', 'plata']

    if (categoria && !tipos.includes(categoria) || metal && !metalTipo.includes(metal))
        throw new Error('No trabajamos con este tipo de joyas, por favor, revisa nuestro listado e ingresa un producto nuevamente')

    let fullCommand = []
    let values = []
    let mainCommand = 'SELECT * FROM inventario'

    const addFilter = (column, comparisson, value) => {
        values.push(value)
        const { length } = fullCommand
        fullCommand.push(`${column} ${comparisson} $${length + 1}`)
    }

    if (precio_min) addFilter('precio', '>=', precio_min)
    if (precio_max) addFilter('precio', '<=', precio_max)
    if (categoria) addFilter('categoria', '=', categoria)
    if (metal) addFilter('metal', '=', metal)

    if (fullCommand.length > 0) {
        fullCommand = fullCommand.join(' AND ')
        mainCommand += ` WHERE ${fullCommand}`
    }

    const { rows: joyas } = await pool.query(mainCommand, values)
    return joyas
}

module.exports = { obtenerJoyas, Hateos, foundJoya, filterJoyas }