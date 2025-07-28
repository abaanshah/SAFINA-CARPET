// import { useState } from 'react';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Badge } from '../../components/ui/badge';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   Search,
//   Send,
//   Phone,
//   Video,
//   MoreVertical,
//   MessageCircle,
// } from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@email.com',
    lastMessage: 'Thank you for the quick response!',
    lastMessageTime: new Date('2024-01-22T11:30:00'),
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: '1',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        message:
          'Hello, I am interested in your Persian rugs. Can you show me some options?',
        timestamp: new Date('2024-01-22T10:00:00'),
        isFromCustomer: true,
      },
      {
        id: '2',
        senderId: 'admin',
        senderName: 'Admin',
        message:
          'Hello! I would be happy to help you with our Persian rug collection. What size are you looking for?',
        timestamp: new Date('2024-01-22T10:05:00'),
        isFromCustomer: false,
      },
      {
        id: '3',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        message:
          'I need something for my living room, around 8x10 feet.',
        timestamp: new Date('2024-01-22T10:10:00'),
        isFromCustomer: true,
      },
      {
        id: '4',
        senderId: 'admin',
        senderName: 'Admin',
        message:
          'Perfect! We have several beautiful options in that size. Let me share some images with you.',
        timestamp: new Date('2024-01-22T10:15:00'),
        isFromCustomer: false,
      },
      {
        id: '5',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        message: 'Thank you for the quick response!',
        timestamp: new Date('2024-01-22T11:30:00'),
        isFromCustomer: true,
      },
    ],
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    lastMessage: 'When can I expect delivery?',
    lastMessageTime: new Date('2024-01-22T09:45:00'),
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: '1',
        senderId: '2',
        senderName: 'Priya Sharma',
        message:
          'Hi, I placed an order yesterday. When can I expect delivery?',
        timestamp: new Date('2024-01-22T09:30:00'),
        isFromCustomer: true,
      },
      {
        id: '2',
        senderId: 'admin',
        senderName: 'Admin',
        message: 'Hello! Let me check your order status for you.',
        timestamp: new Date('2024-01-22T09:35:00'),
        isFromCustomer: false,
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Priya Sharma',
        message: 'When can I expect delivery?',
        timestamp: new Date('2024-01-22T09:45:00'),
        isFromCustomer: true,
      },
    ],
  },
];

export default function Chat() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'admin',
      senderName: 'Admin',
      message: newMessage,
      timestamp: new Date(),
      isFromCustomer: false,
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          lastMessageTime: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTime: new Date(),
    });
    setNewMessage('');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Chat</h1>
        <p className="text-muted-foreground">
          Real-time communication with customers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* ...Card components remain unchanged */}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* ...Chat UI Components remain unchanged */}
      </div>
    </div>
  );
}
