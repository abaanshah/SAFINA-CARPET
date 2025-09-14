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

interface Meeting {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: Date;
  time: string;
  address: string;
  purpose: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

const mockMeetings: Meeting[] = [
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
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMeetings = meetings.filter(meeting =>
    meeting.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const updateMeetingStatus = (meetingId: string, newStatus: Meeting['status']) => {
    setMeetings(meetings.map(meeting =>
      meeting.id === meetingId ? { ...meeting, status: newStatus } : meeting
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meeting Schedule</h1>
          <p className="text-muted-foreground">
            Manage customer home visit appointments
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Meetings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{meetings.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {meetings.filter(m => m.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {meetings.filter(m => m.status === 'confirmed').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {meetings.filter(m => {
                const today = new Date();
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                return m.date >= today && m.date <= weekFromNow;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings List */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <CardTitle className="text-card-foreground">Scheduled Meetings</CardTitle>
            <div className="flex-1">
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Date & Time</TableHead>
                <TableHead className="text-muted-foreground">Address</TableHead>
                <TableHead className="text-muted-foreground">Purpose</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow key={meeting.id} className="border-border">
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {meeting.customerName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.customerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {formatDate(meeting.date)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="text-card-foreground text-sm max-w-xs">
                        {meeting.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {meeting.purpose}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:text-primary/80"
                            onClick={() => setSelectedMeeting(meeting)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Meeting Details</DialogTitle>
                          </DialogHeader>
                          {selectedMeeting && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Customer:</label>
                                  <p className="text-card-foreground">{selectedMeeting.customerName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedMeeting.customerEmail}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Phone:</label>
                                  <p className="text-card-foreground">{selectedMeeting.customerPhone}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Date:</label>
                                  <p className="text-card-foreground">{formatDate(selectedMeeting.date)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Time:</label>
                                  <p className="text-card-foreground">{selectedMeeting.time}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Address:</label>
                                <p className="text-card-foreground mt-1">{selectedMeeting.address}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Purpose:</label>
                                <p className="text-card-foreground mt-1">{selectedMeeting.purpose}</p>
                              </div>

                              {selectedMeeting.notes && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Notes:</label>
                                  <p className="text-card-foreground mt-1 p-3 bg-muted rounded-lg">{selectedMeeting.notes}</p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 pt-4">
                                <Button 
                                  size="sm"
                                  onClick={() => updateMeetingStatus(selectedMeeting.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Confirm
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateMeetingStatus(selectedMeeting.id, 'completed')}
                                  className="border-border"
                                >
                                  Mark Complete
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-border"
                                >
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Customer
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-border"
                                >
                                  <MapPin className="mr-2 h-4 w-4" />
                                  Get Directions
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}