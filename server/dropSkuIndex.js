// Drop old SKU index script
// Run this file with: node dropSkuIndex.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dropSkuIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('products');

        // Drop the sku_1 index
        try {
            await collection.dropIndex('sku_1');
            console.log('✓ Successfully dropped sku_1 index');
        } catch (err) {
            if (err.code === 27) {
                console.log('sku_1 index does not exist (already dropped)');
            } else {
                throw err;
            }
        }

        // List all indexes to verify
        const indexes = await collection.indexes();
        console.log('\nCurrent indexes:');
        indexes.forEach(index => {
            console.log(`  - ${index.name}`);
        });

        await mongoose.connection.close();
        console.log('\n✓ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

dropSkuIndex();
