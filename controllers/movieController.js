const fs = require('fs');
const path = require('path');

const moviesmodel = require('../models/movieModel');

const addpage = (req, res) => {
    return res.render('add');
}

// ========== view Data ==========
const viewpage = async (req, res) => {
    try {
        const movies = await moviesmodel.find({})
        return res.render('view', { movies })
    } catch (error) {
        console.log(error);
        return false
    }
}

// ========== Add Data ==========

const adddata = async (req, res) => {
    try {
        const { name, desc, price } = req.body;
        await moviesmodel.create({
            name: name,
            desc: desc,
            price: price,
            image: req.file.path
        })
        console.log(`movie add`);
        return res.redirect('/views');
    } catch (err) {
        console.log(err);
        return false;
    }
}

// ========== Delete Data ==========

const deletedata = async (req, res) => {
    try {
        const id = req.query.id

        let singal = await moviesmodel.findById(id)
        fs.unlinkSync(singal.image)

        await moviesmodel.findByIdAndDelete(id)

        return res.redirect('/views')

    } catch (error) {
        console.log(error);
        return false
    }
}

// ========== Edit Data ==========

const edit = async (req, res) => {
    try {
        const id = req.query.id
        const singal = await moviesmodel.findById(id)

        return res.render('edit', {
            singal
        })
    } catch (error) {
        console.log(error);
        return false
    }
}

// ========== update Data ==========

const update = async (req, res) => {
    try {
        const { editid, name, desc, price } = req.body;
        if (req.file) {
            let singal = await moviesmodel.findById(editid)
            fs.unlinkSync(singal.image)
            await moviesmodel.findByIdAndUpdate(editid, {
                name: name,
                desc: desc,
                price: price,
                image: req.file.path
            })

            return res.redirect('/views')
        } else {
            const single = await moviesmodel.findById(editid);

            await moviesmodel.findByIdAndUpdate(editid, {
                name: name,
                desc: desc,
                price: price,
                image: single.image
            })
            return res.redirect('/views');
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    addpage,
    viewpage,
    adddata,
    deletedata,
    edit,
    update
}