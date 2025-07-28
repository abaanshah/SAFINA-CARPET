import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Mail, Eye, Reply, Archive, Star } from 'lucide-react';

const mockEmails = [
  {
    id: '1',
    sender: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    subject: 'Inquiry about Persian Rug Collection',
    message: 'Hello, I am interested in your Persian rug collection. Could you please send me the catalog with pricing? I am looking for something for my living room.',
    timestamp: new Date('2024-01-22T10:30:00'),
    isRead: false,
    isStarred: true,
    priority: 'high'
  },
  {
    id: '2',
    sender: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    subject: 'Custom Carpet Request',
    message: 'I would like to place a custom order for a 8x10 feet carpet with specific colors matching my home decor. Please let me know the process.',
    timestamp: new Date('2024-01-22T09:15:00'),
    isRead: true,
    isStarred: false,
    priority: 'medium'
  },
  {
    id: '3',
    sender: 'Mohammed Ali',
    email: 'mohammed.ali@email.com',
    subject: 'Prayer Mat Bulk Order',
    message: 'We need 100 prayer mats for our mosque. Please provide quotation for bulk order with delivery timeline.',
    timestamp: new Date('2024-01-21T16:45:00'),
    isRead: false,
    isStarred: false,
    priority: 'high'
  }
];

export default function MailInbox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = (emailId) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const toggleStar = (emailId) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* ... same UI logic as before ... */}
    </div>
  );
}
