import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Volume2, Target, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const MarketAnalysis = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('1d');
  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [technicalIndicators, setTechnicalIndicators] = useState({});
  const [marketSentiment, setMarketSentiment] = useState({});

  useEffect(() => {
    // Mock fiyat verileri
    const generatePriceData = () => {
      const data = [];
      let basePrice = 43000;
      
      for (let i = 0; i < 24; i++) {
        const change = (Math.random() - 0.5) * 1000;
        basePrice += change;
        data.push({
          time: `${i}:00`,
          price: basePrice,
          volume: Math.random() * 1000000 + 500000
        });
      }
      return data;
    };

    const mockPriceData = generatePriceData();
    setPriceData(mockPriceData);
    setVolumeData(mockPriceData);

    // Mock teknik indikatörler
    setTechnicalIndicators({
      rsi: 65.4,
      macd: 'Bullish',
      ema20: 42800,
      ema50: 41500,
      support: 41000,
      resistance: 45000,
      bollingerUpper: 44500,
      bollingerLower: 41500
    });

    // Mock piyasa duyarlılığı
    setMarketSentiment({
      fearGreedIndex: 72,
      sentiment: 'Greedy',
      socialVolume: 8500,
      newsScore: 0.65,
      whaleActivity: 'High'
    });
  }, [selectedCoin, timeframe]);

  const coins = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'extreme fear':
        return 'text-red-500';
      case 'fear':
        return 'text-red-400';
      case 'neutral':
        return 'text-yellow-400';
      case 'greedy':
        return 'text-green-400';
      case 'extreme greed':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getRSIColor = (rsi) => {
    if (rsi > 70) return 'text-red-400';
    if (rsi < 30) return 'text-green-400';
    return 'text-yellow-400';
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Piyasa Analizi</h1>
        <div className="flex space-x-2">
          <Select value={selectedCoin} onValueChange={setSelectedCoin}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {coins.map((coin) => (
                <SelectItem key={coin.symbol} value={coin.symbol}>
                  {coin.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1S</SelectItem>
              <SelectItem value="4h">4S</SelectItem>
              <SelectItem value="1d">1G</SelectItem>
              <SelectItem value="1w">1H</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            {selectedCoin}/USDT Fiyat Grafiği
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3f4f" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#8892b0' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#8892b0' }}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Fiyat']}
                labelStyle={{ color: '#8892b0' }}
                contentStyle={{ 
                  backgroundColor: '#242938', 
                  border: '1px solid #3a3f4f',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#00d4ff" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: '#00d4ff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Volume Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Volume2 className="w-5 h-5 mr-2" />
            İşlem Hacmi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3f4f" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#8892b0' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#8892b0' }}
              />
              <Tooltip 
                formatter={(value) => [value.toLocaleString(), 'Hacim']}
                contentStyle={{ 
                  backgroundColor: '#242938', 
                  border: '1px solid #3a3f4f',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="volume" fill="#00d4ff" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Technical Indicators */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Teknik İndikatörler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">RSI (14)</span>
                <span className={`text-sm font-medium ${getRSIColor(technicalIndicators.rsi)}`}>
                  {technicalIndicators.rsi}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    technicalIndicators.rsi > 70 ? 'bg-red-400' :
                    technicalIndicators.rsi < 30 ? 'bg-green-400' : 'bg-yellow-400'
                  }`}
                  style={{ width: `${technicalIndicators.rsi}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">MACD</span>
                <Badge className={
                  technicalIndicators.macd === 'Bullish' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }>
                  {technicalIndicators.macd}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">EMA 20</p>
              <p className="font-medium">${technicalIndicators.ema20?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">EMA 50</p>
              <p className="font-medium">${technicalIndicators.ema50?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destek</p>
              <p className="font-medium text-green-400">${technicalIndicators.support?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Direnç</p>
              <p className="font-medium text-red-400">${technicalIndicators.resistance?.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Sentiment */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Piyasa Duyarlılığı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{marketSentiment.fearGreedIndex}</div>
            <div className={`text-lg font-medium ${getSentimentColor(marketSentiment.sentiment)}`}>
              {marketSentiment.sentiment}
            </div>
            <div className="text-sm text-muted-foreground">Fear & Greed Index</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Sosyal Hacim</p>
              <p className="font-medium">{marketSentiment.socialVolume?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Haber Skoru</p>
              <p className="font-medium">{marketSentiment.newsScore}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balina Aktivitesi</p>
              <Badge className={
                marketSentiment.whaleActivity === 'High' 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-green-500/20 text-green-400'
              }>
                {marketSentiment.whaleActivity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Analiz Özeti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="text-sm">Genel Trend</span>
            <Badge className="bg-green-500/20 text-green-400">Yükseliş</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="text-sm">Kısa Vadeli Sinyal</span>
            <Badge className="bg-green-500/20 text-green-400">ALIŞ</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="text-sm">Risk Seviyesi</span>
            <Badge className="bg-yellow-500/20 text-yellow-400">Orta</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-12 bg-green-600 hover:bg-green-700">
          Alış Emri Ver
        </Button>
        <Button variant="outline" className="h-12 border-border">
          Uyarı Kur
        </Button>
      </div>
    </div>
  );
};

export default MarketAnalysis;

