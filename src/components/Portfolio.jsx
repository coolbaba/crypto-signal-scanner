import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [showValues, setShowValues] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Mock portföy verileri
    const mockPortfolio = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        avgPrice: 40000,
        currentPrice: 43250.50,
        value: 21625.25,
        change: 8.125,
        changePercent: 8.125,
        color: '#f7931a'
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 5.2,
        avgPrice: 2500,
        currentPrice: 2650.75,
        value: 13783.90,
        change: 783.90,
        changePercent: 6.03,
        color: '#627eea'
      },
      {
        symbol: 'BNB',
        name: 'Binance Coin',
        amount: 15,
        avgPrice: 300,
        currentPrice: 315.20,
        value: 4728,
        change: 228,
        changePercent: 5.07,
        color: '#f3ba2f'
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        amount: 1000,
        avgPrice: 0.45,
        currentPrice: 0.52,
        value: 520,
        change: 70,
        changePercent: 15.56,
        color: '#0033ad'
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        amount: 8,
        avgPrice: 105,
        currentPrice: 98.45,
        value: 787.60,
        change: -52.40,
        changePercent: -6.24,
        color: '#9945ff'
      }
    ];

    // Toplam değer ve değişim hesaplama
    const total = mockPortfolio.reduce((sum, coin) => sum + coin.value, 0);
    const totalChangeValue = mockPortfolio.reduce((sum, coin) => sum + coin.change, 0);
    const totalChangePercent = (totalChangeValue / (total - totalChangeValue)) * 100;

    setPortfolio(mockPortfolio);
    setTotalValue(total);
    setTotalChange(totalChangePercent);

    // Grafik verileri (son 7 gün)
    const mockChartData = [
      { day: 'Pzt', value: total * 0.92 },
      { day: 'Sal', value: total * 0.95 },
      { day: 'Çar', value: total * 0.88 },
      { day: 'Per', value: total * 0.93 },
      { day: 'Cum', value: total * 0.97 },
      { day: 'Cmt', value: total * 0.99 },
      { day: 'Paz', value: total }
    ];
    setChartData(mockChartData);
  }, []);

  const formatCurrency = (value) => {
    if (!showValues) return '****';
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    if (!showValues) return '****';
    return value.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portföy</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowValues(!showValues)}
        >
          {showValues ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
      </div>

      {/* Portfolio Summary */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Toplam Portföy Değeri</p>
            <p className="text-3xl font-bold">{formatCurrency(totalValue)}</p>
            <div className={`flex items-center justify-center space-x-1 ${
              totalChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {showValues ? `${totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}%` : '****'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">7 Günlük Performans</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#8892b0' }}
              />
              <YAxis hide />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Değer']}
                labelStyle={{ color: '#8892b0' }}
                contentStyle={{ 
                  backgroundColor: '#242938', 
                  border: '1px solid #3a3f4f',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#00d4ff" 
                strokeWidth={2}
                dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#00d4ff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Distribution */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Portföy Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={portfolio}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {portfolio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Değer']}
                contentStyle={{ 
                  backgroundColor: '#242938', 
                  border: '1px solid #3a3f4f',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {portfolio.map((coin) => (
              <div key={coin.symbol} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: coin.color }}
                />
                <span className="text-sm">{coin.symbol}</span>
                <span className="text-xs text-muted-foreground">
                  {showValues ? `${((coin.value / totalValue) * 100).toFixed(1)}%` : '**%'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Holdings List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Varlıklarım</h2>
        {portfolio.map((coin) => (
          <Card key={coin.symbol} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${coin.color}20` }}
                  >
                    <span className="text-sm font-bold" style={{ color: coin.color }}>
                      {coin.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{coin.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{coin.name}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(coin.value)}</p>
                  <div className={`flex items-center text-sm ${
                    coin.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {coin.changePercent >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {showValues ? `${coin.changePercent >= 0 ? '+' : ''}${coin.changePercent.toFixed(2)}%` : '****'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Miktar</p>
                  <p className="font-medium">{formatNumber(coin.amount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ort. Fiyat</p>
                  <p className="font-medium">{formatCurrency(coin.avgPrice)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Güncel Fiyat</p>
                  <p className="font-medium">{formatCurrency(coin.currentPrice)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Asset Button */}
      <Button className="w-full h-12 bg-primary hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        Varlık Ekle
      </Button>
    </div>
  );
};

export default Portfolio;

