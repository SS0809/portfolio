'use server';
import { createClient } from 'redis';
import fetchData from './git';

const client = createClient({
    username: 'default',
    password:  process.env.REDIS_PASSWORD,
    socket: {
        // host: '127.0.0.1',
        // port: 6379,
        host:  process.env.REDIS_USERNAME,
        port: 12399,
    },
});
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
    try {
        const result = await client.get(key);
        if (result === null) {
            console.log(`Key "${(key)}" not found in Redis`);
            const data = await fetchData(key);
            const dataa = await setRedisData(key ,data);
            return dataa;
        }
        console.log(`Data for key "${key}":`);
        return JSON.parse(result); 
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
    }
};
const setRedisData = async (repoName , apiData) => {
    try {
        await client.set(repoName, JSON.stringify(apiData));
        console.log(`Data for key "${repoName}" saved to Redis`);
        return apiData;
    } catch (error) {
        console.error('Error saving data to Redis:', error);
    }
};
export { getRedisData, setRedisData };
