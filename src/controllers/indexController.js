const { obtenerJoyas, Hateos, foundJoya, filterJoyas } = require('../function/function')

const controller = {
    joyas: async (req, res) => {
        try {
            const queryString = req.query;
            const joyas = await obtenerJoyas(queryString);
            const HATEOS = await Hateos(joyas)
            res.status(200).json(HATEOS)
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: `server internal error` })
        }
    },

    findJoya: async (req, res) => {

        try {
            const { id } = req.params
            const joya = await foundJoya(id)
            res.status(200).json(joya)

        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: `server internal error` })
        }

    },

    filterJoyas: async (req, res) => {

        try {
            const queryString = req.query
            const filter = await filterJoyas(queryString)
            filter.length === 0 ? res.status(200).send('No hay coincidencias en tu busqueda.') 
            : res.status(200).send(filter)
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: `server internal error` })
        }
    },

    notFound: (req, res) => {
        res.status(404).send('Not found 404')
    }
}

module.exports = controller