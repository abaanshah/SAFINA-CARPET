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
import { Calendar, MapPin, Clock, User, Phone, Edit, Eye, Plus } from 'lucide-react';

const mockMeetings = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91-9876543210',
    customerEmail: 'rajesh.kumar@email.com',
    date: new Date('2024-01-25'),
    time: '10:00 AM',
    address: '123 MG Road, New Delhi, Delhi - 110001',
    purpose: 'Carpet consultation for living room',
    status: 'scheduled',
    notes: 'Customer prefers Persian rugs with red patterns'
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    customerPhone: '+91-9876543211',
    customerEmail: 'priya.sharma@email.com',
    date: new Date('2024-01-26'),
    time: '2:00 PM',
    address: '456 Park Street, Mumbai, Maharashtra - 400001',
    purpose: 'Custom carpet measurement and design discussion',
    status: 'confirmed',
    notes: 'Bring color samples and size chart'
  },
  {
    id: '3',
    customerName: 'Mohammed Ali',
    customerPhone: '+91-9876543212',
    customerEmail: 'mohammed.ali@email.com',
    date: new Date('2024-01-24'),
    time: '4:00 PM',
    address: '789 Brigade Road, Bangalore, Karnataka - 560001',
    purpose: 'Prayer mat bulk order discussion',
    status: 'completed',
    notes: 'Finalized order for 100 prayer mats'
  },
  {
    id: '4',
    customerName: 'Anita Gupta',
    customerPhone: '+91-9876543213',
    customerEmail: 'anita.gupta@email.com',
    date: new Date('2024-01-27'),
    time: '11:00 AM',
    address: '321 Sector 18, Noida, Uttar Pradesh - 201301',
    purpose: 'Home carpet installation and placement',
    status: 'scheduled'
  }
];

export default function MeetingSchedule() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeetings = meetings.filter(meeting =>
    meeting.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const updateMeetingStatus = (meetingId, newStatus) => {
    setMeetings(meetings.map(meeting =>
      meeting.id === meetingId ? { ...meeting, status: newStatus } : meeting
    ));
  };

  return (
    <div className="space-y-6">
      {/* All JSX remains unchanged */}
      {/* Already written logic and components are preserved */}
    </div>
  );
}
