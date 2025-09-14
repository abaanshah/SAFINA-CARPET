import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  isFromCustomer: boolean;
}

interface Conversation {
  id: string;
  customerName: string;
  customerEmail: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

const mockConversations: Conversation[] = [
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
        message: 'Hello, I am interested in your Persian rugs. Can you show me some options?',
        timestamp: new Date('2024-01-22T10:00:00'),
        isFromCustomer: true
      },
      {
        id: '2',
        senderId: 'admin',
        senderName: 'Admin',
        message: 'Hello! I would be happy to help you with our Persian rug collection. What size are you looking for?',
        timestamp: new Date('2024-01-22T10:05:00'),
        isFromCustomer: false
      },
      {
        id: '3',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        message: 'I need something for my living room, around 8x10 feet.',
        timestamp: new Date('2024-01-22T10:10:00'),
        isFromCustomer: true
      },
      {
        id: '4',
        senderId: 'admin',
        senderName: 'Admin',
        message: 'Perfect! We have several beautiful options in that size. Let me share some images with you.',
        timestamp: new Date('2024-01-22T10:15:00'),
        isFromCustomer: false
      },
      {
        id: '5',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        message: 'Thank you for the quick response!',
        timestamp: new Date('2024-01-22T11:30:00'),
        isFromCustomer: true
      }
    ]
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
        message: 'Hi, I placed an order yesterday. When can I expect delivery?',
        timestamp: new Date('2024-01-22T09:30:00'),
        isFromCustomer: true
      },
      {
        id: '2',
        senderId: 'admin',
        senderName: 'Admin',
        message: 'Hello! Let me check your order status for you.',
        timestamp: new Date('2024-01-22T09:35:00'),
        isFromCustomer: false
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Priya Sharma',
        message: 'When can I expect delivery?',
        timestamp: new Date('2024-01-22T09:45:00'),
        isFromCustomer: true
      }
    ]
  }
];

export default function Chat() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'admin',
      senderName: 'Admin',
      message: newMessage,
      timestamp: new Date(),
      isFromCustomer: false
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          lastMessageTime: new Date()
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      lastMessageTime: new Date()
    });
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
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
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Chats
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{conversations.length}</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread Messages
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Online Customers
            </CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {conversations.filter(conv => conv.isOnline).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Response Time
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2m</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-card-foreground">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {conversation.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-card-foreground truncate">
                          {conversation.customerName}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(conversation.lastMessageTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="border-border lg:col-span-2">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {selectedConversation.customerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-card-foreground">
                        {selectedConversation.customerName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.customerEmail}
                      </p>
                      {selectedConversation.isOnline && (
                        <p className="text-xs text-green-600">Online</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isFromCustomer ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isFromCustomer
                              ? 'bg-muted text-card-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isFromCustomer ? 'text-muted-foreground' : 'text-primary-foreground/70'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t border-border p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}