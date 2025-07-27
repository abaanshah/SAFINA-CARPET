import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function StatsCard(props) {
  const {
    title,
    value,
    description,
    icon: Icon,
    trend,
    className
  } = props;

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `₹${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `₹${(val / 1000).toFixed(0)}K`;
      }
      return `₹${val.toLocaleString()}`;
    }
    return val;
  };

  const trendClass =
    trend && trend.isPositive
      ? 'text-green-600'
      : trend
      ? 'text-red-600'
      : '';

  return (
    <div
      className={`relative overflow-hidden border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 p-4 bg-white ${className || ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
      </div>

      <div className="text-2xl font-bold text-gray-900">
        {formatValue(value)}
      </div>

      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}

      {trend && (
        <div className="flex items-center mt-2">
          <span className={`text-xs font-medium ${trendClass}`}>
            {trend.isPositive ? '+' : '-'}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-400 ml-1">vs last month</span>
        </div>
      )}

      {/* Faint background circle gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400 opacity-5 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
    </div>
  );
}
