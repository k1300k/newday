import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL, listAll } from 'firebase/storage';
import firebaseConfig from '../config/firebase';

// Initialize Firebase
let app;
let storage;

try {
    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
} catch (error) {
    console.warn('Firebase not configured. Cloud sync features will be disabled.');
}

/**
 * Generate a unique project ID
 */
export const generateProjectId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `project-${timestamp}-${randomStr}`;
};

/**
 * Save project data to Firebase Storage
 * @param {string} projectId - Unique project identifier
 * @param {object} data - Project data to save
 * @returns {Promise<string>} - Download URL
 */
export const saveToCloud = async (projectId, data) => {
    if (!storage) {
        throw new Error('Firebase not configured');
    }

    try {
        const jsonString = JSON.stringify(data, null, 2);
        const storageRef = ref(storage, `projects/${projectId}.json`);

        await uploadString(storageRef, jsonString, 'raw', {
            contentType: 'application/json'
        });

        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Cloud save error:', error);
        throw error;
    }
};

/**
 * Load project data from Firebase Storage
 * @param {string} projectId - Unique project identifier
 * @returns {Promise<object>} - Project data
 */
export const loadFromCloud = async (projectId) => {
    if (!storage) {
        throw new Error('Firebase not configured');
    }

    try {
        const storageRef = ref(storage, `projects/${projectId}.json`);
        const url = await getDownloadURL(storageRef);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Cloud load error:', error);
        throw error;
    }
};

/**
 * Check if Firebase is configured
 */
export const isFirebaseConfigured = () => {
    return storage !== undefined && firebaseConfig.apiKey !== 'YOUR_API_KEY';
};
