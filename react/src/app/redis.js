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

// Batch function to fetch multiple keys in parallel
const getRedisDataBatch = async (keys) => {
    if (!client.isOpen) {
        console.error('Redis client is not connected');
        return [];
    }

    try {
        // Use Promise.all to fetch all keys in parallel
        const results = await Promise.all(
            keys.map(async (key) => {
                try {
                    // Check if key is already processed
                    if (fetchedKeys.has(key)) {
                        console.log(`Key "${key}" already fetched, using cached data.`);
                        return JSON.parse(await client.get(key));
                    }

                    const result = await client.get(key);

                    if (!result) {
                        console.log(`Key "${key}" not found in Redis, fetching from API...`);
                        const apiData = await fetchData(key);
                        if (apiData) {
                            await setRedisData(key, apiData);
                            fetchedKeys.add(key);
                            return apiData;
                        }
                        return null;
                    }

                    console.log(`Data for key "${key}" found in Redis.`);
                    fetchedKeys.add(key);
                    return JSON.parse(result);
                } catch (error) {
                    console.error(`Error processing key "${key}":`, error);
                    return null;
                }
            })
        );

        return results.filter(result => result !== null);
    } catch (error) {
        console.error('Error in batch operation:', error);
        return [];
    }
};

// Original single key function (kept for backward compatibility)
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
            const apiData = await fetchData(key);
            if (apiData) {
                await setRedisData(key, apiData);
                fetchedKeys.add(key);
                return apiData;
            }
            return null;
        }

        console.log(`Data for key "${key}" found in Redis.`);
        fetchedKeys.add(key);
        return JSON.parse(result);
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
        return null;
    }
};

const setRedisData = async (key, data) => {
    try {
        await client.set(key, JSON.stringify(data), { EX: 86400 }); // expires in a day
        console.log(`Data for key "${key}" saved to Redis`);
        return data;
    } catch (error) {
        console.error('Error saving data to Redis:', error);
        return null;
    }
};

// Optimized batch set function for multiple keys
const setRedisDataBatch = async (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return [];
    }

    try {
        const pipeline = client.multi();
        
        dataArray.forEach(({ key, data }) => {
            pipeline.set(key, JSON.stringify(data), { EX: 86400 });
        });

        await pipeline.exec();
        console.log(`Batch saved ${dataArray.length} keys to Redis`);
        return dataArray;
    } catch (error) {
        console.error('Error in batch set operation:', error);
        return [];
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await client.disconnect();
        console.log('Redis client disconnected');
    } catch (error) {
        console.error('Error disconnecting Redis:', error);
    }
    process.exit(0);
});

// Initialize Redis connection
initializeRedis();

export { getRedisData, setRedisData, getRedisDataBatch, setRedisDataBatch };