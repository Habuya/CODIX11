/**
 * QUANTUM CORE V3.0 - MEMORY MODULE
 * IndexedDB Persistence, LocalStorage Backups, Archive System
 */

// --- QUANTUM ARCHIVE (LocalStorage Backups) ---
const QuantumArchive = {
    prefix: 'quantum_backup_',
    maxBackups: 5,

    saveToBackup(content) {
        const key = this.prefix + Date.now();
        localStorage.setItem(key, content);
        this.cleanup();
    },

    cleanup() {
        const keys = Object.keys(localStorage)
            .filter(k => k.startsWith(this.prefix))
            .sort()
            .reverse();

        while (keys.length > this.maxBackups) {
            localStorage.removeItem(keys.pop());
        }
    },

    getBackups() {
        return Object.keys(localStorage)
            .filter(k => k.startsWith(this.prefix))
            .sort()
            .reverse()
            .map(k => ({
                key: k,
                timestamp: parseInt(k.split('_')[2]),
                content: localStorage.getItem(k)
            }));
    },

    restoreBackup(key) {
        const content = localStorage.getItem(key);
        if (content) {
            localStorage.setItem('quantum_chat_v20', content);
            return content;
        }
        return null;
    }
};

// --- QUANTUM MEMORY (IndexedDB Long-term Storage) ---
const QuantumMemory = {
    dbName: 'QuantumCoreMemory',
    dbVersion: 1,
    db: null,

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('memories')) {
                    db.createObjectStore('memories', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('conversations')) {
                    db.createObjectStore('conversations', { keyPath: 'timestamp' });
                }
            };
        });
    },

    async remember(content, tags = []) {
        if (!this.db) await this.init();

        const memory = {
            content,
            tags,
            timestamp: Date.now(),
            relevance: 1.0
        };

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('memories', 'readwrite');
            const store = tx.objectStore('memories');
            const request = store.add(memory);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async recall(query, limit = 5) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('memories', 'readonly');
            const store = tx.objectStore('memories');
            const request = store.getAll();

            request.onsuccess = () => {
                const memories = request.result;
                const queryLower = query.toLowerCase();

                const scored = memories.map(m => ({
                    ...m,
                    score: m.content.toLowerCase().includes(queryLower) ? 2 :
                        m.tags.some(t => queryLower.includes(t)) ? 1.5 :
                            m.relevance
                })).sort((a, b) => b.score - a.score);

                resolve(scored.slice(0, limit));
            };
            request.onerror = () => reject(request.error);
        });
    },

    async saveConversation(messages) {
        if (!this.db) await this.init();

        const conv = {
            timestamp: Date.now(),
            messages,
            summary: messages.slice(-3).map(m => m.substring(0, 100)).join(' | ')
        };

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('conversations', 'readwrite');
            const store = tx.objectStore('conversations');
            store.add(conv);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    },

    async getConversations(limit = 10) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db.transaction('conversations', 'readonly');
            const store = tx.objectStore('conversations');
            const request = store.getAll();

            request.onsuccess = () => {
                const convs = request.result.sort((a, b) => b.timestamp - a.timestamp);
                resolve(convs.slice(0, limit));
            };
            request.onerror = () => reject(request.error);
        });
    }
};

// Initialize memory on load
QuantumMemory.init().catch(console.error);

// Export for global access
window.QuantumArchive = QuantumArchive;
window.QuantumMemory = QuantumMemory;
