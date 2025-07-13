import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Activity,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';
import signalService from '../services/signalService';

const SignalDashboard = () => {
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [activeSignals, setActiveSignals] = useState([]);
  const [signalHistory, setSignalHistory] = useState([]);
  const [portfolioStatus, setPortfolioStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Verileri yükle
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statusRes, activeRes, historyRes, portfolioRes] = await Promise.all([
        signalService.getAnalysisStatus(),
        signalService.getActiveSignals(),
        signalService.getSignalHistory(20),
        signalService.getPortfolioStatus()
      ]);

      if (statusRes.success) {
        setAnalysisRunning(statusRes.data.analysis_running);
      }

      if (activeRes.success) {
        setActiveSignals(activeRes.data);
      }

      if (historyRes.success) {
        setSignalHistory(historyRes.data);
      }

      if (portfolioRes.success) {
        setPortfolioStatus(portfolioRes.data);
      }

      setLastUpdate(new Date().toLocaleTimeString('tr-TR'));
    } catch (err) {
      setError('Veri yüklenirken hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Analizi başlat/durdur
  const toggleAnalysis = async () => {
    try {
      setLoading(true);
      
      if (analysisRunning) {
        await signalService.stopAnalysis();
        setAnalysisRunning(false);
      } else {
        await signalService.startAnalysis();
        setAnalysisRunning(true);
      }
      
      await loadData();
    } catch (err) {
      setError('Analiz durumu değiştirilemedi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tek seferlik analiz çalıştır
  const runOnceAnalysis = async () => {
    try {
      setLoading(true);
      await signalService.runAnalysisOnce();
      await loadData();
    } catch (err) {
      setError('Analiz çalıştırılamadı: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde verileri getir
  useEffect(() => {
    loadData();
    
    // Her 30 saniyede bir verileri güncelle
    const interval = setInterval(loadData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Sinyal tipine göre renk
  const getSignalColor = (type) => {
    switch (type) {
      case 'BUY': return 'bg-green-500';
      case 'SELL': return 'bg-red-500';
      case 'PROFIT': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Sinyal tipine göre ikon
  const getSignalIcon = (type) => {
    switch (type) {
      case 'BUY': return <TrendingUp className="w-4 h-4" />;
      case 'SELL': return <TrendingDown className="w-4 h-4" />;
      case 'PROFIT': return <DollarSign className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Kontrol Paneli */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Sinyal Analiz Kontrol Paneli
          </CardTitle>
          <CardDescription>
            Kripto sinyal analizini başlatın, durdurun ve durumunu takip edin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              onClick={toggleAnalysis}
              disabled={loading}
              className={analysisRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
            >
              {analysisRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Analizi Durdur
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Analizi Başlat
                </>
              )}
            </Button>

            <Button
              onClick={runOnceAnalysis}
              disabled={loading}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tek Seferlik Analiz
            </Button>

            <Button
              onClick={loadData}
              disabled={loading}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Verileri Yenile
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Son güncelleme: {lastUpdate || 'Henüz güncellenmedi'}
            </div>

            <Badge variant={analysisRunning ? 'default' : 'secondary'}>
              {analysisRunning ? 'Analiz Çalışıyor' : 'Analiz Durdu'}
            </Badge>
          </div>

          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktif Sinyaller</p>
                <p className="text-2xl font-bold">{activeSignals.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portföy Pozisyonları</p>
                <p className="text-2xl font-bold">{portfolioStatus.length}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sinyal</p>
                <p className="text-2xl font-bold">{signalHistory.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sinyal Detayları */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Aktif Sinyaller</TabsTrigger>
          <TabsTrigger value="portfolio">Portföy Durumu</TabsTrigger>
          <TabsTrigger value="history">Sinyal Geçmişi</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktif Sinyaller</CardTitle>
              <CardDescription>
                Şu anda takip edilen alım sinyalleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeSignals.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Henüz aktif sinyal bulunmuyor
                </p>
              ) : (
                <div className="space-y-3">
                  {activeSignals.map((signal, index) => (
                    <div
                      key={signal.id || index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getSignalColor(signal.type)}`}>
                          {getSignalIcon(signal.type)}
                        </div>
                        <div>
                          <p className="font-semibold">{signal.symbol}</p>
                          <p className="text-sm text-gray-600">
                            {signal.date} {signal.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${signal.price?.toFixed(6)}</p>
                        <Badge variant="outline">
                          Güç: {signal.strength?.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portföy Durumu</CardTitle>
              <CardDescription>
                Açık pozisyonların güncel durumu
              </CardDescription>
            </CardHeader>
            <CardContent>
              {portfolioStatus.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Açık pozisyon bulunmuyor
                </p>
              ) : (
                <div className="space-y-3">
                  {portfolioStatus.map((position, index) => (
                    <div
                      key={`${position.symbol}_${index}`}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{position.symbol}</p>
                        <p className="text-sm text-gray-600">
                          Giriş: ${position.entry_price?.toFixed(6)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {position.entry_date} {position.entry_time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${position.current_price?.toFixed(6)}
                        </p>
                        <Badge
                          variant={position.profit_percent >= 0 ? 'default' : 'destructive'}
                        >
                          {position.profit_percent >= 0 ? '+' : ''}
                          {position.profit_percent?.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sinyal Geçmişi</CardTitle>
              <CardDescription>
                Son 20 sinyal kaydı
              </CardDescription>
            </CardHeader>
            <CardContent>
              {signalHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Henüz sinyal geçmişi bulunmuyor
                </p>
              ) : (
                <div className="space-y-3">
                  {signalHistory.map((signal, index) => (
                    <div
                      key={signal.id || index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getSignalColor(signal.type)}`}>
                          {getSignalIcon(signal.type)}
                        </div>
                        <div>
                          <p className="font-semibold">{signal.symbol}</p>
                          <p className="text-sm text-gray-600">
                            {signal.date} {signal.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            {signal.message}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${signal.price?.toFixed(6)}</p>
                        {signal.profit_percent && (
                          <Badge
                            variant={signal.profit_percent >= 0 ? 'default' : 'destructive'}
                          >
                            {signal.profit_percent >= 0 ? '+' : ''}
                            {signal.profit_percent?.toFixed(2)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignalDashboard;

