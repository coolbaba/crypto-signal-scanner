// API base URL
const API_BASE_URL = 'https://p9hwiqcl5lzj.manus.space';

class SignalService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // API çağrısı için yardımcı fonksiyon
  async apiCall(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  // Sinyal analizini başlat
  async startAnalysis() {
    return this.apiCall("/api/signals/start", {
      method: "POST",
    });
  }

  // Sinyal analizini durdur
  async stopAnalysis() {
    return this.apiCall("/api/signals/stop", {
      method: "POST",
    });
  }

  // Aktif sinyalleri getir
  async getActiveSignals() {
    return this.apiCall('/api/signals/active');
  }

  // Sinyal geçmişini getir
  async getSignalHistory(limit = 50, type = 'all') {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (type !== 'all') params.append('type', type);
    
    return this.apiCall(`/api/signals/history?${params.toString()}`);
  }

  // Portföy durumunu getir
  async getPortfolioStatus() {
    return this.apiCall('/api/signals/portfolio');
  }

  // Tek seferlik analiz çalıştır
  async runAnalysisOnce() {
    return this.apiCall('/api/signals/run-once', {
      method: 'POST',
    });
  }

  // Analiz durumunu getir
  async getAnalysisStatus() {
    return this.apiCall('/api/signals/status');
  }

  // Takip edilen sembolleri getir
  async getTrackedSymbols() {
    return this.apiCall('/api/signals/symbols');
  }

  // Takip edilen sembolleri güncelle
  async updateTrackedSymbols(symbols) {
    return this.apiCall('/api/signals/symbols', {
      method: 'POST',
      body: JSON.stringify({ symbols }),
    });
  }

  // Sinyal geçmişini temizle
  async clearSignalHistory() {
    return this.apiCall('/api/signals/clear-history', {
      method: 'POST',
    });
  }

  // Gerçek zamanlı veri için WebSocket bağlantısı (gelecekte eklenebilir)
  connectWebSocket(onMessage) {
    // WebSocket implementasyonu buraya eklenebilir
    console.log('WebSocket connection will be implemented here');
  }
}

// Singleton instance
const signalService = new SignalService();

export default signalService;

