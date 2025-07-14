const express = require('express');
const cors = require('cors'); // ✅ Riktig import
const { PrismaClient } = require('@prisma/client'); // ✅ Riktig import

const app = express();
const prisma = new PrismaClient(); // ✅ Merk stor P

const port = 4002;

app.use(express.json());
app.use(cors()); // ✅ Legg til CORS middleware

app.get('/countries', async (req, res) => {
    try {
        const countries = await prisma.country.findMany();
        if (!countries || countries.length === 0) {
            return res.status(404).json({ error: 'No countries found' });
        }
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/get-country/:countryID', (req, res) => {

    const countryID = parseInt(req.params.countryID);

    const country = prisma.country.findUnique({
        where: { id: countryID }
    });
    if (!country) {
        return res.status(404).json({ error: 'Country not found' });
    }
    res.json(country);
});


app.get('/country/:id', async (req, res) => {
    try {
        const country = await prisma.country.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/add-country', async (req, res) => {
   
    const countryData = req.body;

    if (!countryData.name || !countryData.description || !countryData.image) {
        return res.status(400).json({ error: 'All fields are required: name, description, and image' });
    }

    const country = await prisma.country.create({
        data: {
            name: countryData.name,
            description: countryData.description,
            image: countryData.image
        }
    });

    res.status(201).json({
        success: `Added ${country.name} successfully!`,
        data: country
    });

})

app.patch('/update-country/:countryId', async (req, res) => {

    const countryId = parseInt(req.params.countryId);
    const countryData = req.body;

    if (!countryData.name || !countryData.description || !countryData.image) {
        return res.status(400).json({ error: 'All fields are required: name, description, and image' });
    }

    const country = await prisma.country.update({
        where: { id: countryId },
        data: {
            name: countryData.name || undefined,
            description: countryData.description || undefined,
            image: countryData.image || undefined 
        }
    });

    if (!country) {
        return res.status(404).json({ error: 'Country not found' });
    }

    res.json({
        success: `Updated ${country.name} successfully!`,
        data: country
    });
}
);

app.delete('/delete-country/:countryId', async (req, res) => {

    const countryId = parseInt(req.params.countryId);
    const country = await prisma.country.delete({
        where: { id: countryId }
    });
    if (!country) {
        return res.status(404).json({ error: 'Country not found' });
    }
    res.json({
        success: `Deleted ${country.name} successfully!`,
        data: country
    });
}
);

app.listen(port, () => {
  console.log('Server is running on port', port);
});