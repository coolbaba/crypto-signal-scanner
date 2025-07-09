import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const mockMarketData = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250.50,
        change: 2.45,
        volume: '28.5B',
        signal: 'BUY'
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2650.75,
        change: -1.23,
        volume: '15.2B',
        signal: 'HOLD'
      },
      {
        symbol: 'BNB',
        name: 'Binance Coin',
        price: 315.20,
        change: 4.67,
        volume: '2.1B',
        signal: 'BUY'
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: 98.45,
        change: -3.21,
        volume: '1.8B',
        signal: 'SELL'
      }
    ];

    const mockTopGainers = [
      { symbol: 'DOGE', change: 15.67, price: 0.085 },
      { symbol: 'ADA', change: 12.34, price: 0.52 },
      { symbol: 'DOT', change: 8.91, price: 7.23 }
    ];

    const mockTopLosers = [
      { symbol: 'LUNA', change: -8.45, price: 0.95 },
      { symbol: 'AVAX', change: -6.78, price: 38.20 },
      { symbol: 'MATIC', change: -5.23, price: 0.89 }
    ];

    setMarketData(mockMarketData);
    setTopGainers(mockTopGainers);
    setTopLosers(mockTopLosers);
  }, []);

  const getSignalColor = (signal) => {
    switch (signal) {
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

  return (
    <div className="p-4 space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Piyasa</p>
                <p className="text-2xl font-bold">$1.65T</p>
                <p className="text-sm text-green-400 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.34%
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24s Hacim</p>
                <p className="text-2xl font-bold">$89.2B</p>
                <p className="text-sm text-red-400 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -1.45%
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              En Çok Kazananlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGainers.map((coin, index) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground">${coin.price}</span>
                </div>
                <div className="flex items-center text-green-400">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  <span className="text-sm font-medium">+{coin.change}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-red-400" />
              En Çok Kaybedenler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topLosers.map((coin, index) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground">${coin.price}</span>
                </div>
                <div className="flex items-center text-red-400">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  <span className="text-sm font-medium">{coin.change}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Data */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Piyasa Verileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketData.map((coin) => (
            <div key={coin.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{coin.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="font-medium">{coin.symbol}</p>
                  <p className="text-sm text-muted-foreground">{coin.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${coin.price.toLocaleString()}</p>
                <p className={`text-sm flex items-center ${
                  coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coin.change >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(coin.change)}%
                </p>
              </div>
              
              <div className="text-right">
                <Badge className={getSignalColor(coin.signal)}>
                  {coin.signal}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{coin.volume}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-12 bg-primary hover:bg-primary/90">
          Sinyal Tarayıcı
        </Button>
        <Button variant="outline" className="h-12 border-border">
          Portföy Analizi
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

