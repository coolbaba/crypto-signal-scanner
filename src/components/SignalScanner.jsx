import React, { useState, useEffect } from 'react';
import { Filter, Star, TrendingUp, TrendingDown, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SignalScanner = () => {
  const [signals, setSignals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('1h');

  useEffect(() => {
    // Mock sinyal verileri
    const mockSignals = [
      {
        id: 1,
        symbol: 'BTC/USDT',
        type: 'BUY',
        strength: 85,
        price: 43250.50,
        target: 45000,
        stopLoss: 41500,
        timeframe: '1h',
        accuracy: 92,
        timestamp: new Date(Date.now() - 5 * 60000),
        indicators: ['RSI', 'MACD', 'Bollinger Bands']
      },
      {
        id: 2,
        symbol: 'ETH/USDT',
        type: 'SELL',
        strength: 78,
        price: 2650.75,
        target: 2500,
        stopLoss: 2750,
        timeframe: '4h',
        accuracy: 88,
        timestamp: new Date(Date.now() - 15 * 60000),
        indicators: ['EMA', 'Stochastic', 'Volume']
      },
      {
        id: 3,
        symbol: 'BNB/USDT',
        type: 'BUY',
        strength: 92,
        price: 315.20,
        target: 340,
        stopLoss: 300,
        timeframe: '1h',
        accuracy: 95,
        timestamp: new Date(Date.now() - 2 * 60000),
        indicators: ['RSI', 'MACD', 'Support/Resistance']
      },
      {
        id: 4,
        symbol: 'SOL/USDT',
        type: 'HOLD',
        strength: 65,
        price: 98.45,
        target: 105,
        stopLoss: 92,
        timeframe: '1d',
        accuracy: 82,
        timestamp: new Date(Date.now() - 30 * 60000),
        indicators: ['Moving Average', 'Volume', 'Fibonacci']
      },
      {
        id: 5,
        symbol: 'ADA/USDT',
        type: 'BUY',
        strength: 88,
        price: 0.52,
        target: 0.58,
        stopLoss: 0.48,
        timeframe: '2h',
        accuracy: 90,
        timestamp: new Date(Date.now() - 8 * 60000),
        indicators: ['RSI', 'MACD', 'Trend Lines']
      }
    ];

    setSignals(mockSignals);
  }, []);

  const getSignalColor = (type) => {
    switch (type) {
      case 'BUY':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'SELL':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HOLD':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStrengthColor = (strength) => {
    if (strength >= 80) return 'text-green-400';
    if (strength >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // dakika cinsinden
    
    if (diff < 1) return 'Şimdi';
    if (diff < 60) return `${diff}dk önce`;
    if (diff < 1440) return `${Math.floor(diff / 60)}s önce`;
    return `${Math.floor(diff / 1440)}g önce`;
  };

  const filteredSignals = signals.filter(signal => {
    if (filter === 'all') return true;
    return signal.type.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sinyal Tarayıcı</h1>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filtre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="buy">Alış</SelectItem>
            <SelectItem value="sell">Satış</SelectItem>
            <SelectItem value="hold">Bekle</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Zaman" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">1 Saat</SelectItem>
            <SelectItem value="4h">4 Saat</SelectItem>
            <SelectItem value="1d">1 Gün</SelectItem>
            <SelectItem value="1w">1 Hafta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {filteredSignals.filter(s => s.type === 'BUY').length}
            </div>
            <div className="text-sm text-muted-foreground">Alış Sinyali</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {filteredSignals.filter(s => s.type === 'SELL').length}
            </div>
            <div className="text-sm text-muted-foreground">Satış Sinyali</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredSignals.reduce((acc, s) => acc + s.accuracy, 0) / filteredSignals.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Ortalama Doğruluk</div>
          </CardContent>
        </Card>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((signal) => (
          <Card key={signal.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {signal.symbol.split('/')[0].slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{signal.symbol}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSignalColor(signal.type)}>
                        {signal.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(signal.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <Star className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Mevcut Fiyat</p>
                  <p className="font-semibold">${signal.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hedef</p>
                  <p className="font-semibold text-green-400">${signal.target.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="font-semibold text-red-400">${signal.stopLoss.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sinyal Gücü</p>
                  <p className={`font-semibold ${getStrengthColor(signal.strength)}`}>
                    {signal.strength}%
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-muted-foreground mb-2">Kullanılan İndikatörler</p>
                <div className="flex flex-wrap gap-2">
                  {signal.indicators.map((indicator, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Doğruluk:</span>
                  <span className="text-sm font-medium text-green-400">{signal.accuracy}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Zaman:</span>
                  <span className="text-sm font-medium">{signal.timeframe}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refresh Button */}
      <Button className="w-full h-12 bg-primary hover:bg-primary/90">
        Sinyalleri Yenile
      </Button>
    </div>
  );
};

export default SignalScanner;

