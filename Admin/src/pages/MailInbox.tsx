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

interface Email {
  id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockEmails: Email[] = [
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
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const toggleStar = (emailId: string) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const getPriorityColor = (priority: string) => {
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mail Inbox</h1>
          <p className="text-muted-foreground">
            Manage customer emails and inquiries
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-border">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Mail className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Emails
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{emails.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread
            </CardTitle>
            <Mail className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {emails.filter(e => !e.isRead).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Starred
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {emails.filter(e => e.isStarred).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority
            </CardTitle>
            <Mail className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {emails.filter(e => e.priority === 'high').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email List */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <CardTitle className="text-card-foreground">Emails</CardTitle>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
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
                <TableHead className="text-muted-foreground">Sender</TableHead>
                <TableHead className="text-muted-foreground">Subject</TableHead>
                <TableHead className="text-muted-foreground">Priority</TableHead>
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmails.map((email) => (
                <TableRow 
                  key={email.id} 
                  className={`border-border cursor-pointer hover:bg-muted/50 ${!email.isRead ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}`}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {email.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {!email.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium text-card-foreground ${!email.isRead ? 'font-bold' : ''}`}>
                          {email.sender}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {email.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-card-foreground ${!email.isRead ? 'font-semibold' : ''}`}>
                      {email.subject}
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-md">
                      {email.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(email.priority)}>
                      {email.priority.charAt(0).toUpperCase() + email.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {formatTime(email.timestamp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(email.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Star className={`w-4 h-4 ${email.isStarred ? 'fill-current text-yellow-500' : ''}`} />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:text-primary/80"
                            onClick={() => {
                              setSelectedEmail(email);
                              markAsRead(email.id);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Email Details</DialogTitle>
                          </DialogHeader>
                          {selectedEmail && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">From:</label>
                                  <p className="text-card-foreground">{selectedEmail.sender}</p>
                                  <p className="text-sm text-muted-foreground">{selectedEmail.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Time:</label>
                                  <p className="text-card-foreground">{formatTime(selectedEmail.timestamp)}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject:</label>
                                <p className="text-card-foreground font-medium">{selectedEmail.subject}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Message:</label>
                                <p className="text-card-foreground mt-2 p-4 bg-muted rounded-lg">{selectedEmail.message}</p>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                  <Reply className="mr-2 h-4 w-4" />
                                  Reply
                                </Button>
                                <Button variant="outline" className="border-border">
                                  <Archive className="mr-2 h-4 w-4" />
                                  Archive
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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