'use server';
import { createClient } from 'redis';
import fetchData from './git';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
});

const fetchedKeys = new Set(); // Track keys to avoid redundant API calls

const initializeRedis = async () => {
    try {
        client.on('error', (err) => console.error('Redis Client Error:', err));
        await client.connect();
        console.log('Redis client connected successfully');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
};

const getRedisData = async (key) => {
    if (!client.isOpen) {
        console.error('Redis client is not connected');
        return null;
    }

    try {
        // Check if key is already processed
        if (fetchedKeys.has(key)) {
            console.log(`Key "${key}" already fetched, skipping API call.`);
            return JSON.parse(await client.get(key));
        }

        const result = await client.get(key);

        if (!result) {
            console.log(`Key "${key}" not found in Redis, fetching from API...`);
            const apiData = await fetchData(key); // Fetch data if not in cache
            await setRedisData(key, apiData);
            fetchedKeys.add(key); // Mark key as fetched
            return apiData;
        }

        console.log(`Data for key "${key}" found in Redis.`);
        fetchedKeys.add(key); // Mark key as fetched
        return JSON.parse(result);
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
    }
};

const setRedisData = async (key, data) => {
    try {
        await client.set(key, JSON.stringify(data), { EX: 86400 }); //deletes in a day
        console.log(`Data for key "${key}" saved to Redis`);
        return data;
    } catch (error) {
        console.error('Error saving data to Redis:', error);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    await client.disconnect();
    console.log('Redis client disconnected');
    process.exit(0);
});

// Initialize Redis connection
initializeRedis();

export { getRedisData, setRedisData };
