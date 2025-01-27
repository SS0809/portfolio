'use server';
import { createClient } from 'redis';
import fetchData from './git';

const client = createClient({
    username: 'default',
    password: 'SO9yfZPB91d1sNdOdiCpjTeD46cBcuew',
    socket: {
        host: 'redis-12399.c11.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 12399,
    },
});

// Initialize Redis client
const initializeRedis = async () => {
    try {
        client.on('error', (err) => console.error('Redis Client Error:', err));
        await client.connect();
        console.log('Redis client connected successfully');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
};

// Get data from Redis
const getRedisData = async (key) => {
    try {
        const result = await client.get(key);
        if (result === null) {
            console.log(`Key "${key}" not found in Redis`);
            // await setRedisData(fetchData(key));
            return null;
        }
        console.log(`Data for key "${key}":`, result);
        return JSON.parse(result); // Assuming JSON data
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
    }
};

// Set data in Redis
const setRedisData = async (repoName , apiData) => {
    try {
        await client.set(repoName, JSON.stringify(apiData));
        console.log(`Data for key "${key}" saved to Redis`);
        return apiData;
    } catch (error) {
        console.error('Error saving data to Redis:', error);
    }
};

// Main function
const main = async () => {
    await initializeRedis();

    // Example usage
    // const key = 'proximity';
    // let data = await getRedisData(key);
    // if (!data) {
    //     console.log('Key not found, fetching and storing data...');
    //     data = await fetchData(key);
    // }
    // console.log('Final data:', data);
};

// Run main function
main().catch((err) => console.error('Error in main:', err));

// Export functions
export { getRedisData, setRedisData };
